import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { SharedModule } from 'src/app/shared/shared.module';
import { MySalesRoutingModule } from './my-sales-routing.module';
import { MySalesDashboardComponent } from './my-sales-dashboard/my-sales-dashboard.component';
import { MySalesViewComponent } from './my-sales-view/my-sales-view.component';
import { MySalesListComponent } from './my-sales-list/my-sales-list.component';
import { MySalesComponent } from './my-sales.component';



@NgModule({
  declarations: [
    MySalesComponent,
    MySalesDashboardComponent,
    MySalesViewComponent,
    MySalesListComponent
  ],
  imports: [
    CommonModule,
    SharedModule,
    MySalesRoutingModule,
  ]
})
export class MySalesModule { }
