import { Component, Input, OnInit } from '@angular/core';

@Component({
  selector: 'app-purchase-summary-totales',
  templateUrl: './purchase-summary-totales.component.html',
  styleUrls: ['./purchase-summary-totales.component.css']
})
export class PurchaseSummaryTotalesComponent implements OnInit {

  @Input() order: any;

  constructor() { }

  ngOnInit(): void {
  }


  get roomsAmountFullPrice(): number {
    const rooms = this.order?.rooms.map((row) => row.fullPrice)
      .reduce((prev, curr) => prev + curr, 0);

    return (this.order) ? rooms : 0;
  }

  get roomsAmount(): number {
    const rooms = this.order?.rooms.map((row) => row.price)
      .reduce((prev, curr) => prev + curr, 0);

    return (this.order) ? rooms : 0;
  }

  get additionalDaysAmountFullPrice(): number {

    if(!this.order) return 0;
    
    const additionalDays = this.order?.rooms || []

    return additionalDays.map((row) => row.additionals)
    .filter((row) => row.length > 0)
    .map((data) => data.map((row) => row.quantity * row.fullPrice).reduce((prev, curr) => prev + curr, 0))
    .reduce((prev, curr) => prev + curr, 0);
  }

  get additionalDaysAmount(): number {

    if(!this.order) return 0;
    
    const additionalDays = this.order?.rooms || []

    return additionalDays.map((row) => row.additionals)
    .filter((row) => row.length > 0)
    .map((data) => data.map((row) => row.quantity * row.price).reduce((prev, curr) => prev + curr, 0))
    .reduce((prev, curr) => prev + curr, 0);
  }

  get additionalCategoryPassesAmountFullPrice(){

    if(!this.order) return 0;

    const { additionalCategoryPasses } = this.order;

    return additionalCategoryPasses.map((row) => {
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

    if(!this.order) return 0;

    const { additionalCategoryPasses } = this.order;

    return additionalCategoryPasses.map((row) => {
      if(row.type == 'group'){
        return row.data.map((group) => group.quantity * group.price)
          .reduce((prev, curr) => prev + curr, 0)

      }else{
        return row.quantity * row.price;
      }
    })
      .reduce((prev, curr) => prev + curr, 0);
  }

  get subTotalFullPrice(){
    return [this.roomsAmountFullPrice, this.additionalDaysAmountFullPrice, this.additionalCategoryPassesAmountFullPrice]
      .reduce((prev, curr) => prev + curr, 0);
  }

  get subTotal(){
    return [this.roomsAmount, this.additionalDaysAmount, this.additionalCategoryPassesAmount]
      .reduce((prev, curr) => prev + curr, 0);
  }

  get discount(){
    return this.subTotalFullPrice - this.subTotal;
  }

  get groupDiscount(){
    return this.order?.groupDiscount || 0;
  }
  
  get groupDiscountAmount(){
    return (this.subTotal * this.groupDiscount);
  }

  get total(){
    return this.subTotal  - this.groupDiscountAmount;
  }

  get nroCoutas(){
    const paymentType = this.order?.paymentMethodType;

    if(paymentType !== 'installments'){
      return 1;
    }

    return this.order?.installments.length || 0;
  }

  get coutasAmount(){
    return this.total / this.nroCoutas;
  }

}
