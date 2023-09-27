import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { BankTransferRoutingModule } from './bank-transfer-routing.module';
import { BankTransferComponent } from './bank-transfer.component';
import { SharedModule } from 'src/app/shared/shared.module';
import { BankTransferManagerComponent } from './components/bank-transfer-manager/bank-transfer-manager.component';


@NgModule({
  declarations: [
    BankTransferComponent,
    BankTransferManagerComponent
  ],
  imports: [
    CommonModule,
    SharedModule,
    BankTransferRoutingModule
  ]
})
export class BankTransferModule { }
