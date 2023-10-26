import { Component, OnInit, ViewChild } from '@angular/core';
import { Observable, map } from 'rxjs';
import { CustomizationfileService } from 'src/app/services/customizationfile/customizationfile.service';
import { PurchaseService } from 'src/app/services/purchase.service';
import { MySalesViewComponent } from '../my-sales-view/my-sales-view.component';

@Component({
  selector: 'app-my-sales-list',
  templateUrl: './my-sales-list.component.html',
  styleUrls: ['./my-sales-list.component.css']
})
export class MySalesListComponent implements OnInit {
  public purchasesListC$!: Observable<any[]>;

  @ViewChild('modalMySalesView') modalMySalesView!: MySalesViewComponent;


  constructor(
    private customizationfileSrv: CustomizationfileService,
    private purchaseSrv: PurchaseService,
  ) { }

  ngOnInit(): void {
    const uid = this.customizationfileSrv.getUid();
    console.log(uid)
    this.purchasesListC$ = this.purchaseSrv.mySalesPurchaseList(uid, 'completed')
      .pipe(map((data: any) => {
        // console.log(data)
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
