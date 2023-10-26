import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { UserPipe } from './user.pipe';
import { ProfilePipe } from './profile.pipe';



@NgModule({
  declarations: [
    UserPipe,
    ProfilePipe
  ],
  exports: [
    UserPipe,
    ProfilePipe

  ],
  imports: [
    CommonModule
  ]
})
export class PipesModule { }
