import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { PreSaleService } from 'src/app/services/pre-sale.service';
import { Sweetalert2Service } from 'src/app/services/sweetalert2.service';

@Component({
  selector: 'app-pre-sale-only-categories-checkout-list',
  templateUrl: './pre-sale-only-categories-checkout-list.component.html',
  styleUrls: ['./pre-sale-only-categories-checkout-list.component.css']
})
export class PreSaleOnlyCategoriesCheckoutListComponent implements OnInit {

  public preSaleDocument: any;

  constructor(
    public preSaleSrv: PreSaleService,
    private router: Router,
    private sweetAlert2Srv: Sweetalert2Service,
  ) {
    this.preSaleDocument = this.preSaleSrv.checkAndLoadDocumentLocalStorage();
  }

  ngOnInit(): void {
  }

  async onUpdateAdditionalCategoryPasses(params: any){
    this.router.navigate(['/pre-sale-categories', 'step1']);
    return;
  }

  async onRemoveAdditionalCategoryPasses(params: any){
    if(this.preSaleDocument.additionalCategoryPasses.length == 0){ return; }

    const ask = await this.sweetAlert2Srv.askConfirm(`¿Desea eliminar todas las categorías adicionales?`);
    if(!ask){ return; }
    
    this.preSaleSrv.updateDocumentLocalStorage({additionalCategoryPasses: []});
    this.onBack();
  }

  async onBack(){
    this.preSaleSrv.updateDocumentLocalStorage({step: '/pre-sale-categories/step1'});
    this.router.navigate(['/pre-sale-categories', 'step1']);
  }
  
  async onNext(){

    if(this.preSaleDocument.additionalCategoryPasses.length == 0){ 
      this.sweetAlert2Srv.showWarning('Debe seleccionar al menos una categoría adicional');
      this.onBack();
      return;
    }

    this.preSaleSrv.updateDocumentLocalStorage({step: '/pre-sale-categories/payment-method'});
    this.router.navigate(['/pre-sale-categories', 'payment-method']);
  }

}
