import { Component, Input, OnInit, ViewChild } from '@angular/core';
import { CustomizationfileService } from 'src/app/services/customizationfile/customizationfile.service';
import { PurchaseService } from 'src/app/services/purchase.service';
import { Sweetalert2Service } from 'src/app/services/sweetalert2.service';
import { MySalesBenefitsModalComponent } from '../my-sales-benefits-modal/my-sales-benefits-modal.component';

@Component({
  selector: 'app-my-sales-dashboard',
  templateUrl: './my-sales-dashboard.component.html',
  styleUrls: ['./my-sales-dashboard.component.css']
})
export class MySalesDashboardComponent implements OnInit {
  public totals: any;
  public totalForItemList: any;
  @Input() couponsList: any;
  @Input() uid: any;


  constructor(
    private purchaseSrv: PurchaseService,
    private sweetalert2Srv: Sweetalert2Service,
  ) { }

  ngOnInit(): void {
    this.purchaseSrv.mySalesPurchaseList(this.uid, 'completed')
      .subscribe(data => {
        this.buildDashboard(data);
      });
  }


  /**
   * @dev withdraw
   * @returns 
   */
  withdraw() {
    return this.sweetalert2Srv.showInfo("coming soo");
  }


  /**
   * @dev buildDashboard
   * @param data 
   */
  buildDashboard(data) {
    if (!data) return

    /// @dev obtiene los totales
    const mapData = data.map(item => {
      return {
        discount_with_coupon: item.discount_with_coupon,
        product: item.product
      }
    });
    this.totals = this.purchaseSrv.getTotal(mapData);


    /// @dev obtiene los totales por producto
    const mapDataProduct = data.map(item => {
      return item.product
    });
    this.totalForItemList = this.purchaseSrv.totalForItem(mapDataProduct);
  }






}
