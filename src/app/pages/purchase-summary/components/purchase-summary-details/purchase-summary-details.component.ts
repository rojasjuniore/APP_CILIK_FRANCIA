import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { from, Observable } from 'rxjs';
import { PreSaleService } from 'src/app/services/pre-sale.service';
import { PurchaseService } from 'src/app/services/purchase.service';

@Component({
  selector: 'app-purchase-summary-details',
  templateUrl: './purchase-summary-details.component.html',
  styleUrls: ['./purchase-summary-details.component.css']
})
export class PurchaseSummaryDetailsComponent implements OnInit {

  public purchaseDocument: any;
  public orderId: any;
  public purchaseDocument$!: Observable<any>;

  constructor(
    private preSaleSrv: PreSaleService,
    private purchaseSrv: PurchaseService,
    private router: Router,
    private activeRoute: ActivatedRoute,
  ) {
    this.orderId = this.activeRoute.snapshot.paramMap.get('id');
  }

  ngOnInit(): void {
    this.purchaseDocument$ = from(this.purchaseSrv.getPurchaseDocument(this.orderId));
    // this.purchaseDocument$ = this.preSaleSrv.getPurchaseDocument();
  }

  loadLocalData(){
    this.purchaseDocument = this.preSaleSrv.checkAndLoadDocumentLocalStorage();
  }

  get rooms(){
    // return this.purchaseDocument?.rooms || [];
    return [];
  }

  get additionalCategoryPasses(){
    // return this.purchaseDocument?.additionalCategoryPasses || [];
    return [];
  }

  onKeepBuying(){
    this.preSaleSrv.removeDocumentLocalStorage();
    this.router.navigate(['/pages/dashboard']);
  }

}
