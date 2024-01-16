import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { DashboardRoutingModule } from './dashboard-routing.module';
import { DashboardComponent } from './dashboard.component';
import { SharedModule } from 'src/app/shared/shared.module';
import { StoreComponent } from './components/store/store.component';
import { StoreItemCardComponent } from './components/store-item-card/store-item-card.component';
import { MyPurchasesComponent } from './components/my-purchases/my-purchases.component';
import { AnotherOptionComponent } from './components/another-option/another-option.component';
import { PipesModule } from 'src/app/pipes/pipes.module';
import { ComponentsmyRegisteredDivisionsComponent } from './components/componentsmy-registered-divisions/componentsmy-registered-divisions.component';


@NgModule({
  declarations: [
    DashboardComponent,
    StoreComponent,
    StoreItemCardComponent,
    MyPurchasesComponent,
    AnotherOptionComponent,
    ComponentsmyRegisteredDivisionsComponent
  ],
  imports: [
    CommonModule,
    SharedModule,
    PipesModule,
    DashboardRoutingModule
  ]
})
export class DashboardModule { }
