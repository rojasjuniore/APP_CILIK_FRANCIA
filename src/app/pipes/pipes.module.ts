import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { UserPipe } from './user.pipe';
import { ProfilePipe } from './profile.pipe';
import { ObjUserPipe } from './obj-user.pipe';
import { SanitizeAudioPipe } from './sanitize-audio.pipe';
import { StatusOrdeIDPipe } from './status-orde-id.pipe';
import { AccreditedPipe } from './accredited.pipe';
import { HideEmailPipe } from './hide-email.pipe';



@NgModule({
  declarations: [
    UserPipe,
    ProfilePipe,
    ObjUserPipe,
    SanitizeAudioPipe,
    StatusOrdeIDPipe,
    AccreditedPipe,
    HideEmailPipe
  ],
  exports: [
    UserPipe,
    ProfilePipe,
    ObjUserPipe,
    SanitizeAudioPipe,
    StatusOrdeIDPipe,
    AccreditedPipe,
    HideEmailPipe
  ],
  imports: [
    CommonModule
  ]
})
export class PipesModule { }
