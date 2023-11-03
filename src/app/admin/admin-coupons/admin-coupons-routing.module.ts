import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { AdminCouponsComponent } from './admin-coupons.component';
import { AdminCouponsUpdatedComponent } from './components/admin-coupons-updated/admin-coupons-updated.component';

const routes: Routes = [
  {
    path: '',
    component: AdminCouponsComponent
  },
  {
    path: ':id/edit',
    component: AdminCouponsUpdatedComponent,
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
export class AdminCouponsRoutingModule { }
