import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { NgxSpinnerService } from 'ngx-spinner';
import { CouponService } from 'src/app/services/coupon.service';
import { checkCouponCodeExist } from 'src/app/services/coupons.service';

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
  ) {
    this.form = this.fb.group({
      code: [
        '',
        [Validators.required]
      ],
      ownerType: ['', [Validators.required]],
      ownerId: ['', [Validators.required]],
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

      const formData = this.form.value;
      console.log('formData', formData);
      return;
      
    } catch (err) {
      console.log('Error on CouponsAddFormComponent.onSubmit', err);
      return;
    } finally {
      this.spinner.hide();
    }
  }

}
