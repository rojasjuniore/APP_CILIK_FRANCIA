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

    const nroParticipantsByRoom = this.preSaleDocument.rooms
    .map((room: any) => room.capacity)
    .reduce((a: number, b: number) => a + b, 0);

    const roomsAmount = this.preSaleDocument.rooms
      .map((room: any) => room.price)
      .reduce((a: number, b: number) => a + b, 0);

    const additionalDaysAmount = this.preSaleDocument.rooms
      .map((room) => room.additionals)
      .filter((row) => row.length > 0)
      .map((data) => data.map((row) => row.quantity * row.price).reduce((prev, curr) => prev + curr, 0))
      .reduce((prev, curr) => prev + curr, 0);

    const additionalCategoryPasses = this.preSaleDocument.additionalCategoryPasses
      .map((row) => {
        if(row.type == 'group'){
          return row.data.map((group) => group.quantity * group.price)
            .reduce((prev, curr) => prev + curr, 0)
  
        }else{
          return row.quantity * row.price;
        }
      })
      .reduce((prev, curr) => prev + curr, 0)

    const subTotal = [roomsAmount, additionalDaysAmount, additionalCategoryPasses]
    .reduce((prev, curr) => prev + curr, 0);

    /**
     * Calcular descuento por grupo
     */
     let groupDiscount = 0;
     if(nroParticipantsByRoom >= 20){
       groupDiscount = subTotal * 0.10;
     }else if(nroParticipantsByRoom >= 10){
       groupDiscount = subTotal * 0.05;
     }

    const total = subTotal - groupDiscount;
    return total;
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
      const url = await this.preSaleSrv.completePreSaleOrder(metadata);
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
