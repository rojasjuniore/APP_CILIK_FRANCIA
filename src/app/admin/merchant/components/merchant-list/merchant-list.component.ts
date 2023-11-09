import { Component, Input, OnInit, ViewChild } from '@angular/core';
import { Observable, map } from 'rxjs';
import { MySalesViewComponent } from 'src/app/admin/my-sales/components/my-sales-view/my-sales-view.component';
import { CustomizationfileService } from 'src/app/services/customizationfile/customizationfile.service';
import { PurchaseService } from 'src/app/services/purchase.service';

@Component({
  selector: 'app-merchant-list',
  templateUrl: './merchant-list.component.html',
  styleUrls: ['./merchant-list.component.css']
})
export class MerchantListComponent implements OnInit {

  public purchasesListC$!: Observable<any[]>;
  @Input() uid: any;
  @ViewChild('modalMySalesView') modalMySalesView!: MySalesViewComponent;


  constructor(
    private customizationfileSrv: CustomizationfileService,
    private purchaseSrv: PurchaseService,
  ) { }

  ngOnInit(): void {
    console.log("uid", this.uid)
    this.purchasesListC$ = this.purchaseSrv.myMerchantPurchaseList(this.uid, 'completed')
      .pipe(map((data: any) => {
        console.log("purchases", data)
        const counter = data.length + 1;
        return data.map((row, index) => Object.assign({}, row, { index: counter - (index + 1) }))
      }));
  }





  /**
   * @dev Open modal with purchase info
   * @param item 
   */
  openSales(item) {
    // console.log(item)
    this.modalMySalesView.showModal(item);
  }



  /**
   * 
   * @param $event 
   */
  onModalMySalesView($event) {
    console.log($event)
  }

}
