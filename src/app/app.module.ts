import { CommonModule } from '@angular/common';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { HttpClient, HttpClientModule } from '@angular/common/http';
import { NgModule } from '@angular/core';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { BrowserModule } from '@angular/platform-browser';
import { ClipboardModule } from 'ngx-clipboard';
import { NgxSpinnerModule } from 'ngx-spinner';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { PipesModule } from './pipes/pipes.module';
import { TranslateModule, TranslateLoader } from '@ngx-translate/core';
import { TranslateHttpLoader } from '@ngx-translate/http-loader';
import { AngularFireModule } from '@angular/fire/compat';
import { AngularFireAuthModule } from '@angular/fire/compat/auth';
import { AngularFirestoreModule } from '@angular/fire/compat/firestore';
import { AngularFireAnalyticsModule } from '@angular/fire/compat/analytics';
import { AngularFireStorageModule } from '@angular/fire/compat/storage';
import { USE_DEVICE_LANGUAGE } from '@angular/fire/compat/auth';
import { NgxPayPalModule } from 'ngx-paypal';

import { environment } from 'src/environments/environment';
import { NgxMaskModule, IConfig } from 'ngx-mask';
import { ComponentsModule } from './components/components.module';
import { provideFirestore } from '@angular/fire/firestore';
import { getFirestore } from 'firebase/firestore';
import { provideFirebaseApp } from '@angular/fire/app';
import { initializeApp } from 'firebase/app';

// AoT requires an exported function for factories
export function HttpLoaderFactory(http: HttpClient) {
  return new TranslateHttpLoader(http);
}

export function createTranslateLoader(http: HttpClient) {
  return new TranslateHttpLoader(http, './assets/i18n/', '.json');
}

const maskConfig: Partial<IConfig> = {
  validation: false,
};

@NgModule({
  declarations: [AppComponent],
  imports: [
    BrowserModule,
    BrowserAnimationsModule,
    HttpClientModule,
    CommonModule,
    FormsModule,
    ReactiveFormsModule,
    ClipboardModule,
    AppRoutingModule,
    NgxSpinnerModule,
    PipesModule,
    ComponentsModule,
    NgxMaskModule.forRoot(maskConfig),
    TranslateModule.forRoot({
      loader: {
        provide: TranslateLoader,
        useFactory: HttpLoaderFactory,
        deps: [HttpClient],
      },
      defaultLanguage: 'es',
    }),
    NgxPayPalModule,
    AngularFireModule.initializeApp(environment.firebase),
    AngularFireAnalyticsModule,
    AngularFirestoreModule,
    AngularFireStorageModule,
    AngularFireAuthModule,
  ],
  providers: [{ provide: USE_DEVICE_LANGUAGE, useValue: true }],
  bootstrap: [AppComponent],
})
export class AppModule {}
