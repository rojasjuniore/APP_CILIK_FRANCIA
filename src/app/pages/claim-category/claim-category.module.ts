import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ClaimCategoryComponent } from './components/claim-category/claim-category.component';
import { PipesModule } from 'src/app/pipes/pipes.module';
import { SharedModule } from 'src/app/shared/shared.module';
import { ClaimCategoryRoutingModule } from './claim-category-routing.module';
import { ClaimSearchUserComponent } from './components/claim-search-user/claim-search-user.component';
import { ClaimDivisionComponent } from './components/claim-division/claim-division.component';
import { NgSelectModule } from '@ng-select/ng-select';
import { AdditionalDataComponent } from './components/additional-data/additional-data.component';
import { ReclaimedComponent } from './components/reclaimed/reclaimed.component';



@NgModule({
  declarations: [
    ClaimCategoryComponent,
    ClaimDivisionComponent,
    ClaimSearchUserComponent,
    ClaimDivisionComponent,
    AdditionalDataComponent,
    ReclaimedComponent,
  ],
  imports: [
    CommonModule,
    NgSelectModule,
    SharedModule,
    PipesModule,
    ClaimCategoryRoutingModule
  ]
})
export class ClaimCategoryModule { }
