import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { PurchasesDasdboardComponent } from './components/purchases-dasdboard/purchases-dasdboard.component';

const routes: Routes = [
  {
    path: 'dashboard',
    component: PurchasesDasdboardComponent
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
export class PurchasesRoutingModule { }
