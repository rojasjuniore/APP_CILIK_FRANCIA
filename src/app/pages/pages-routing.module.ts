import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { CheckHasCartGuard } from '../guards/check-has-cart.guard';
// import { DashboardComponent } from './dashboard/dashboard.component';
// import { LandingFormComponent } from './landing/components/landing-form/landing-form.component';
// import { LandingSection7Component } from './landing/components/landing-section7/landing-section7.component';
// import { HomePageComponent } from './pre-sale/components/home-page/home-page.component';

const routes: Routes = [
    {
        path: "dashboard",
        loadChildren: () => import("./dashboard/dashboard.module").then((m) => m.DashboardModule),
    },
    {
        path: "hotel-and-event",
        loadChildren: () => import("./hotel-and-event/hotel-and-event.module").then((m) => m.HotelAndEventModule),
    },
    {
        path: "cart",
        canActivate: [ CheckHasCartGuard ],
        loadChildren: () => import("./cart/cart.module").then((m) => m.CartModule),
    },
    {
        path: "checkout",
        canActivate: [ CheckHasCartGuard ],
        loadChildren: () => import("./checkout/checkout.module").then((m) => m.CheckoutModule),
    },
    {
        path: "purchases",
        loadChildren: () => import("./purchases/purchases.module").then((m) => m.PurchasesModule),
    },
    // {
    //     path: "dashboard",
    //     component: DashboardComponent,
    // },
    // {
    //     path: "buy",
    //     component: LandingFormComponent,
    //     data: { state: 'buy' }
    // },
    // { 
    //     path: '/home',
    //     component: HomePageComponent,
    //   },
    // {
    //     path: "reserve",
    //     component: LandingSection7Component,
    //     data: { state: 'reserve' }
    // },
    // {
    //     path: "checkout",
    //     component: LandingSection7Component,
    //     data: { state: 'checkout' }
    // }
    {
        path: "",
        pathMatch: "full",
        redirectTo: "/pages/dashboard",
    },
    {
        path: "**",
        pathMatch: "full",
        redirectTo: "/pages/dashboard",
    }

]

@NgModule({
    imports: [RouterModule.forChild(routes)],
    exports: [RouterModule]
})
export class PagesRoutingModule { }