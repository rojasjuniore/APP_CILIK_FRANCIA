import { AfterViewInit, Component, Input, OnChanges, OnDestroy, OnInit, Output, SimpleChanges } from '@angular/core';
import { FormGroup, FormBuilder } from '@angular/forms';
import { Router } from '@angular/router';
import moment from 'moment';
import { NgxSpinnerService } from 'ngx-spinner';
import { Subject, Observable, of, Subscription, debounceTime, map, distinctUntilChanged } from 'rxjs';
import { AuthenticationService } from 'src/app/services/authentication.service';
import { BsModalService } from 'src/app/services/bs-modal.service';
import { SchoolService } from 'src/app/services/school.service';
import { Sweetalert2Service } from 'src/app/services/sweetalert2.service';
import { UserService } from 'src/app/services/user/user.service';

@Component({
  selector: 'app-claim-search-user',
  templateUrl: './claim-search-user.component.html',
  styleUrls: ['./claim-search-user.component.css']
})
export class ClaimSearchUserComponent implements OnInit, OnChanges, AfterViewInit, OnDestroy {


  /** Identificador de la modal */
  @Input() _id: string = 'modalClaimAddUser';

  @Input() ownerType!: string;

  @Input() itemData!: any;

  @Input() categoryType!: any;

  /** Al cerrar modal - Emitir evento */
  @Output() onCloseModal = new Subject<any>();


  /** Instancia de la modal */
  public mi: any;

  /** Instancia del formulario */
  public form: FormGroup;

  /** Reglas de la división */
  public divisionSetting: any;

  public filters = {
    academy: {
      email: 'email_institution',
      name: 'name_institution',
      collection: 'schoolRecord',
    },
    ambassador: {
      email: 'email',
      name: 'name',
      collection: 'users',
    }
  };

  public results$: Observable<any[]> = of([]);

  public userList: any = [];

  public capacity: any = 0;

  /** Subscripción de eventos */
  private sub$!: Subscription;

  constructor(
    private spinner: NgxSpinnerService,
    private bsModalSrv: BsModalService,
    private router: Router,
    private fb: FormBuilder,
    private userSrv: UserService,
    private schoolSrv: SchoolService,
    private sweetAlert2Srv: Sweetalert2Service,
    private authSrv: AuthenticationService,
  ) {
    this.form = this.fb.group({
      filterField: 'email',
      value: ['']
    });
  }

  ngOnInit(): void {
    this.form.get('value')
      ?.valueChanges
      .pipe(
        debounceTime(500),
        /// only email format with regex
        map((value: string) => (value.length > 0) ? value.trim().toLocaleLowerCase() : ''),
        map((value: string) => value.replace(/[^a-zA-Z0-9@.]/g, '')),
        distinctUntilChanged(),
      )
      .subscribe((value: string) => {
        console.log('value', value);

        if (value.length === 0) {
          this.results$ = of([]);
          return;
        }


        console.log('this.ownerType', this.ownerType);

        /** Obtener definición de colección  */
        const cd = this.filters[this.ownerType];
        console.log('collectionDefinition', cd);

        const cf = cd[this.form.get('filterField')?.value];
        console.log('collectionField', cf);


        if (this.ownerType === 'ambassador') {
          this.results$ = this.userSrv.getDynamic([
            { field: cf, condition: '>=', value: value },
            { field: cf, condition: '<=', value: value + '\uf8ff' },
          ], {
            idField: '_id',
            orderBy: [{ field: cf, order: 'asc' }],
          });
          return;
        }

      });
  }

  ngOnChanges(changes: SimpleChanges): void {
    const { ownerType } = changes;
    if (ownerType && ownerType.currentValue) {
      this.ownerType = ownerType.currentValue;
    }
  }

  ngAfterViewInit(): void {
    this.buildModal();
  }

  ngOnDestroy(): void { this.sub$.unsubscribe(); }

  buildModal() {
    this.mi = this.bsModalSrv.buildModal(this._id);

    this.sub$ = this.router.events.subscribe((event) => {

      /** Si la modal esta desplegada al cambiar de ruta */
      if (this.mi._isShown) { this.closeModal(); }

    });
  }

