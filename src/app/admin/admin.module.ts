import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { AdminRoutingModule } from './admin-routing.module';
import { AdminLayoutComponent } from './components/admin-layout/admin-layout.component';
import { TranslateModule } from '@ngx-translate/core';
import { ComponentsModule } from '../components/components.module';
import { PermissionComponent } from './components/permission/permission.component';
import { PermissionRolesComponent } from './components/permission-roles/permission-roles.component';
import { PermissionProfilesComponent } from './components/permission-profiles/permission-profiles.component';


@NgModule({
  declarations: [
    AdminLayoutComponent,
    PermissionComponent,
    PermissionRolesComponent,
    PermissionProfilesComponent
  ],
  imports: [
    CommonModule,
    ComponentsModule,
    AdminRoutingModule,
    TranslateModule,
  ]
})
export class AdminModule { }
