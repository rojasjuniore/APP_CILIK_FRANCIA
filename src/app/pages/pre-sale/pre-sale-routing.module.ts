import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { PreSaleCheckoutListComponent } from './components/pre-sale-checkout-list/pre-sale-checkout-list.component';
import { PreSaleExtrasComponent } from './components/pre-sale-extras/pre-sale-extras.component';
import { PreSalePackagesListComponent } from './components/pre-sale-packages-list/pre-sale-packages-list.component';
import { PreSaleComponent } from './pre-sale.component';
import { PreSalePaymentMethodsComponent } from './components/pre-sale-payment-methods/pre-sale-payment-methods.component';
import { PreSaleInstallmentsDetailsComponent } from './components/pre-sale-installments-details/pre-sale-installments-details.component';
import { PreSaleCreditCardComponent } from './components/pre-sale-credit-card/pre-sale-credit-card.component';
import { PreSaleCryptoComponent } from './components/pre-sale-crypto/pre-sale-crypto.component';
import { PreSaleInstallmentsPayCoutaComponent } from './components/pre-sale-installments-pay-couta/pre-sale-installments-pay-couta.component';
import { PreSalePaypalComponent } from './components/pre-sale-paypal/pre-sale-paypal.component';

const routes: Routes = [
  {
    path: '',
    component: PreSaleComponent,
    children: [
      {
        path: 'step1',
        component: PreSalePackagesListComponent
      },
      {
        path: 'step2',
        component: PreSaleExtrasComponent,
      },
      {
        path: 'step3',
        component: PreSaleCheckoutListComponent,
      },
      {
        path: 'payment-method',
        component: PreSalePaymentMethodsComponent,
      },
      {
        path: 'installments-details',
        component: PreSaleInstallmentsDetailsComponent,
      },
      {
        path: 'installments-pay',
        component: PreSaleInstallmentsPayCoutaComponent,
      },
      {
        path: 'credit-card',
        component: PreSaleCreditCardComponent,
      },
      {
        path: 'crypto',
        component: PreSaleCryptoComponent,
      },
      {
        path: 'paypal',
        component: PreSalePaypalComponent,
      },
      {
        path: '',
        pathMatch: 'full',
        redirectTo: '/pre-sale/step1'
      },
      {
        path: '**',
        pathMatch: 'full',
        redirectTo: '/pre-sale/step1'
      }
    ]
  },
  {
    path: '**',
    pathMatch: 'full',
    redirectTo: '/pre-sale/step1'
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class PreSaleRoutingModule { }
