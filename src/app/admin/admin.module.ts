import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { AdminRoutingModule } from './admin-routing.module';
import { AdminLayoutComponent } from './components/admin-layout/admin-layout.component';
import { TranslateModule } from '@ngx-translate/core';
import { ComponentsModule } from '../components/components.module';
import { PermissionComponent } from './components/permission/permission.component';
import { PermissionRolesComponent } from './components/permission-roles/permission-roles.component';
import { ListOrderComponent } from './components/list-order/list-order.component';
import { PermissionProfilesComponent } from './components/permission-profiles/permission-profiles.component';
import { AdminDashboardComponent } from './components/admin-dashboard/admin-dashboard.component';


@NgModule({
  declarations: [
    AdminLayoutComponent,
    PermissionComponent,
    PermissionRolesComponent,
    ListOrderComponent,
    PermissionProfilesComponent,
    AdminDashboardComponent
  ],
  imports: [
    CommonModule,
    ComponentsModule,
    AdminRoutingModule,
    TranslateModule,
  ]
})
export class AdminModule { }
