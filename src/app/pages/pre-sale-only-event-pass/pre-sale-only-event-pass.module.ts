import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { PreSaleOnlyEventPassRoutingModule } from './pre-sale-only-event-pass-routing.module';
import { PreSaleOnlyEventPassComponent } from './components/pre-sale-only-event-pass/pre-sale-only-event-pass.component';
import { ComponentsModule } from 'src/app/components/components.module';
import { PreSaleOnlyEventPassSelectComponent } from './components/pre-sale-only-event-pass-select/pre-sale-only-event-pass-select.component';
import { TranslateModule } from '@ngx-translate/core';
import { PreSaleOnlyEventPassCheckoutListComponent } from './components/pre-sale-only-event-pass-checkout-list/pre-sale-only-event-pass-checkout-list.component';
import { PreSaleOnlyEventPassPaymentMethodsComponent } from './components/pre-sale-only-event-pass-payment-methods/pre-sale-only-event-pass-payment-methods.component';
import { PreSaleOnlyEventPassPaypalComponent } from './components/pre-sale-only-event-pass-paypal/pre-sale-only-event-pass-paypal.component';
import { MaskPipe, NgxMaskModule } from 'ngx-mask';


@NgModule({
  declarations: [
    PreSaleOnlyEventPassComponent,
    PreSaleOnlyEventPassSelectComponent,
    PreSaleOnlyEventPassCheckoutListComponent,
    PreSaleOnlyEventPassPaymentMethodsComponent,
    PreSaleOnlyEventPassPaypalComponent
  ],
  imports: [
    CommonModule,
    ComponentsModule,
    TranslateModule,
    NgxMaskModule,
    PreSaleOnlyEventPassRoutingModule
  ],
})
export class PreSaleOnlyEventPassModule { }
