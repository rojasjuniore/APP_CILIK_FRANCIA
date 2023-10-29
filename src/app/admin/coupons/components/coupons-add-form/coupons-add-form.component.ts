import { Component, OnInit, ViewChild } from '@angular/core';
import { FormArray, FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import moment from 'moment';
import { NgxSpinnerService } from 'ngx-spinner';
import { slugify } from 'src/app/helpers/slugify';
import { AuthenticationService } from 'src/app/services/authentication.service';
import { CouponService, checkCouponCodeExist } from 'src/app/services/coupon.service';
import { Sweetalert2Service } from 'src/app/services/sweetalert2.service';
import { environment } from 'src/environments/environment';
import { ModalCouponFindOwnerComponent } from '../modal-coupon-find-owner/modal-coupon-find-owner.component';

@Component({
  selector: 'app-coupons-add-form',
  templateUrl: './coupons-add-form.component.html',
  styleUrls: ['./coupons-add-form.component.css']
})
export class CouponsAddFormComponent implements OnInit {

  @ViewChild('modalFindOwner') modalFindOwner!: ModalCouponFindOwnerComponent;
  public form!: FormGroup;
  public vm = {
    code: [
      { type: 'required', message: 'is required' },
      { type: 'pattern', message: 'only strings and numbers' },
      { type: 'couponCodeExist', message: 'already exists' },
    ],
    ownerId: [
      { type: 'required', message: 'is required' },
    ],
    ownerType: [
      { type: 'required', message: 'is required' },
    ],
    type: [
      { type: 'required', message: 'is required' },
    ],
    userLimit: [
      { type: 'required', message: 'is required' },
    ],
    value: [
      { type: 'required', message: 'is required' },
      { type: 'min', message: 'min value is 0' },
      { type: 'max', message: 'max value is 100' },
      { type: 'pattern', message: 'only integer values' },
    ],
  };
  public submitted = false;

  public ownerTypes = [
    { label: 'Academy', value: 'academy' },
    { label: 'Ambassador', value: 'ambassador' },
  ];

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



  constructor(
    private fb: FormBuilder,
    private couponSrv: CouponService,
    private spinner: NgxSpinnerService,
    private authSrv: AuthenticationService,
    private sweetAlert2Srv: Sweetalert2Service,
    private router: Router
  ) {
    this.buildForm();
  }



  buildForm() {
    this.form = this.fb.group({
      code: [
        '',
        [
          Validators.required,
          // only strings and numbers
          Validators.pattern(/^[a-zA-Z0-9]*$/)
        ],
        [checkCouponCodeExist(this.couponSrv)]
      ],
      ownerType: ['', [Validators.required]],
      owner: [''],
      ownerId: ['', [Validators.required]],
      userLimit: [100, [Validators.required]],


      items: this.fb.array([
        this.createItem()
      ])
    });
  }


  ngOnInit(): void {
    // this.items.get('type')?.valueChanges.subscribe((value) => {
    //   this.form.patchValue({ value: 0 });

    //   console.log('value', value);
    //   if (value === 'percentage') {
    //     this.items.get('value')?.setValidators(this.valueRules.percentage);
    //   } else {
    //     this.items.get('value')?.setValidators(this.valueRules.amount);
    //   }

    //   this.items.get('value')?.updateValueAndValidity();
    // });

    // this.form.controls.forEach((group: FormGroup, index: number) => {
    //   group.get('type')?.valueChanges.subscribe(value => {
    //     //... your logic here
    //   });
    // });

    // this.items.get('ownerType')?.valueChanges.subscribe((value) => {
    //   this.form.patchValue({ ownerId: '' });
    // });
  }


  get f() { return this.form.controls; }

  get items(): FormArray {
    return this.form.get('items') as FormArray;
  }


  createItem(): FormGroup {
    return this.fb.group({
      type: ['amount', [Validators.required]],
      value: ['', [Validators.required]],
      concept: ['', [Validators.required]],
    });
  }

  addItem(): void {
    this.items.push(this.createItem());
  }

  removeItem(index: number): void {
    this.items.removeAt(index);
  }


  launchFindOwnerModal() {
    this.modalFindOwner.showModal({});
  }


  clearOwnerId() {
    this.form.patchValue({ ownerId: '', owner: '' });
  }

  onSelectOwner(res: any) {
    console.log('res', res);
    const { status, data } = res;

    if (!status) { return; }

    this.form.patchValue({
      owner: data,
      ownerId: data._id,
    });
  }

  async onSubmit() {
    try {
      this.submitted = true;

      console.log('this.form', this.form);
      if (!this.form.valid) {
        this.form.markAllAsTouched();
        return;
      }

      const ask = await this.sweetAlert2Srv.askConfirm(`Are you sure to create this coupon?`);
      if (!ask) { return; }

      await this.spinner.show();

      const formData = this.form.value;
      const uid = await this.authSrv.getUIDPromise();

      const data = {
        code: `${formData.code}`.trim().toLowerCase(),
        slug: slugify(`${formData.code}`.trim().toLowerCase()),
        ownerType: formData.ownerType,
        ownerId: formData.ownerId,
        coupons: formData.items,
        status: true,
        userLimit: formData.userLimit,
        createdAt: moment().valueOf(),
        createdBy: uid,
      }


      console.log('formData', data);

      await this.couponSrv.store(environment.dataEvent.keyDb, data.slug, data);

      this.sweetAlert2Srv.showSuccess('Coupon created successfully');
      this.router.navigate(['/admin/coupons']);
      return;

    } catch (err) {
      console.log('Error on CouponsAddFormComponent.onSubmit', err);
      return;
    } finally {
      this.spinner.hide();
    }
  }

}
