import { Component, OnDestroy, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
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
      { type: 'min', message: 'min value is 1' },
      { type: 'max', message: 'max value is 100' },
      { type: 'pattern', message: 'only integer values' },
    ],
  };
  public submitted = false;

  private valueRules = {
    percentage: [Validators.required, Validators.min(1), Validators.max(100)],
    amount: [
      Validators.required,
      Validators.pattern(/^-?(0|[1-9]\d*)?$/),
      Validators.min(1),
    ]
  };

  private sub$!: Subscription;

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
      value: ['', this.valueRules.amount],
      type: '',
      status: true,
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
        return (doc) ? {exist: true, ...doc} : {exist: false};
      }),
      catchError((err) => of({exist: false}))
    )
    .subscribe((coupon) => {
      console.log('coupon', coupon);
      this.couponDoc = coupon;

      if(this.couponDoc.exist){
        /** Actualizar valores del formulario */
        this.form.patchValue({
          ownerId: this.couponDoc.ownerId,
          value: this.couponDoc.value,
          status: this.couponDoc.status,
          type: this.couponDoc.type,
        });

        /** Establecer reglas al campo según tipo de campo */
        this.form.get('value')?.setValidators(this.valueRules[this.couponDoc.type]);
      }

    });
  }

  get f() { return this.form.controls; }

  async onSubmit() {
    try {
      this.submitted = true;

      if(!this.form.valid) {
        return;
      }

      const formData = this.form.value;
      const data = {
        value: formData.value,
        status: formData.status === 'true',
      };
      console.log('Try to update coupon', data);

      const ask = await this.sweetAlert2Srv.askConfirm(`Are you sure to update this coupon?`);
      if(!ask) { return; }


      await this.spinner.show();

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
