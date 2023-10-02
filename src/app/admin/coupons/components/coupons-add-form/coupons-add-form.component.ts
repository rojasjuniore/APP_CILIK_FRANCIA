import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import moment from 'moment';
import { NgxSpinnerService } from 'ngx-spinner';
import { slugify } from 'src/app/helpers/slugify';
import { AuthenticationService } from 'src/app/services/authentication.service';
import { CouponService, checkCouponCodeExist } from 'src/app/services/coupon.service';
import { Sweetalert2Service } from 'src/app/services/sweetalert2.service';
import { environment } from 'src/environments/environment';

@Component({
  selector: 'app-coupons-add-form',
  templateUrl: './coupons-add-form.component.html',
  styleUrls: ['./coupons-add-form.component.css']
})
export class CouponsAddFormComponent implements OnInit {

  public form: FormGroup;
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
    value: [
      { type: 'required', message: 'is required' },
      { type: 'min', message: 'min value is 1' },
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


  private valueRules = {
    percentage: [Validators.required, Validators.min(1), Validators.max(100)],
    amount: [
      Validators.required,
      Validators.pattern(/^-?(0|[1-9]\d*)?$/),
      Validators.min(1),
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
      ownerId: ['rs6ohZKMuEOTDg9Alh1YFCTiYz42', [Validators.required]],
      type: ['amount', [Validators.required]],
      value: ['', this.valueRules.amount],
    });
  }

  ngOnInit(): void {
    this.form.get('type')?.valueChanges.subscribe((value) => {
      this.form.patchValue({ value: 0 });

      if(value === 'percentage') {
        this.form.get('value')?.setValidators(this.valueRules.percentage);
      } else {
        this.form.get('value')?.setValidators(this.valueRules.amount);
      }

      this.form.get('value')?.updateValueAndValidity();
    });
  }

  get f() { return this.form.controls; }

  async onSubmit() {
    try {
      this.submitted = true;

      if(!this.form.valid) {
        this.form.markAllAsTouched();
        return;
      }

      const ask = await this.sweetAlert2Srv.askConfirm(`Are you sure to create this coupon?`);
      if(!ask) { return; }

      await this.spinner.show();

      const formData = this.form.value;
      const uid = await this.authSrv.getUIDPromise();

      const data = {
        code: `${formData.code}`.trim().toLowerCase(),
        slug: slugify(`${formData.code}`.trim().toLowerCase()),
        ownerType: formData.ownerType,
        ownerId: formData.ownerId,
        type: formData.type,
        value: formData.value,
        status: true, 
        createdAt: moment().valueOf(),
        createdBy: uid,
      }
      // console.log('formData', data);

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
