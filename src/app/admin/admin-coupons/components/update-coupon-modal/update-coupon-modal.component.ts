import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { NgxSpinnerService } from 'ngx-spinner';
import { BsModalService } from 'src/app/services/bs-modal.service';
import { CouponsService } from 'src/app/services/coupons.service';
import { Sweetalert2Service } from 'src/app/services/sweetalert2.service';

@Component({
  selector: 'app-update-coupon-modal',
  templateUrl: './update-coupon-modal.component.html',
  styleUrls: ['./update-coupon-modal.component.css']
})
export class UpdateCouponModalComponent implements OnInit {

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
  private couponDoc: any;

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
    this.mi = await this.bsModalSrv.buildModal('modalUpdateCoupon');
  }

  buildForm(){
    this.form = this.fb.group({
      code: ["", [Validators.required]],
      discount: ["", [Validators.required]],
      type: ["amount", [Validators.required]],
      createdAt: [""],
      expiredAt: [""],
      nroUsed: [0],
      status: true,
    });

    this.f.code.disable();
  }

  get f(){ return this.form.controls; }

  async show(doc: any){ 
    this.couponDoc = doc;
    this.form.patchValue(doc);
    this.mi.show(); 
  }

  async hide(){
    this.form.reset();
    this.submit = false;
    this.couponDoc = null;
    this.mi.hide();
  }

  async onSubmit(){
    this.submit = true;

    if(this.form.invalid){ return; }

    const ask = await this.sweetAlert2Srv.askConfirm("¿Estás seguro de actualizar este cupón?");
    if(!ask) return;

    try {
      const formData = this.form.value;

      await this.spinner.show();

      await this.couponSrv.update(this.couponDoc._id, { ...formData });

      this.sweetAlert2Srv.showSuccess("Cupón actualizado correctamente");
      this.hide();

      return;
      
    } catch (err) {
      console.log('Error on UpdateCouponModalComponent.onSubmit(): ', err);
      return;

    }finally{
      this.spinner.hide();
    }
  }

}
