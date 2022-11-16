import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { NgxSpinnerService } from 'ngx-spinner';
import { CouponsService } from 'src/app/services/coupons.service';
import { PreSaleService } from 'src/app/services/pre-sale.service';
import { Sweetalert2Service } from 'src/app/services/sweetalert2.service';
import { pick } from 'underscore';

@Component({
  selector: 'app-pre-sale-coupon-form',
  templateUrl: './pre-sale-coupon-form.component.html',
  styleUrls: ['./pre-sale-coupon-form.component.css']
})
export class PreSaleCouponFormComponent implements OnInit {

  public form!: FormGroup;
  public vm = {
    coupon: [
      { type: 'required', message: 'formValidations.required' },
    ]
  };
  public submit = false;

  constructor(
    public preSaleSrv: PreSaleService,
    private fb: FormBuilder,
    private sweetAlert2Srv: Sweetalert2Service,
    private couponSrv: CouponsService,
    private spinner: NgxSpinnerService,
  ) { 
    this.form = this.fb.group({
      coupon: ['', Validators.required],
    });
  }

  ngOnInit(): void {
  }

  get f() { return this.form.controls; }

  async checkCoupon(){
    const response = { status: false, message: 'Cupón no válido', data: null};

    try {
      const code = this.f.coupon.value;

      await this.spinner.show();
  
      const snapshot = await this.couponSrv.getById(code);
      if(!snapshot){ return response; }
      if(!snapshot.status){ return response; }
  
      return {
        status: true,
        message: 'Cupón válido',
        data: pick(snapshot, ['code', 'discount', 'type', 'status'])
      };
      
    } catch (err) {
      console.log('Error on PreSaleCouponFormComponent.checkCoupon()', err);
      return response;

    }finally{
      await this.spinner.hide();
    }
  }

  async onSubmit(){
    this.submit = true;

    if(this.form.invalid){ return; }

    const checkCoupon = await this.checkCoupon();
    if(!checkCoupon.status){
      this.sweetAlert2Srv.showWarning(checkCoupon.message);
      return;
    }

    const ask = await this.sweetAlert2Srv.askConfirm('¿Estás seguro de agregar este cupón?');
    if(!ask){ return; }

    const formData = this.form.value;
    const { coupons = [] } = this.preSaleSrv.getDocumentLocalStorage();

    if(coupons.some((c: any) => c.code === formData.coupon)){
      this.sweetAlert2Srv.showWarning('Este cupón ya fue agregado');
      return;
    }

    coupons.push(checkCoupon.data);
    this.preSaleSrv.updateDocumentLocalStorage({ coupons });
  }

}
