import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { PreSaleService } from 'src/app/services/pre-sale.service';

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
  ) {
    this.preSaleDocument = this.preSaleSrv.checkAndLoadDocumentLocalStorage();
  }

  ngOnInit(): void {
  }

  async onUpdateAdditionalCategoryPasses(params: any){}

  async onRemoveAdditionalCategoryPasses(params: any){}

  async onBack(){
    this.preSaleSrv.updateDocumentLocalStorage({step: '/pre-sale-categories/step1'});
    this.router.navigate(['/pre-sale-categories', 'step1']);
  }

  async onNext(){}

}
