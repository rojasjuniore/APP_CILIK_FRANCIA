import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { CartRoutingModule } from './cart-routing.module';
import { SharedModule } from 'src/app/shared/shared.module';
import { CartComponent } from './cart.component';
import { CartFullpassCardItemComponent } from './components/cart-fullpass-card-item/cart-fullpass-card-item.component';


@NgModule({
  declarations: [
    CartComponent,
    CartFullpassCardItemComponent
  ],
  imports: [
    CommonModule,
    SharedModule,
    CartRoutingModule
  ]
})
export class CartModule { }
