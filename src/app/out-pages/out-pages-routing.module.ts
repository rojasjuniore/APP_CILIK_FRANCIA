import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { SignInComponent } from './sign-in/sign-in.component';
import { SecurePasswordComponent } from './secure-password/secure-password.component';
import { SignUpComponent } from '../components/sign-up/sign-up.component';

const routes: Routes = [
  {
    path: 'sign-in',
    // canActivate: [AlreadyAuthGuard],
    component: SignInComponent
  },
  {
    path: 'sign-up',
    component: SignUpComponent
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
