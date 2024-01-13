import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { StatisticsComponent } from './statistics.component';

const routes: Routes = [
  {
    path: 'dashboard',
    component: StatisticsComponent
  },
  // {
  //   path: ':orderId/details',
  //   component: PurchaseDetailsAdminComponent
  // },
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
export class StatisticsRoutingModule { }
