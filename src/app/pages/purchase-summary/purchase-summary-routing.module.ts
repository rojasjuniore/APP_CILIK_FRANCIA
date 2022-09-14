import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
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
