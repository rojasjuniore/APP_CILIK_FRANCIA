import { Component, Input, OnChanges, OnInit, SimpleChanges } from '@angular/core';

@Component({
  selector: 'app-cart-coupon-form',
  templateUrl: './cart-coupon-form.component.html',
  styleUrls: ['./cart-coupon-form.component.css']
})
export class CartCouponFormComponent implements OnInit, OnChanges {

  public showLoadingBtn: boolean = true;

  @Input() cart: any = null;

  constructor() { }

  ngOnInit(): void { }

  ngOnChanges(changes: SimpleChanges): void {
    const { cart } = changes;

    if(cart && cart.currentValue){
      this.cart = cart.currentValue;
      this.showLoadingBtn = false;
    }

  }

}
