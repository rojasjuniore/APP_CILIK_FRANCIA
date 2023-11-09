import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { PurchasesDasdboardComponent } from './components/purchases-dasdboard/purchases-dasdboard.component';
import { PurchaseDetailsAdminComponent } from './components/purchase-details-admin/purchase-details-admin.component';

const routes: Routes = [
  {
    path: 'dashboard',
    component: PurchasesDasdboardComponent
  },
  {
    path: ':orderId/details',
    component: PurchaseDetailsAdminComponent
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
export class PurchasesRoutingModule { }
