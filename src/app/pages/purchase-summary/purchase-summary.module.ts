import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { TranslateModule, TranslatePipe } from '@ngx-translate/core';
import { PurchaseSummaryRoutingModule } from './purchase-summary-routing.module';
import { PurchaseSummaryComponent } from './components/purchase-summary/purchase-summary.component';
import { ComponentsModule } from 'src/app/components/components.module';
import { PurchaseSummaryDetailsComponent } from './components/purchase-summary-details/purchase-summary-details.component';


@NgModule({
  declarations: [
    PurchaseSummaryComponent,
    PurchaseSummaryDetailsComponent
  ],
  imports: [
    CommonModule,
    ComponentsModule,
    PurchaseSummaryRoutingModule,
    TranslateModule,
  ],
  providers: [TranslatePipe],
})
export class PurchaseSummaryModule { }
