import { Component, OnDestroy, OnInit } from '@angular/core';
import { Subscription } from 'rxjs';
import { purchaseTotales } from 'src/app/helpers/purchase-totales.helper';
import { PreSaleService } from 'src/app/services/pre-sale.service';

@Component({
  selector: 'app-pre-sale-totales',
  templateUrl: './pre-sale-totales.component.html',
  styleUrls: ['./pre-sale-totales.component.css']
})
export class PreSaleTotalesComponent implements OnInit, OnDestroy {

  /** Documento de orden de compra desde el localStorage */
  public preSaleDocument: any;

  public sub$!: Subscription;

  constructor(
    private preSaleSrv: PreSaleService,
  ) {
  }

  ngOnInit(): void {
    this.sub$ = this.preSaleSrv.getDocumentLocalStorageObservable().subscribe((data: any) => {
      // console.log({data});
      this.preSaleDocument = data;
    });
  }

  get roomsAmountFullPrice(): number {
    return purchaseTotales(this.preSaleDocument).roomsFullPrice;
    // const rooms = this.preSaleDocument?.rooms.map((row) => row.fullPrice)
    //   .reduce((prev, curr) => prev + curr, 0);

    // return (this.preSaleDocument) ? rooms : 0;
  }

  get roomsAmount(): number {
    return purchaseTotales(this.preSaleDocument).roomsPrice;
    // const rooms = this.preSaleDocument?.rooms.map((row) => row.price)
    //   .reduce((prev, curr) => prev + curr, 0);

    // return (this.preSaleDocument) ? rooms : 0;
  }

  get additionalDaysAmountFullPrice(): number {
    return purchaseTotales(this.preSaleDocument).additionalDaysAmountFullPrice;
    // if(!this.preSaleDocument) return 0;
    
    // const additionalDays = this.preSaleDocument?.rooms || []

    // return additionalDays.map((row) => row.additionals)
    // .filter((row) => row.length > 0)
    // .map((data) => data.map((row) => row.quantity * row.fullPrice).reduce((prev, curr) => prev + curr, 0))
    // .reduce((prev, curr) => prev + curr, 0);
  }

  get additionalDaysAmount(): number {
    return purchaseTotales(this.preSaleDocument).additionalDaysAmount;
    // if(!this.preSaleDocument) return 0;
    
    // const additionalDays = this.preSaleDocument?.rooms || []

    // return additionalDays.map((row) => row.additionals)
    // .filter((row) => row.length > 0)
    // .map((data) => data.map((row) => row.quantity * row.price).reduce((prev, curr) => prev + curr, 0))
    // .reduce((prev, curr) => prev + curr, 0);
  }

  get additionalCategoryPassesAmountFullPrice(){
    return purchaseTotales(this.preSaleDocument).additionalCategoryPassesAmountFullPrice;
    // if(!this.preSaleDocument) return 0;

    // const { additionalCategoryPasses } = this.preSaleDocument;

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
    return purchaseTotales(this.preSaleDocument).additionalCategoryPasses;
    // if(!this.preSaleDocument) return 0;

    // const { additionalCategoryPasses } = this.preSaleDocument;

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
    return purchaseTotales(this.preSaleDocument).evenPassesFullAmount;
  //   if(!this.preSaleDocument) return 0;

  //   const { eventPasses } = this.preSaleDocument;

  //   return eventPasses.map((row) => row.quantity * row.fullPrice);
  }

  get evenPassesAmount(){
    return purchaseTotales(this.preSaleDocument).evenPassesAmount;
    // if(!this.preSaleDocument) return 0;

    // const { eventPasses } = this.preSaleDocument;

    // return eventPasses.map((row) => row.quantity * row.price);
  }

  get subTotalFullPrice(){
    return purchaseTotales(this.preSaleDocument).subTotalFullPrice;
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
    return purchaseTotales(this.preSaleDocument).subTotal;
  }

  get discount(){
    // return this.subTotalFullPrice - (this.subTotal - this.couponAmount);
    return purchaseTotales(this.preSaleDocument).discount;
  }

  get groupDiscount(){
    return purchaseTotales(this.preSaleDocument).groupDiscount;
  //   // return this.preSaleDocument?.groupDiscount || 0;
  //   return purchaseTotales(this.preSaleDocument).additionalCategoryPasses;
  }

  get groupDiscountAmount(){
    // return (this.subTotal * this.groupDiscount);
    return purchaseTotales(this.preSaleDocument).groupDiscountAmount;
  }

  get couponAmount(){
    return purchaseTotales(this.preSaleDocument).couponAmount;
    // const coupons = this.preSaleDocument?.coupons || [];

    // if(coupons.length == 0) return 0;

    // const row = coupons[0];
    // return (row.type == 'percentage') ? (this.subTotal * row.discount) / 100 : row.discount;
  }

  get total(){
    return purchaseTotales(this.preSaleDocument).total;
    // return this.subTotal - this.groupDiscountAmount - this.couponAmount;
  }

  get nroCoutas(){
    const cuotas: any[] = this.preSaleSrv.getCuotas();
    return cuotas.length;
  }

  get coutasAmount(){
    return this.total / this.nroCoutas;
  }

  ngOnDestroy(): void {
    this.sub$.unsubscribe();
  }

}
