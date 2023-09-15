import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { DashboardRoutingModule } from './dashboard-routing.module';
import { DashboardComponent } from './dashboard.component';
import { SharedModule } from 'src/app/shared/shared.module';
import { StoreComponent } from './components/store/store.component';
import { StoreItemCardComponent } from './components/store-item-card/store-item-card.component';


@NgModule({
  declarations: [
    DashboardComponent,
    StoreComponent,
    StoreItemCardComponent
  ],
  imports: [
    CommonModule,
    SharedModule,
    DashboardRoutingModule
  ]
})
export class DashboardModule { }
