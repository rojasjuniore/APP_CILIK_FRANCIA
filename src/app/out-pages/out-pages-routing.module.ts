import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { SignInComponent } from '../components/sign-in/sign-in.component';
import { SecurePasswordComponent } from '../components/secure-password/secure-password.component';

const routes: Routes = [
  {
    path: 'sign-in',
    // canActivate: [AlreadyAuthGuard],
    component: SignInComponent
  },
  {
    path: 'recovery',
    component: SecurePasswordComponent
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
