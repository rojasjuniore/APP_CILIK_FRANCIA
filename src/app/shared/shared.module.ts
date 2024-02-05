import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { PipesModule } from '../pipes/pipes.module';
import { PagesLayoutComponent } from './pages-layout/pages-layout.component';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { TranslateModule } from '@ngx-translate/core';
import { NgxPayPalModule } from 'ngx-paypal';
import { LanguageBarComponent } from '../components/language-bar/language-bar.component';
import { RegistroExitosoComponent } from '../components/registro-exitoso/registro-exitoso.component';
import { HeaderCilikComponent } from './header-cilik/header-cilik.component';
import { RouterModule } from '@angular/router';
import { FooterCilikComponent } from '../components/footer-cilik/footer-cilik.component';
import { OutPagesLayoutComponent } from '../out-pages/out-pages-layout/out-pages-layout.component';
import { HeaderWelcomeComponent } from './header-welcome/header-welcome.component';
import { ModalOnlyInputNumberComponent } from './modal-only-input-number/modal-only-input-number.component';
import { InputNumberFormComponent } from './input-number-form/input-number-form.component';
import { ModalStoreOnlyCategoriesComponent } from './modal-store-only-categories/modal-store-only-categories.component';
import { InputSigleCalendarComponent } from './input-sigle-calendar/input-sigle-calendar.component';
import { ModalStoreOnlyDayPassComponent } from './modal-store-only-day-pass/modal-store-only-day-pass.component';
import { ModalHotelEventRoomsListComponent } from './modal-hotel-event-rooms-list/modal-hotel-event-rooms-list.component';
import { HotelAndEventRoomListItemCardComponent } from './hotel-and-event-room-list-item-card/hotel-and-event-room-list-item-card.component';
import { CartHotelEventCardItemComponent } from '../pages/cart/components/cart-hotel-event-card-item/cart-hotel-event-card-item.component';
import { PaypalButtonComponent } from '../pages/checkout/components/paypal-button/paypal-button.component';
import { TucompraFormComponent } from '../pages/checkout/components/tucompra-form/tucompra-form.component';
import { PurchaseListComponent } from '../pages/dashboard/components/purchase-list/purchase-list.component';
import { PurchaseListItemCardComponent } from '../pages/dashboard/components/purchase-list-item-card/purchase-list-item-card.component';
import { CustomInputFileComponent } from './custom-input-file/custom-input-file.component';
import { AdminLayoutComponent } from './admin-layout/admin-layout.component';
import { VoucherCardItemComponent } from './voucher-card-item/voucher-card-item.component';
import { VoucherTimelineCardComponent } from './voucher-timeline-card/voucher-timeline-card.component';
import { ModalUpdateVoucherStatusFormComponent } from './modal-update-voucher-status-form/modal-update-voucher-status-form.component';
import { CartCouponFormComponent } from '../pages/cart/components/cart-coupon-form/cart-coupon-form.component';
import { CartTotalesComponent } from '../pages/cart/components/cart-totales/cart-totales.component';
import { InputRangeCalendarComponent } from './input-range-calendar/input-range-calendar.component';
import { InputGroupNumberFormComponent } from './input-group-number-form/input-group-number-form.component';
import { PurchaseTotalesComponent } from '../pages/checkout/components/purchase-totales/purchase-totales.component';
import { CheckoutBanktransferSelectOptionComponent } from '../pages/checkout/components/checkout-banktransfer-select-option/checkout-banktransfer-select-option.component';
import { PurchaseUploadVoucherFormComponent } from './purchase-upload-voucher-form/purchase-upload-voucher-form.component';
import { PurchaseBankTransferInfoCardItemComponent } from './purchase-bank-transfer-info-card-item/purchase-bank-transfer-info-card-item.component';
import { InstallmentsComponent } from '../pages/checkout/components/installments/installments.component';
import { ClipboardModule } from 'ngx-clipboard';
import { HeaderAuthComponent } from './header-auth/header-auth.component';
import { SchoolComponent } from '../school/school.component';


