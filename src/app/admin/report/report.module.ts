import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { PipesModule } from 'src/app/pipes/pipes.module';
import { SharedModule } from 'src/app/shared/shared.module';
import { ReportComponent } from './report.component';
import { ReportRoutingModule } from './report-routing.module';
import { ReportListComponent } from './components/report-list/report-list.component';
import { ReportTotalesComponent } from './components/report-totales/report-totales.component';



@NgModule({
  declarations: [
    ReportComponent,
    ReportListComponent,
    ReportTotalesComponent
  ],
  imports: [
    CommonModule,
    SharedModule,
    PipesModule,
    ReportRoutingModule
  ]
})
export class ReportModule { }
