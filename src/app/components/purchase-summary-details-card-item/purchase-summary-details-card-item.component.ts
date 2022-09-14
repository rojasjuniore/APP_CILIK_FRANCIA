import { Component, Input, OnInit } from '@angular/core';

@Component({
  selector: 'app-purchase-summary-details-card-item',
  templateUrl: './purchase-summary-details-card-item.component.html',
  styleUrls: ['./purchase-summary-details-card-item.component.css']
})
export class PurchaseSummaryDetailsCardItemComponent implements OnInit {

  @Input() index: number = 0;
  @Input() item: any;

  constructor() { }

  ngOnInit(): void {
  }

  get nroAdditionalDays(){
    return this.item?.additionals.map((row) => row.quantity)
      .reduce((a, b) => a + b, 0);
  }

  get additionalDaysAmountFullPrice(){
    return this.item?.additionals.map((row) => row.quantity * row.fullPrice)
      .reduce((a, b) => a + b, 0);
  }

  get additionalDaysAmount(){
    return this.item?.additionals.map((row) => row.quantity * row.price)
      .reduce((a, b) => a + b, 0);
  }

  get subTotalFullPrice(){
    return [this.item.fullPrice, this.additionalDaysAmountFullPrice].reduce((a, b) => a + b, 0);; 
  }

  get subTotal(){
    return [this.item.price, this.additionalDaysAmount].reduce((a, b) => a + b, 0);; 
  }

  get discount(){
    return this.subTotalFullPrice - this.subTotal;
  }

  get total(){
    return this.subTotal;
  }

}
