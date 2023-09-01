import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { NgxSpinnerService } from 'ngx-spinner';
import { purchaseTotales } from 'src/app/helpers/purchase-totales.helper';
import { PreSaleService } from 'src/app/services/pre-sale.service';

@Component({
  selector: 'app-pre-sale-only-event-pass-tucompra',
  templateUrl: './pre-sale-only-event-pass-tucompra.component.html',
  styleUrls: ['./pre-sale-only-event-pass-tucompra.component.css']
})
export class PreSaleOnlyEventPassTucompraComponent implements OnInit {

  public preSaleDocument: any;

  constructor(
    private router: Router,
    private spinner: NgxSpinnerService,
    private preSaleSrv: PreSaleService,
  ) {
    this.preSaleDocument = this.preSaleSrv.checkAndLoadDocumentLocalStorage();

  }

  ngOnInit(): void {
  }

  get total(){
    return purchaseTotales(this.preSaleDocument).total || 0;
  }

  onBack(){
    this.preSaleSrv.updateDocumentLocalStorage({step: '/pre-sale-event-pass/payment-method'});
    this.router.navigate(['/pre-sale-event-pass/payment-method']);
  }
  
  onNext(){
    this.preSaleSrv.updateDocumentLocalStorage({step: '/purchase/summary', completed: true});
    this.router.navigate(['/purchase/summary']);
  }

}
