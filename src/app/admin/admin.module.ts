import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { AdminRoutingModule } from './admin-routing.module';
import { TranslateModule } from '@ngx-translate/core';
// import { ComponentsModule } from '../components/components.module';
// import { PermissionComponent } from './components/permission/permission.component';
// import { PermissionRolesComponent } from './components/permission-roles/permission-roles.component';
// import { ListOrderComponent } from './components/list-order/list-order.component';
// import { PermissionProfilesComponent } from './components/permission-profiles/permission-profiles.component';
// import { AdminDashboardComponent } from './components/admin-dashboard/admin-dashboard.component';
import { SharedModule } from '../shared/shared.module';


@NgModule({
  declarations: [
    // PermissionComponent,
    // PermissionRolesComponent,
    // ListOrderComponent,
    // PermissionProfilesComponent,
    // AdminDashboardComponent
  ],
  imports: [
    CommonModule,
    // ComponentsModule,
    SharedModule,
    AdminRoutingModule,
    TranslateModule,
  ]
})
export class AdminModule { }
