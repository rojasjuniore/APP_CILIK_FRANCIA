import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { PurchasePayCuotaComponent } from './components/purchase-pay-cuota/purchase-pay-cuota.component';
import { PurchaseSummaryDetailsComponent } from './components/purchase-summary-details/purchase-summary-details.component';
import { PurchaseSummaryComponent } from './components/purchase-summary/purchase-summary.component';

const routes: Routes = [
  {
    path: 'summary',
    component: PurchaseSummaryComponent,
    children: [
      {
        path: ':id/details',
        component: PurchaseSummaryDetailsComponent,
      },
      {
        path: ':id/pay-couta/:cuota',
        component: PurchasePayCuotaComponent
      },
      {
        path: '**',
        pathMatch: 'full',
        redirectTo: '/pages/dashboard',
      }
    ]
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class PurchaseSummaryRoutingModule { }
