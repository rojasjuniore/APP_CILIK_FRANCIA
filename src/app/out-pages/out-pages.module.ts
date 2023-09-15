import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { OutPagesRoutingModule } from './out-pages-routing.module';
import { SharedModule } from '../shared/shared.module';
import { SignInComponent } from './sign-in/sign-in.component';
import { SecurePasswordComponent } from './secure-password/secure-password.component';


@NgModule({
  declarations: [
    SignInComponent,
    SecurePasswordComponent
  ],
  imports: [
    CommonModule,
    SharedModule,
    OutPagesRoutingModule
  ]
})
export class OutPagesModule { }
