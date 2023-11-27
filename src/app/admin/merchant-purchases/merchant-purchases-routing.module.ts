import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { MerchantPurchasesComponent } from './merchant-purchases.component';

const routes: Routes = [
  {
    path: 'dashboard',
    component: MerchantPurchasesComponent
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
