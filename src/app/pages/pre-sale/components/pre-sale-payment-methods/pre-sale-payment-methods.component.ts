import { Component, OnInit, ViewChild } from '@angular/core';
import { Router } from '@angular/router';
import { TranslatePipe } from '@ngx-translate/core';
import moment from 'moment';
import { PreSaleModalBankTransferDetailComponent } from 'src/app/components/pre-sale-modal-bank-transfer-detail/pre-sale-modal-bank-transfer-detail.component';
import { PreSaleModalPaymentCoutasDetailsComponent } from 'src/app/components/pre-sale-modal-payment-coutas-details/pre-sale-modal-payment-coutas-details.component';
import { purchaseTotales } from 'src/app/helpers/purchase-totales.helper';
import { PreSaleService } from 'src/app/services/pre-sale.service';
import { Sweetalert2Service } from 'src/app/services/sweetalert2.service';
import { environment } from 'src/environments/environment';

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
      label: 'credit and debit card',
      value: 'tucompra.com.co',
      icon: 'bi bi-calendar-check',
      status: true,
    },
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
  public orderType = "fullPass";
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

  loadLocalData() {
    const { paymentMethodType, orderType } = this.preSaleSrv.checkAndLoadDocumentLocalStorage();
    this.orderType = orderType;
    if (paymentMethodType) {
      this.paymentMethodType = paymentMethodType;
    }
  }

  selectPaymentMethod(item: any) {
    const { value } = item;
    console.log(value)
    console.log(this.paymentMethodType)
    if (this.paymentMethodType) {

      if (this.paymentMethodType === value) {
        this.paymentMethodType = null;
      } else {
        if (value === 'installments') {
          this.modalInstallments.showModal();
        } else if (value === 'transfer') {
          this.modalBackTransfer.showModal();

        }
        else {
          this.paymentMethodType = value;
        }
      }




    } else {

      if (value === 'installments') {
        this.modalInstallments.showModal();
      } else if (value === 'transfer') {
        this.modalBackTransfer.showModal();
      } else {
        this.paymentMethodType = value;
      }

    }

    if (this.paymentMethodType) {
      this.preSaleSrv.updateDocumentLocalStorage({
        paymentMethodType: this.paymentMethodType,
        installments: []
      });
    }
  }

  async calculateInstallments() {
    const preSaleDocument = await this.preSaleSrv.getDocumentLocalStorage();
    const coutas = this.preSaleSrv.getCuotas();

    // const nroParticipantsByRoom = preSaleDocument.rooms
    //   .map((room: any) => room.capacity)
    //   .reduce((a: number, b: number) => a + b, 0);

    // const roomsAmount = preSaleDocument?.rooms
    //   .map((row) => row.price)
    //   .reduce((prev, curr) => prev + curr, 0);
    // console.log('roomsAmount', roomsAmount);

    // const additionalDaysAmount = preSaleDocument?.rooms
    //   .map((room) => room.additionals)
    //   .filter((row) => row.length > 0)
    //   .map((data) => data.map((row) => row.quantity * row.price).reduce((prev, curr) => prev + curr, 0))
    //   .reduce((prev, curr) => prev + curr, 0);
    // console.log('additionalDaysAmount', additionalDaysAmount);

    // const additionalCategoryPasses = preSaleDocument?.additionalCategoryPasses
    //   .map((row) => {
    //     if(row.type == 'group'){
    //       return row.data.map((group) => group.quantity * group.price)
    //         .reduce((prev, curr) => prev + curr, 0)

    //     }else{
    //       return row.quantity * row.price;
    //     }
    //   })
    //   .reduce((prev, curr) => prev + curr, 0)

    // const subTotal = [roomsAmount, additionalDaysAmount, additionalCategoryPasses]
    //   .reduce((prev, curr) => prev + curr, 0);


    // /**
    //  * Calcular descuento por grupo
    //  */
    // let groupDiscount = 0;
    // if(nroParticipantsByRoom >= 20){
    //   groupDiscount = subTotal * 0.10;
    // }else if(nroParticipantsByRoom >= 10){
    //   groupDiscount = subTotal * 0.05;
    // }

    // const total = subTotal - groupDiscount;

    const totales = purchaseTotales(preSaleDocument);
    const coutaAmount = totales.total / coutas.length;

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
        payedAt: null,
        metadata: null,
        url: environment.urlWeb + 'purchase/summary/' + preSaleDocument.orderId + '/pay-couta/' + index,
      }
    });

    this.preSaleSrv.updateDocumentLocalStorage({ installments });
  }

  async onInstallmentsModalClose(status: any) {
    if (status) {
      this.paymentMethodType = 'installments';

      /** Calculate installments */
      await this.calculateInstallments();
      this.preSaleSrv.updateDocumentLocalStorage({ paymentMethodType: this.paymentMethodType });

      this.onNext();
    }
  }

  async crearteOrderBankTransfer(status: any) {
    // console.log(this.preSaleSrv.getDocumentLocalStorage())
    // let document = this.preSaleSrv.getDocumentLocalStorage();

    if (!status) { return; }

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

  onBack() {
    this.preSaleSrv.updateDocumentLocalStorage({ step: '/pre-sale/step3' });
    this.router.navigate(['/pre-sale/step3']);
  }

  async onNext() {
    switch (this.paymentMethodType) {
      case "creditCard":
        this.preSaleSrv.updateDocumentLocalStorage({ step: '/pre-sale/credit-card' });
        this.router.navigate(['/pre-sale/credit-card']);
        break;
      case "crypto":
        this.preSaleSrv.updateDocumentLocalStorage({ step: '/pre-sale/crypto' });
        this.router.navigate(['/pre-sale/crypto']);
        break;
      case "paypal":
        this.preSaleSrv.updateDocumentLocalStorage({ step: '/pre-sale/paypal' });
        this.router.navigate(['/pre-sale/paypal']);
        break;
      case "tucompra.com.co":
        this.preSaleSrv.updateDocumentLocalStorage({ step: '/pre-sale/tu-compra' });
        this.router.navigate(['/pre-sale/tu-compra']);
        break;
      case "installments":
        this.preSaleSrv.updateDocumentLocalStorage({ step: '/pre-sale/installments-details' });
        this.router.navigate(['/pre-sale/installments-details']);
        break;
    }
  }

}
