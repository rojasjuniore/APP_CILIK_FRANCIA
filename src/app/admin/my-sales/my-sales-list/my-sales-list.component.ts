import { Component, OnInit, TemplateRef, ViewChild } from '@angular/core';
import { Observable, map, pipe } from 'rxjs';
import { CouponService } from 'src/app/services/coupon.service';
import { CustomizationfileService } from 'src/app/services/customizationfile/customizationfile.service';
import { PurchaseService } from 'src/app/services/purchase.service';
import { MySalesViewComponent } from '../my-sales-view/my-sales-view.component';
import { BsModalRef } from 'ngx-bootstrap/modal';
import { BsModalService } from 'src/app/services/bs-modal.service';

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
    private couponSrv: CouponService,
    private modalService: BsModalService,
  ) { }

  ngOnInit(): void {
    const uid = this.customizationfileSrv.getUid();
    console.log(uid)
    this.purchasesListC$ = this.purchaseSrv.mySalesPurchaseList(uid)
      .pipe(map((data: any) => {
        // console.log(data)
        const counter = data.length + 1;
        return data.map((row, index) => Object.assign({}, row, { index: counter - (index + 1) }))
      })
      );
  }





  /**
   * @dev Open modal with purchase info
   * @param item 
   */
  openSales(item) {
    console.log(item)
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
