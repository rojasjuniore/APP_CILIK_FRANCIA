import { Component, Input, OnChanges, OnInit, SimpleChanges } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { CartService } from 'src/app/services/cart.service';
import { CouponService, checkAvailableCouponCodeExist } from 'src/app/services/coupon.service';
import { Sweetalert2Service } from 'src/app/services/sweetalert2.service';

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
      { type: 'availableCouponCode', message: 'invalid coupon code' }
    ]
  };
  public submitted = false;

  constructor(
    private fb: FormBuilder,
    private couponSrv: CouponService,
    private cartSrv: CartService,
    private sweetAlert2Srv: Sweetalert2Service,
  ) {
    this.form = this.fb.group({
      code: [
        '', 
        [
          Validators.required,
          Validators.pattern('^[a-zA-Z0-9]*$')
        ],
        [
          checkAvailableCouponCodeExist(this.couponSrv)
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
      const couponCode = `${formData.code}`.trim().toUpperCase();
      const slugCouponCode = `${formData.code}`.trim().toLowerCase();
      
      if(!this.form.valid){
        console.log('Form is invalid');
        return;
      }

      /** Cambiar a cargando para bloquear interacción */
      this.showLoadingBtn = true;

      const cartCoupons = this.cart.coupons || [];

      /** Válidar si ya no se aplico al carrito */
      const find = cartCoupons.find((item: any) => item.code === couponCode);
      if(find){
        this.sweetAlert2Srv.showInfo('Coupon already applied');
        this.form.patchValue({code: ''});
        this.submitted = false;
        return;
      }

      console.log('cart', this.cart);
      console.log('Form is valid', formData);

      /** Obtener documento del cupon */
      const couponDoc = await this.couponSrv.getByEventAndIdPromise(this.cart.eventId, slugCouponCode);
      console.log('couponDoc', couponDoc);


      /** Válidar el tipo de cupon */
      const typeRule = (['academy', 'ambassador'].includes(couponDoc.ownerType))
        ? cartCoupons.some((item: any) => item.ownerType === couponDoc.ownerType)
        : false;
      console.log('typeRule', typeRule);
      if(typeRule){
        this.sweetAlert2Srv.showError('You can only apply one coupon of this type');
        this.form.patchValue({code: ''});
        this.submitted = false;
        return;
      }

      /** Añadir semilla al cupon */
      couponDoc.seed = this.cartSrv.generateId();

      /** Añadir cupon a configuración del carrito */
      await this.cartSrv.addOnCart(this.cart.eventId, this.cart.uid, [couponDoc], 'coupons');

      this.form.patchValue({code: ''});
      this.submitted = false;
      
      this.sweetAlert2Srv.showSuccess('Coupon applied successfully');
      return;
      
    } catch (err) {
      console.log('Error on CartCouponFormComponent.onSubmit', err);
      return;
    } finally {
      this.showLoadingBtn = false;
    }
  }

}
