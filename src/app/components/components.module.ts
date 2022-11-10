import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { TranslateModule, TranslatePipe } from '@ngx-translate/core';
import { NgxMaskModule } from 'ngx-mask';
import { Footer1Component } from './footer1/footer1.component';
import { Footer2Component } from './footer2/footer2.component';
import { SignInComponent } from './sign-in/sign-in.component';
import { SignUpComponent } from './sign-up/sign-up.component';
import { RouterModule } from '@angular/router';
import { RegistroExitosoComponent } from './registro-exitoso/registro-exitoso.component';
import { SecurePasswordComponent } from './secure-password/secure-password.component';
import { ModalPlanDetailsComponent } from './modal-plan-details/modal-plan-details.component';
import { InputNumberFormComponent } from './input-number-form/input-number-form.component';
import { PreSalePlanCardItemComponent } from './pre-sale-plan-card-item/pre-sale-plan-card-item.component';
import { PreSaleAddRoomButtonComponent } from './pre-sale-add-room-button/pre-sale-add-room-button.component';
import { PreSaleTotalesComponent } from './pre-sale-totales/pre-sale-totales.component';
import { HeaderCilikComponent } from './header-cilik/header-cilik.component';
import { FooterCilikComponent } from './footer-cilik/footer-cilik.component';
import { PreSaleModalRoomTypeDetailsComponent } from './pre-sale-modal-room-type-details/pre-sale-modal-room-type-details.component';
import { PreSaleModalAdditionalDaysComponent } from './pre-sale-modal-additional-days/pre-sale-modal-additional-days.component';
import { PreSaleStepsCounterComponent } from './pre-sale-steps-counter/pre-sale-steps-counter.component';
import { PreSaleCheckoutCardItemComponent } from './pre-sale-checkout-card-item/pre-sale-checkout-card-item.component';
import { PreSaleCheckoutCategoryCardItemComponent } from './pre-sale-checkout-category-card-item/pre-sale-checkout-category-card-item.component';
import { PreSaleModalPaymentCoutasDetailsComponent } from './pre-sale-modal-payment-coutas-details/pre-sale-modal-payment-coutas-details.component';
import { PreSaleInstallmentCoutaCardItemComponent } from './pre-sale-installment-couta-card-item/pre-sale-installment-couta-card-item.component';
import { PurchaseSummaryDetailsCardItemComponent } from './purchase-summary-details-card-item/purchase-summary-details-card-item.component';
import { PurchaseSummaryDetailsCategoryCardItemComponent } from './purchase-summary-details-category-card-item/purchase-summary-details-category-card-item.component';
import { HeaderWelcomeComponent } from './header-welcome/header-welcome.component';
import { InputNumberFormTwoComponent } from './input-number-form-two/input-number-form-two.component';
import { HistoryCardPurchaseItemComponent } from './history-card-purchase-item/history-card-purchase-item.component';
import { HistoryCardCategoryPurchaseItemComponent } from './history-card-category-purchase-item/history-card-category-purchase-item.component';
import { PaypalComponent } from './paypal/paypal.component';
import { NgxPayPalModule } from 'ngx-paypal';
import { PurchaseSummaryTotalesComponent } from './purchase-summary-totales/purchase-summary-totales.component';
import { MyPurchasesComponent } from './my-purchases/my-purchases.component';
import { MyPurchasesListItemComponent } from './my-purchases-list-item/my-purchases-list-item.component';
import { PurchaseSummaryModalDetailsComponent } from './purchase-summary-modal-details/purchase-summary-modal-details.component';
import { PreSaleExtraSoloCardItemComponent } from './pre-sale-extra-solo-card-item/pre-sale-extra-solo-card-item.component';
import { PreSaleExtraSoloCoupleItemComponent } from './pre-sale-extra-solo-couple-item/pre-sale-extra-solo-couple-item.component';
import { PreSaleExtraSoloGroupItemComponent } from './pre-sale-extra-solo-group-item/pre-sale-extra-solo-group-item.component';
import { PreSaleModalOnlyCategoriesTermsComponent } from './pre-sale-modal-only-categories-terms/pre-sale-modal-only-categories-terms.component';
import { PreSaleCategoriesStepCounterComponent } from './pre-sale-categories-step-counter/pre-sale-categories-step-counter.component';
import { PreSaleCheckoutOnlyCategoryCardItemComponent } from './pre-sale-checkout-only-category-card-item/pre-sale-checkout-only-category-card-item.component';
import { LanguageBarComponent } from './language-bar/language-bar.component';
import { RemoveOrderOnBackButtonComponent } from './remove-order-on-back-button/remove-order-on-back-button.component';
import { PreSaleModalBankTransferDetailComponent } from './pre-sale-modal-bank-transfer-detail/pre-sale-modal-bank-transfer-detail.component';
import { CardBankTransferComponent } from './card-bank-transfer/card-bank-transfer.component';
import { PermissionRolesAddComponent } from './permission-roles-add/permission-roles-add.component';
import { PermissionRolesUpdateComponent } from './permission-roles-update/permission-roles-update.component';
import { PermissionRolesRemoveComponent } from './permission-roles-remove/permission-roles-remove.component';
import { PermissionProfileUpdateComponent } from './permission-profile-update/permission-profile-update.component';
import { LogoutComponent } from './logout/logout.component'; 
import { PruchaseInstallmentPayCoutaCardItemComponent } from './pruchase-installment-pay-couta-card-item/pruchase-installment-pay-couta-card-item.component';
import { PreSaleEventPassStepCounterComponent } from './pre-sale-event-pass-step-counter/pre-sale-event-pass-step-counter.component';
import { PreSaleOnlyEventPassCardItemComponent } from './pre-sale-only-event-pass-card-item/pre-sale-only-event-pass-card-item.component';


