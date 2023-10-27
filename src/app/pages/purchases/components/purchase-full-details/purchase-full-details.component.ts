import { Component, Input, OnInit } from '@angular/core';

@Component({
  selector: 'app-purchase-full-details',
  templateUrl: './purchase-full-details.component.html',
  styleUrls: ['./purchase-full-details.component.css']
})
export class PurchaseFullDetailsComponent implements OnInit {

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
    // private cartTotalSrv: CartTotalService,
    // private cartSrv: CartService,
  ) {
  }

  ngOnInit(): void {
    console.log('app-purchase-full-details', this.cart);
    this.globalTotal = this.cart.totalResumen
    // this.cartTotalSrv.myCartTotal$.subscribe((gTotal: any) => {
    //   console.log('gTotal', gTotal);
    //   if (gTotal) {
    //     this.globalTotal = gTotal.globalTotal;
    //   } else {
    //     this.globalTotal = {
    //       globalDiscount: 0,
    //       globalSubtotal: 0,
    //       globalTotalToPay: this.cart.totales
    //     }
    //   }
    // console.log('this.globalTotal', this.globalTotal);
    // });
  }



  // ngOnChanges(changes: SimpleChanges): void {
  //   const { cart } = changes;

  //   if (cart && cart.currentValue) {
  //     // console.log('CartTotalesComponent', cart.currentValue);
  //     this.cart = cart.currentValue;
  //   }
  // }

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
