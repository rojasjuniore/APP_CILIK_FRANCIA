import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { AdminCouponsComponent } from './components/admin-coupons/admin-coupons.component';

const routes: Routes = [
  {
    path: '',
    component: AdminCouponsComponent
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class AdminCouponsRoutingModule { }
