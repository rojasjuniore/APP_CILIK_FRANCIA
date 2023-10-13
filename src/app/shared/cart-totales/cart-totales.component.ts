import { Component, Input, OnChanges, OnInit, SimpleChanges } from '@angular/core';
import { TranslatePipe } from '@ngx-translate/core';
import { NgxSpinnerService } from 'ngx-spinner';
import { CartService } from 'src/app/services/cart.service';
import { Sweetalert2Service } from 'src/app/services/sweetalert2.service';
import { environment } from 'src/environments/environment';

@Component({
  selector: 'app-cart-totales',
  templateUrl: './cart-totales.component.html',
  styleUrls: ['./cart-totales.component.css']
})
export class CartTotalesComponent implements OnInit, OnChanges {

  @Input() cart: any;

  constructor(
    private cartSrv: CartService,
    private spinner: NgxSpinnerService,
    private sweetAlert2Srv: Sweetalert2Service,
    private translatePipe: TranslatePipe
  ) { }

  ngOnInit(): void {
  }

  ngOnChanges(changes: SimpleChanges): void {
    const { cart } = changes;

    if (cart && cart.currentValue) {
      // console.log('CartTotalesComponent', cart.currentValue);
      this.cart = cart.currentValue;
    }
  }

  get coupons() {
    if(!this.cart) return [];
    return this.cart.coupons || [];
  }

  get subTotal(){
    if(!this.cart) return 0;
    const total = this.cart.product.map((item: any) => item.totales)
    .reduce((prev: any, next: any) => prev + next, 0);
    return total;
  }

  get hastCoupons() {
    if(!this.cart) return false;
    return this.cart.coupons && this.cart.coupons.length > 0;
  }

  get discount() {
    if(!this.cart) return 0;

    const coupons = this.coupons;
    const total = coupons.map((item: any) => (item.type === 'percent') ? this.subTotal * (item.value / 100) : item.value)
    .reduce((prev: any, next: any) => Number(prev) + Number(next), 0);
    return total;
  }

  get totales(){
    return this.subTotal - this.discount;
  }

  async removeCoupon(coupon: any) {
    try {
      await this.spinner.show();

      await this.cartSrv.removeOnCart(environment.dataEvent.keyDb, this.cart.uid, coupon, 'coupons');

      this.sweetAlert2Srv.showToast(
        this.translatePipe.transform('alert.couponRemoved'),
        'success'
      );
      return;
      
    } catch (err) {
      console.log('Error on CartTotalesComponent.removeCoupon', err);
      return;
    } finally {
      this.spinner.hide();
    }
  }

}
