import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { AuthRoleGuard } from '../guards/auth-role.guard';
import { AdminLayoutComponent } from './components/admin-layout/admin-layout.component';
import { ListOrderComponent } from './components/list-order/list-order.component';
import { PermissionComponent } from './components/permission/permission.component';

const routes: Routes = [
  {
    path: '',
    component: AdminLayoutComponent,
    children: [
      {
        path: 'permission',
        component: PermissionComponent,
      },
      {
        path: 'orderList',
        canActivate: [AuthRoleGuard],
        component: ListOrderComponent,
      }
    ]
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class AdminRoutingModule { }
