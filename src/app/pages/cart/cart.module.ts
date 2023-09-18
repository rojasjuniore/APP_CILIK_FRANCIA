import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { CartRoutingModule } from './cart-routing.module';
import { SharedModule } from 'src/app/shared/shared.module';
import { CartComponent } from './cart.component';
import { CartFullpassCardItemComponent } from './components/cart-fullpass-card-item/cart-fullpass-card-item.component';
import { CartCategoryPassCardItemComponent } from './components/cart-category-pass-card-item/cart-category-pass-card-item.component';


@NgModule({
  declarations: [
    CartComponent,
    CartFullpassCardItemComponent,
    CartCategoryPassCardItemComponent
  ],
  imports: [
    CommonModule,
    SharedModule,
    CartRoutingModule
  ]
})
export class CartModule { }
