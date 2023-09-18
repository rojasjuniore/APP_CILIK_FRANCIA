import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { HotelAndEventComponent } from './hotel-and-event.component';

const routes: Routes = [
  {
    path: '',
    component: HotelAndEventComponent
  },
  {
    path: '',
    pathMatch: 'full',
    redirectTo: '/pages/dashboard',
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class HotelAndEventRoutingModule { }
