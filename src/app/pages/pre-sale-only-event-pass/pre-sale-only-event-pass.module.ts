import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { PreSaleOnlyEventPassRoutingModule } from './pre-sale-only-event-pass-routing.module';
import { PreSaleOnlyEventPassComponent } from './components/pre-sale-only-event-pass/pre-sale-only-event-pass.component';
import { ComponentsModule } from 'src/app/components/components.module';
import { PreSaleOnlyEventPassSelectComponent } from './components/pre-sale-only-event-pass-select/pre-sale-only-event-pass-select.component';
import { TranslateModule } from '@ngx-translate/core';


@NgModule({
  declarations: [
    PreSaleOnlyEventPassComponent,
    PreSaleOnlyEventPassSelectComponent
  ],
  imports: [
    CommonModule,
    ComponentsModule,
    TranslateModule,
    PreSaleOnlyEventPassRoutingModule
  ]
})
export class PreSaleOnlyEventPassModule { }
