import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { OutPagesRoutingModule } from './out-pages-routing.module';
import { SharedModule } from '../shared/shared.module';


@NgModule({
  declarations: [],
  imports: [
    CommonModule,
    SharedModule,
    OutPagesRoutingModule
  ]
})
export class OutPagesModule { }
