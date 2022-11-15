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
  public orderType = "fullPass";

  constructor(
    private preSaleSrv: PreSaleService,
    private router: Router,
  ) {
    const {installments, orderType} = this.preSaleSrv.checkAndLoadDocumentLocalStorage();
    this.installments = installments;
    this.orderType = orderType;
  }

  ngOnInit(): void {}

  onBack(){
    this.preSaleSrv.updateDocumentLocalStorage({step: '/pre-sale-categories/payment-method'});
    this.router.navigate(['/pre-sale-categories/payment-method']);
  }

  onNext(){
    this.preSaleSrv.updateDocumentLocalStorage({step: '/pre-sale-categories/installments-pay'});
    this.router.navigate(['/pre-sale-categories/installments-pay']);
  }

}