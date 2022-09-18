import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { PreSaleService } from 'src/app/services/pre-sale.service';

import moment from 'moment';

@Component({
  selector: 'app-pre-sale-only-categories-installments-details',
  templateUrl: './pre-sale-only-categories-installments-details.component.html',
  styleUrls: ['./pre-sale-only-categories-installments-details.component.css']
})
export class PreSaleOnlyCategoriesInstallmentsDetailsComponent implements OnInit {

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
    this.preSaleSrv.updateDocumentLocalStorage({step: '/pre-sale/payment-method'});
    this.router.navigate(['/pre-sale/payment-method']);
  }

  onNext(){
    this.preSaleSrv.updateDocumentLocalStorage({step: '/pre-sale/installments-pay'});
    this.router.navigate(['/pre-sale/installments-pay']);
  }

}