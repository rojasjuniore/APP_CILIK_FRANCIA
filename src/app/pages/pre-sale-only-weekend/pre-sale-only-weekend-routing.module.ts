import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { PreSaleOnlyWeekendComponent } from './components/pre-sale-only-weekend/pre-sale-only-weekend.component';


const routes: Routes = [
  {
    path: '',
    component: PreSaleOnlyWeekendComponent,
    children: [
      // {
      //   path: 'step1',
      //   component: PreSaleOnlyEventPassSelectComponent,
      // },
    ]
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class PreSaleOnlyWeekendRoutingModule { }
