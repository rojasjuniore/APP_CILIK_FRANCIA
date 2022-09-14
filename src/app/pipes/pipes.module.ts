import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { UserPipe } from './user.pipe';



@NgModule({
  declarations: [
    UserPipe,
  ],
  exports: [
    UserPipe,
  ],
  imports: [
    CommonModule
  ]
})
export class PipesModule { }
