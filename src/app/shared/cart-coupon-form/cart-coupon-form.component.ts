import { Component, Input, OnChanges, OnInit, SimpleChanges } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';

@Component({
  selector: 'app-cart-coupon-form',
  templateUrl: './cart-coupon-form.component.html',
  styleUrls: ['./cart-coupon-form.component.css']
})
export class CartCouponFormComponent implements OnInit, OnChanges {

  @Input() cart: any = null;
  
  public showLoadingBtn: boolean = true;

  public form: FormGroup;
  public vm = {
    code: [
      { type: 'required', message: 'is required' },
      { type: 'pattern', message: 'only letters and numbers' },
    ]
  };
  public submitted = false;

  constructor(
    private fb: FormBuilder
  ) {
    this.form = this.fb.group({
      code: [
        '', 
        [
          Validators.required,
          Validators.pattern('^[a-zA-Z0-9]*$')
        ]
      ]
    });
  }

  ngOnInit(): void { }

  ngOnChanges(changes: SimpleChanges): void {
    const { cart } = changes;

    if(cart && cart.currentValue){
      this.cart = cart.currentValue;
      this.showLoadingBtn = false;
    }

  }

  get f() { return this.form.controls; }


  async onSubmit(){
    try {
      this.submitted = true;
      
      const formData = this.form.value;
      
      if(!this.form.valid){
        console.log('Form is invalid');
        return;
      }
      
      this.showLoadingBtn = true;

      console.log('Form is valid', formData);
      return;
      
    } catch (err) {
      console.log('Error on CartCouponFormComponent.onSubmit', err);
      return;
    }
  }

}
