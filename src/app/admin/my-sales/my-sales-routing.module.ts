import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { MySalesComponent } from './my-sales.component';
import { MySalesBenefitsModalComponent } from './components/my-sales-benefits-modal/my-sales-benefits-modal.component';

const routes: Routes = [
  {
    path: 'dashboard/:id',
    component: MySalesComponent
  },
  {
    path: 'mySalesBenefits/:id/:ownerType',
    component: MySalesBenefitsModalComponent,
  },
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
export class MySalesRoutingModule { }
