import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { BankTransferComponent } from './bank-transfer.component';
import { BankTransferManagerComponent } from './components/bank-transfer-manager/bank-transfer-manager.component';

const routes: Routes = [
  {
    path: '',
    component: BankTransferComponent
  },
  {
    path: ':orderId/manager',
    component: BankTransferManagerComponent
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
