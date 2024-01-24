import { Component, Input, OnInit, Output, SimpleChanges } from '@angular/core';
import { FormGroup, FormBuilder } from '@angular/forms';
import { Router } from '@angular/router';
import { NgxSpinnerService } from 'ngx-spinner';
import { Subject, Observable, of, Subscription, debounceTime, map, distinctUntilChanged, finalize } from 'rxjs';
import { BsModalService } from 'src/app/services/bs-modal.service';
import { SchoolService } from 'src/app/services/school.service';
import { Sweetalert2Service } from 'src/app/services/sweetalert2.service';
import { UserService } from 'src/app/services/user/user.service';

@Component({
  selector: 'app-modal-merchant-add-user',
  templateUrl: './modal-merchant-add-user.component.html',
  styleUrls: ['./modal-merchant-add-user.component.css']
})
export class ModalMerchantAddUserComponent implements OnInit {

  @Output() onCloseModal = new Subject<any>();

  @Input() _id: string = 'modalMerchantAddUser';

  @Input() ownerType!: string;

  @Input() itemData!: any;

  public mi: any;
  public form: FormGroup;

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

  private sub$!: Subscription;
  public userList: any = [];
  capacity: any = 0;

  constructor(
    private spinner: NgxSpinnerService,
    private bsModalSrv: BsModalService,
    private router: Router,
    private fb: FormBuilder,
    private userSrv: UserService,
    private schoolSrv: SchoolService,
    private sweetAlert2Srv: Sweetalert2Service,
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

        if (this.ownerType === 'academy') {
          this.results$ = this.schoolSrv.getDynamic([], {
            orderBy: [{ field: cf }],
            startAt: value,
            endAt: value + '\uf8ff',
          });
          return;
        }

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

  buildModal() {
    this.mi = this.bsModalSrv.buildModal(this._id);

    this.sub$ = this.router.events.subscribe((event) => {

      /** Si la modal esta desplegada al cambiar de ruta */
      if (this.mi._isShown) { this.closeModal(); }

    });
  }

  async showModal(item: any) {
    this.itemData = item;
    this.capacity = 0;
    if (this.itemData.key == 'hotel-event') {
      this.capacity = this.itemData.room.capacity;
    } else {
      this.capacity = this.itemData.capacity;
    }
    console.log('showModal', this.itemData);
    this.mi.show();
  }


  /// Seleccionar un item de la lista
  async onSelectItem(item: any) {

    try {

      if (this.capacity == this.userList.length) {
        return this.sweetAlert2Srv.showError('The number of users does not match the capacity of the event');
      }

      await this.spinner.show();


      const uid: any = item.uid || item._id

      this.userList.push(uid);


      return this.sweetAlert2Srv.showSuccess('User added');
    } catch (err) {
      console.log('err', err);
      this.sweetAlert2Srv.showError(err);
    } finally {
      this.spinner.hide();
    }

  }

  /// Seleccionar un item de la lista
  saveUser() {
    try {

      this.spinner.show();

      if (!this.capacity > this.userList.length) {
        return this.sweetAlert2Srv.showError('The number of users does not match the capacity of the event');
      }


      this.itemData.users = this.userList;

      this.closeModal({ status: true, data: this.itemData });
      this.sweetAlert2Srv.showSuccess('Users added');
      return
    } catch (err) {
      console.log('err', err);
      return this.sweetAlert2Srv.showError(err);
    } finally {
      this.spinner.hide();
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

  async closeModal(params: any = {}) {
    const {
      status = false,
      data = null,
    } = params;

    this.onCloseModal.next({
      status,
      data,
    });

    this.form.patchValue({ value: '' });
    this.results$ = of([]);
    this.userList = [];
    this.mi.hide();
  }

  ngOnDestroy(): void { this.sub$.unsubscribe(); }

}
