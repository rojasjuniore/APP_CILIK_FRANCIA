import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import moment from 'moment';
import { NgxSpinnerService } from 'ngx-spinner';
import { env } from 'process';
import { purchaseTotales } from 'src/app/helpers/purchase-totales.helper';
import { AuthenticationService } from 'src/app/services/authentication.service';
import { PreSaleService } from 'src/app/services/pre-sale.service';
import { PurchaseService } from 'src/app/services/purchase.service';
import { environment } from 'src/environments/environment';

@Component({
  selector: 'app-tucompra-presale',
  templateUrl: './tucompra-presale.component.html',
  styleUrls: ['./tucompra-presale.component.css']
})
export class TucompraPresaleComponent implements OnInit {
  public preSaleDocument: any;
  tuCompraObject: any

  constructor(
    private router: Router,
    private preSaleSrv: PreSaleService,
    private spinner: NgxSpinnerService,
    private purchaseSrv: PurchaseService,
    private authSrv: AuthenticationService
  ) {
    this.preSaleDocument = this.preSaleSrv.checkAndLoadDocumentLocalStorage();
  }

  async ngOnInit() {
  }


  get total() {
    return purchaseTotales(this.preSaleDocument).total;
  }





  async saveDocument(metadata: any) {
    try {
      await this.spinner.show();

      /** Procesar orden y retornar enlace de redirección */
      const url = await this.preSaleSrv.completePreSaleOrder(metadata, { payedAt: moment().valueOf() });



  
      // this.router.navigate([url]);
      return;

    } catch (err) {
      console.log('Error on PreSalePaypalComponent.saveDocument()', err);
      return;
    } finally {
      this.spinner.hide();
    }
  }


  onBack() {
    this.preSaleSrv.updateDocumentLocalStorage({ step: '/pre-sale/payment-method' });
    this.router.navigate(['/pre-sale/payment-method']);
  }


  onNext() {
    this.preSaleSrv.updateDocumentLocalStorage({ step: '/purchase/summary', completed: true });
    this.router.navigate(['/purchase/summary']);
  }

}
