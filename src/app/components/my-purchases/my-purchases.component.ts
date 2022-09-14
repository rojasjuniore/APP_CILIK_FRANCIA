import { Component, OnInit, ViewChild } from '@angular/core';
import { map, Observable, of } from 'rxjs';
import { AuthenticationService } from 'src/app/services/authentication.service';
import { PurchaseService } from 'src/app/services/purchase.service';
import { PurchaseSummaryModalDetailsComponent } from '../purchase-summary-modal-details/purchase-summary-modal-details.component';

@Component({
  selector: 'app-my-purchases',
  templateUrl: './my-purchases.component.html',
  styleUrls: ['./my-purchases.component.css']
})
export class MyPurchasesComponent implements OnInit {

  @ViewChild (PurchaseSummaryModalDetailsComponent) modalDetails!: PurchaseSummaryModalDetailsComponent;

  public purchasesList$!: Observable<any[]>;
  public uid: any;

  constructor(
    private purchaseSrv: PurchaseService,
    private authSrv: AuthenticationService,
  ) { }

  ngOnInit(): void {
    this.loadData();
  }

  async loadData(){
    const uid = await this.authSrv.getUIDPromise();

    if(!uid) {
      this.purchasesList$ = of([]);
      return;
    };

    this.purchasesList$ = this.purchaseSrv.userPurchaseList(uid.toString())
    .pipe(
      map((data) => data.map((row, index) => Object.assign({}, row, { index: index + 1 })))
    )
  }

  onShowDetails(order: any){
    console.log('order', order);
    this.modalDetails.showModal(order);
  }

}
