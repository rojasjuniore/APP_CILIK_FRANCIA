import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { PurchasesModule } from '../purchases/purchases.module';
import { SharedModule } from 'src/app/shared/shared.module';
import { RegisterSchoolComponent } from './components/register-school/register-school.component';
import { SchoolRoutingModule } from './ school.routing.module';



@NgModule({
  declarations: [
    RegisterSchoolComponent
  ],
  imports: [
    CommonModule,
    SharedModule,
    PurchasesModule,
    SchoolRoutingModule
  ]
})
export class SchoolModule { }
