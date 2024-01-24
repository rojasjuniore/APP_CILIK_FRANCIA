import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { AccreditationsComponent } from './accreditations.component';

const routes: Routes = [
  {
    path: 'dashboard',
    component: AccreditationsComponent
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
export class AccreditationsRoutingModule { }
