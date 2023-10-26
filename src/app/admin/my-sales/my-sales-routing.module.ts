import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { MySalesComponent } from './my-sales.component';

const routes: Routes = [
  {
    path: '',
    component: MySalesComponent
  },
  // {
  //   path: 'store',
  //   component: CouponsAddFormComponent,
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
export class MySalesRoutingModule { }
