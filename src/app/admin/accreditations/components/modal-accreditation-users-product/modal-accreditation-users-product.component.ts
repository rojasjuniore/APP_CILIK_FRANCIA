import { Component, Input, OnInit, Output, SimpleChanges } from '@angular/core';
import { FormGroup, FormBuilder } from '@angular/forms';
import { Router } from '@angular/router';
import { TranslatePipe } from '@ngx-translate/core';
import { NgxSpinnerService } from 'ngx-spinner';
import { Subject, Observable, of, Subscription, map } from 'rxjs';
import { AuthenticationService } from 'src/app/services/authentication.service';
import { BlockService } from 'src/app/services/block.service';
import { BsModalService } from 'src/app/services/bs-modal.service';
import { DataService } from 'src/app/services/data.service';
import { DevisionService } from 'src/app/services/devision.service';
import { PurchaseService } from 'src/app/services/purchase.service';
import { QuickNotificationService } from 'src/app/services/quick-notification/quick-notification.service';
import { RecordsService } from 'src/app/services/records.service';
import { SchoolService } from 'src/app/services/school.service';
import { Sweetalert2Service } from 'src/app/services/sweetalert2.service';
import { UserService } from 'src/app/services/user/user.service';
import { environment } from 'src/environments/environment';

@Component({
  selector: 'app-modal-accreditation-users-product',
  templateUrl: './modal-accreditation-users-product.component.html',
  styleUrls: ['./modal-accreditation-users-product.component.css']
})
export class ModalAccreditationUsersProductComponent implements OnInit {

  public product$!: Observable<any[]>;

  /** Identificador de la modal */
  @Input() _id: string = 'modalAcreditedProduct';

  @Input() ownerType!: string;

  @Output() onCloseModal = new Subject<any>();

  /** Instancia de la modal */
  public mi: any;

  /** Instancia del formulario */
  public form!: FormGroup;

  /** Documento de la categoria */
  public item: any;

  /** Reglas del formulario */
  public formRules: any;

  public schoolRecord$!: Observable<any[]>;
  public dataBlock$!: Observable<any[]>;
  public division$!: Observable<any[]>;
  public results$: Observable<any[]> = of([]);

  countries: any;
  allStates: any;
  filteredStates: any;
  filteredCity: any;
  AllCity: any;

  /** Subscripción de eventos */
  private sub$!: Subscription;

  /** Reglas por defecto del formulario */

  accreditationsList: any;
  isLoading = true;
  user: any;

  constructor(
    private userSrv: UserService,
    private translatePipe: TranslatePipe,
    private quickNotificationSrv: QuickNotificationService,
    private authSrv: AuthenticationService,
    private spinner: NgxSpinnerService,
    private purchaseSrv: PurchaseService,
    private recordsSrv: RecordsService,
    private sweetAlert2Srv: Sweetalert2Service,
    private blockSrv: BlockService,
    private devisionSrv: DevisionService,
    private dataSrv: DataService,
    private bsModalSrv: BsModalService,
    private schoolSrv: SchoolService,
    private router: Router,
    private fb: FormBuilder,

  ) { }

  buildForm() {
  }

  get f() { return this.form.controls; }

  ngOnInit(): void { }

  ngOnChanges(changes: SimpleChanges): void {
    const { ownerType } = changes;

    if (ownerType && ownerType.currentValue) {
      this.ownerType = ownerType.currentValue;
    }
  }


  ngAfterViewInit(): void {
    this.buildModal();
  }

  buildModal() {

    this.mi = this.bsModalSrv.buildModal(this._id);

    this.sub$ = this.router.events.subscribe((event) => {

      /** Si la modal esta desplegada al cambiar de ruta */
      if (this.mi._isShown) { this.closeModal(); }

    });
  }

  async showModal(params: any) {
    const { user } = params;
    console.log('showModal', params);

    this.user = user;

    this.getAccreditationsRecord(user.uid);
    // Mostrar modal
    this.mi.show();
  }


  async getAccreditationsRecord(uid: string) {
    this.product$ = this.purchaseSrv.claimPurchase(environment.dataEvent.keyDb, uid).pipe(
      map((items: any[]) => {
        // Crear un Map usando item._id como clave para eliminar duplicados
        const uniqueMap = new Map(items.map(item => [item._id, item]));
        // Convertir el Map de vuelta a array
        return Array.from(uniqueMap.values());
      })
    );
  }

  async closeModal(params: any = {}) {
    const { status = false, data = null } = params;

    this.onCloseModal.next({ status, data });

    this.item = null;
    this.formRules = null;


    this.mi.hide();
  }


  /**
   * Accredits a product based on the provided item.
   * @param {any} item - The item to be accredited.
   * @returns {Promise<void>} A promise that resolves when the operation is complete.
   */
  async accreditation(item: any): Promise<void> {
    try {
      const { ordeID, index, key, uid_add } = item;
      const ask = await this.sweetAlert2Srv.askConfirm("¿Estás seguro de acreditar este producto?");
      if (!ask) return;

      await this.spinner.show();

      const uid = await this.authSrv.getByIdUIDPromise();
      const obj = {
        status: 'accredited',
        accreditationDate: Date.now(),
        admin_uid: uid,
      };

      console.log('item', item);

      await this.purchaseSrv.updatePurchaseStore(environment.dataEvent.keyDb, ordeID, index, obj, false, true);

      await this.sendEmailNotification(ordeID, index, key, uid_add);
      
      await this.sweetAlert2Srv.showSuccess("Producto acreditado correctamente");

    } catch (err) {
      console.error('Error al acreditar el producto', err);
      await this.sweetAlert2Srv.showError("Error al acreditar el producto");
    } finally {
      this.spinner.hide();
    }
  }

  async sendEmailNotification(ordeID, index, key, uid) {
    console.log('sendEmailNotification', ordeID, index, key, uid);
    const obj: any = await this.userSrv.getUser(uid)
    console.log('obj', obj);



    await this.quickNotificationSrv.sendEmailNotification({
      type: "",
      email: obj.email,
      uid: uid,
      subject: `Asunto: ¡Felicidades! Su Producto "${this.translatePipe.transform(key)} ${this.translatePipe.transform(ordeID)}-${this.translatePipe.transform(index)}" Ha Sido Acreditado con Éxito`,
      greeting: ' ',
      messageBody: [
        {
          type: 'line',
          text: ` Estimado/a ${obj.name},`
        },
        {
          type: 'line',
          text: `Nos complace informarle que su producto, "${this.translatePipe.transform(key)}", ha completado exitosamente nuestro proceso de acreditación.`
        },
        {
          type: 'line',
          text: `Este es un hito importante, y queremos felicitarle por el arduo trabajo y la dedicación que han llevado a este logro. Su compromiso con la calidad y la excelencia es evidente, y estamos orgullosos de reconocer su producto como acreditado.`
        },
      ],
      salutation: `${this.translatePipe.transform('notification.purchaseInfo.salutation')}`
    });
  }






  /**
   * @dev Enviar formulario
   */
  onSubmit() {
    if (this.form.invalid) {
      this.form.markAllAsTouched();
      console.log('invalid', this.form);
      return alert('invalid');
    }

    console.log('this.form.value', this.form.value);
    this.closeModal({ status: true, data: this.form.value });
  }

  ngOnDestroy(): void { this.sub$.unsubscribe(); }



}
