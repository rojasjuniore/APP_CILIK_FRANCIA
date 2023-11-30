import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { PipesModule } from 'src/app/pipes/pipes.module';
import { SharedModule } from 'src/app/shared/shared.module';
import { MerchantPurchasesRoutingModule } from './merchant-purchases-routing.module';
import { MerchantPurchasesComponent } from './merchant-purchases.component';
import { MerchantPurchaseDetailsComponent } from './components/merchant-purchase-details/merchant-purchase-details.component';
import { MerchantModalEditAmountComponent } from './components/merchant-modal-edit-amount/merchant-modal-edit-amount.component';
import { MerchantPaymentListComponent } from './components/merchant-payment-list/merchant-payment-list.component';


@NgModule({
  declarations: [
    MerchantPurchasesComponent,
    MerchantPurchaseDetailsComponent,
    MerchantModalEditAmountComponent,
    MerchantPaymentListComponent,
  ],
  imports: [
    CommonModule,
    SharedModule,
    PipesModule,
    MerchantPurchasesRoutingModule
  ]
})
export class MerchantPurchasesModule { }
