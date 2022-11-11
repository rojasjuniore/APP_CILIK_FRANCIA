import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { TranslatePipe } from '@ngx-translate/core';
import { PreSaleService } from 'src/app/services/pre-sale.service';
import { Sweetalert2Service } from 'src/app/services/sweetalert2.service';

@Component({
  selector: 'app-pre-sale-only-event-pass-checkout-list',
  templateUrl: './pre-sale-only-event-pass-checkout-list.component.html',
  styleUrls: ['./pre-sale-only-event-pass-checkout-list.component.css']
})
export class PreSaleOnlyEventPassCheckoutListComponent implements OnInit {

  public preSaleDocument: any;

  constructor(
    public preSaleSrv: PreSaleService,
    private router: Router,
    private sweetAlert2Srv: Sweetalert2Service,
    private translatePipe: TranslatePipe,
  ) {
    this.loadData();
  }

  ngOnInit(): void {
  }

  loadData(){
    this.preSaleDocument = this.preSaleSrv.checkAndLoadDocumentLocalStorage();
  }

  async onUpdateAdditionalCategoryPasses(params: any){
    this.router.navigate(['/pre-sale-event-pass', 'step1']);
    return;
  }

  async onRemoveAdditionalCategoryPasses(params: any){
    this.loadData();

    if(this.preSaleDocument.eventPasses.length == 0){ return; }

    // const message = this.translatePipe.transform('formValidations.checkoutStepAskRemoveAdditionalCategoriesAction');
    const message = "¿Desea remover los pases añadidos en esta orden?"
    const ask = await this.sweetAlert2Srv.askConfirm(message);
    if(!ask){ return; }
    
    this.preSaleSrv.updateDocumentLocalStorage({eventPasses: []});
    this.onBack();
  }

  async onBack(){
    this.preSaleSrv.updateDocumentLocalStorage({step: '/pre-sale-event-pass/step1'});
    this.router.navigate(['/pre-sale-event-pass', 'step1']);
  }
  
  async onNext(){
    this.loadData();

    const { eventPasses = [] } = this.preSaleDocument;
    const rule = eventPasses[0];
    const quantity = rule?.quantity || 0;

    if(quantity == 0){ 
      // const message = await this.translatePipe.transform('formValidations.additionalCategoriesRequired');
      const message = 'Debe seleccionar al menos un participante para poder continuar';
      this.sweetAlert2Srv.showWarning(message);
      this.onBack();
      return;
    }

    // this.preSaleSrv.updateDocumentLocalStorage({step: '/pre-sale-event-pass/payment-method'});
    // this.router.navigate(['/pre-sale-event-pass', 'payment-method']);
  }

}
