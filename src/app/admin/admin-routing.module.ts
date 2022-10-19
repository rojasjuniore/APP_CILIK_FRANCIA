import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { AuthProfileGuard } from '../guards/auth-profile.guard';
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
        data: { profiles: ['admin-permission'] },
        canActivate: [ AuthProfileGuard ],
        component: PermissionComponent,
      },
      {
        path: 'orderList',
        data: { profiles: ['admin-payments'] },
        canActivate: [ AuthProfileGuard, AuthRoleGuard ],
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