import { PurchaseFullDetailsComponent } from '../pages/purchases/components/purchase-full-details/purchase-full-details.component';
import { PurchaseCategoryPassCardItemComponent } from '../pages/purchases/components/purchase-category-pass-card-item/purchase-category-pass-card-item.component';
import { PurchaseDayPassCardItemComponent } from '../pages/purchases/components/purchase-day-pass-card-item/purchase-day-pass-card-item.component';
import { PurchaseFullpassCardItemComponent } from '../pages/purchases/components/purchase-fullpass-card-item/purchase-fullpass-card-item.component';
import { PurchaseHotelEventCardItemComponent } from '../pages/purchases/components/purchase-hotel-event-card-item/purchase-hotel-event-card-item.component';
import { PurchaseInstallmentsModalComponent } from '../pages/purchases/components/purchase-installments-modal/purchase-installments-modal.component';
import { PurchaseInstallmentsVoucherComponent } from '../pages/purchases/components/purchase-installments-voucher/purchase-installments-voucher.component';
import { PurchaseInstallmentsComponent } from '../pages/purchases/components/purchase-installments/purchase-installments.component';
import { PurchaseWeekendPassCardItemComponent } from '../pages/purchases/components/purchase-weekend-pass-card-item/purchase-weekend-pass-card-item.component';
import { AdviserCheckoutComponent } from '../pages/checkout/components/adviser-checkout/adviser-checkout.component';
import { ModalCouponFindOwnerComponent } from '../admin/coupons/components/modal-coupon-find-owner/modal-coupon-find-owner.component';
import { ModalFullPassPerDayComponent } from './modal-full-pass-per-day/modal-full-pass-per-day.component';
import { ModalWeekenFestComponent } from './modal-weeken-fest/modal-weeken-fest.component';
import { AudioPlayerComponent } from './audio-player/audio-player.component';
import { ModalMerchantAddUserComponent } from './modal-merchant-add-user/modal-merchant-add-user.component';

import { AssignedClaimFullPassPerDayComponent } from '../pages/purchases/components/assigned/assigned-claim-full-pass-per-day/assigned-claim-full-pass-per-day.component';
import { AssignedFullPassComponent } from '../pages/purchases/components/assigned/assigned-full-pass/assigned-full-pass.component';
import { AssignedHotelComponent } from '../pages/purchases/components/assigned/assigned-hotel/assigned-hotel.component';
import { AssignedWeekendFestComponent } from '../pages/purchases/components/assigned/assigned-weekend-fest/assigned-weekend-fest.component';
import { AssignedWeekendPassComponent } from '../pages/purchases/components/assigned/assigned-weekend-pass/assigned-weekend-pass.component';
import { CategoryClaimsComponent } from '../pages/purchases/components/claim/category-claims/category-claims.component';





