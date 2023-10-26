import { Component, OnInit } from '@angular/core';
import { CommonService } from 'src/app/services/common.service';
import { CustomizationfileService } from 'src/app/services/customizationfile/customizationfile.service';
import { PurchaseService } from 'src/app/services/purchase.service';

@Component({
  selector: 'app-my-sales-dashboard',
  templateUrl: './my-sales-dashboard.component.html',
  styleUrls: ['./my-sales-dashboard.component.css']
})
export class MySalesDashboardComponent implements OnInit {
  public totals: any;
  totalForItemList: any;

  constructor(
    private customizationfileSrv: CustomizationfileService,
    private purchaseSrv: PurchaseService,
    private commonSrv: CommonService,
  ) { }

  ngOnInit(): void {
    const uid = this.customizationfileSrv.getUid();
    this.purchaseSrv.mySalesPurchaseList(uid)
      .subscribe(data => {
        this.buildDashboard(data);
      });
  }


  /**
   * @dev buildDashboard
   * @param data 
   */
  buildDashboard(data) {
    const mapData = data.map(item => {
      return {
        discount_with_coupon: item.discount_with_coupon,
        product: item.product
      }
    });

    this.totals = this.getTotal(mapData);


    const mapDataProduct = data.map(item => {
      return item.product
    });

    console.log(mapDataProduct)

    this.totalForItemList = this.totalForItem(mapDataProduct);
    console.log("totalForItem", this.totalForItemList)


  }


  /**
   * 
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
   * 
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
