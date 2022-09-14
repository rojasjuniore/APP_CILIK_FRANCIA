import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { PreSaleService } from 'src/app/services/pre-sale.service';

@Component({
  selector: 'app-pre-sale-installments-pay-couta',
  templateUrl: './pre-sale-installments-pay-couta.component.html',
  styleUrls: ['./pre-sale-installments-pay-couta.component.css']
})
export class PreSaleInstallmentsPayCoutaComponent implements OnInit {

  public preSaleDocument: any;
  public coutaToPay: any;
  public paymentMethodType: any;
  public paymentMethods = [
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
    {
      label: 'Paypal',
      value: 'paypal',
      icon: 'bi bi-paypal',
      status: true,
    }
  ];

  constructor(
    private router: Router,
    private preSaleSrv: PreSaleService,
  ) {
    this.preSaleDocument = this.preSaleSrv.getDocumentLocalStorage();
  }

  ngOnInit(): void {
  }

  selectPaymentMethod(item: any){
    this.paymentMethodType = item.value;
    // console.log('item', item);
    this.preSaleDocument.installments[0].paymentMethod = item.value;
    this.preSaleSrv.updateDocumentLocalStorage({installments: this.preSaleDocument.installments});
  }

  onBack(){
    this.preSaleSrv.updateDocumentLocalStorage({step: '/pre-sale/installments-details'});
    this.router.navigate(['/pre-sale/installments-details']);
  }

  onNext(){
    this.preSaleSrv.updateDocumentLocalStorage({step: '/purchase/summary', completed: true});
    this.router.navigate(['/purchase/summary']);
  }

}
