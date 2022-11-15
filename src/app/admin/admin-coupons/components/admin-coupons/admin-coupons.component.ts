import { Component, OnInit, ViewChild } from '@angular/core';
import { Observable } from 'rxjs';
import { CouponsService } from 'src/app/services/coupons.service';
import { AddCouponModalComponent } from '../add-coupon-modal/add-coupon-modal.component';
import { UpdateCouponModalComponent } from '../update-coupon-modal/update-coupon-modal.component';

@Component({
  selector: 'app-admin-coupons',
  templateUrl: './admin-coupons.component.html',
  styleUrls: ['./admin-coupons.component.css']
})
export class AdminCouponsComponent implements OnInit {

  @ViewChild(AddCouponModalComponent) modalAdd!: AddCouponModalComponent;
  @ViewChild(UpdateCouponModalComponent) modalUpdate!: UpdateCouponModalComponent;

  public couponList$!: Observable<any[]>;

  constructor(
    private couponSrv: CouponsService
  ) { }

  ngOnInit(): void {
    this.couponList$ = this.couponSrv.getDynamic([]);
  }

  async add(){
    return this.modalAdd.show();
  }

}
