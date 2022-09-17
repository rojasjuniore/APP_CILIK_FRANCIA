import { Component, Input, OnInit, Output } from '@angular/core';
import { Subject } from 'rxjs';

@Component({
  selector: 'app-pre-sale-checkout-category-card-item',
  templateUrl: './pre-sale-checkout-category-card-item.component.html',
  styleUrls: ['./pre-sale-checkout-category-card-item.component.css']
})
export class PreSaleCheckoutCategoryCardItemComponent implements OnInit {

  @Input() order: any;

  @Output() onUpdate = new Subject();
  @Output() onRemove = new Subject();

  constructor() { }

  ngOnInit(): void {
    console.log('order', this.order);
  }

  get nroPasses(){
    return this.order.rooms.map((row) => row.capacity).reduce((a, b) => a + b, 0);
  }

  get additionalCategoryPasses(): any[]{
    const snapshot = this.order.additionalCategoryPasses || [];
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
    })
      .reduce((prev, curr) => prev + curr, 0);
  }

  get additionalCategoryPassesAmount(){
    return this.additionalCategoryPasses.map((row) => {
      if(row.type == 'group'){
        return row.data.map((group) => group.quantity * group.price)
          .reduce((prev, curr) => prev + curr, 0)

      }else{
        return row.quantity * row.price;
      }
    })
      .reduce((prev, curr) => prev + curr, 0);
  }

  get discount(){
    return this.additionalCategoryPassesAmountFullPrice - this.additionalCategoryPassesAmount;
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
