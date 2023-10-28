import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { InstallmentsComponent } from './installments.component';
import { InstallmentsViewAdminComponent } from './components/installments-view-admin/installments-view-admin.component';

const routes: Routes = [
  {
    path: 'dashboard',
    component: InstallmentsComponent
  },
  {
    path: ':orderId/manager',
    component: InstallmentsViewAdminComponent
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
export class InstallmentsRoutingModule { }
