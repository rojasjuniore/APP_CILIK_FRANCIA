import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { SharedModule } from 'src/app/shared/shared.module';
import { MySalesRoutingModule } from './my-sales-routing.module';
import { MySalesDashboardComponent } from './components/my-sales-dashboard/my-sales-dashboard.component';
import { MySalesViewComponent } from './components/my-sales-view/my-sales-view.component';
import { MySalesListComponent } from './components/my-sales-list/my-sales-list.component';
import { MySalesComponent } from './my-sales.component';
import { PipesModule } from 'src/app/pipes/pipes.module';



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
    PipesModule,
    MySalesRoutingModule,
  ]
})
export class MySalesModule { }
