import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { InstallmentsComponent } from '../installments/installments.component';
import { InstallmentsRoutingModule } from './installments-routing.module';
import { PipesModule } from 'src/app/pipes/pipes.module';
import { SharedModule } from 'src/app/shared/shared.module';
import { InstallmentsListAdminComponent } from './components/installments-list-admin/installments-list-admin.component';
import { InstallmentsViewAdminComponent } from './components/installments-view-admin/installments-view-admin.component';



@NgModule({
  declarations: [
    InstallmentsComponent,
    InstallmentsListAdminComponent,
    InstallmentsViewAdminComponent
  ],
  imports: [
    CommonModule,
    SharedModule,
    PipesModule,
    InstallmentsRoutingModule
  ]
})
export class InstallmentsModule { }
