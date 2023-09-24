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


@NgModule({
  declarations: [
    PurchaseDetailsComponent,
    PurchaseCategoryPassCardItemComponent,
    PurchaseDayPassCardItemComponent,
    PurchaseFullpassCardItemComponent,
    PurchaseWeekendPassCardItemComponent,
    PurchaseHotelEventCardItemComponent
  ],
  imports: [
    CommonModule,
    SharedModule,
    PurchasesRoutingModule
  ]
})
export class PurchasesModule { }
