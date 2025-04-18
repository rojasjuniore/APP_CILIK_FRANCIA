import { Component, Input, OnInit, Output, SimpleChanges, ViewChild } from '@angular/core';
import { AngularFireDatabase } from '@angular/fire/compat/database';
import { FormGroup, FormBuilder } from '@angular/forms';
import { Router } from '@angular/router';
import { NgxSpinnerService } from 'ngx-spinner';
import { Subject, Observable, of, Subscription } from 'rxjs';
import { AuthenticationService } from 'src/app/services/authentication.service';
import { BlockService } from 'src/app/services/block.service';
import { BsModalService } from 'src/app/services/bs-modal.service';
import { DataService } from 'src/app/services/data.service';
import { DevisionService } from 'src/app/services/devision.service';
import { RecordsService } from 'src/app/services/records.service';
import { SchoolService } from 'src/app/services/school.service';
import { Sweetalert2Service } from 'src/app/services/sweetalert2.service';
import { environment } from 'src/environments/environment';

@Component({
  selector: 'app-modal-accredited-users',
  templateUrl: './modal-accredited-users.component.html',
  styleUrls: ['./modal-accredited-users.component.css']
})
export class ModalAccreditedUsersComponent implements OnInit {


  /** Identificador de la modal */
  @Input() _id: string = 'modalAcredited';

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
  code: string = '';

  constructor(
    private auth: AuthenticationService,
    private db: AngularFireDatabase,
    private spinner: NgxSpinnerService,
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
    const { item, rules, code } = params;
    console.log('showModal', params);


    this.code = code;
    this.getAccreditationsRecord(code);
    // Mostrar modal
    this.mi.show();
  }


  async getAccreditationsRecord(code: string) {
    if (!code) {
      console.error('Código no válido proporcionado');
      return;
    }

    this.isLoading = true;

    try {
      this.accreditationsList = [];
      const result = await this.recordsSrv.getAccreditationsRecord(environment.dataEvent.keyDb, code);

      if (!result?.record) {
        throw new Error('No se recibieron datos válidos del servidor');
      }

      this.accreditationsList = result.record
        .sort((a: any, b: any) => {
          // Primero ordenar por isPay
          const payComparison = a.isPay - b.isPay;
          // Si isPay es igual, ordenar por count
          return payComparison === 0 ? b.count - a.count : payComparison;
        });

    } catch (error: any) {
      console.error('Error al obtener acreditaciones:', error.message);
      this.sweetAlert2Srv.showError('Error al cargar las acreditaciones');
      this.accreditationsList = [];
    } finally {
      this.isLoading = false;
    }
  }

  async closeModal(params: any = {}) {
    const { status = false, data = null } = params;

    this.onCloseModal.next({ status, data });

    this.item = null;
    this.formRules = null;


    this.mi.hide();
  }


  async remove(item) {
    try {
      console.log("remove2,", item);


      const ask: any = await this.sweetAlert2Srv.askConfirm(`¿Está seguro de eliminar este registro? ${item.members}`);
      if (!ask) return

      await this.spinner.show();



      const uid = await this.auth.getByIdUIDPromise();
      console.log('uid', uid);


      /// save backup
      const urlRemove = `/categoriesenabled-backup/${environment.dataEvent.keyDb}/${item.code}/categories/${item.key}`
      console.log(urlRemove);
      await this.db.object(urlRemove).set({
        ...item,
        uid_admin: uid,
        created: Date.now(),
      });

      // remove 
      const url = `/categoriesenabled/${environment.dataEvent.keyDb}/${item.code}/categories/${item.key}`
      console.log(url);
      await this.db.object(url).remove();




      await this.getAccreditationsRecord(this.code);
      return this.sweetAlert2Srv.showSuccess(`Registro eliminado correctamente`);
    } catch (err) {
      console.log(err);
      return this.sweetAlert2Srv.showError(err);
    } finally {
      await this.spinner.hide();
    }
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
