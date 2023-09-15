import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { SignInComponent } from '../components/sign-in/sign-in.component';

const routes: Routes = [
  {
    path: 'sign-in',
    // canActivate: [AlreadyAuthGuard],
    component: SignInComponent
  },
  {
    path: '',
    pathMatch: 'full',
    redirectTo: '/sign-in',
  },
  {
    path: '**',
    pathMatch: 'full',
    redirectTo: '/sign-in',
  },
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class OutPagesRoutingModule { }
