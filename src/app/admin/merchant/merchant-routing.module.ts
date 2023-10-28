import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { MerchantComponent } from './merchant.component';

const routes: Routes = [
  {
    path: 'dashboard/:id',
    component: MerchantComponent
  },
  // {
  //   path: 'mySalesBenefits/:id/:ownerType',
  //   component: MySalesBenefitsModalComponent,
  // },
  // {
  //   path: ':id/edit',
  //   component: CouponsUpdateFormComponent,
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
export class MerchantRoutingModule { }
