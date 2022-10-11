import { Component, OnInit, ViewChild } from '@angular/core';
import { Router } from '@angular/router';
import { TranslatePipe } from '@ngx-translate/core';
import moment from 'moment';
import { PreSaleModalBankTransferDetailComponent } from 'src/app/components/pre-sale-modal-bank-transfer-detail/pre-sale-modal-bank-transfer-detail.component';
import { PreSaleModalPaymentCoutasDetailsComponent } from 'src/app/components/pre-sale-modal-payment-coutas-details/pre-sale-modal-payment-coutas-details.component';
import { PreSaleService } from 'src/app/services/pre-sale.service';
import { Sweetalert2Service } from 'src/app/services/sweetalert2.service';

@Component({
  selector: 'app-pre-sale-payment-methods',
  templateUrl: './pre-sale-payment-methods.component.html',
  styleUrls: ['./pre-sale-payment-methods.component.css']
})
export class PreSalePaymentMethodsComponent implements OnInit {

  @ViewChild(PreSaleModalPaymentCoutasDetailsComponent) modalInstallments!: PreSaleModalPaymentCoutasDetailsComponent;
  @ViewChild(PreSaleModalBankTransferDetailComponent) modalBackTransfer!: PreSaleModalBankTransferDetailComponent;

  public paymentMethodType: any;
  public paymentMethods = [
    {
      label: 'paymentMethods.installmentPayment',
      value: 'installments',
      icon: 'bi bi-calendar-check',
      status: true,
    },
    {
      label: 'paymentMethods.transfer',
      value: 'transfer',
      icon: 'bi bi-bank',
      status: true,
    },
    {
      label: 'paymentMethods.paypal',
      value: 'paypal',
      icon: 'bi bi-paypal',
      status: true,
    },
    // {
    //   label: 'paymentMethods.creditCard',
    //   value: 'creditCard',
    //   icon: 'bi bi-credit-card',
    //   status: false,
    // },
    // {
    //   label: 'paymentMethods.crypto',
    //   value: 'crypto',
    //   icon: 'bi bi-coin',
    //   status: false,
    // },
  ];

  constructor(
    public preSaleSrv: PreSaleService,
    private router: Router,
    private sweetAlert2Srv: Sweetalert2Service,
    private translatePipe: TranslatePipe,
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
    console.log(value)
    console.log(this.paymentMethodType)
    if(this.paymentMethodType){

      if(this.paymentMethodType === value){
        this.paymentMethodType = null;
      }else{
        if(value === 'installments'){
          this.modalInstallments.showModal();
        }else if(value === 'transfer'){
          this.modalBackTransfer.showModal();
          
        }
        else{
          this.paymentMethodType = value;
        }
      }

      


    }else{

      if(value === 'installments'){
        this.modalInstallments.showModal();
      }else if(value === 'transfer'){
        this.modalBackTransfer.showModal();
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

    const nroParticipantsByRoom = preSaleDocument.rooms
      .map((room: any) => room.capacity)
      .reduce((a: number, b: number) => a + b, 0);

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

    const subTotal = [roomsAmount, additionalDaysAmount, additionalCategoryPasses]
      .reduce((prev, curr) => prev + curr, 0);


    /**
     * Calcular descuento por grupo
     */
    let groupDiscount = 0;
    if(nroParticipantsByRoom >= 20){
      groupDiscount = subTotal * 0.10;
    }else if(nroParticipantsByRoom >= 10){
      groupDiscount = subTotal * 0.05;
    }

    const total = subTotal - groupDiscount;

    const coutaAmount = total / coutas.length;

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

      this.onNext();
    }
  }

  async crearteOrderBankTransfer(status: any){
    console.log(this.preSaleSrv.getDocumentLocalStorage())
    let document = this.preSaleSrv.getDocumentLocalStorage();
    if(status){
      await this.preSaleSrv.completePreSaleOrder('pago por transferencia');
      let message = this.translatePipe.transform('general.successfulTransaction');
      this.sweetAlert2Srv.showInfo(message);
      this.router.navigateByUrl('pages/dashboard');
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
