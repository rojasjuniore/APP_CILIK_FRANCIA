import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { PurchasesRoutingModule } from './purchases-routing.module';
import { PurchaseDetailsComponent } from './components/purchase-details/purchase-details.component';
import { SharedModule } from 'src/app/shared/shared.module';
import { PurchaseAdviserComponent } from './components/purchase-adviser/purchase-adviser.component';
import { PurchaseAdviserModalComponent } from './components/purchase-adviser-modal/purchase-adviser-modal.component';
import { PurchaseFullPassPerDayCardItemComponent } from './components/purchase-full-pass-per-day-card-item/purchase-full-pass-per-day-card-item.component';
import { WeekendFestCardItemComponent } from './components/weekend-fest-card-item/weekend-fest-card-item.component';
import { AdditionalDataComponent } from './components/claim/additional-data/additional-data.component';
import { ClaimDivisionComponent } from './components/claim/claim-division/claim-division.component';
import { ClaimSearchUserComponent } from './components/claim/claim-search-user/claim-search-user.component';
import { NgSelectModule } from '@ng-select/ng-select';
import { PipesModule } from 'src/app/pipes/pipes.module';
import { ClaimFullPassComponent } from './components/claim/claim-full-pass/claim-full-pass.component';
import { ClaimHotelComponent } from './components/claim/claim-hotel/claim-hotel.component';
import { ClaimFullPassPerDayComponent } from './components/claim/claim-full-pass-per-day/claim-full-pass-per-day.component';
import { ClaimWeekendPassComponent } from './components/claim/claim-weekend-pass/claim-weekend-pass.component';
import { ClaimWeekendFestComponent } from './components/claim/claim-weekend-fest/claim-weekend-fest.component';

@NgModule({
  declarations: [
    PurchaseDetailsComponent,
    PurchaseAdviserComponent,
    PurchaseAdviserModalComponent,
    PurchaseFullPassPerDayCardItemComponent,
    WeekendFestCardItemComponent,

    ClaimDivisionComponent,
    AdditionalDataComponent,
    ClaimSearchUserComponent,
    ClaimFullPassComponent,
    ClaimHotelComponent,
    ClaimFullPassPerDayComponent,

    ClaimWeekendPassComponent,
    ClaimWeekendFestComponent,
  ],
  imports: [
    CommonModule,
    SharedModule,
    NgSelectModule,
    PipesModule,
    PurchasesRoutingModule
  ]
})
export class PurchasesModule { }
