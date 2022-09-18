import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { PreSaleOnlyCategoriesRoutingModule } from './pre-sale-only-categories-routing.module';
import { PreSaleOnlyCategoriesComponent } from './components/pre-sale-only-categories/pre-sale-only-categories.component';
import { ComponentsModule } from 'src/app/components/components.module';
import { TranslateModule, TranslatePipe } from '@ngx-translate/core';
import { PreSaleOnlyCategoriesSelectComponent } from './components/pre-sale-only-categories-select/pre-sale-only-categories-select.component';
import { PreSaleOnlyCategoriesCheckoutListComponent } from './components/pre-sale-only-categories-checkout-list/pre-sale-only-categories-checkout-list.component';
import { PreSaleOnlyCategoriesPaymentMethodsComponent } from './components/pre-sale-only-categories-payment-methods/pre-sale-only-categories-payment-methods.component';
import { PreSaleOnlyCategoriesPaypalComponent } from './components/pre-sale-only-categories-paypal/pre-sale-only-categories-paypal.component';
import { NgxMaskModule } from 'ngx-mask';


@NgModule({
  declarations: [
    PreSaleOnlyCategoriesComponent,
    PreSaleOnlyCategoriesSelectComponent,
    PreSaleOnlyCategoriesCheckoutListComponent,
    PreSaleOnlyCategoriesPaymentMethodsComponent,
    PreSaleOnlyCategoriesPaypalComponent
  ],
  imports: [
    CommonModule,
    ComponentsModule,
    TranslateModule,
    NgxMaskModule,
    PreSaleOnlyCategoriesRoutingModule
  ],
  providers: [TranslatePipe],
})
export class PreSaleOnlyCategoriesModule { }
