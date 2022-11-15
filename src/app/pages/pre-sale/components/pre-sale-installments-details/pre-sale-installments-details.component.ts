import { Component, OnDestroy, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import moment from 'moment';
import { PreSaleService } from 'src/app/services/pre-sale.service';

@Component({
  selector: 'app-pre-sale-installments-details',
  templateUrl: './pre-sale-installments-details.component.html',
  styleUrls: ['./pre-sale-installments-details.component.css']
})
export class PreSaleInstallmentsDetailsComponent implements OnInit {

  // public installments = [
  //   {
  //     date: '15/10/2022',
  //     range: {begin: '2022/09/10', end: '2022/09/30'},
  //     amount: 700,
  //   },
  //   {
  //     date: '15/11/2022',
  //     range: {begin: '2022/10/01', end: '2022/10/31'},
  //     amount: 700,
  //   },
  //   {
  //     date: '15/12/2022',
  //     range: {begin: '2022/11/01', end: '2022/12/15'},
  //     amount: 700,
  //   },
  //   {
  //     date: '15/01/2023',
  //     range: {begin: '2022/12/16', end: '2023/01/10'},
  //     amount: 700,
  //   },
  // ];
  public installments!: any[];

  /** Documento de orden de compra desde el localStorage */
  public preSaleDocument: any;
  public orderType = "fullPass";

  constructor(
    private preSaleSrv: PreSaleService,
    private router: Router,
  ) {
    const {installments, orderType} = this.preSaleSrv.checkAndLoadDocumentLocalStorage();
    this.installments = installments;
    this.orderType = orderType;
  }

  ngOnInit(): void {
    // this.loadData();
  }

  /**
   * TODO: pendiente por eliminar
   */
  async loadData(){
    const preSaleDocument = await this.preSaleSrv.getDocumentLocalStorage();
    const coutas = this.preSaleSrv.getCuotas();

    const roomsAmount = preSaleDocument?.rooms
      .map((row) => row.price)
      .reduce((prev, curr) => prev + curr, 0);
    // console.log('roomsAmount', roomsAmount);

    const additionalDaysAmount = preSaleDocument?.rooms
      .map((room) => room.additionals)
      .filter((row) => row.length > 0)
      .map((data) => data.map((row) => row.quantity * row.price).reduce((prev, curr) => prev + curr, 0))
      .reduce((prev, curr) => prev + curr, 0);
    // console.log('additionalDaysAmount', additionalDaysAmount);

    const additionalCategoryPasses = preSaleDocument?.additionalCategoryPasses
      .map((row) => row.quantity * row.price)
      .reduce((prev, curr) => prev + curr, 0)

    const price = [roomsAmount, additionalDaysAmount, additionalCategoryPasses]
      .reduce((prev, curr) => prev + curr, 0);

    const coutaAmount = price / coutas.length;

    const currentDate = moment();
    this.installments = coutas.map((row, index) => {
      return {
        nro: index + 1,
        date: (index == 0) 
          ? currentDate.valueOf()
          : currentDate.add(1, 'month').endOf('day').valueOf(),
        paymentMethod: null,
        amount: coutaAmount,
        completed: false,
      }
    });

    this.preSaleSrv.updateDocumentLocalStorage({installments: this.installments});
  }

  onBack(){
    this.preSaleSrv.updateDocumentLocalStorage({step: '/pre-sale/payment-method'});
    this.router.navigate(['/pre-sale/payment-method']);
  }

  onNext(){
    this.preSaleSrv.updateDocumentLocalStorage({step: '/pre-sale/installments-pay'});
    this.router.navigate(['/pre-sale/installments-pay']);
  }

}
