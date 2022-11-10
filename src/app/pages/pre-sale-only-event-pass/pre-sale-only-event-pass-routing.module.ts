import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
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
      }
      {
        path: 'step2',
        component: PreSaleOnlyEventPassSelectComponent,
      }
    ]
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class PreSaleOnlyEventPassRoutingModule { }
