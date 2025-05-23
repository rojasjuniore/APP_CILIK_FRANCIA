import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { CouponsComponent } from './coupons.component';
import { CouponsAddFormComponent } from './components/coupons-add-form/coupons-add-form.component';
import { CouponsUpdateFormComponent } from './components/coupons-update-form/coupons-update-form.component';

const routes: Routes = [
  {
    path: '',
    component: CouponsComponent
  },
  {
    path: 'store',
    component: CouponsAddFormComponent,
  },
  {
    path: ':id/edit',
    component: CouponsUpdateFormComponent,
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
export class CouponsRoutingModule { }
