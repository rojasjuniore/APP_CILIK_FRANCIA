import { Component, Input, OnInit, SimpleChanges } from '@angular/core';
import { NgxSpinnerService } from 'ngx-spinner';
import { CartTotalService } from 'src/app/services/cart-total.service';
import { CartService } from 'src/app/services/cart.service';
import { Sweetalert2Service } from 'src/app/services/sweetalert2.service';

@Component({
  selector: 'app-purchase-totales',
  templateUrl: './purchase-totales.component.html',
  styleUrls: ['./purchase-totales.component.css']
})
export class PurchaseTotalesComponent implements OnInit {

  @Input() cart: any;
  globalTotal = {
    globalDiscount: 0,
    globalSubtotal: 0,
    globalTotalToPay: 0
  }
  constructor(
    // private cartSrv: CartService,
    // private spinner: NgxSpinnerService,
    // private sweetAlert2Srv: Sweetalert2Service,
    private cartTotalSrv: CartTotalService,
    // private cartSrv: CartService,
  ) { }

  ngOnInit(): void {
    this.cartTotalSrv.myCartTotal$.subscribe((gTotal: any) => {
      this.globalTotal = gTotal.globalTotal;
      // console.log('this.globalTotal', this.globalTotal);
    });
  }



  ngOnChanges(changes: SimpleChanges): void {
    const { cart } = changes;

    if (cart && cart.currentValue) {
      // console.log('CartTotalesComponent', cart.currentValue);
      this.cart = cart.currentValue;
    }
  }

  // get coupons() {
  //   if(!this.cart) return [];
  //   return this.cart.coupons || [];
  // }

  // get subTotal(){
  //   if(!this.cart) return 0;
  //   const total = this.cart.product.map((item: any) => item.totales)
  //   .reduce((prev: any, next: any) => prev + next, 0);
  //   return total;
  // }

  // get hastCoupons() {
  //   if(!this.cart) return false;
  //   return this.cart.coupons && this.cart.coupons.length > 0;
  // }

  // get discount() {
  //   if(!this.cart) return 0;

  //   const coupons = this.coupons;
  //   const total = coupons.map((item: any) => (item.type === 'percent') ? this.subTotal * (item.value / 100) : item.value)
  //   .reduce((prev: any, next: any) => Number(prev) + Number(next), 0);
  //   return total;
  // }

  // get totales(){
  //   return this.subTotal - this.discount;
  // }

}
