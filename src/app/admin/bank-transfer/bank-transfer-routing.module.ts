import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { BankTransferComponent } from './bank-transfer.component';

const routes: Routes = [
  {
    path: '',
    component: BankTransferComponent
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
export class BankTransferRoutingModule { }
