import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { CouponsRoutingModule } from './coupons-routing.module';
import { CouponsComponent } from './coupons.component';
import { SharedModule } from 'src/app/shared/shared.module';
import { CouponsAddFormComponent } from './components/coupons-add-form/coupons-add-form.component';
import { CouponsUpdateFormComponent } from './components/coupons-update-form/coupons-update-form.component';


@NgModule({
  declarations: [
    CouponsComponent,
    CouponsAddFormComponent,
    CouponsUpdateFormComponent
  ],
  imports: [
    CommonModule,
    SharedModule,
    CouponsRoutingModule
  ]
})
export class CouponsModule { }
