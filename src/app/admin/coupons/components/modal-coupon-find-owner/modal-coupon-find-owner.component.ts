import { AfterViewInit, Component, Input, OnChanges, OnInit, Output, SimpleChanges } from '@angular/core';
import { FormBuilder, FormGroup } from '@angular/forms';
import { Router } from '@angular/router';
import { Observable, Subject, Subscription, debounceTime, distinctUntilChanged, map, of } from 'rxjs';
import { BsModalService } from 'src/app/services/bs-modal.service';
import { SchoolService } from 'src/app/services/school/school.service';
import { UserService } from 'src/app/services/user/user.service';

@Component({
  selector: 'app-modal-coupon-find-owner',
  templateUrl: './modal-coupon-find-owner.component.html',
  styleUrls: ['./modal-coupon-find-owner.component.css']
})
export class ModalCouponFindOwnerComponent implements OnInit, OnChanges, AfterViewInit {

  @Output() onCloseModal = new Subject<any>();

  @Input() _id: string = 'modalCouponFindOwner';

  @Input() ownerType!: string;

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

  constructor(
    private bsModalSrv: BsModalService,
    private router: Router,
    private fb: FormBuilder,
    private userSrv: UserService,
    private schoolSrv: SchoolService,
  ) {
    this.form = this.fb.group({
      filterField: 'email',
      value: ['']
    });
  }

  ngOnInit(): void {

    this.form.get('value')?.valueChanges
    .pipe(
      debounceTime(500),
      /// only email format with regex
      map ((value: string) => (value.length > 0) ? value.trim().toLocaleLowerCase() : ''),
      map((value: string) =>  value.replace(/[^a-zA-Z0-9@.]/g, '') ),
      distinctUntilChanged(),
    )
    .subscribe((value: string) => {
      console.log('value', value);

      if(value.length === 0){
        this.results$ = of([]);
        return;
      }


      console.log('this.ownerType', this.ownerType);

      /** Obtener definición de colección  */
      const cd = this.filters[this.ownerType];
      console.log('collectionDefinition', cd);

      const cf = cd[this.form.get('filterField')?.value];
      console.log('collectionField', cf);

      if(this.ownerType === 'academy'){


        
        return;
      }

      if(this.ownerType === 'ambassador'){
        this.results$ = this.userSrv.getDynamic([
          { field: cf, condition: '>=', value: value},
          { field: cf, condition: '<=', value: value + '\uf8ff'},
        ], {
          idField: '_id',
          orderBy: [{field: cf, order: 'asc'}],
        });
        return;
      }

    });
  }

  ngOnChanges(changes: SimpleChanges): void {
    const { ownerType } = changes;

    if(ownerType && ownerType.currentValue){
      this.ownerType = ownerType.currentValue;
    }
  }

  ngAfterViewInit(): void {
    this.buildModal();
  }

  buildModal(){
    this.mi = this.bsModalSrv.buildModal(this._id);

    this.sub$ = this.router.events.subscribe((event) => {

      /** Si la modal esta desplegada al cambiar de ruta */
      if(this.mi._isShown){ this.closeModal(); }

    });
  }

  async showModal(item: any){
    // this.item = item;
    this.mi.show();
  }


  onSelectItem(item: any){
    console.log('onSelectItem', item);
    this.closeModal({status: true, data: item});
  }

  async closeModal(params: any = {}){
    const {
      status = false,
      data = null,
    } = params;

    this.onCloseModal.next({
      status,
      data,
    });

    this.form.patchValue({value: ''});
    this.results$ = of([]);
    this.mi.hide();
  }

  ngOnDestroy(): void { this.sub$.unsubscribe(); }

}
