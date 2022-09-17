import { Component, OnInit, ViewChild } from '@angular/core';
import { Router } from '@angular/router';
import moment from 'moment';
import { PreSaleModalPaymentCoutasDetailsComponent } from 'src/app/components/pre-sale-modal-payment-coutas-details/pre-sale-modal-payment-coutas-details.component';
import { PreSaleService } from 'src/app/services/pre-sale.service';

@Component({
  selector: 'app-pre-sale-payment-methods',
  templateUrl: './pre-sale-payment-methods.component.html',
  styleUrls: ['./pre-sale-payment-methods.component.css']
})
export class PreSalePaymentMethodsComponent implements OnInit {

  @ViewChild(PreSaleModalPaymentCoutasDetailsComponent) modalInstallments!: PreSaleModalPaymentCoutasDetailsComponent;

  public paymentMethodType: any;
  public paymentMethods = [
    {
      label: 'Paypal',
      value: 'paypal',
      icon: 'bi bi-paypal',
      status: true,
    },
    {
      label: 'Pago por cuotas',
      value: 'installments',
      icon: 'bi bi-calendar-check',
      status: true,
    },
    {
      label: 'Tarjeta de crédito',
      value: 'creditCard',
      icon: 'bi bi-credit-card',
      status: false,
    },
    {
      label: 'Criptomonedas',
      value: 'crypto',
      icon: 'bi bi-coin',
      status: false,
    },
  ];

  constructor(
    public preSaleSrv: PreSaleService,
    private router: Router,
  ) {
    this.loadLocalData();
  }

  ngOnInit(): void { }

  loadLocalData(){
    const { paymentMethodType } = this.preSaleSrv.checkAndLoadDocumentLocalStorage();
    if(paymentMethodType){
      this.paymentMethodType = paymentMethodType;
    }
  }

  selectPaymentMethod(item: any){
    const { value } = item;

    if(this.paymentMethodType){

      if(this.paymentMethodType === value){
        this.paymentMethodType = null;
      }else{
        if(value === 'installments'){
          this.modalInstallments.showModal();
        }else{
          this.paymentMethodType = value;
        }
      }


    }else{

      if(value === 'installments'){
        this.modalInstallments.showModal();
      }else{
        this.paymentMethodType = value;
      }

    }

    if(this.paymentMethodType){
      this.preSaleSrv.updateDocumentLocalStorage({ 
        paymentMethodType: this.paymentMethodType,
        installments: []
      });
    }
  }

  async calculateInstallments(){
    const preSaleDocument = await this.preSaleSrv.getDocumentLocalStorage();
    const coutas = this.preSaleSrv.getCuotas();

    const roomsAmount = preSaleDocument?.rooms
      .map((row) => row.price)
      .reduce((prev, curr) => prev + curr, 0);
    console.log('roomsAmount', roomsAmount);

    const additionalDaysAmount = preSaleDocument?.rooms
      .map((room) => room.additionals)
      .filter((row) => row.length > 0)
      .map((data) => data.map((row) => row.quantity * row.price).reduce((prev, curr) => prev + curr, 0))
      .reduce((prev, curr) => prev + curr, 0);
    console.log('additionalDaysAmount', additionalDaysAmount);

    const additionalCategoryPasses = preSaleDocument?.additionalCategoryPasses
      .map((row) => {
        if(row.type == 'group'){
          return row.data.map((group) => group.quantity * group.price)
            .reduce((prev, curr) => prev + curr, 0)
  
        }else{
          return row.quantity * row.price;
        }
      })
      .reduce((prev, curr) => prev + curr, 0)

    const price = [roomsAmount, additionalDaysAmount, additionalCategoryPasses]
      .reduce((prev, curr) => prev + curr, 0);

    const coutaAmount = price / coutas.length;

    const currentDate = moment();
    const installments = coutas.map((row, index) => {
      return {
        nro: index + 1,
        date: (index == 0) 
          ? currentDate.valueOf()
          : currentDate.add(30, 'days').endOf('day').valueOf(),
        paymentMethod: null,
        amount: coutaAmount,
        payed: false,
        metatada: null,
        url: null,
      }
    });

    this.preSaleSrv.updateDocumentLocalStorage({installments});
  }

  async onInstallmentsModalClose(status: any){
    if(status){
      this.paymentMethodType = 'installments';

      /** Calculate installments */
      await this.calculateInstallments();
      this.preSaleSrv.updateDocumentLocalStorage({ paymentMethodType: this.paymentMethodType });
    }
  }

  onBack(){
    this.preSaleSrv.updateDocumentLocalStorage({step: '/pre-sale/step3'});
    this.router.navigate(['/pre-sale/step3']);
  }

  async onNext(){
    switch (this.paymentMethodType) {
      case "creditCard":
        this.preSaleSrv.updateDocumentLocalStorage({step: '/pre-sale/credit-card'});
        this.router.navigate(['/pre-sale/credit-card']);
        break;
      case "crypto":
        this.preSaleSrv.updateDocumentLocalStorage({step: '/pre-sale/crypto'});
        this.router.navigate(['/pre-sale/crypto']);
        break;
      case "paypal":
        this.preSaleSrv.updateDocumentLocalStorage({step: '/pre-sale/paypal'});
        this.router.navigate(['/pre-sale/paypal']);
        break;
      case "installments":
        this.preSaleSrv.updateDocumentLocalStorage({step: '/pre-sale/installments-details'});
        this.router.navigate(['/pre-sale/installments-details']);
        break;
    }
  }

}
