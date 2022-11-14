import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { PreSaleService } from 'src/app/services/pre-sale.service';

@Component({
  selector: 'app-pre-sale-only-event-pass-installments-details',
  templateUrl: './pre-sale-only-event-pass-installments-details.component.html',
  styleUrls: ['./pre-sale-only-event-pass-installments-details.component.css']
})
export class PreSaleOnlyEventPassInstallmentsDetailsComponent implements OnInit {

  public installments!: any[];

  /** Documento de orden de compra desde el localStorage */
  public preSaleDocument: any;

  constructor(
    private preSaleSrv: PreSaleService,
    private router: Router,
  ) {
    const {installments} = this.preSaleSrv.checkAndLoadDocumentLocalStorage();
    this.installments = installments;
  }

  ngOnInit(): void {}

  onBack(){
    this.preSaleSrv.updateDocumentLocalStorage({step: '/pre-sale-event-pass/payment-method'});
    this.router.navigate(['/pre-sale-event-pass/payment-method']);
  }

  onNext(){
    this.preSaleSrv.updateDocumentLocalStorage({step: '/pre-sale-event-pass/installments-pay'});
    this.router.navigate(['/pre-sale-event-pass/installments-pay']);
  }

}