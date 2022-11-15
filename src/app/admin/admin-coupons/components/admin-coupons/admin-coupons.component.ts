import { Component, OnInit, ViewChild } from '@angular/core';
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

  constructor() { }

  ngOnInit(): void {
  }

  async add(){
    return this.modalAdd.show();
  }

}
