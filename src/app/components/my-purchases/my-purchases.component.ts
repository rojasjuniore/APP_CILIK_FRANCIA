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

  public purchasesListP$!: Observable<any[]>;
  public purchasesListC$!: Observable<any[]>;
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
      this.purchasesListP$ = of([]);
      return;
    };

    this.purchasesListP$ = this.purchaseSrv.userPurchaseListPending(uid.toString())
    .pipe(
      map((data) => {
        console.log(data)
        const counter = data.length + 1;
        return data.map((row, index) => Object.assign({}, row, { index: counter - (index + 1) }))
      })
    );

    this.purchasesListC$ = this.purchaseSrv.userPurchaseListCompleted(uid.toString())
    .pipe(
      map((data) => {
        console.log(data)
        const counter = data.length + 1;
        return data.map((row, index) => Object.assign({}, row, { index: counter - (index + 1) }))
      })
    );

  }

  onShowDetails(order: any){
    console.log('order', order);
    this.modalDetails.showModal(order);
  }

}
