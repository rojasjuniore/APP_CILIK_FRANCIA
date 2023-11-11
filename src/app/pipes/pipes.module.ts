import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { UserPipe } from './user.pipe';
import { ProfilePipe } from './profile.pipe';
import { ObjUserPipe } from './obj-user.pipe';



@NgModule({
  declarations: [
    UserPipe,
    ProfilePipe,
    ObjUserPipe
  ],
  exports: [
    UserPipe,
    ProfilePipe,
    ObjUserPipe

  ],
  imports: [
    CommonModule
  ]
})
export class PipesModule { }
