import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { BankTransferRoutingModule } from './bank-transfer-routing.module';
import { BankTransferComponent } from './bank-transfer.component';
import { SharedModule } from 'src/app/shared/shared.module';


@NgModule({
  declarations: [
    BankTransferComponent
  ],
  imports: [
    CommonModule,
    SharedModule,
    BankTransferRoutingModule
  ]
})
export class BankTransferModule { }
