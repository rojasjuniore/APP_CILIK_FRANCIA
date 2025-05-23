import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { CheckoutRoutingModule } from './checkout-routing.module';
import { CheckoutComponent } from './checkout.component';
import { SharedModule } from 'src/app/shared/shared.module';
import { FinalizePurchaseComponent } from './components/finalize-purchase/finalize-purchase.component';


@NgModule({
  declarations: [
    CheckoutComponent,
    FinalizePurchaseComponent,
  ],
  imports: [
    CommonModule,
    SharedModule,
    CheckoutRoutingModule
  ]
})
export class CheckoutModule { }
