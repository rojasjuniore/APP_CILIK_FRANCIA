import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ComponentsModule } from 'src/app/components/components.module';
import { TranslateModule } from '@ngx-translate/core';
import { MaskPipe, NgxMaskModule } from 'ngx-mask';
import { PreSaleOnlyWeekendComponent } from './components/pre-sale-only-weekend/pre-sale-only-weekend.component';
import { PreSaleOnlyWeekendRoutingModule } from './pre-sale-only-weekend-routing.module';


@NgModule({
  declarations: [
    PreSaleOnlyWeekendComponent
  ],
  imports: [
    CommonModule,
    ComponentsModule,
    TranslateModule,
    NgxMaskModule,
    PreSaleOnlyWeekendRoutingModule
  ],
})
export class PreSaleOnlyWeekendModule { }
