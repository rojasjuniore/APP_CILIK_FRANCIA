import { Component, Input, OnInit } from '@angular/core';
import { CustomizationfileService } from 'src/app/services/customizationfile/customizationfile.service';
import { PurchaseService } from 'src/app/services/purchase.service';
import { Sweetalert2Service } from 'src/app/services/sweetalert2.service';

@Component({
  selector: 'app-merchant-dashboard',
  templateUrl: './merchant-dashboard.component.html',
  styleUrls: ['./merchant-dashboard.component.css']
})
export class MerchantDashboardComponent implements OnInit {
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
    this.totals = this.getTotal(mapData);


    /// @dev obtiene los totales por producto
    const mapDataProduct = data.map(item => {
      console.log(item, 'show item test')
      return item.product
    });
    this.totalForItemList = this.totalForItem(mapDataProduct);
    console.log(this.totalForItemList, 'totalForItemList test')

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
      globalTotalToPay: 0,
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
