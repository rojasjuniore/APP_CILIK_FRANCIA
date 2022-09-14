import { Component, Input, OnInit, Output } from '@angular/core';
import { Subject } from 'rxjs';

@Component({
  selector: 'app-pre-sale-checkout-card-item',
  templateUrl: './pre-sale-checkout-card-item.component.html',
  styleUrls: ['./pre-sale-checkout-card-item.component.css']
})
export class PreSaleCheckoutCardItemComponent implements OnInit {

  @Input() index: number = 0;
  @Input() item: any;

  @Output() onUpdate = new Subject();
  @Output() onRemove = new Subject();

  constructor() { }

  ngOnInit(): void {
    // console.log('item', this.item);
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
