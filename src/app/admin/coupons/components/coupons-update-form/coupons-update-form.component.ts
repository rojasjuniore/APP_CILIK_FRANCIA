import { Component, OnDestroy, OnInit } from '@angular/core';
import { FormArray, FormBuilder, FormGroup, Validators } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import moment from 'moment';
import { NgxSpinnerService } from 'ngx-spinner';
import { Subscription, catchError, map, of, switchMap } from 'rxjs';
import { AuthenticationService } from 'src/app/services/authentication.service';
import { CouponService } from 'src/app/services/coupon.service';
import { Sweetalert2Service } from 'src/app/services/sweetalert2.service';
import { environment } from 'src/environments/environment';

@Component({
  selector: 'app-coupons-update-form',
  templateUrl: './coupons-update-form.component.html',
  styleUrls: ['./coupons-update-form.component.css']
})
export class CouponsUpdateFormComponent implements OnInit, OnDestroy {

  public couponId!: string;
  public couponDoc: any;

  public form: FormGroup;
  public vm = {
    value: [
      { type: 'required', message: 'is required' },
      { type: 'min', message: 'min value is 0' },
      { type: 'max', message: 'max value is 100' },
      { type: 'pattern', message: 'only integer values' },
    ],
  };
  public submitted = false;

  public couponTypes = [
    { label: 'Percentage', value: 'percentage' },
    { label: 'Amount', value: 'amount' },
  ];


  public listConcept = [
    {
      slug: "discount",
      value: 0,
      label: 'Descuento',
    },
    {
      slug: 'fullPass',
      value: 6,
      label: 'Compras de Full pass',
    },
    {
      slug: 'categoryPass',
      value: 7,
      label: 'Compras de Categorias',
    },
    {
      slug: 'weekendPass',
      value: 8,
      label: 'Compras de week pass',
    },
    {
      value: 0,
      slug: 'hotelAndEvent',
      label: 'Compras de Hotel',
    },
    {
      value: 1,
      slug: 'compras-de-merchandising',
      label: 'Compras de Merchandising',
    },
    {
      value: 2,
      slug: 'fotografia-y-video',
      label: 'Fotografía y Video',
    },
    {
      value: 4,
      slug: 'programa-bootcamp-talleres-internacionales',
      label: 'Programa bootcamp/Talleres Internacionales',
    },
    {
      value: 5,
      slug: 'planes-turisticos-cartagena',
      label: 'Planes Turísticos Cartagena',
    },

  ]

  private valueRules = {
    percentage: [Validators.required, Validators.min(0), Validators.max(100)],
    amount: [
      Validators.required,
      Validators.pattern(/^-?(0|[1-9]\d*)?$/),
      Validators.min(0),
    ]
  };

  private sub$!: Subscription;
  user: any;
  userCoupon: any;

  constructor(
    private fb: FormBuilder,
    private couponSrv: CouponService,
    private spinner: NgxSpinnerService,
    private authSrv: AuthenticationService,
    private sweetAlert2Srv: Sweetalert2Service,
    private router: Router,
    private route: ActivatedRoute,
  ) {
    this.form = this.fb.group({
      ownerId: '',
      ownerType: '',
      status: true,
      userLimit: 0,
      items: this.fb.array([]),
    });

    const couponId = this.route.snapshot.paramMap.get('id');
    // console.log('couponId', couponId);
    this.couponId = couponId || '';
  }

  ngOnInit(): void {
    console.log('this.couponId', this.couponId);

    this.sub$ = this.authSrv.uid$
      .pipe(
        switchMap((uid) => this.couponSrv.getByEventAndId(environment.dataEvent.keyDb, this.couponId)),
        map((doc) => {
          return (doc) ? { exist: true, ...doc } : { exist: false };
        }),
        catchError((err) => of({ exist: false }))
      )
      .subscribe((coupon: any) => {
        console.log('coupon', coupon);
        this.couponDoc = coupon;

        if (this.couponDoc.exist) {
          /** Actualizar valores del formulario */
          this.form.patchValue({
            ownerId: this.couponDoc.ownerId,
            status: this.couponDoc.status,
            ownerType: this.couponDoc.ownerType,
            userLimit: this.couponDoc.userLimit,
          });

          this.initializeForm(coupon.coupons)


          this.getProfile(this.couponDoc.ownerId);
          /** Establecer reglas al campo según tipo de campo */
          // this.form.get('value')?.setValidators(this.valueRules[this.couponDoc.type]);
        }

      });
  }

  async getProfile(uid){
    const userDoc = await this.authSrv.getByUIDPromise(uid);
    this.userCoupon = userDoc;
    console.log('userDoc', userDoc);
  }

  initializeForm(dataArray) {
    for (let item of dataArray) { // dataArray es el array que has proporcionado
      this.items.push(this.fb.group({
        type: [item.type, [Validators.required]],
        concept: [item.concept, [Validators.required]],
        value: [item.value, [Validators.required]],
      }));
    }
  }

  get items(): FormArray {
    return this.form.get('items') as FormArray;
  }

  get f() { return this.form.controls; }




  addItem(): void {
    this.items.push(this.createItem());
  }

  removeItem(index: number): void {
    this.items.removeAt(index);
  }



  createItem(): FormGroup {
    return this.fb.group({
      type: ['amount', [Validators.required]],
      value: ['', [Validators.required]],
      concept: ['', [Validators.required]],
    });
  }

  async onSubmit() {
    try {
      this.submitted = true;

      console.log('this.form', this.form);
      if (!this.form.valid) {
        return;
      }

      const ask = await this.sweetAlert2Srv.askConfirm(`Are you sure to update this coupon?`);
      if (!ask) { return; }

      await this.spinner.show();

      const formData = this.form.value;
      const uid = await this.authSrv.getUIDPromise();

      const data = {
        status: formData.status === 'false' ? false : true,
        updatedAt: moment().valueOf(),
        updatedBy: uid,
        userLimit: formData.userLimil,
        coupons: formData.items,
      };
      console.log('Try to update coupon', data);

      await this.couponSrv.update(environment.dataEvent.keyDb, this.couponId, data);

      this.sweetAlert2Srv.showToast('Coupon updated successfully');
      this.router.navigate(['/admin/coupons']);
      return;

    } catch (err) {
      console.log('Error on CouponsUpdateFormComponent.onSubmit', err);
      return;
    } finally {
      this.spinner.hide();
    }
  }

  ngOnDestroy(): void {
    this.sub$.unsubscribe();
  }

}
