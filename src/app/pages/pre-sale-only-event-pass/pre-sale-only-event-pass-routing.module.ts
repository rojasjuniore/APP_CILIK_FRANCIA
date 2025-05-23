import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { PreSaleOnlyEventPassCheckoutListComponent } from './components/pre-sale-only-event-pass-checkout-list/pre-sale-only-event-pass-checkout-list.component';
import { PreSaleOnlyEventPassInstallmentsDetailsComponent } from './components/pre-sale-only-event-pass-installments-details/pre-sale-only-event-pass-installments-details.component';
import { PreSaleOnlyEventPassInstallmentsPayCuotaComponent } from './components/pre-sale-only-event-pass-installments-pay-cuota/pre-sale-only-event-pass-installments-pay-cuota.component';
import { PreSaleOnlyEventPassPaymentMethodsComponent } from './components/pre-sale-only-event-pass-payment-methods/pre-sale-only-event-pass-payment-methods.component';
import { PreSaleOnlyEventPassPaypalComponent } from './components/pre-sale-only-event-pass-paypal/pre-sale-only-event-pass-paypal.component';
import { PreSaleOnlyEventPassSelectComponent } from './components/pre-sale-only-event-pass-select/pre-sale-only-event-pass-select.component';
import { PreSaleOnlyEventPassComponent } from './components/pre-sale-only-event-pass/pre-sale-only-event-pass.component';
import { PreSaleOnlyEventPassTucompraComponent } from './components/pre-sale-only-event-pass-tucompra/pre-sale-only-event-pass-tucompra.component';

const routes: Routes = [
  {
    path: '',
    component: PreSaleOnlyEventPassComponent,
    children: [
      {
        path: 'step1',
        component: PreSaleOnlyEventPassSelectComponent,
      },
      {
        path: 'step2',
        component: PreSaleOnlyEventPassCheckoutListComponent,
      },
      {
        path: 'payment-method',
        component: PreSaleOnlyEventPassPaymentMethodsComponent
      },
      {
        path: 'paypal',
        component: PreSaleOnlyEventPassPaypalComponent
      },
      {
        path: 'tucompra',
        component: PreSaleOnlyEventPassTucompraComponent
      },
      {
        path: 'installments-details',
        component: PreSaleOnlyEventPassInstallmentsDetailsComponent
      },
      {
        path: 'installments-pay',
        component: PreSaleOnlyEventPassInstallmentsPayCuotaComponent
      }
    ]
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class PreSaleOnlyEventPassRoutingModule { }
