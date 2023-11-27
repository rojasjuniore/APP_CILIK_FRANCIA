import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { PipesModule } from 'src/app/pipes/pipes.module';
import { SharedModule } from 'src/app/shared/shared.module';
import { MerchantPurchasesRoutingModule } from './merchant-purchases-routing.module';
import { MerchantPurchasesComponent } from './merchant-purchases.component';



@NgModule({
  declarations: [
    MerchantPurchasesComponent
  ],
  imports: [
    CommonModule,
    SharedModule,
    PipesModule,
    MerchantPurchasesRoutingModule
  ]
})
export class MerchantPurchasesModule { }
