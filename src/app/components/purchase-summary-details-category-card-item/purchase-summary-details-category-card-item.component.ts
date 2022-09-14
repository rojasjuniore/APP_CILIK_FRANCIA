import { Component, Input, OnInit } from '@angular/core';

@Component({
  selector: 'app-purchase-summary-details-category-card-item',
  templateUrl: './purchase-summary-details-category-card-item.component.html',
  styleUrls: ['./purchase-summary-details-category-card-item.component.css']
})
export class PurchaseSummaryDetailsCategoryCardItemComponent implements OnInit {

  @Input() order: any;
  
  constructor() { }

  ngOnInit(): void {
    // console.log('order', this.order);
  }

  get nroPasses(){
    return this.order.rooms.map((row) => row.capacity).reduce((a, b) => a + b, 0);
  }

  get additionalCategoryPasses(): any[]{
    return this.order.additionalCategoryPasses || [];
  }

  get additionalCategoryPassesAmountFullPrice(){
    return this.additionalCategoryPasses.map((row) => row.quantity * row.fullPrice).reduce((a, b) => a + b, 0);
  }

  get additionalCategoryPassesAmount(){
    return this.additionalCategoryPasses.map((row) => row.quantity * row.price).reduce((a, b) => a + b, 0);
  }

  get discount(){
    return this.additionalCategoryPassesAmountFullPrice - this.subTotal;
  }

  get subTotalFullPrice(){
    return this.additionalCategoryPassesAmountFullPrice;
  }

  get subTotal(){
    return this.additionalCategoryPassesAmount;
  }
}
