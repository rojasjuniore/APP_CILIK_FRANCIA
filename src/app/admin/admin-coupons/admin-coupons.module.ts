import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { AdminCouponsRoutingModule } from './admin-coupons-routing.module';
import { AdminCouponsComponent } from './components/admin-coupons/admin-coupons.component';
import { AddCouponModalComponent } from './components/add-coupon-modal/add-coupon-modal.component';
import { UpdateCouponModalComponent } from './components/update-coupon-modal/update-coupon-modal.component';
import { ComponentsModule } from 'src/app/components/components.module';


@NgModule({
  declarations: [
    AdminCouponsComponent,
    AddCouponModalComponent,
    UpdateCouponModalComponent
  ],
  imports: [
    CommonModule,
    ComponentsModule,
    AdminCouponsRoutingModule
  ]
})
export class AdminCouponsModule { }
