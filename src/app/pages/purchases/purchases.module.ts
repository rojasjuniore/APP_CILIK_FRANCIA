import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { PurchasesRoutingModule } from './purchases-routing.module';
import { PurchaseDetailsComponent } from './components/purchase-details/purchase-details.component';
import { SharedModule } from 'src/app/shared/shared.module';
import { PurchaseCategoryPassCardItemComponent } from './components/purchase-category-pass-card-item/purchase-category-pass-card-item.component';
import { PurchaseDayPassCardItemComponent } from './components/purchase-day-pass-card-item/purchase-day-pass-card-item.component';
import { PurchaseFullpassCardItemComponent } from './components/purchase-fullpass-card-item/purchase-fullpass-card-item.component';
import { PurchaseWeekendPassCardItemComponent } from './components/purchase-weekend-pass-card-item/purchase-weekend-pass-card-item.component';
import { PurchaseHotelEventCardItemComponent } from './components/purchase-hotel-event-card-item/purchase-hotel-event-card-item.component';
// import { PurchaseFullDetailsComponent } from './components/purchase-full-details/purchase-full-details.component';
import { PurchaseInstallmentsComponent } from './components/purchase-installments/purchase-installments.component';
import { PurchaseInstallmentsModalComponent } from './components/purchase-installments-modal/purchase-installments-modal.component';
import { PurchaseInstallmentsVoucherComponent } from './components/purchase-installments-voucher/purchase-installments-voucher.component';


@NgModule({
  declarations: [
    PurchaseDetailsComponent,

  ],
  imports: [
    CommonModule,
    SharedModule,
    PurchasesRoutingModule
  ]
})
export class PurchasesModule { }
