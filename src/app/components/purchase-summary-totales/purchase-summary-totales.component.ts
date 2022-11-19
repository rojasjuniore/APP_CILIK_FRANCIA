import { Component, Input, OnInit } from '@angular/core';
import { purchaseTotales } from 'src/app/helpers/purchase-totales.helper';

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
    return purchaseTotales(this.order).roomsFullPrice;
    // const rooms = this.order?.rooms.map((row) => row.fullPrice)
    //   .reduce((prev, curr) => prev + curr, 0);

    // return (this.order) ? rooms : 0;
  }

  get roomsAmount(): number {
    return purchaseTotales(this.order).roomsPrice;
    // const rooms = this.order?.rooms.map((row) => row.price)
    //   .reduce((prev, curr) => prev + curr, 0);

    // return (this.order) ? rooms : 0;
  }

  get additionalDaysAmountFullPrice(): number {
    return purchaseTotales(this.order).additionalDaysAmountFullPrice;
    // if(!this.order) return 0;
    
    // const additionalDays = this.order?.rooms || []

    // return additionalDays.map((row) => row.additionals)
    // .filter((row) => row.length > 0)
    // .map((data) => data.map((row) => row.quantity * row.fullPrice).reduce((prev, curr) => prev + curr, 0))
    // .reduce((prev, curr) => prev + curr, 0);
  }

  get additionalDaysAmount(): number {
    return purchaseTotales(this.order).additionalDaysAmount;
    // if(!this.order) return 0;
    
    // const additionalDays = this.order?.rooms || []

    // return additionalDays.map((row) => row.additionals)
    // .filter((row) => row.length > 0)
    // .map((data) => data.map((row) => row.quantity * row.price).reduce((prev, curr) => prev + curr, 0))
    // .reduce((prev, curr) => prev + curr, 0);
  }

  get additionalCategoryPassesAmountFullPrice(){
    return purchaseTotales(this.order).additionalCategoryPassesAmountFullPrice;
    // if(!this.order) return 0;

    // const { additionalCategoryPasses } = this.order;

    // return additionalCategoryPasses.map((row) => {
    //   if(row.type == 'group'){
    //     return row.data.map((group) => group.quantity * group.fullPrice)
    //       .reduce((prev, curr) => prev + curr, 0)

    //   }else{
    //     return row.quantity * row.fullPrice;
    //   }
    // })
    //   .reduce((prev, curr) => prev + curr, 0);
  }

  get additionalCategoryPassesAmount(){
    return purchaseTotales(this.order).additionalCategoryPasses;
    // if(!this.order) return 0;

    // const { additionalCategoryPasses } = this.order;

    // return additionalCategoryPasses.map((row) => {
    //   if(row.type == 'group'){
    //     return row.data.map((group) => group.quantity * group.price)
    //       .reduce((prev, curr) => prev + curr, 0)

    //   }else{
    //     return row.quantity * row.price;
    //   }
    // })
    //   .reduce((prev, curr) => prev + curr, 0);
  }

  get evenPassesFullAmount(){
    return purchaseTotales(this.order).evenPassesFullAmount;
    // if(!this.order) return 0;

    // const { eventPasses } = this.order;

    // return eventPasses.map((row) => row.quantity * row.fullPrice);
  }

  get evenPassesAmount(){
    return purchaseTotales(this.order).evenPassesAmount;
    // if(!this.order) return 0;

    // const { eventPasses } = this.order;

    // return eventPasses.map((row) => row.quantity * row.price);
  }

  get subTotalFullPrice(){
    return purchaseTotales(this.order).subTotalFullPrice;
    // return [
    //   this.roomsAmountFullPrice, 
    //   this.additionalDaysAmountFullPrice, 
    //   this.additionalCategoryPassesAmountFullPrice,
    //   this.evenPassesFullAmount
    // ]
    // .reduce((prev, curr) => prev + curr, 0);
  }

  get subTotal(){
    // return [
    //   this.roomsAmount, 
    //   this.additionalDaysAmount, 
    //   this.additionalCategoryPassesAmount,
    //   this.evenPassesAmount
    // ]
    // .reduce((prev, curr) => prev + curr, 0);
    return purchaseTotales(this.order).subTotal;
  }

  get discount(){
    // return this.subTotalFullPrice - (this.subTotal - this.couponAmount);
    return purchaseTotales(this.order).discount;
  }

  get groupDiscount(){
    return purchaseTotales(this.order).groupDiscount;
    // return this.order?.groupDiscount || 0;
  }
  
  get groupDiscountAmount(){
    // return (this.subTotal * this.groupDiscount);
    return purchaseTotales(this.order).groupDiscountAmount;
  }

  get couponAmount(){
    return purchaseTotales(this.order).couponAmount;
    // const coupons = this.order?.coupons || [];

    // if(coupons.length == 0) return 0;

    // const row = coupons[0];
    // return (row.type == 'percentage') ? Number((this.subTotal * row.discount) / 100) : Number(row.discount);
  }

  get total(){
    return purchaseTotales(this.order).total;
    // return this.subTotal  - this.groupDiscountAmount - this.couponAmount;
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
