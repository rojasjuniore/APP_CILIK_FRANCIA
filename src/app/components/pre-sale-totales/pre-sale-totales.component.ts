import { Component, OnDestroy, OnInit } from '@angular/core';
import { Subscription } from 'rxjs';
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
    const rooms = this.preSaleDocument?.rooms.map((row) => row.fullPrice)
      .reduce((prev, curr) => prev + curr, 0);

    return (this.preSaleDocument) ? rooms : 0;
  }

  get roomsAmount(): number {
    const rooms = this.preSaleDocument?.rooms.map((row) => row.price)
      .reduce((prev, curr) => prev + curr, 0);

    return (this.preSaleDocument) ? rooms : 0;
  }

  get additionalDaysAmountFullPrice(): number {

    if(!this.preSaleDocument) return 0;
    
    const additionalDays = this.preSaleDocument?.rooms || []

    return additionalDays.map((row) => row.additionals)
    .filter((row) => row.length > 0)
    .map((data) => data.map((row) => row.quantity * row.fullPrice).reduce((prev, curr) => prev + curr, 0))
    .reduce((prev, curr) => prev + curr, 0);
  }

  get additionalDaysAmount(): number {

    if(!this.preSaleDocument) return 0;
    
    const additionalDays = this.preSaleDocument?.rooms || []

    return additionalDays.map((row) => row.additionals)
    .filter((row) => row.length > 0)
    .map((data) => data.map((row) => row.quantity * row.price).reduce((prev, curr) => prev + curr, 0))
    .reduce((prev, curr) => prev + curr, 0);
  }

  get additionalCategoryPassesAmountFullPrice(){

    if(!this.preSaleDocument) return 0;

    const { additionalCategoryPasses } = this.preSaleDocument;

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

    if(!this.preSaleDocument) return 0;

    const { additionalCategoryPasses } = this.preSaleDocument;

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

  get total(){
    return this.subTotal;
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
