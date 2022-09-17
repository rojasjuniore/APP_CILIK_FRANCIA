import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { PreSaleOnlyCategoriesComponent } from './components/pre-sale-only-categories/pre-sale-only-categories.component';

const routes: Routes = [
  {
    path: '',
    component: PreSaleOnlyCategoriesComponent,
    children: [
      
    ]
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class PreSaleOnlyCategoriesRoutingModule { }
