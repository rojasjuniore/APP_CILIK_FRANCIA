import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { InstallmentsComponent } from '../installments/installments.component';
import { InstallmentsRoutingModule } from './installments-routing.module';
import { PipesModule } from 'src/app/pipes/pipes.module';
import { SharedModule } from 'src/app/shared/shared.module';
import { InstallmentsListAdminComponent } from './components/installments-list-admin/installments-list-admin.component';
import { InstallmentsViewAdminComponent } from './components/installments-view-admin/installments-view-admin.component';
import { InstallmentsTimelineAdminComponent } from './components/installments-timeline-admin/installments-timeline-admin.component';
import { PurchasesListAdminInstallmentsComponent } from './components/purchases-list-admin-installments/purchases-list-admin-installments.component';
import { InstallmentsPurchaseListItemCardComponent } from './components/installments-purchase-list-item-card/installments-purchase-list-item-card.component';



@NgModule({
  declarations: [
    InstallmentsComponent,
    InstallmentsListAdminComponent,
    InstallmentsViewAdminComponent,
    InstallmentsTimelineAdminComponent,
    PurchasesListAdminInstallmentsComponent,
    InstallmentsPurchaseListItemCardComponent
  ],
  imports: [
    CommonModule,
    SharedModule,
    PipesModule,
    InstallmentsRoutingModule
  ]
})
export class InstallmentsModule { }
