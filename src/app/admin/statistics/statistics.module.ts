import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { StatisticsComponent } from './statistics.component';
import { PipesModule } from 'src/app/pipes/pipes.module';
import { SharedModule } from 'src/app/shared/shared.module';
import { StatisticsRoutingModule } from './statistics-routing.module';
import { AccreditedCategoriesComponent } from './components/accredited-categories/accredited-categories.component';
import { ModalAccreditedUsersComponent } from './components/modal-accredited-users/modal-accredited-users.component';



@NgModule({
  declarations: [
    StatisticsComponent,
    AccreditedCategoriesComponent,
    ModalAccreditedUsersComponent,
  ],
  imports: [
    CommonModule,
    SharedModule,
    PipesModule,
    StatisticsRoutingModule
  ]
})
export class StatisticsModule { }
