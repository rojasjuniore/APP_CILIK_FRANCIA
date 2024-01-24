import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { AccreditationsComponent } from './accreditations.component';
import { PipesModule } from 'src/app/pipes/pipes.module';
import { SharedModule } from 'src/app/shared/shared.module';
import { AccreditationsRoutingModule } from './accreditations-routing.module';
import { AccreditationUsersComponent } from './components/accreditation-users/accreditation-users.component';
import { ModalAccreditationUsersProductComponent } from './components/modal-accreditation-users-product/modal-accreditation-users-product.component';



@NgModule({
  declarations: [
    AccreditationsComponent,
    AccreditationUsersComponent,
    ModalAccreditationUsersProductComponent
  ],
  imports: [
    CommonModule,
    CommonModule,
    SharedModule,
    PipesModule,
    AccreditationsRoutingModule
  ]
})
export class AccreditationsModule { }
