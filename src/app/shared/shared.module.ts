import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { PagesLayoutComponent } from './pages-layout/pages-layout.component';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { TranslateModule } from '@ngx-translate/core';
import { NgxPayPalModule } from 'ngx-paypal';
import { LanguageBarComponent } from '../components/language-bar/language-bar.component';
import { RegistroExitosoComponent } from '../components/registro-exitoso/registro-exitoso.component';
import { HeaderCilikComponent } from './header-cilik/header-cilik.component';
import { RouterModule } from '@angular/router';
import { FooterCilikComponent } from '../components/footer-cilik/footer-cilik.component';
import { OutPagesLayoutComponent } from './out-pages-layout/out-pages-layout.component';
import { HeaderWelcomeComponent } from './header-welcome/header-welcome.component';
import { ModalOnlyInputNumberComponent } from './modal-only-input-number/modal-only-input-number.component';
import { InputNumberFormComponent } from './input-number-form/input-number-form.component';
import { ModalStoreOnlyCategoriesComponent } from './modal-store-only-categories/modal-store-only-categories.component';
import { InputSigleCalendarComponent } from './input-sigle-calendar/input-sigle-calendar.component';
import { ModalStoreOnlyDayPassComponent } from './modal-store-only-day-pass/modal-store-only-day-pass.component';
import { ModalHotelEventRoomsListComponent } from './modal-hotel-event-rooms-list/modal-hotel-event-rooms-list.component';
import { HotelAndEventRoomListItemCardComponent } from './hotel-and-event-room-list-item-card/hotel-and-event-room-list-item-card.component';
import { CartHotelEventCardItemComponent } from './cart-hotel-event-card-item/cart-hotel-event-card-item.component';
import { PaypalButtonComponent } from './paypal-button/paypal-button.component';
import { TucompraFormComponent } from './tucompra-form/tucompra-form.component';
import { PurchaseListComponent } from './purchase-list/purchase-list.component';
import { PurchaseListItemCardComponent } from './purchase-list-item-card/purchase-list-item-card.component';
import { CustomInputFileComponent } from './custom-input-file/custom-input-file.component';
import { AdminLayoutComponent } from './admin-layout/admin-layout.component';
import { VoucherCardItemComponent } from './voucher-card-item/voucher-card-item.component';



@NgModule({
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
    InputSigleCalendarComponent,
    PaypalButtonComponent,
    TucompraFormComponent,
    CustomInputFileComponent,
    VoucherCardItemComponent,
    
    ModalOnlyInputNumberComponent,
    ModalStoreOnlyCategoriesComponent,
    ModalStoreOnlyDayPassComponent,
    ModalHotelEventRoomsListComponent,
  ],
  imports: [
    CommonModule,
    FormsModule,
    ReactiveFormsModule,
    TranslateModule,
    NgxPayPalModule,
    RouterModule,
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
    InputSigleCalendarComponent,
    PaypalButtonComponent,
    TucompraFormComponent,
    CustomInputFileComponent,
    VoucherCardItemComponent,

    ModalOnlyInputNumberComponent,
    ModalStoreOnlyCategoriesComponent,
    ModalStoreOnlyDayPassComponent,
    ModalHotelEventRoomsListComponent,
  ]
})
export class SharedModule { }
