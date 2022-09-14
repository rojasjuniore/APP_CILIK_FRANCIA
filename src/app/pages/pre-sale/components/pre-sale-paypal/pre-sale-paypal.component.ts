import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { NgxSpinnerService } from 'ngx-spinner';
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
    const roomsAmount = this.preSaleDocument.rooms
      .map((room: any) => room.price)
      .reduce((a: number, b: number) => a + b, 0);

    const additionalDaysAmount = this.preSaleDocument.rooms
      .map((room) => room.additionals)
      .filter((row) => row.length > 0)
      .map((data) => data.map((row) => row.quantity * row.price).reduce((prev, curr) => prev + curr, 0))
      .reduce((prev, curr) => prev + curr, 0);

    const additionalCategoryPasses = this.preSaleDocument.additionalCategoryPasses
      .map((row) => row.quantity * row.price)
      .reduce((prev, curr) => prev + curr, 0)

    return [roomsAmount, additionalDaysAmount, additionalCategoryPasses]
    .reduce((prev, curr) => prev + curr, 0);
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

      const url = `/purchase/summary/${this.preSaleDocument.orderId}/details`;

      const document = Object.assign({}, this.preSaleDocument, {
        metadata,
        step: url,
        payed: true,
        completed: true,
      });

      /** Store Document */
      await this.purchaseSrv.storePurchase(document.orderId,document);

      /** Send Mail Summary */
      await this.purchaseSrv.sendPurchaseSummaryNotification(document.uid, document.orderId);

      this.preSaleSrv.removeDocumentLocalStorage();

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
