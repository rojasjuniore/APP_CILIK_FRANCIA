import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { PurchasesRoutingModule } from './purchases-routing.module';
import { PurchaseDetailsComponent } from './components/purchase-details/purchase-details.component';


@NgModule({
  declarations: [
    PurchaseDetailsComponent
  ],
  imports: [
    CommonModule,
    PurchasesRoutingModule
  ]
})
export class PurchasesModule { }
