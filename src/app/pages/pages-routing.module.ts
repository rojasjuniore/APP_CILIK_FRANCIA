import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { CheckHasCartGuard } from '../guards/check-has-cart.guard';
import { AnonGuard } from '../guards/anon.guard';

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
        canActivate: [CheckHasCartGuard],
        loadChildren: () => import("./cart/cart.module").then((m) => m.CartModule),
    },
    {
        path: "checkout",
        canActivate: [AnonGuard, CheckHasCartGuard],
        loadChildren: () => import("./checkout/checkout.module").then((m) => m.CheckoutModule),
    },
    {
        path: "purchases",
        canActivate: [AnonGuard],
        loadChildren: () => import("./purchases/purchases.module").then((m) => m.PurchasesModule),
    },
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