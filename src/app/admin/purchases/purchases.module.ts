import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { PipesModule } from 'src/app/pipes/pipes.module';
import { SharedModule } from 'src/app/shared/shared.module';
import { PurchasesRoutingModule } from './purchases-routing.module';
import { PurchasesDasdboardComponent } from './components/purchases-dasdboard/purchases-dasdboard.component';
import { PurchasesListAdminComponent } from './components/purchases-list-admin/purchases-list-admin.component';
import { PurchaseListItemCardAdminComponent } from './components/purchase-list-item-card-admin/purchase-list-item-card-admin.component';



@NgModule({
  declarations: [
    PurchasesDasdboardComponent,
    PurchasesListAdminComponent,
    PurchaseListItemCardAdminComponent
  ],
  imports: [    
    CommonModule,
    SharedModule,
    PipesModule,
    PurchasesRoutingModule,
  ]
})
export class PurchasesModule { }
