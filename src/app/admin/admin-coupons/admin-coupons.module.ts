import { CommonModule } from '@angular/common';
import { NgModule } from '@angular/core';
import { PipesModule } from 'src/app/pipes/pipes.module';
import { SharedModule } from 'src/app/shared/shared.module';
import { AdminCouponsRoutingModule } from './admin-coupons-routing.module';
import { AdminCouponsComponent } from './admin-coupons.component';
import { AdminCouponsUpdatedComponent } from './components/admin-coupons-updated/admin-coupons-updated.component';

@NgModule({
  declarations: [
    AdminCouponsComponent,
    AdminCouponsUpdatedComponent
  ],
  imports: [
    CommonModule,
    SharedModule,
    PipesModule,
    AdminCouponsRoutingModule
    ]
})
export class AdminCouponsModule { }
