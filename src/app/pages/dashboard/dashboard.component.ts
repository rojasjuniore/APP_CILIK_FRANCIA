import { Component, OnInit, ViewChild } from '@angular/core';
import { Router } from '@angular/router';
import { PreSaleModalOnlyCategoriesTermsComponent } from 'src/app/components/pre-sale-modal-only-categories-terms/pre-sale-modal-only-categories-terms.component';
import { AuthenticationService } from 'src/app/services/authentication.service';
import { PreSaleService } from 'src/app/services/pre-sale.service';

@Component({
  selector: 'app-dashboard',
  templateUrl: './dashboard.component.html',
  styleUrls: ['./dashboard.component.css']
})
export class DashboardComponent implements OnInit {

  @ViewChild(PreSaleModalOnlyCategoriesTermsComponent) modalCategoriesTerms!: PreSaleModalOnlyCategoriesTermsComponent;

  constructor(
    private authSrv: AuthenticationService,
    private preSaleSrv: PreSaleService,
    private router: Router,
  ) { }

  ngOnInit(): void {
  }

  /**
   * Crear nueva orden de venta
   */
  async newOrder(){
    const uid = await this.authSrv.getUIDPromise();
    this.authSrv.saveTokenPush(uid);
    this.preSaleSrv.checkAndLoadDocumentLocalStorage();
    this.router.navigate(['/pre-sale/step1']);
  }

  async showCategoriesTerms(){
    this.modalCategoriesTerms.showModal();
    return;
  }

  async onModalCategoriesTermsClose(status: any){
    console.log('onModalCategoriesTermsClose', status);
    if(!status){
      return;
    }

    const uid = await this.authSrv.getUIDPromise();
    this.authSrv.saveTokenPush(uid);
    this.preSaleSrv.buildAndStore({orderType: 'categoryPass', setup: 'automatic'}, true);
    this.router.navigate(['/pre-sale-categories']);
  }

}
