import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { NgxSpinnerService } from 'ngx-spinner';
import { lastValueFrom } from 'rxjs';
import { environment } from 'src/environments/environment';


import Swal from 'sweetalert2/dist/sweetalert2.js';
import moment from 'moment';
import { CustomTranslateService } from './custom-translate.service';
import { QuickNotificationService } from './quick-notification/quick-notification.service';


const URL_ROOT: any = environment.API_URL;

@Injectable({
  providedIn: 'root'
})
export class TemporalTokenService {

  public tokenLong = 6;
  public expeditionTimeUnit = 'minute';
  public expeditionTimeUnitLang = 'minutos';
  public expeditionTimeValue = 5;
  public expireationTime = { [this.expeditionTimeUnit]: this.expeditionTimeValue };

  constructor(
    private http: HttpClient,
    private spinner: NgxSpinnerService,
    private customTranslateSrv: CustomTranslateService,
    private quickNotificationSrv: QuickNotificationService
  ) { }


  /**
   * General código numerico
   *
   * @param long            Longitud del código a generar
   * @returns 
   */
  generateCode(long: number = 6): string {

    const min = 0, max = 9;
    let generated: any[] = [];

    for (let index = 0; index < long; index++) {
      const element = Math.floor(Math.random() * (max - min + 1) + min);
      generated.push(element);
    }

    return generated.join('');
  }


  /**
   * Construir documento
   *
   * @param opts 
   * @returns 
   */
  buildDoc(opts: any = {}) {
    return {
      issuedOn: moment().valueOf(),
      token: this.generateCode(this.tokenLong),
      tokenTime: { unit: this.expeditionTimeUnitLang, value: this.expeditionTimeValue },
      expiredAt: moment().add({ [this.expeditionTimeUnit]: this.expeditionTimeValue }).valueOf(),
      email: opts.email || ``,
    };
  }


  /**
   * Enviar mail de notificación
   *
   * @param data 
   * @returns 
   */
  async sendToken(data: any) {
    // try {
    //   await this.spinner.show();
    //   const result = await lastValueFrom(
    //     this.http.post(`${URL_ROOT}email-notification/send-token`, data)
    //   );

    //   return result;

    // } catch (err) {
    //   console.log('Error on TemporalTokenService.sendToken', err);
    //   throw err;
    // } finally {
    //   this.spinner.hide();
    // }

    try {
      await this.spinner.show();

      await this.quickNotificationSrv.sendEmailNotification({
        type: "2FANotification",
        email: data.email,
        subject: "WLDC Cartagena 2024 - Token Temporal - " + moment().format("DD/MM/YYYY HH:mm:ss"),
        greeting: `¡Hola!`,
        messageBody: [
          {type: "line", text: "El código necesario para continuar con tu operación es el siguiente:"},
          {type: "html", html: `<h1 style='text-align: center;'><strong>${data.token}</strong></h1>`},
          {type: 'line', text: `Este código a caducará en ${data.tokenTime.value} ${data.tokenTime.unit} o al cancelar la transacción.`},
          {type: "line", text: "Si no solicitó este código, no se requiere ninguna acción adicional."}
        ],
        salutation: '¡Saludos!'
      });
      
    } catch (err) {
      console.log('Error on TemporalTokenService@sendToken', err);
      return;
    } finally {
      this.spinner.hide();
    }
  }


  /**
   * Ejecutar validación del token enviado con el token ingresado por el usuario
   * @param params 
   * @returns 
   */
  async runValidation(params: any) {

    let message = await this.customTranslateSrv.translate('temporalToken.invalidToken');
    const res: any = { status: false, message: message };
    const { inputToken, token, expiredAt } = params;

    /** Token expirado */
    if (moment(expiredAt).isBefore(moment())) {
      message = await this.customTranslateSrv.translate('temporalToken.expiredToken');
      res.message = message;
      return res;

      /** Valores esperados */
    } else if (inputToken === token) {
      message = await this.customTranslateSrv.translate('temporalToken.validToken');
      res.status = true;
      res.message = message;
    }

    return res;
  }


  /**
   * Mostar alerta con input token
   * @param params 
   * @returns 
   */
  async alertWithInputToken(params: any) {
    const { email, token, expiredAt } = params;

    const regexExpression = new RegExp(/^[0-9]{6}$/);

    const alertTitle = await this.customTranslateSrv.translate('temporalToken.alertTitle');
    const alertText = await this.customTranslateSrv.translate('temporalToken.alertMessage', {tokenLong: this.tokenLong, email });
    const alertConfirmButtonText = await this.customTranslateSrv.translate('general.verify');
    const alertCancelButton = await this.customTranslateSrv.translate('general.cancel');

    const { value = false } = await Swal.fire({
      icon: 'question',
      title: alertTitle,
      html:
        '<p>'
        // + `Antes de continuar es necesario el código de <strong>(${this.tokenLong})</strong> dígitos enviado a la dirección <strong>${email}</strong>, por favor ingréselo a continuación:`
        + alertText
        + "</p>"
      ,
      input: 'text',
      inputAttributes: {
        autocapitalize: 'off'
      },
      showCancelButton: true,
      confirmButtonText: alertConfirmButtonText,
      cancelButtonText: alertCancelButton,
      showLoaderOnConfirm: true,
      allowOutsideClick: false,
      allowEnterKey: false,
      allowEscapeKey: false,
      preConfirm: async (inputToken) => {
        try {

          if (`${inputToken}`.trim().length == 0) {
            const message = await this.customTranslateSrv.translate('temporalToken.validations.emptyToken');
            throw message;
            // throw 'El código no puede estar vacío';
          }

          if (!regexExpression.test(inputToken)) {
            const message = await this.customTranslateSrv.translate('temporalToken.validations.tokenLength', {tokenLong: this.tokenLong});
            throw message;
            // throw 'El código debe tener 6 dígitos';
          }

          const runValidation = await this.runValidation({ inputToken, token, expiredAt });

          if (!runValidation.status) {
            throw runValidation.message;
          }

          return true;

        } catch (err) {
          return Swal.showValidationMessage(`${err}`);
        }
      },
    });


    return value;
  }


  /**
   * Solicitar token a través del email
   *
   * @param email 
   * @returns 
   */
  async runByEmail(email: string) {
    const res = { status: false, message: 'Who! some error, please contact IT' };

    try {

      /** generar token */
      const tokenDoc = this.buildDoc({ email });

      /** Enviar mail con el token */
      await this.sendToken(tokenDoc);

      /** Mostrar alerta con opcion para ingresar token y validar */
      let mensaje = await this.alertWithInputToken(tokenDoc);


      return mensaje;

    } catch (err) {
      console.log('Error on TemporalTokenService@runByEmail', err);
      return res;
    }
  }

}
