import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { PreSaleService } from 'src/app/services/pre-sale.service';
import { Sweetalert2Service } from 'src/app/services/sweetalert2.service';

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
  ) { 
    this.form = this.fb.group({
      coupon: ['', Validators.required],
    });
  }

  ngOnInit(): void {
  }

  get f() { return this.form.controls; }

  async onSubmit(){
    this.submit = true;
    
    if(this.form.invalid){ return; }

    const ask = await this.sweetAlert2Srv.askConfirm('¿Estás seguro de agregar este cupón?');
    if(!ask){ return; }

    const formData = this.form.value;
    console.log('formData', formData);
  }

}
