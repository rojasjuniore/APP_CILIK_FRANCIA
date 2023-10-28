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

  constructor() {
  }

  ngOnInit(): void {
    this.globalTotal = this.cart.totalResumen
  }

}
