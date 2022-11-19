import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import moment from 'moment';
import { NgxSpinnerService } from 'ngx-spinner';
import { purchaseTotales } from 'src/app/helpers/purchase-totales.helper';
import { PreSaleService } from 'src/app/services/pre-sale.service';
import { PurchaseService } from 'src/app/services/purchase.service';

@Component({
  selector: 'app-pre-sale-paypal',
  templateUrl: './pre-sale-paypal.component.html',
  styleUrls: ['./pre-sale-paypal.component.css']
})
export class PreSalePaypalComponent implements OnInit {

  public preSaleDocument: any;

  constructor(
    private router: Router,
    private preSaleSrv: PreSaleService,
    private spinner: NgxSpinnerService,
    private purchaseSrv: PurchaseService,
  ) {
    this.preSaleDocument = this.preSaleSrv.checkAndLoadDocumentLocalStorage();
  }

  ngOnInit(): void { }


  get total(){
    return purchaseTotales(this.preSaleDocument).total;
  }

  async onPaypalResponse(params: any){
    const { type, data } = params;
    console.log({type, data});

    switch (type) {
      case 'cancel':
        console.log('Cancelado', data);
        break;
      case 'error':
        console.log('Error', data);
        break;
    
      default:
        return this.saveDocument(data);
    }

    console.log({type, data});
  }

  async saveDocument(metadata: any){
    try {
      await this.spinner.show();

      /** Procesar orden y retornar enlace de redirección */
      const url = await this.preSaleSrv.completePreSaleOrder(metadata, {payedAt: moment().valueOf()});
      this.router.navigate([url]);
      return;
      
    } catch (err) {
      console.log('Error on PreSalePaypalComponent.saveDocument()', err);
      return;
    }finally{
      this.spinner.hide();
    }
  }


  onBack(){
    this.preSaleSrv.updateDocumentLocalStorage({step: '/pre-sale/payment-method'});
    this.router.navigate(['/pre-sale/payment-method']);
  }
  onNext(){
    this.preSaleSrv.updateDocumentLocalStorage({step: '/purchase/summary', completed: true});
    this.router.navigate(['/purchase/summary']);
  }

}
