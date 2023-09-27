import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { BankTransferRoutingModule } from './bank-transfer-routing.module';
import { BankTransferComponent } from './bank-transfer.component';


@NgModule({
  declarations: [
    BankTransferComponent
  ],
  imports: [
    CommonModule,
    BankTransferRoutingModule
  ]
})
export class BankTransferModule { }
