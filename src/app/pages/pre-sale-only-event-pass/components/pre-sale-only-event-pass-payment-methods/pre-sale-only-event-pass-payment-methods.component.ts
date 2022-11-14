import { Component, OnInit, ViewChild } from '@angular/core';
import { Router } from '@angular/router';
import { TranslatePipe } from '@ngx-translate/core';
import moment from 'moment';
import { PreSaleModalBankTransferDetailComponent } from 'src/app/components/pre-sale-modal-bank-transfer-detail/pre-sale-modal-bank-transfer-detail.component';
import { PreSaleModalPaymentCoutasDetailsComponent } from 'src/app/components/pre-sale-modal-payment-coutas-details/pre-sale-modal-payment-coutas-details.component';
import { PreSaleService } from 'src/app/services/pre-sale.service';
import { Sweetalert2Service } from 'src/app/services/sweetalert2.service';
import { environment } from 'src/environments/environment';

@Component({
  selector: 'app-pre-sale-only-event-pass-payment-methods',
  templateUrl: './pre-sale-only-event-pass-payment-methods.component.html',
  styleUrls: ['./pre-sale-only-event-pass-payment-methods.component.css']
})
export class PreSaleOnlyEventPassPaymentMethodsComponent implements OnInit {


  @ViewChild(PreSaleModalPaymentCoutasDetailsComponent) modalInstallments!: PreSaleModalPaymentCoutasDetailsComponent;
  @ViewChild(PreSaleModalBankTransferDetailComponent) modalBackTransfer!: PreSaleModalBankTransferDetailComponent;

  public paymentMethodType: any;
  public paymentMethods = [
    {
      label: 'paymentMethods.paypal',
      value: 'paypal',
      icon: 'bi bi-paypal',
      status: true,
    },
    {
      label: 'paymentMethods.transfer',
      value: 'transfer',
      icon: 'bi bi-bank',
      status: true,
    },
    {
      label: 'paymentMethods.installmentPayment',
      value: 'installments',
      icon: 'bi bi-calendar-check',
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

  public loading = false;

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

    if(this.paymentMethodType){

      if(this.paymentMethodType === value){
        this.paymentMethodType = null;
      }else{
        if(value === 'installments'){
          this.modalInstallments.showModal();
        }else if(value === 'transfer'){
          this.modalBackTransfer.showModal();
          
        }else{
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
        url: environment.urlWeb + 'purchase/summary/' + preSaleDocument.orderId + '/pay-couta/' + index,
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

  async crearteOrderBankTransfer(status: any){
    // console.log(this.preSaleSrv.getDocumentLocalStorage())
    // let document = this.preSaleSrv.getDocumentLocalStorage();
    // if(status){
    //   this.loading = true;
    //   await this.preSaleSrv.completePreSaleOrder('pago por transferencia');
    //   let message = this.translatePipe.transform('general.successfulTransaction');
    //   this.sweetAlert2Srv.showInfo(message);
    //   this.router.navigateByUrl('pages/dashboard');
    //   this.loading = false;
    // }

    if(!status){ return; }

    this.loading = true;

    this.preSaleSrv.updateDocumentLocalStorage({ paymentMethodType: 'bankTransfer' });

    const order = this.preSaleSrv.getDocumentLocalStorage()

    /** Finalizar documento de orden de compra */
    await this.preSaleSrv.completePreSaleOrder(
      order.metadata,
      {
        completed: false,
        payed: false,
        status: 'pending',
      }
    );

    const message = this.translatePipe.transform('paymentMethods.bankTransferMessageOrderGenerated');
    this.sweetAlert2Srv.showInfo(message);
    this.router.navigateByUrl('pages/dashboard');
    this.loading = false;
  }
  
  onBack(){
    this.preSaleSrv.updateDocumentLocalStorage({step: '/pre-sale-event-pass/step2'});
    this.router.navigate(['/pre-sale-event-pass/step2']);
  }

  async onNext(){
    switch (this.paymentMethodType) {
      case "creditCard":
        this.preSaleSrv.updateDocumentLocalStorage({step: '/pre-sale-event-pass/credit-card'});
        this.router.navigate(['/pre-sale-event-pass/credit-card']);
        break;
      case "crypto":
        this.preSaleSrv.updateDocumentLocalStorage({step: '/pre-sale-event-pass/crypto'});
        this.router.navigate(['/pre-sale-event-pass/crypto']);
        break;
      case "paypal":
        this.preSaleSrv.updateDocumentLocalStorage({step: '/pre-sale-event-pass/paypal'});
        this.router.navigate(['/pre-sale-event-pass/paypal']);
        break;
      case "installments":
        this.preSaleSrv.updateDocumentLocalStorage({step: '/pre-sale-event-pass/installments-details'});
        this.router.navigate(['/pre-sale-event-pass/installments-details']);
        break;
      default:
        break;
    }
  }
}
