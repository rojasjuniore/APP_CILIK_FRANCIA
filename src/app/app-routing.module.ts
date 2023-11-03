import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { CheckAdminRoleGuard } from './guards/check-admin-role.guard';
import { PagesLayoutComponent } from './shared/pages-layout/pages-layout.component';
import { OutPagesLayoutComponent } from './out-pages/out-pages-layout/out-pages-layout.component';
import { AdminLayoutComponent } from './shared/admin-layout/admin-layout.component';
import { AnonymouslyGuard } from './guards/anonymously.guard';
import { NoAnonGuard } from './guards/no-anon.guard';
import { SchoolComponent } from './school/school.component';
import { AnonGuard } from './guards/anon.guard';

const routes: Routes = [
  {
    path: 'pages',
    canActivate: [AnonymouslyGuard],
    component: PagesLayoutComponent,
    loadChildren: () => import("./pages/pages.module").then((m) => m.PagesModule),
  },
  {
    path: 'school',
    canActivate: [AnonGuard],
    component: SchoolComponent,
    loadChildren: () => import("./school/school.module").then((m) => m.SchoolModule)
  },
  {
    path: 'admin',
    canActivate: [CheckAdminRoleGuard],
    component: AdminLayoutComponent,
    loadChildren: () => import("./admin/admin.module").then((m) => m.AdminModule),
  },
  {
    path: 'auth',
    canActivate: [NoAnonGuard],
    component: OutPagesLayoutComponent,
    loadChildren: () => import("./out-pages/out-pages.module").then((m) => m.OutPagesModule)
  },

  {
    path: '',
    pathMatch: 'full',
    redirectTo: '/pages/dashboard',
  },
  {
    path: '**',
    pathMatch: 'full',
    redirectTo: '/pages/dashboard',
  },
];

@NgModule({
  imports: [RouterModule.forRoot(routes, { scrollPositionRestoration: 'enabled' })],
  exports: [RouterModule]
})
export class AppRoutingModule { }
