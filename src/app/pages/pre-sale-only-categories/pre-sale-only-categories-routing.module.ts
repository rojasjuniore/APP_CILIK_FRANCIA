import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { PreSaleOnlyCategoriesCheckoutListComponent } from './components/pre-sale-only-categories-checkout-list/pre-sale-only-categories-checkout-list.component';
import { PreSaleOnlyCategoriesPaymentMethodsComponent } from './components/pre-sale-only-categories-payment-methods/pre-sale-only-categories-payment-methods.component';
import { PreSaleOnlyCategoriesPaypalComponent } from './components/pre-sale-only-categories-paypal/pre-sale-only-categories-paypal.component';
import { PreSaleOnlyCategoriesSelectComponent } from './components/pre-sale-only-categories-select/pre-sale-only-categories-select.component';
import { PreSaleOnlyCategoriesComponent } from './components/pre-sale-only-categories/pre-sale-only-categories.component';

const routes: Routes = [
  {
    path: '',
    component: PreSaleOnlyCategoriesComponent,
    children: [
      {
        path: 'step1',
        component: PreSaleOnlyCategoriesSelectComponent,
      },
      {
        path: 'step2',
        component: PreSaleOnlyCategoriesCheckoutListComponent,
      },
      {
        path: 'payment-method',
        component: PreSaleOnlyCategoriesPaymentMethodsComponent,
      },
      {
        path: 'paypal',
        component: PreSaleOnlyCategoriesPaypalComponent,
      },
      {
        path: '',
        pathMatch: 'full',
        redirectTo: '/pre-sale-categories/step1'
      },
      {
        path: '**',
        pathMatch: 'full',
        redirectTo: '/pre-sale-categories/step1'
      }
    ]
  },
  {
    path: '**',
    pathMatch: 'full',
    redirectTo: '/pre-sale-categories/step1'
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class PreSaleOnlyCategoriesRoutingModule { }
