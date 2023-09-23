import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { PurchaseDetailsComponent } from './components/purchase-details/purchase-details.component';

const routes: Routes = [
  {
    path:':id/details',
    component: PurchaseDetailsComponent
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class PurchasesRoutingModule { }
