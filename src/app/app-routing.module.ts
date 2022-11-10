import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { SignInComponent } from './components/sign-in/sign-in.component';
import { SignUpComponent } from './components/sign-up/sign-up.component';
import { SecurePasswordComponent } from './components/secure-password/secure-password.component';
import { RegistroExitosoComponent } from './components/registro-exitoso/registro-exitoso.component';
import { IsAuthGuard } from './guards/is-auth.guard';
import { AlreadyAuthGuard } from './guards/already-auth.guard';
import { CheckAdminRoleGuard } from './guards/check-admin-role.guard';
import { LogoutComponent } from './components/logout/logout.component';

const routes: Routes = [
  {
    path: 'pre-sale',
    canActivate: [IsAuthGuard],
    loadChildren: () => import("./pages/pre-sale/pre-sale.module").then((m) => m.PreSaleModule),
  },
  {
    path: 'pre-sale-categories',
    canActivate: [IsAuthGuard],
    loadChildren: () => import("./pages/pre-sale-only-categories/pre-sale-only-categories.module").then((m) => m.PreSaleOnlyCategoriesModule),
  },
  {
    path: 'pre-sale-event-pass',
    canActivate: [IsAuthGuard],
    loadChildren: () => import("./pages/pre-sale-only-event-pass/pre-sale-only-event-pass.module").then((m) => m.PreSaleOnlyEventPassModule),
  },
  {
    path: 'purchase',
    canActivate: [IsAuthGuard],
    loadChildren: () => import("./pages/purchase-summary/purchase-summary.module").then((m) => m.PurchaseSummaryModule),
  },
  {
    path: 'pages',
    canActivate: [IsAuthGuard],
    loadChildren: () => import("./pages/pages.module").then((m) => m.PagesModule),
  },
  {
    path: 'admin',
    canActivate: [ CheckAdminRoleGuard ],
    loadChildren: () => import("./admin/admin.module").then((m) => m.AdminModule),
  },
  {
    path: 'sign-up',
    component: SignUpComponent
  },
  {
    path: 'logout',
    component: LogoutComponent
  },
  {
    path: 'register-completed',
    component: RegistroExitosoComponent
  },
  {
    path: 'sign-in',
    canActivate: [AlreadyAuthGuard],
    component: SignInComponent
  },
  {
    path: 'recovery',
    component: SecurePasswordComponent
  },
  {
    path: '',
    pathMatch: 'full',
    //redirectTo: '/pre-sale/step1',
    redirectTo: '/sign-in',
  },
  {
    path: '**',
    pathMatch: 'full',
    //redirectTo: 'pre-sale/step1',
    redirectTo: '/sign-in',
  },
];

@NgModule({
  imports: [RouterModule.forRoot(routes, {scrollPositionRestoration: 'enabled'})],
  exports: [RouterModule]
})
export class AppRoutingModule { }
