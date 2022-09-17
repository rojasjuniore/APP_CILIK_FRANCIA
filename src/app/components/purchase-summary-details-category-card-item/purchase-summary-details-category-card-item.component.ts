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
    const rooms = this.order?.rooms || [];
    return rooms.map((row) => row.capacity).reduce((a, b) => a + b, 0);
  }

  get additionalCategoryPasses(): any[]{
    const snapshot = this.order?.additionalCategoryPasses || [];
    return snapshot.sort((a, b) => a.order - b.order);
  }

  get additionalCategoryPassesAmountFullPrice(){
    return this.additionalCategoryPasses.map((row) => {
      if(row.type == 'group'){
        return row.data.map((group) => group.quantity * group.fullPrice)
          .reduce((prev, curr) => prev + curr, 0)

      }else{
        return row.quantity * row.fullPrice;
      }
    }).reduce((a, b) => a + b, 0);
  }

  get additionalCategoryPassesAmount(){
    return this.additionalCategoryPasses.map((row) => {
      if(row.type == 'group'){
        return row.data.map((group) => group.quantity * group.price)
          .reduce((prev, curr) => prev + curr, 0)

      }else{
        return row.quantity * row.price;
      }
    }).reduce((a, b) => a + b, 0);
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

  getTotalAdditional(item: any){
    if(item.type == 'group'){
      return item.data.map((group) => group.quantity)
        .reduce((prev, curr) => prev + curr, 0)

    }else{
      return item.quantity;
    }
  }
}
