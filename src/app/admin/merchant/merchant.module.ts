import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { MerchantRoutingModule } from './merchant-routing.module';
import { PipesModule } from 'src/app/pipes/pipes.module';
import { SharedModule } from 'src/app/shared/shared.module';
import { MerchantListComponent } from './components/merchant-list/merchant-list.component';
import { MerchantComponent } from './merchant.component';
import { MerchantDashboardComponent } from './components/merchant-dashboard/merchant-dashboard.component';



@NgModule({
  declarations: [
    MerchantListComponent,
    MerchantComponent,
    MerchantDashboardComponent
  ],
  imports: [
    CommonModule,
    SharedModule,
    PipesModule,
    MerchantRoutingModule
  ]
})
export class MerchantModule { }