@NgModule({

  imports: [
    CommonModule,
    FormsModule,
    ClipboardModule,
    ReactiveFormsModule,
    TranslateModule,
    NgxPayPalModule,
    PipesModule,
    RouterModule,
  ],

  declarations: [
    HeaderCilikComponent,
    HeaderWelcomeComponent,
    FooterCilikComponent,
    LanguageBarComponent,
    RegistroExitosoComponent,
    PagesLayoutComponent,
    OutPagesLayoutComponent,
    HotelAndEventRoomListItemCardComponent,
    CartHotelEventCardItemComponent,
    PurchaseListComponent,
    PurchaseListItemCardComponent,
    AdminLayoutComponent,

    InputNumberFormComponent,
    InputGroupNumberFormComponent,
    InputSigleCalendarComponent,
    InputRangeCalendarComponent,
    PaypalButtonComponent,
    TucompraFormComponent,
    CustomInputFileComponent,
    VoucherCardItemComponent,
    VoucherTimelineCardComponent,
    CartCouponFormComponent,
    CartTotalesComponent,
    PurchaseTotalesComponent,
    CheckoutBanktransferSelectOptionComponent,
    PurchaseUploadVoucherFormComponent,
    PurchaseBankTransferInfoCardItemComponent,

    ModalOnlyInputNumberComponent,
    ModalStoreOnlyCategoriesComponent,
    ModalStoreOnlyDayPassComponent,
    ModalHotelEventRoomsListComponent,
    ModalUpdateVoucherStatusFormComponent,
    InstallmentsComponent,
    HeaderAuthComponent,

    SchoolComponent,

    PurchaseFullDetailsComponent,
    PurchaseCategoryPassCardItemComponent,
    PurchaseDayPassCardItemComponent,
    PurchaseFullpassCardItemComponent,
    PurchaseWeekendPassCardItemComponent,
    PurchaseHotelEventCardItemComponent,
    PurchaseInstallmentsComponent,
    PurchaseInstallmentsModalComponent,
    PurchaseInstallmentsVoucherComponent,

    AdviserCheckoutComponent,

    ModalCouponFindOwnerComponent,
    ModalFullPassPerDayComponent,
    ModalWeekenFestComponent,
    AudioPlayerComponent,
    ModalMerchantAddUserComponent,


    AssignedWeekendFestComponent,
    AssignedFullPassComponent,
    AssignedHotelComponent,
    AssignedClaimFullPassPerDayComponent,
    AssignedWeekendPassComponent,
    CategoryClaimsComponent,


  ],

  exports: [
    FormsModule,
    ReactiveFormsModule,
    TranslateModule,
    NgxPayPalModule,
    RouterModule,

    HeaderCilikComponent,
    HeaderWelcomeComponent,
    FooterCilikComponent,
    LanguageBarComponent,
    RegistroExitosoComponent,
    PagesLayoutComponent,
    OutPagesLayoutComponent,
    HotelAndEventRoomListItemCardComponent,
    CartHotelEventCardItemComponent,
    PurchaseListComponent,
    PurchaseListItemCardComponent,
    AdminLayoutComponent,

    InputNumberFormComponent,
    InputGroupNumberFormComponent,
    InputSigleCalendarComponent,
    InputRangeCalendarComponent,
    PaypalButtonComponent,
    TucompraFormComponent,
    CustomInputFileComponent,
    VoucherCardItemComponent,
    VoucherTimelineCardComponent,
    CartCouponFormComponent,
    CartTotalesComponent,
    PurchaseTotalesComponent,
    CheckoutBanktransferSelectOptionComponent,
    PurchaseUploadVoucherFormComponent,
    PurchaseBankTransferInfoCardItemComponent,

    ModalOnlyInputNumberComponent,
    ModalStoreOnlyCategoriesComponent,
    ModalStoreOnlyDayPassComponent,
    ModalHotelEventRoomsListComponent,
    ModalUpdateVoucherStatusFormComponent,

    InstallmentsComponent,
    HeaderAuthComponent,

    SchoolComponent,

    PurchaseFullDetailsComponent,
    PurchaseCategoryPassCardItemComponent,
    PurchaseDayPassCardItemComponent,
    PurchaseFullpassCardItemComponent,
    PurchaseWeekendPassCardItemComponent,
    PurchaseHotelEventCardItemComponent,
    PurchaseInstallmentsComponent,
    PurchaseInstallmentsModalComponent,
    PurchaseInstallmentsVoucherComponent,

    AdviserCheckoutComponent,

    ModalCouponFindOwnerComponent,
    ModalFullPassPerDayComponent,
    ModalWeekenFestComponent,

    AudioPlayerComponent,
    ModalMerchantAddUserComponent,


    AssignedWeekendFestComponent,
    AssignedFullPassComponent,
    AssignedHotelComponent,
    AssignedClaimFullPassPerDayComponent,
    AssignedWeekendPassComponent,
    CategoryClaimsComponent,



  ]
})
export class SharedModule { }
