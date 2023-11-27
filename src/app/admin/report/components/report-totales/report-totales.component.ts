import { Component, Input, OnChanges, OnInit, SimpleChanges } from '@angular/core';
import { PurchaseService } from 'src/app/services/purchase.service';

@Component({
  selector: 'app-report-totales',
  templateUrl: './report-totales.component.html',
  styleUrls: ['./report-totales.component.css']
})
export class ReportTotalesComponent implements OnChanges {
  @Input() list: any[] = [];
  totals: any;
  totalForItemList: any;

  constructor(private purchaseSrv: PurchaseService) { }


  ngOnChanges(changes: SimpleChanges): void {
    const { list } = changes;
    if (list && list.currentValue) {
      this.list = list.currentValue;
      this.buildDashboard(this.list);
    }
  }



  /**
   * @dev buildDashboard
   * @param data 
   */
  buildDashboard(data) {
    console.log('buildDashboard', data);
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

    console.log('buildDashboard', this.totals, this.totalForItemList);

  }



}
