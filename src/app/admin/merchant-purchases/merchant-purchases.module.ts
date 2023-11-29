import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { PipesModule } from 'src/app/pipes/pipes.module';
import { SharedModule } from 'src/app/shared/shared.module';
import { MerchantPurchasesRoutingModule } from './merchant-purchases-routing.module';
import { MerchantPurchasesComponent } from './merchant-purchases.component';
import { MerchantPurchaseDetailsComponent } from './components/merchant-purchase-details/merchant-purchase-details.component';
import { MerchantPurchaseFullpassCardItemComponent } from './components/merchant-purchase-fullpass-card-item/merchant-purchase-fullpass-card-item.component';
import { MerchantPurchaseCategoryPassCardItemComponent } from './components/merchant-purchase-category-pass-card-item/merchant-purchase-category-pass-card-item.component';
import { MerchantPurchaseWeekendPassCardItemComponent } from './components/merchant-purchase-weekend-pass-card-item/merchant-purchase-weekend-pass-card-item.component';
import { MerchantPurchaseDayPassCardItemComponent } from './components/merchant-purchase-day-pass-card-item/merchant-purchase-day-pass-card-item.component';
import { MerchantPurchaseHotelEventCardItemComponent } from './components/merchant-purchase-hotel-event-card-item/merchant-purchase-hotel-event-card-item.component';
import { MerchantPurchaseFullDetailsComponent } from './components/merchant-purchase-full-details/merchant-purchase-full-details.component';
import { MerchantPurchaseInstallmentsComponent } from './components/merchant-purchase-installments/merchant-purchase-installments.component';
import { MerchantPurchaseBankTransferInfoCardItemComponent } from './components/merchant-purchase-bank-transfer-info-card-item/merchant-purchase-bank-transfer-info-card-item.component';



@NgModule({
  declarations: [
    MerchantPurchasesComponent,
    MerchantPurchaseDetailsComponent,
    MerchantPurchaseFullpassCardItemComponent,
    MerchantPurchaseCategoryPassCardItemComponent,
    MerchantPurchaseWeekendPassCardItemComponent,
    MerchantPurchaseDayPassCardItemComponent,
    MerchantPurchaseHotelEventCardItemComponent,
    MerchantPurchaseFullDetailsComponent,
    MerchantPurchaseInstallmentsComponent,
    MerchantPurchaseBankTransferInfoCardItemComponent
  ],
  imports: [
    CommonModule,
    SharedModule,
    PipesModule,
    MerchantPurchasesRoutingModule
  ]
})
export class MerchantPurchasesModule { }
