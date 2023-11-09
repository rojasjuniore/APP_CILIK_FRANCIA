import { Component, Input, OnInit } from '@angular/core';

@Component({
  selector: 'app-purchase-full-details',
  templateUrl: './purchase-full-details.component.html',
  styleUrls: ['./purchase-full-details.component.css']
})
export class PurchaseFullDetailsComponent implements OnInit {

  @Input() cart: any;
  globalTotal: any

  constructor() {
  }

  ngOnInit(): void {
    this.globalTotal = this.cart.totalResumen
  }

}
