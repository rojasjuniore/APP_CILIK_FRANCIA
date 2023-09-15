import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { PagesLayoutComponent } from './pages-layout/pages-layout.component';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { TranslateModule } from '@ngx-translate/core';
import { NgxPayPalModule } from 'ngx-paypal';
import { LanguageBarComponent } from '../components/language-bar/language-bar.component';
import { RegistroExitosoComponent } from '../components/registro-exitoso/registro-exitoso.component';
import { HeaderCilikComponent } from '../components/header-cilik/header-cilik.component';
import { RouterModule } from '@angular/router';
import { FooterCilikComponent } from '../components/footer-cilik/footer-cilik.component';
import { OutPagesLayoutComponent } from './out-pages-layout/out-pages-layout.component';



@NgModule({
  declarations: [
    HeaderCilikComponent,
    FooterCilikComponent,
    LanguageBarComponent,
    RegistroExitosoComponent,
    PagesLayoutComponent,
    OutPagesLayoutComponent,
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
    FooterCilikComponent,
    LanguageBarComponent,
    RegistroExitosoComponent,
    PagesLayoutComponent,
    OutPagesLayoutComponent,
  ]
})
export class SharedModule { }
