import { Component, Input, OnChanges, OnInit, SimpleChanges } from '@angular/core';

@Component({
  selector: 'app-cart-totales',
  templateUrl: './cart-totales.component.html',
  styleUrls: ['./cart-totales.component.css']
})
export class CartTotalesComponent implements OnInit, OnChanges {

  @Input() cart: any;

  constructor() { }

  ngOnInit(): void {
  }

  ngOnChanges(changes: SimpleChanges): void {
    const { cart } = changes;

    if (cart && cart.currentValue) {
      console.log('CartTotalesComponent', cart.currentValue);
      this.cart = cart.currentValue;
    }
  }

  get subTotal(){
    if(!this.cart) return 0;
    const total = this.cart.product.map((item: any) => item.totales)
    .reduce((prev: any, next: any) => prev + next, 0);
    return total;
  }

  get discount() {
    if(!this.cart) return 0;

    const coupons = this.cart.coupons || [];
    const total = coupons.map((item: any) => (item.type === 'percent') ? this.subTotal * (item.value / 100) : item.value)
    .reduce((prev: any, next: any) => Number(prev) + Number(next), 0);
    return total;
  }

  get totales(){
    return this.subTotal - this.discount;
  }

}
