import { Component, Input, OnChanges, OnInit, SimpleChanges } from '@angular/core';
import { TranslatePipe } from '@ngx-translate/core';
import { NgxSpinnerService } from 'ngx-spinner';
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

  couponSrv: any;
  globalTotal = {
    globalDiscount: 0,
    globalSubtotal: 0,
    globalTotalToPay: 0
  }

  constructor(
    private cartSrv: CartService,
    private spinner: NgxSpinnerService,
    private sweetAlert2Srv: Sweetalert2Service,
    private translatePipe: TranslatePipe,
    private commonSrv: CommonService
  ) { }

  ngOnInit(): void {
  }


  ngOnChanges(changes: SimpleChanges): void {
    const { cart, couponObj } = changes;
    // @dev
    if (cart && cart.currentValue) {

      const couponSrv = couponObj.currentValue.coupons || [];
      this.cart = cart.currentValue;

      const groupedData = this.groupByAndCalculateTotals(this.cart.product, 'key');
      const updatedGroupedData = this.applyDiscounts(groupedData, couponSrv);
      this.globalTotal = this.calculateGlobalTotals(updatedGroupedData);

      // console.log('groupedData', groupedData);
      // console.log('updatedGroupedData', updatedGroupedData);
      // console.log('updatedGroupedData', this.globalTotal);
      // console.log('this.couponSrv', this.couponSrv);
      // console.log('this.cart', this.cart);
    }

    // else if (cart && cart.currentValue) {
    //   // console.log('CartTotalesComponent', cart.currentValue);
    //   this.cart = cart.currentValue;
    // }
  }


  /**
   * @dev group by
   * @param data 
   * @param key 
   * @returns 
   */
  groupByAndCalculateTotals(data, key) {
    const grouped = this.commonSrv.groupBy(data, key);

    for (let groupKey in grouped) {
      grouped[groupKey].name = groupKey;
      grouped[groupKey].total = grouped[groupKey].reduce((sum, item) => sum + item.totales, 0);
    }

    return grouped;
  }

  /**
   * @dev apply discounts
   * @param groupedData 
   * @param discounts 
   * @returns 
   */
  applyDiscounts(groupedData, discounts) {
    for (let key in groupedData) {
      // Establecer valores predeterminados
      groupedData[key].subtotal = groupedData[key].total;
      groupedData[key].totalDiscount = 0;
      groupedData[key].totalToPay = groupedData[key].subtotal;
    }

    // Si discounts es null, simplemente regresa groupedData con los valores predeterminados establecidos
    if (!discounts) return groupedData;

    for (let discount of discounts) {
      if (discount.concept && groupedData[discount.concept]) {
        let discountAmount = 0;

        if (discount.type === "percentage") {
          discountAmount = groupedData[discount.concept].total * (discount.value / 100);
        } else if (discount.type === "amount") {
          discountAmount = discount.value;
        }

        groupedData[discount.concept].totalDiscount = discountAmount;
        groupedData[discount.concept].totalToPay = groupedData[discount.concept].subtotal - discountAmount;
      }
    }
    return groupedData;
  }





  calculateGlobalTotals(groupedData) {
    let globalSubtotal = 0;
    let globalDiscount = 0;
    let globalTotalToPay = 0;

    for (let key in groupedData) {
      globalSubtotal += groupedData[key].subtotal;
      globalDiscount += groupedData[key].totalDiscount;
      globalTotalToPay += groupedData[key].totalToPay;
    }

    return {
      globalSubtotal,
      globalDiscount,
      globalTotalToPay
    };
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
