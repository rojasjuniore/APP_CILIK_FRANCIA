import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ModalModule } from 'ngx-bootstrap/modal';
import { PreSaleRoutingModule } from './pre-sale-routing.module';
import { PreSaleComponent } from './pre-sale.component';
import { PreSalePackagesListComponent } from './components/pre-sale-packages-list/pre-sale-packages-list.component';
import { PreSaleModalTipoCamaComponent } from './components/pre-sale-modal-tipo-cama/pre-sale-modal-tipo-cama.component';
import { PreSaleModalNroParticipantsComponent } from './components/pre-sale-modal-nro-participants/pre-sale-modal-nro-participants.component';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { PreSaleRegisterManagerFormComponent } from './components/pre-sale-register-manager-form/pre-sale-register-manager-form.component';
import { PreSaleAssignRoomsComponent } from './components/pre-sale-assign-rooms/pre-sale-assign-rooms.component';
import { PreSaleCheckoutListComponent } from './components/pre-sale-checkout-list/pre-sale-checkout-list.component';
import { PreSalePaymentMethodsComponent } from './components/pre-sale-payment-methods/pre-sale-payment-methods.component';
import { PreSaleExtrasComponent } from './components/pre-sale-extras/pre-sale-extras.component';
import { HomePageComponent } from './components/home-page/home-page.component';
import { PreSaleCamasComponent } from './components/pre-sale-camas/pre-sale-camas.component';
import { ComponentsModule } from 'src/app/components/components.module';
import { NgxMaskModule } from 'ngx-mask';
import { PreSaleInstallmentsDetailsComponent } from './components/pre-sale-installments-details/pre-sale-installments-details.component';
import { PreSaleCreditCardComponent } from './components/pre-sale-credit-card/pre-sale-credit-card.component';
import { PreSaleCryptoComponent } from './components/pre-sale-crypto/pre-sale-crypto.component';
import { PreSaleInstallmentsPayCoutaComponent } from './components/pre-sale-installments-pay-couta/pre-sale-installments-pay-couta.component';
import { PreSalePaypalComponent } from './components/pre-sale-paypal/pre-sale-paypal.component';
import { TranslateModule, TranslatePipe } from '@ngx-translate/core';


@NgModule({
  declarations: [
    PreSaleComponent,
    PreSalePackagesListComponent,
    PreSaleModalTipoCamaComponent,
    PreSaleModalNroParticipantsComponent,
    PreSaleRegisterManagerFormComponent,
    PreSaleAssignRoomsComponent,
    PreSaleCheckoutListComponent,
    PreSalePaymentMethodsComponent,
    PreSaleExtrasComponent,
    HomePageComponent,
    PreSaleCamasComponent,
    PreSaleInstallmentsDetailsComponent,
    PreSaleCreditCardComponent,
    PreSaleCryptoComponent,
    PreSalePaypalComponent,
    PreSaleInstallmentsPayCoutaComponent,
  ],
  imports: [
    CommonModule,
    ComponentsModule,
    FormsModule,
    ReactiveFormsModule,
    PreSaleRoutingModule,
    ModalModule.forRoot(),
    NgxMaskModule,
    TranslateModule,
  ],
  providers: [TranslatePipe],
})
export class PreSaleModule { }
