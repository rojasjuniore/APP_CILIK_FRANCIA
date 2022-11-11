import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { PreSaleOnlyEventPassCheckoutListComponent } from './components/pre-sale-only-event-pass-checkout-list/pre-sale-only-event-pass-checkout-list.component';
import { PreSaleOnlyEventPassSelectComponent } from './components/pre-sale-only-event-pass-select/pre-sale-only-event-pass-select.component';
import { PreSaleOnlyEventPassComponent } from './components/pre-sale-only-event-pass/pre-sale-only-event-pass.component';

const routes: Routes = [
  {
    path: '',
    component: PreSaleOnlyEventPassComponent,
    children: [
      {
        path: 'step1',
        component: PreSaleOnlyEventPassSelectComponent,
      },
      {
        path: 'step2',
        component: PreSaleOnlyEventPassCheckoutListComponent,
      }
    ]
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class PreSaleOnlyEventPassRoutingModule { }
