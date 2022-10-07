import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { AdminRoutingModule } from './admin-routing.module';
import { AdminLayoutComponent } from './components/admin-layout/admin-layout.component';
import { TranslateModule } from '@ngx-translate/core';
import { ComponentsModule } from '../components/components.module';
import { PermissionComponent } from './components/permission/permission.component';


@NgModule({
  declarations: [
    AdminLayoutComponent,
    PermissionComponent
  ],
  imports: [
    CommonModule,
    ComponentsModule,
    AdminRoutingModule,
    TranslateModule,
  ]
})
export class AdminModule { }