  /**
   * @dev Mostrar modal
   * @param item            Documento de categoría
   */
  async showModal(item: any) {
    const { division, divisionSetting, capacity } = item;
    console.log('showModal', item);
    console.log('this.capacity', this.capacity);

    this.itemData = division;
    this.capacity = this.itemData.capacity || capacity || 1
    this.divisionSetting = divisionSetting;

    this.mi.show();
  }


  /**
   * @dev Al seleccionar usuario de la lista de busqueda
   * @param item                      Documento del usuario
   * @returns 
   */
  async onSelectItem(item: any) {
    try {

      // Alcanzó la capacidad máxima
      if (this.capacity == this.userList.length) {
        this.sweetAlert2Srv.showError('The number of users does not match the capacity of the event');
        return;
      }

      await this.spinner.show();

      console.log('item', item);


      /**
       * TODO: no eliminar esta linea. hay profile que no tiene uid y hay que sacarlo del _id
       */
      item.uid = item._id || item.uid;

      /** Obtener documento de perfil de usuario  */
      const profile = await this.authSrv.getProfileToPromise(item.uid);
      console.log('profile', profile);

      // No tiene perfil completo
      // if(!profile) {
      //   this.sweetAlert2Srv.showError('The user does not complete the profile');
      //   return;
      // }

      /**
       * Ejecutar regla de la edad
       */

      // const age = moment().diff(profile.birthdate || 0, 'years');
      // const minAge = this.divisionSetting.edad_min;
      // const maxAge = this.divisionSetting.edad_max;

      // Válidar que la edad se encuentre dentro del rango
      // if (age < minAge || age > maxAge) {
      //   this.sweetAlert2Srv.showError(`The user's age does not match the division`);
      //   return;
      // }

      /**
       * Ejecutar regla de genero
       */
      // Glosario de generos
      const genderGlossary = {
        mixto: ['male', 'female'],
        femenino: ['female'],
        masculino: ['male']
      };

      const genderRule: any[] = genderGlossary[this.divisionSetting.gender];
      console.log('genderRule', genderRule);

      // Válidar que el genero se encuentre dentro del rango
      // if(!genderRule.includes(profile.gender)){
      //   this.sweetAlert2Srv.showError(`The user gender does not match the division`);
      //   return;
      // }

      // const uid: any = item.uid || item._id

      this.userList.push(item);

      this.results$ = of([]);

      this.sweetAlert2Srv.showToast('User added');
      return;

    } catch (err) {
      console.log('err', err);
      this.sweetAlert2Srv.showToast("Error");
      return;

    } finally {
      this.spinner.hide();
    }
  }

  /// Seleccionar un item de la lista
  saveUser() {
    try {
      if (this.capacity != this.userList.length) {
        this.sweetAlert2Srv.showError('The number of users does not match the capacity of the event');
        return;
      }

      this.closeModal({ status: true, data: this.userList });
      this.sweetAlert2Srv.showToast('Users added');

      this.results$ = of([]);
      return;

    } catch (err) {
      console.log('err', err);
      this.sweetAlert2Srv.showError(err);
      return;
    }
  }

  /// Seleccionar un item de la lista
  removeUser(index: any) {
    try {
      this.userList.splice(index, 1);

      this.sweetAlert2Srv.showSuccess('User removed');
    } catch (err) {
      console.log('err', err);
    }
  }

  /**
   * @dev Cerrar modal 
   * @param params 
   */
  async closeModal(params: any = {}) {
    const { status = false, data = null } = params;
    this.onCloseModal.next({ status, data });
    this.form.patchValue({ value: '' });
    this.results$ = of([]);
    this.userList = [];
    this.capacity = 0;
    this.divisionSetting = null;
    this.mi.hide();
  }

  async onSelectPhotoFile(event: any, index: any) {
    console.log('onSelectPhotoFile', event, index);
    const file = (event) ? event : '';
    this.userList[index].photo = file;

    console.log('file', this.userList[index]);
  }

}
