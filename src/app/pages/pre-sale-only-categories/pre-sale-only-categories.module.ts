import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { PreSaleOnlyCategoriesRoutingModule } from './pre-sale-only-categories-routing.module';
import { PreSaleOnlyCategoriesComponent } from './components/pre-sale-only-categories/pre-sale-only-categories.component';
import { ComponentsModule } from 'src/app/components/components.module';
import { TranslateModule, TranslatePipe } from '@ngx-translate/core';
import { PreSaleOnlyCategoriesSelectComponent } from './components/pre-sale-only-categories-select/pre-sale-only-categories-select.component';


@NgModule({
  declarations: [
    PreSaleOnlyCategoriesComponent,
    PreSaleOnlyCategoriesSelectComponent
  ],
  imports: [
    CommonModule,
    ComponentsModule,
    TranslateModule,
    PreSaleOnlyCategoriesRoutingModule
  ],
  providers: [TranslatePipe],
})
export class PreSaleOnlyCategoriesModule { }
