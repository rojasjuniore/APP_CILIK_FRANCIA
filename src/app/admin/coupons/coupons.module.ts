import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { CouponsRoutingModule } from './coupons-routing.module';
import { CouponsComponent } from './coupons.component';
import { SharedModule } from 'src/app/shared/shared.module';
import { CouponsAddFormComponent } from './components/coupons-add-form/coupons-add-form.component';
import { CouponsUpdateFormComponent } from './components/coupons-update-form/coupons-update-form.component';
import { ModalCouponFindOwnerComponent } from './components/modal-coupon-find-owner/modal-coupon-find-owner.component';
import { PipesModule } from 'src/app/pipes/pipes.module';


@NgModule({
  declarations: [
    CouponsComponent,
    CouponsAddFormComponent,
    CouponsUpdateFormComponent,
    ModalCouponFindOwnerComponent
  ],
  imports: [
    CommonModule,
    SharedModule,
    PipesModule,
    CouponsRoutingModule,
  ]
})
export class CouponsModule { }
