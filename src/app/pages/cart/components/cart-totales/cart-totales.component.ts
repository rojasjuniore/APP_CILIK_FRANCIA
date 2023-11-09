import { Component, Input, OnChanges, OnInit, Output, SimpleChanges } from '@angular/core';
import { TranslatePipe } from '@ngx-translate/core';
import { NgxSpinnerService } from 'ngx-spinner';
import { Subject } from 'rxjs';
import { CartTotalService } from 'src/app/services/cart-total.service';
import { CartService } from 'src/app/services/cart.service';
import { CommonService } from 'src/app/services/common.service';
import { Sweetalert2Service } from 'src/app/services/sweetalert2.service';
import { environment } from 'src/environments/environment';

@Component({
  selector: 'app-cart-totales',
  templateUrl: './cart-totales.component.html',
  styleUrls: ['./cart-totales.component.css']
})
export class CartTotalesComponent implements OnInit, OnChanges {

  @Input() cart: any;
  @Input() couponObj: any;
  @Output() onCartTotal = new Subject<any>();

  couponSrv: any;
  globalTotal: any = {
    globalDiscount: 0,
    globalSubtotal: 0,
    globalTotalToPay: 0,
  }

  constructor(
    private cartTotalSrv: CartTotalService
  ) { }

  ngOnInit(): void {
  }


  ngOnChanges(changes: SimpleChanges): void {
    const { cart, couponObj } = changes;
    // console.log('cart', cart);
    // console.log('couponObj', couponObj);

    // @dev
    let groupedData: any;
    let updatedGroupedData: any
    if ((cart && cart.currentValue) || this.cart && couponObj.currentValue) {

      /// @dec code coupon
      const couponSrv = couponObj.currentValue.coupons;
      /// @dev cart data
      // console.log('cart.currentValue', cart);
      const __cart = cart ? cart.currentValue : this.cart
      // console.log('__cart', __cart);
      groupedData = this.cartTotalSrv.groupByAndCalculateTotals(__cart.product, 'key');
      updatedGroupedData = this.cartTotalSrv.applyDiscounts(groupedData, couponSrv);
      this.globalTotal = this.cartTotalSrv.calculateGlobalTotals(updatedGroupedData, couponSrv);

    } else if (!cart) {
      const couponSrv = [];
      groupedData = this.cartTotalSrv.groupByAndCalculateTotals(this.cart.product, 'key');
      updatedGroupedData = this.cartTotalSrv.applyDiscounts(groupedData, couponSrv);
      this.globalTotal = this.cartTotalSrv.calculateGlobalTotals(updatedGroupedData, couponSrv);
    }


    const obj = {
      globalTotal: this.globalTotal,
      updatedGroupedData: updatedGroupedData
    }

    console.log('obj', obj);

    /// @dev send data to parent
    this.onCartTotal.next(obj);


    /// @dev save in localstorage
    this.cartTotalSrv.setItem(obj);

    // console.log('groupedData', groupedData);
    // console.log('updatedGroupedData', updatedGroupedData);
    // console.log('this.globalTotal', this.globalTotal);
  }





  // get coupons() {
  //   if (!this.cart) return [];
  //   return this.cart.coupons || [];
  // }

  // get subTotal() {
  //   if (!this.cart) return 0;
  //   const total = this.cart.product.map((item: any) => item.totales)
  //     .reduce((prev: any, next: any) => prev + next, 0);
  //   return total;
  // }

  // get hastCoupons() {
  //   if (!this.cart) return false;
  //   return this.cart.coupons && this.cart.coupons.length > 0;
  // }

  // get discount() {
  //   if (!this.cart) return 0;

  //   const coupons = this.coupons;
  //   const total = coupons.map((item: any) => (item.type === 'percent') ? this.subTotal * (item.value / 100) : item.value)
  //     .reduce((prev: any, next: any) => Number(prev) + Number(next), 0);
  //   return total;
  // }

  // get totales() {
  //   return this.subTotal - this.discount;
  // }

  // async removeCoupon(coupon: any) {
  //   try {
  //     await this.spinner.show();

  //     await this.cartSrv.removeOnCart(environment.dataEvent.keyDb, this.cart.uid, coupon, 'coupons');

  //     this.sweetAlert2Srv.showToast(
  //       this.translatePipe.transform('alert.couponRemoved'),
  //       'success'
  //     );
  //     return;

  //   } catch (err) {
  //     console.log('Error on CartTotalesComponent.removeCoupon', err);
  //     return;
  //   } finally {
  //     this.spinner.hide();
  //   }
  // }

}
