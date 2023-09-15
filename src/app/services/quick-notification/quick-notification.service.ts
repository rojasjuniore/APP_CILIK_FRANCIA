import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { environment } from 'src/environments/environment';
import { CustomizationfileService } from '../customizationfile/customizationfile.service';

@Injectable({
  providedIn: 'root'
})
export class QuickNotificationService {

  constructor(
    private http: HttpClient,
    public _cf: CustomizationfileService,
  ) { }

  /**
   * Enviar notificaciones rapidas por correo electronico
   * - Linea
   * -- { type: 'line', text: ''}
   * - Boton de acción
   * -- {type: 'action', action: '', url: ''}
   * - Contenido HTML
   * -- {type: 'html', html: ''}
   * @param params 
   * @returns 
   */
  async sendEmailNotification(params: EmailNotification) {
    return new Promise((resolve, reject) => {
      try {
        const eventId = this._cf.getKeyDb() || environment.dataEvent.keyDb;
        console.log('eventId', eventId);

        const url = `${environment.urlrootFunctions}/v3/emailNotification/quickCustomNotifications`;
        this.http.post(url, { ...params, eventId })
          .subscribe((res: any) => {
            return resolve(res);
          })
      } catch (err) {
        console.log('Error on QuickNotificationService.sendEmailNotification', err);
        return reject(err)
      }
    });
  }

}

export interface EmailNotification {
  type?: string;
  email: string;
  subject: string;
  messageBody: any[];
  greeting?: string;
  salutation?: string;
  cc?: string | null;
  bcc?: string | null;
}