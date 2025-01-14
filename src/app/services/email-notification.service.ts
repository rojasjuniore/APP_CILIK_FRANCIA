import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { lastValueFrom } from 'rxjs';
import { environment } from 'src/environments/environment';

const URL_ROOT: any = environment.API_URL;

@Injectable({
  providedIn: 'root'
})
export class EmailNotificationService {

  constructor(
    private http: HttpClient,
  ) { }


  /**
   * Enviar mail de notificación
   *
   * @param name            Nombre del usuario
   * @param email           Correo del usuario
   * @returns 
   */
  async sendWelcomeNotification(names: string, email: string){
    try {
      const result = await lastValueFrom( 
        this.http.post(`${URL_ROOT}/email-notification/welcome-notification`, {names, email})
      );

      return result;
      
    } catch (err) {
      console.log('Error on TemporalTokenService.sendWelcomeNotification', err);
      throw err;
    }
  }

    /**
   * Enviar mail a soporte
   *
   * @param name            Nombre del usuario
   * @param email           Correo del usuario
   * @returns 
   */
     async sendSupportNotification(subject: string, description: string , userEmail: string){
      try {
        const result = await lastValueFrom( 
          this.http.post(`${URL_ROOT}email-notification/support-service`, {subject, description, userEmail})
        );
  
        return result;
        
      } catch (err) {
        console.log('Error on TemporalTokenService.sendWelcomeNotification', err);
        throw err;
      }
    }
}
