import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { PreSaleOnlyCategoriesRoutingModule } from './pre-sale-only-categories-routing.module';
import { PreSaleOnlyCategoriesComponent } from './components/pre-sale-only-categories/pre-sale-only-categories.component';


@NgModule({
  declarations: [
    PreSaleOnlyCategoriesComponent
  ],
  imports: [
    CommonModule,
    PreSaleOnlyCategoriesRoutingModule
  ]
})
export class PreSaleOnlyCategoriesModule { }
