import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { StatisticsComponent } from './statistics.component';
import { StatisticsRoutingModule } from './statistics-routing.module';
import { PipesModule } from 'src/app/pipes/pipes.module';
import { SharedModule } from 'src/app/shared/shared.module';



@NgModule({
  declarations: [
    StatisticsComponent
  ],
  imports: [
    CommonModule,
    SharedModule,
    PipesModule,
    StatisticsRoutingModule
  ]
})
export class StatisticsModule { }
