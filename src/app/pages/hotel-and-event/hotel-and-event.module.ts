import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { HotelAndEventRoutingModule } from './hotel-and-event-routing.module';
import { SharedModule } from 'src/app/shared/shared.module';
import { HotelAndEventComponent } from './hotel-and-event.component';


@NgModule({
  declarations: [
    HotelAndEventComponent
  ],
  imports: [
    CommonModule,
    SharedModule,
    HotelAndEventRoutingModule
  ]
})
export class HotelAndEventModule { }
