import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { AuthProfileGuard } from '../guards/auth-profile.guard';
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
  {
    path: 'bank-transfer',
    data: { profiles: ['manager-hotel-event-bank-transfer-payment'] },
    canActivate: [AuthProfileGuard],
    loadChildren: () => import("./bank-transfer/bank-transfer.module").then((m) => m.BankTransferModule),
  },
  {
    path: 'coupons',
    data: { profiles: ['manager-hotel-event-coupons'] },
    canActivate: [AuthProfileGuard],
    loadChildren: () => import("./coupons/coupons.module").then((m) => m.CouponsModule),
  },
  {
    path: 'my-sales',
    data: { profiles: ['manager-my-sales'] },
    canActivate: [AuthProfileGuard],
    loadChildren: () => import("./my-sales/my-sales.module").then((m) => m.MySalesModule),
  },
  {
    path: 'purchases-admin',
    data: { profiles: ['manager-purchases-admin'] },
    canActivate: [AuthProfileGuard],
    loadChildren: () => import("./purchases/purchases.module").then((m) => m.PurchasesModule),
  },
  {
    path: 'merchant-admin',
    data: { profiles: ['manager-merchant-admin'] },
    canActivate: [AuthProfileGuard],
    loadChildren: () => import("./merchant/merchant.module").then((m) => m.MerchantModule),
  },
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
