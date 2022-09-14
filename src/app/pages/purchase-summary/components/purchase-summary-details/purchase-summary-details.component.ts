import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { PreSaleService } from 'src/app/services/pre-sale.service';

@Component({
  selector: 'app-purchase-summary-details',
  templateUrl: './purchase-summary-details.component.html',
  styleUrls: ['./purchase-summary-details.component.css']
})
export class PurchaseSummaryDetailsComponent implements OnInit {

  public purchaseDocument: any;

  constructor(
    private preSaleSrv: PreSaleService,
    private router: Router,
  ) {
    this.loadLocalData();
  }

  ngOnInit(): void {
  }

  loadLocalData(){
    // this.purchaseDocument = this.preSaleSrv.checkAndLoadDocumentLocalStorage();
  }

  get rooms(){
    return this.purchaseDocument.rooms || [];
  }

  get additionalCategoryPasses(){
    return this.purchaseDocument.additionalCategoryPasses || [];
  }

  onKeepBuying(){
    this.preSaleSrv.removeDocumentLocalStorage();
    this.router.navigate(['/pages/dashboard']);
  }

}
