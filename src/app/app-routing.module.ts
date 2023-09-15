import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
// import { SignInComponent } from './components/sign-in/sign-in.component';
// import { SignUpComponent } from './components/sign-up/sign-up.component';
// import { SecurePasswordComponent } from './components/secure-password/secure-password.component';
// import { RegistroExitosoComponent } from './components/registro-exitoso/registro-exitoso.component';
// import { IsAuthGuard } from './guards/is-auth.guard';
// import { AlreadyAuthGuard } from './guards/already-auth.guard';
// import { CheckAdminRoleGuard } from './guards/check-admin-role.guard';
// import { LogoutComponent } from './components/logout/logout.component';
import { PagesLayoutComponent } from './shared/pages-layout/pages-layout.component';
import { OutPagesLayoutComponent } from './shared/out-pages-layout/out-pages-layout.component';

const routes: Routes = [
  // {
  //   path: 'pre-sale',
  //   canActivate: [IsAuthGuard],
  //   loadChildren: () => import("./pages/pre-sale/pre-sale.module").then((m) => m.PreSaleModule),
  // },
  // {
  //   path: 'pre-sale-categories',
  //   canActivate: [IsAuthGuard],
  //   loadChildren: () => import("./pages/pre-sale-only-categories/pre-sale-only-categories.module").then((m) => m.PreSaleOnlyCategoriesModule),
  // },
  // {
  //   path: 'pre-sale-event-pass',
  //   canActivate: [IsAuthGuard],
  //   loadChildren: () => import("./pages/pre-sale-only-event-pass/pre-sale-only-event-pass.module").then((m) => m.PreSaleOnlyEventPassModule),
  // },
  // {
  //   path: 'pre-sale-weekend',
  //   canActivate: [IsAuthGuard],
  //   loadChildren: () => import("./pages/pre-sale-only-weekend/pre-sale-only-weekend.module").then((m) => m.PreSaleOnlyWeekendModule),
  // },
  // {
  //   path: 'purchase',
  //   canActivate: [IsAuthGuard],
  //   loadChildren: () => import("./pages/purchase-summary/purchase-summary.module").then((m) => m.PurchaseSummaryModule),
  // },
  {
    path: 'pages',
    // canActivate: [IsAuthGuard],
    component: PagesLayoutComponent,
    // loadChildren: () => import("./pages/pages.module").then((m) => m.PagesModule),
  },
  {
    path: '',
    component: OutPagesLayoutComponent,
    loadChildren: () => import("./out-pages/out-pages.module").then((m) => m.OutPagesModule)
  },

  // {
  //   path: 'admin',
  //   canActivate: [CheckAdminRoleGuard],
  //   loadChildren: () => import("./admin/admin.module").then((m) => m.AdminModule),
  // },
  // {
  //   path: 'logout',
  //   component: LogoutComponent
  // },
  // {
  //   path: 'register-completed',
  //   component: RegistroExitosoComponent
  // },
  // {
  //   path: '',
  //   pathMatch: 'full',
  //   redirectTo: '/sign-in',
  // },
  // {
  //   path: '**',
  //   pathMatch: 'full',
  //   redirectTo: '/sign-in',
  // },
];

@NgModule({
  imports: [RouterModule.forRoot(routes, { scrollPositionRestoration: 'enabled' })],
  exports: [RouterModule]
})
export class AppRoutingModule { }
