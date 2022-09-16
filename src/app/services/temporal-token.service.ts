import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { NgxSpinnerService } from 'ngx-spinner';
import { lastValueFrom } from 'rxjs';
import { environment } from 'src/environments/environment';


import Swal from 'sweetalert2/dist/sweetalert2.js';
import moment from 'moment';


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
    try {
      await this.spinner.show();
      const result = await lastValueFrom(
        this.http.post(`${URL_ROOT}email-notification/send-token`, data)
      );

      return result;

    } catch (err) {
      console.log('Error on TemporalTokenService.sendToken', err);
      throw err;
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
    const res: any = { status: false, message: 'Código no válido' };
    const { inputToken, token, expiredAt } = params;

    /** Token expirado */
    if (moment(expiredAt).isBefore(moment())) {
      res.message = "Código Expirado";
      return res;

      /** Valores esperados */
    } else if (inputToken === token) {
      res.status = true;
      res.message = "Código Válido"
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

    const { value = false } = await Swal.fire({
      icon: 'question',
      title: "Código de verificación",
      html:
        '<p>'
        + `Antes de continuar es necesario el código de <strong>(${this.tokenLong})</strong> dígitos enviado a la dirección <strong>${email}</strong>, por favor ingréselo a continuación:`
        + "</p>"
      ,
      input: 'text',
      inputAttributes: {
        autocapitalize: 'off'
      },
      showCancelButton: true,
      confirmButtonText: 'Verificar',
      showLoaderOnConfirm: true,
      allowOutsideClick: false,
      allowEnterKey: false,
      allowEscapeKey: false,
      preConfirm: async (inputToken) => {
        try {

          if (`${inputToken}`.trim().length == 0) {
            throw 'El código no puede estar vacío';
          }

          if (!regexExpression.test(inputToken)) {
            throw 'El código debe tener 6 dígitos';
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
