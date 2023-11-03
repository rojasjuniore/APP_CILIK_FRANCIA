import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { RegisterSchoolComponent } from './components/register-school/register-school.component';

const routes: Routes = [
  {
    path: 'registerSchool',
    component: RegisterSchoolComponent
  },
  {
    path: '',
    pathMatch: 'full',
    redirectTo: '/school/registerSchool',
  },
  {
    path: '**',
    pathMatch: 'full',
    redirectTo: '/school/registerSchool',
  },
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class SchoolRoutingModule { }
