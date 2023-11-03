import { Component, Input, OnChanges, OnInit, Output, SimpleChanges } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { TranslatePipe } from '@ngx-translate/core';
import { Subject } from 'rxjs';
import { CartService } from 'src/app/services/cart.service';
import { CouponService, checkAvailableCouponCodeExist } from 'src/app/services/coupon.service';
import { Sweetalert2Service } from 'src/app/services/sweetalert2.service';
import CryptoJS from 'crypto-js';
import { CodeStorageService } from 'src/app/services/code-storage.service';

@Component({
  selector: 'app-cart-coupon-form',
  templateUrl: './cart-coupon-form.component.html',
  styleUrls: ['./cart-coupon-form.component.css']
})
export class CartCouponFormComponent implements OnInit, OnChanges {

  @Output() onRemoveCupon = new Subject<any>();
  @Output() onSetCupon = new Subject<any>();


  @Input() cart: any = null;
  @Input() couponObj: any;
  public showLoadingBtn: boolean = true;

  public form!: FormGroup;
  public vm = {
    code: [
      { type: 'required', message: 'formValidations.required' },
      { type: 'pattern', message: 'formValidations.onlyNumbersAndLetters' },
      { type: 'availableCouponCode', message: 'formValidations.availableCouponCode' }
    ]
  };
  public submitted = false;
  public isButtonDisabled = false;

  constructor(
    private fb: FormBuilder,
    private couponSrv: CouponService,
    private cartSrv: CartService,
    private sweetAlert2Srv: Sweetalert2Service,
    private codeStorageSrv: CodeStorageService,
    private translatePipe: TranslatePipe
  ) {

    this.buildForm();
  }

  buildForm() {
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


  ngOnChanges(changes: SimpleChanges): void {
    const { cart } = changes;

    if (cart && cart.currentValue) {
      this.cart = cart.currentValue;
      this.showLoadingBtn = false;
    }

    /// @dev check code coupon
    this.couponSrv = changes.couponObj.currentValue
    // console.log('couponObj', this.couponObj);
    if (this.couponObj && this.couponObj.status && this.couponObj.userLimit > 0) {
      this.form.setValue({ code: this.couponObj.slug });
      this.isButtonDisabled = true;
      this.form.get('code')?.disable();
    } else {
      this.isButtonDisabled = false;
      this.form.get('code')?.enable();
      this.form.setValue({ code: '' });
    }
  }

  ngOnInit(): void {
    // if (this.couponObj && this.couponObj.status) {
    //   this.couponSrv = this.couponObj.slug
    //   this.form.setValue({ code: this.couponObj.slug });

    //   this.isButtonDisabled = true;
    //   this.form.get('code')?.disable();

    // }
  }


  async removeCupon() {
    const ask = await this.sweetAlert2Srv.askConfirm("¿Estás seguro de eliminar el cupón?");
    if (!ask) return;

    this.isButtonDisabled = false;
    this.form.get('code')?.enable();

    this.onRemoveCupon.next(null);


    this.codeStorageSrv.removeItem();
  }


  get f() { return this.form.controls; }


  async onSubmit() {
    try {
      this.submitted = true;

      const formData = this.form.value;
      const slugCouponCode = `${formData.code}`.trim().toLowerCase();


      console.log('couponCode', this.form);

      if (!this.form.valid) {
        console.log('Form is invalid');

        return;
      }


      this.codeStorageSrv.setItem(slugCouponCode);

      this.onSetCupon.next(slugCouponCode);

      // /** Cambiar a cargando para bloquear interacción */
      // this.showLoadingBtn = true;

      // const cartCoupons = this.cart.coupons || [];

      // /** Válidar si ya no se aplico al carrito */
      // const find = cartCoupons.find((item: any) => item.code === couponCode);
      // if (find) {
      //   this.sweetAlert2Srv.showInfo(
      //     this.translatePipe.transform('formValidations.couponAlreadyApplied')
      //   );
      //   this.form.patchValue({ code: '' });
      //   this.submitted = false;
      //   return;
      // }

      // // console.log('cart', this.cart);
      // // console.log('Form is valid', formData);

      // /** Obtener documento del cupon */
      // const couponDoc = await this.couponSrv.getByEventAndIdPromise(this.cart.eventId, slugCouponCode);
      // // console.log('couponDoc', couponDoc);

      // /** Válidar el tipo de cupon */
      // const typeRule = (['academy', 'ambassador'].includes(couponDoc.ownerType))
      //   ? cartCoupons.some((item: any) => item.ownerType === couponDoc.ownerType)
      //   : false;
      // // console.log('typeRule', typeRule);
      // if (typeRule) {
      //   this.sweetAlert2Srv.showError(
      //     this.translatePipe.transform('formValidations.couponOnlyOneOfThisType')
      //   );
      //   this.form.patchValue({ code: '' });
      //   this.submitted = false;
      //   return;
      // }

      // /** Añadir semilla al cupon */
      // couponDoc.seed = this.cartSrv.generateId();

      // /** Añadir cupon a configuración del carrito */
      // await this.cartSrv.addOnCart(this.cart.eventId, this.cart.uid, [couponDoc], 'coupons');

      // this.form.patchValue({ code: '' });
      // this.submitted = false;

      this.sweetAlert2Srv.showToast(
        this.translatePipe.transform('alert.couponApplied'),
        'success'
      );
      return;

    } catch (err) {
      console.log('Error on CartCouponFormComponent.onSubmit', err);
      return;
    } finally {
      this.showLoadingBtn = false;
    }
  }

}
