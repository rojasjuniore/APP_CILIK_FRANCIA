import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import moment from 'moment';
import { NgxSpinnerService } from 'ngx-spinner';
import { slugify } from 'src/app/helpers/slugify';
import { BsModalService } from 'src/app/services/bs-modal.service';
import { checkCouponCodeExist, CouponsService } from 'src/app/services/coupons.service';
import { Sweetalert2Service } from 'src/app/services/sweetalert2.service';

@Component({
  selector: 'app-add-coupon-modal',
  templateUrl: './add-coupon-modal.component.html',
  styleUrls: ['./add-coupon-modal.component.css']
})
export class AddCouponModalComponent implements OnInit {

  private mi: any;
  public form!: FormGroup;
  public vm = {
    code: [
      { type: 'required', message: 'formValidations.required' },
      { type: 'codeStored', message: 'Code already stored' },
    ],
    discount: [
      { type: 'required', message: 'formValidations.required' },
    ],
    type: [
      { type: 'required', message: 'formValidations.required' },
    ],
  };
  public submit = false;

  constructor(
    private bsModalSrv: BsModalService,
    private fb: FormBuilder,
    private sweetAlert2Srv: Sweetalert2Service,
    private couponSrv: CouponsService,
    private spinner: NgxSpinnerService,
  ) {
    this.buildForm();
  }

  ngOnInit(): void {
    this.buildModal();
  }

  async buildModal(){
    this.mi = await this.bsModalSrv.buildModal('modalAddCoupon');
  }

  buildForm(){
    this.form = this.fb.group({
      code: ["", [Validators.required], [checkCouponCodeExist(this.couponSrv)]],
      discount: ["", [Validators.required]],
      type: ["amount", [Validators.required]],
      createdAt: [""],
      expiredAt: [""],
      nroUsed: [0],

    });
  }

  get f(){ return this.form.controls; }

  async show(){
    this.mi.show();
  }

  async hide(){
    this.form.reset();
    this.form.patchValue({type: "amount", nroUsed: 0});
    this.submit = false;
    this.mi.hide();
  }

  async onSubmit(){
    this.submit = true;

    if(this.form.invalid){ return; }

    const ask = await this.sweetAlert2Srv.askConfirm("¿Estás seguro de agregar este cupón?");
    if(!ask) return;

    try {
      const formData = this.form.value;
      const code = slugify(formData.code);

      await this.spinner.show();

      await this.couponSrv.store(code, {
        ...formData, code, createdAt: moment().valueOf()
      });

      this.sweetAlert2Srv.showSuccess("Cupón agregado correctamente");
      this.hide();

      return;
      
    } catch (err) {
      console.log('Error on AddCouponModalComponent.onSubmit(): ', err);
      return;

    }finally{
      this.spinner.hide();
    }
  }

}
