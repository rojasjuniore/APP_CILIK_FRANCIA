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


  constructor(
    private customizationfileSrv: CustomizationfileService,
    private purchaseSrv: PurchaseService,
    private sweetalert2Srv: Sweetalert2Service,
  ) { }

  ngOnInit(): void {
    const uid = this.customizationfileSrv.getUid();
    this.purchaseSrv.mySalesPurchaseList(uid, 'completed')
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
    this.totals = this.getTotal(mapData);


    /// @dev obtiene los totales por producto
    const mapDataProduct = data.map(item => {
      return item.product
    });
    this.totalForItemList = this.totalForItem(mapDataProduct);
  }


  /**
   * @dev obtiene los totales
   * @param dataArray 
   * @returns 
   */
  getTotal(dataArray: any[]) {
    const totals = dataArray.reduce((acc, data) => {
      acc.globalDiscount += data.discount_with_coupon.globalDiscount;
      acc.globalSubtotal += data.discount_with_coupon.globalSubtotal;
      acc.globalTotalToPay += data.discount_with_coupon.globalTotalToPay;
      return acc;
    }, {
      globalDiscount: 0,
      globalSubtotal: 0,
      globalTotalToPay: 0
    });

    return totals
  }

  /**
   * @dev agrupa los totales por producto
   * @param dataArray 
   * @returns 
   */
  totalForItem(dataArray: any[]) {
    const flatArray = dataArray.flat();
    const groupedData = flatArray.reduce((acc, item) => {
      const keyEntry = acc.find(entry => entry.key === item.key);
      if (!keyEntry) {
        acc.push({ key: item.key, total: item.totales, count: 1 });
      } else {
        keyEntry.total += item.totales;
        keyEntry.count += 1;
      }
      return acc;
    }, []);
    return groupedData;
  }



}
