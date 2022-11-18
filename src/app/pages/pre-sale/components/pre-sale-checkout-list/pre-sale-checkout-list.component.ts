import { Component, OnInit  } from '@angular/core';
import { PreSaleService } from 'src/app/services/pre-sale.service';
import { Sweetalert2stepsService } from 'src/app/services/sweetalert2steps.service';
import { Router } from '@angular/router';
import { Sweetalert2Service } from '../../../../services/sweetalert2.service';
import { Location } from '@angular/common';
import { TranslatePipe } from '@ngx-translate/core';

@Component({
  selector: 'app-pre-sale-checkout-list',
  templateUrl: './pre-sale-checkout-list.component.html',
  styleUrls: ['./pre-sale-checkout-list.component.css']
})
export class PreSaleCheckoutListComponent implements OnInit {

  public preSaleDocument: any;

  constructor(
    public preSaleSrv: PreSaleService,
    private router: Router,
    private sweetAlert2Srv: Sweetalert2Service,
    public location: Location,
    private translatePipe: TranslatePipe,
  ) {
    this.loadLocalData();
  }

  ngOnInit(): void { }

  loadLocalData(){
    this.preSaleDocument = this.preSaleSrv.checkAndLoadDocumentLocalStorage();
  }

  get rooms(){
    return this.preSaleDocument.rooms || [];
  }

  get additionalCategoryPasses(){
    return this.preSaleDocument.additionalCategoryPasses || [];
  }

  /** ======================================
   *                Rooms
   ====================================== */

  async onUpdateItem(params: any){
    this.router.navigate(['/pre-sale', 'step1']);
  }

  async onRemoveItem(params: any){

    let message = this.translatePipe.transform('formValidations.checkoutStepAskRemoveRoomAction', {value: (params.index + 1)});
    const ask = await this.sweetAlert2Srv.askConfirm(message);
    if(!ask){ return; }

    if(this.rooms.length == 1){
      message = this.translatePipe.transform('formValidations.checkoutStepCannotRemoveRoom');
      this.sweetAlert2Srv.showInfo(message);
      return;
    }

    const rooms = this.rooms.filter((value, index) => index != params.index);
    const nroParticipants = rooms.map((row) => row.capacity).reduce((acc, next) => acc + next, 0);

    /**
     * Actualizar porcentaje de descuento por grupo
     */
    let groupDiscount = 0;
    if(nroParticipants >= 20){
      groupDiscount = 0.10;
    }else if(nroParticipants >= 10){
      groupDiscount = 0.05;
    }

    /**
     * Actualizar nro de pases al evento
     */
    let eventPasses: any = [];
    if(['fullPass', 'hotelAndEventPass'].includes(this.preSaleDocument.orderType)){
      const row = Object.assign({}, this.preSaleSrv.EVENTPASS_DEFAULT, {
        quantity: nroParticipants, 
        price: 0, 
        fullPrice: 0
      });
      eventPasses.push(row);
    }

    /**
     * Actualizar nro de pases de categorias si la orden de WLDC
     */
    let additionalCategoryPasses: any = [];
    if(this.preSaleDocument.orderType == 'fullPass'){
      const row = this.preSaleDocument.additionalCategoryPasses || [];
      additionalCategoryPasses = row.map((row) => {
        if(row.type == 'wldc'){ row.quantity = nroParticipants; }
        return row;
      });
    }

    this.preSaleSrv.updateDocumentLocalStorage({
      rooms, 
      nroParticipants, 
      groupDiscount, 
      eventPasses,
      additionalCategoryPasses
    });

    this.loadLocalData();
  }

  /** ======================================
   *      Additional Category Passes
   ====================================== */

  async onUpdateAdditionalCategoryPasses(params: any){
    this.router.navigate(['/pre-sale', 'step2']);
  }

  async onRemoveAdditionalCategoryPasses(params: any){
    if(this.preSaleDocument.additionalCategoryPasses.length == 0){ return; }

    const message = this.translatePipe.transform('formValidations.checkoutStepAskRemoveAdditionalCategoriesAction');
    const ask = await this.sweetAlert2Srv.askConfirm(message);
    if(!ask){ return; }
    
    this.preSaleSrv.updateDocumentLocalStorage({additionalCategoryPasses: []});
    this.loadLocalData();
  }

  onBack(){
    this.preSaleSrv.updateDocumentLocalStorage({step: '/pre-sale/step2'});
    this.router.navigate(['/pre-sale', 'step2']);
  }

  onNext(){
    this.preSaleSrv.updateDocumentLocalStorage({step: '/pre-sale/payment-method'});
    this.router.navigate(['/pre-sale', 'payment-method']);
  }

}
