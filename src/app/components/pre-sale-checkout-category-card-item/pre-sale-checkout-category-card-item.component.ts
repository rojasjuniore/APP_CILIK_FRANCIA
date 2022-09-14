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
    return this.order.additionalCategoryPasses || [];
  }

  get additionalCategoryPassesAmountFullPrice(){
    return this.additionalCategoryPasses.map((row) => row.quantity * row.fullPrice).reduce((a, b) => a + b, 0);
  }

  get additionalCategoryPassesAmount(){
    return this.additionalCategoryPasses.map((row) => row.quantity * row.price).reduce((a, b) => a + b, 0);
  }

  get discount(){
    return this.additionalCategoryPassesAmountFullPrice - this.additionalCategoryPassesAmount;
  }

  get subTotal(){
    return this.additionalCategoryPassesAmount;
  }

}
