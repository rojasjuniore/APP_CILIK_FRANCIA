import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
// import { AuthProfileGuard } from '../guards/auth-profile.guard';
// import { AuthRoleGuard } from '../guards/auth-role.guard';
import { AdminDashboardComponent } from './components/admin-dashboard/admin-dashboard.component';
// import { AdminLayoutComponent } from './components/admin-layout/admin-layout.component';
// import { ListOrderComponent } from './components/list-order/list-order.component';
// import { PermissionComponent } from './components/permission/permission.component';

const routes: Routes = [
  {
    path: 'dashboard',
    component: AdminDashboardComponent
  },
  // {
  //   path: '',
  //   component: AdminLayoutComponent,
  //   children: [
  //     {
  //       path: 'permission',
  //       data: { profiles: ['admin-permission'] },
  //       canActivate: [AuthProfileGuard],
  //       component: PermissionComponent,
  //     },
  //     {
  //       path: 'orderList',
  //       data: { profiles: ['admin-payments'] },
  //       canActivate: [AuthProfileGuard, AuthRoleGuard],
  //       component: ListOrderComponent,
  //     },
  //     {
  //       path: 'coupons',
  //       data: { profiles: ['admin-coupons'] },        
  //       canActivate: [AuthProfileGuard],
  //       loadChildren: () => import("./admin-coupons/admin-coupons.module").then((m) => m.AdminCouponsModule),
  //     },
  //     {
  //       path: '**',
  //       pathMatch: 'full',
  //       redirectTo: '/admin/dashboard'
  //     },
  //   ]
  // },
  {
    path: '**',
    pathMatch: 'full',
    redirectTo: '/admin/dashboard'
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class AdminRoutingModule { }
