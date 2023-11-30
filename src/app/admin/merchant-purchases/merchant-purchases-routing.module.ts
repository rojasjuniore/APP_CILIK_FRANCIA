import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { MerchantPurchasesComponent } from './merchant-purchases.component';
import { MerchantPurchaseDetailsComponent } from './components/merchant-purchase-details/merchant-purchase-details.component';

const routes: Routes = [
  {
    path: 'dashboard',
    component: MerchantPurchasesComponent
  },
  {
    path: ':orderId/details',
    component: MerchantPurchaseDetailsComponent
  },
  {
    path: '**',
    pathMatch: 'full',
    redirectTo: '/admin/dashboard'
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class MerchantPurchasesRoutingModule { }