@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    ReactiveFormsModule,
    TranslateModule,
    RouterModule,
    NgxPayPalModule,
    NgxMaskModule.forRoot(),
  ],
  declarations: [
    Footer1Component,
    Footer2Component,
    SignInComponent,
    SignUpComponent,
    RegistroExitosoComponent,
    SecurePasswordComponent,
    ModalPlanDetailsComponent,
    InputNumberFormComponent,
    InputNumberFormTwoComponent,
    PreSalePlanCardItemComponent,
    PreSaleAddRoomButtonComponent,
    PreSaleTotalesComponent,
    HeaderCilikComponent,
    FooterCilikComponent,
    PreSaleModalRoomTypeDetailsComponent,
    PreSaleModalAdditionalDaysComponent,
    HeaderWelcomeComponent,
    PreSaleStepsCounterComponent,
    PreSaleCheckoutCardItemComponent,
    PreSaleCheckoutCategoryCardItemComponent,
    PreSaleModalPaymentCoutasDetailsComponent,
    PreSaleInstallmentCoutaCardItemComponent,
    PurchaseSummaryDetailsCardItemComponent,
    PurchaseSummaryDetailsCategoryCardItemComponent,
    HistoryCardPurchaseItemComponent,
    HistoryCardCategoryPurchaseItemComponent,
    PaypalComponent,
    PurchaseSummaryTotalesComponent,
    MyPurchasesComponent,
    MyPurchasesListItemComponent,
    PurchaseSummaryModalDetailsComponent,
    PreSaleExtraSoloCardItemComponent,
    PreSaleExtraSoloCoupleItemComponent,
    PreSaleExtraSoloGroupItemComponent,
    PreSaleModalOnlyCategoriesTermsComponent,
    PreSaleCategoriesStepCounterComponent,
    PreSaleCheckoutOnlyCategoryCardItemComponent,
    LanguageBarComponent,
    RemoveOrderOnBackButtonComponent,
    PreSaleModalBankTransferDetailComponent,
    CardBankTransferComponent,
    PermissionRolesAddComponent,
    PermissionRolesUpdateComponent,
    PermissionRolesRemoveComponent,
    PermissionProfileUpdateComponent,
    LogoutComponent,
    PruchaseInstallmentPayCoutaCardItemComponent,
    PreSaleEventPassStepCounterComponent,
    PreSaleOnlyEventPassCardItemComponent,
  ],
  exports: [
    CommonModule,
    FormsModule,
    ReactiveFormsModule,
    Footer1Component,
    Footer2Component,
    SignInComponent,
    SignUpComponent,
    ModalPlanDetailsComponent,
    InputNumberFormComponent,
    InputNumberFormTwoComponent,
    PreSalePlanCardItemComponent,
    PreSaleAddRoomButtonComponent,
    PreSaleTotalesComponent,
    PreSaleModalRoomTypeDetailsComponent,
    PreSaleModalAdditionalDaysComponent,
    PreSaleStepsCounterComponent,
    PreSaleCheckoutCardItemComponent,
    PreSaleCheckoutCategoryCardItemComponent,
    HeaderCilikComponent,
    FooterCilikComponent,
    MyPurchasesListItemComponent,
    HeaderWelcomeComponent,
    PreSaleModalPaymentCoutasDetailsComponent,
    PreSaleInstallmentCoutaCardItemComponent,
    PurchaseSummaryDetailsCardItemComponent,
    PurchaseSummaryDetailsCategoryCardItemComponent,
    HistoryCardPurchaseItemComponent,
    HistoryCardCategoryPurchaseItemComponent,
    PaypalComponent,
    PurchaseSummaryTotalesComponent,
    MyPurchasesComponent,
    PurchaseSummaryModalDetailsComponent,
    PreSaleExtraSoloCardItemComponent,
    PreSaleExtraSoloCoupleItemComponent,
    PreSaleExtraSoloGroupItemComponent,
    PreSaleModalOnlyCategoriesTermsComponent,
    PreSaleCategoriesStepCounterComponent,
    PreSaleCheckoutOnlyCategoryCardItemComponent,
    LanguageBarComponent,
    RemoveOrderOnBackButtonComponent,
    PreSaleModalBankTransferDetailComponent,
    PermissionRolesAddComponent,
    PermissionRolesUpdateComponent,
    PermissionRolesRemoveComponent,
    PermissionProfileUpdateComponent,
    LogoutComponent,
    PruchaseInstallmentPayCoutaCardItemComponent,
    PreSaleEventPassStepCounterComponent,
    PreSaleOnlyEventPassCardItemComponent,
  ],
  providers: [
    TranslatePipe,
  ],
})
export class ComponentsModule { }
