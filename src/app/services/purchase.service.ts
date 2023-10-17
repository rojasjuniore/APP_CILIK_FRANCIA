import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { AngularFirestore } from '@angular/fire/compat/firestore';
import { arrayRemove, arrayUnion, increment } from 'firebase/firestore';
import moment from 'moment';
import { lastValueFrom, Observable } from 'rxjs';
import { environment } from 'src/environments/environment';
import { handlerArrayResult, handlerObjectResult } from '../helpers/model.helper';
import { ExcelService } from './excel.service';
import { QuickNotificationService } from './quick-notification/quick-notification.service';
import { TranslatePipe } from '@ngx-translate/core';

const URL_ROOT: any = environment.API_URL;
@Injectable({
  providedIn: 'root'
})
export class PurchaseService {

  public purchaseCollection = 'hotel_event';

  constructor(
    private afs: AngularFirestore,
    private http: HttpClient,
    private excelSrv: ExcelService,
    private quickNotificationSrv: QuickNotificationService,
    private translatePipe: TranslatePipe,
  ) { }

  async storePurchase(eventId: string, docId: string, data: any) {
    // return this.afs.collection(this.purchaseCollection).doc(docId).set(data);
    return await this.afs.collection(this.purchaseCollection).doc(eventId).collection('purchases').doc(docId).set(data);
  }

  async updatePurchase(eventId: string, docId: string, data: any) {
    // return this.afs.collection(this.purchaseCollection).doc(docId).update(data);
    return await this.afs.collection(this.purchaseCollection).doc(eventId).collection('purchases').doc(docId).update(data);
  }

  getByEventAndId(eventId: string, docId: string) {
    return this.afs.collection(this.purchaseCollection).doc(eventId).collection('purchases').doc(docId).valueChanges();
  }

  async getByEventAndIdPromise(eventId: string, docId: string) {
    try {
      const snapshot = await lastValueFrom(
        this.afs.collection(this.purchaseCollection).doc(eventId).collection('purchases').doc(docId).get()
      );
      return await handlerObjectResult(snapshot);
      
    } catch (err) {
      console.log('Error on PurchaseService.getByEventAndIdPromise', err);
      return null;
    }
  }

  /**
   * Añadir elementos al arreglo
   * @param eventId           Id del evento
   * @param docId               Id del usuario
   * @param data              Datos a añadir
   * @param field             Campo aplicar la operación
   * @returns 
   */
  async addOnArray(eventId: string, docId: string, data: any[], field: string = 'timeline'){
    await Promise.all(
      data.map(async (item: any) => 
        this.afs.collection(this.purchaseCollection).doc(eventId).collection('purchases').doc(docId).update({[field]: arrayUnion(item)})
      )
    );
    return true;
  }

  /**
   * Remover elementos del arreglo
   * @param eventId           Id del evento
   * @param docId               Id del usuario
   * @param data              Datos a remover
   * @param field             Campo aplicar la operación
   * @returns 
   */
  async removeOnArray(eventId: string, docId: string, data: any, field: string = 'timeline'){
    return await this.afs.collection(this.purchaseCollection)
      .doc(eventId).collection('purchases').doc(docId).update({
        [field]: arrayRemove(data)
      });
  }

  /**
   * Enviar email de notificación de compra realizada
   * @param params 
   * @returns 
   */
  async sendPurchaseInformationNotification(params: PurchaseInformationNotificationParams) {
    try {
      const { email, orderId } = params;

      /** Enviar notificación de compra realizada */
      await this.quickNotificationSrv.sendEmailNotification({
        type: "purchaseInfo",
        email: email,
      //   subject: `Purchase ${orderId} a WLDC Cartagena 2024 - ` + moment().format("DD/MM/YYYY HH:mm:ss"),
      //   greeting: `¡Hola!`,
      //   messageBody: [
      //     {type: "html", html: `<h1 style='text-align: center;'><strong>Compra #${orderId}</strong></h1>`},
      //     {type: 'line', text: `Estamos muy felices de contar con tu presencia en la edición WLDC 2024.`},
      //     {type: 'line', text: `A continuación encontrarás los detalles de tu compra:`},
      //     {type: 'action', action: 'Aquí', url: environment.dataEvent.appURL + '/pages/purchases/' + orderId + '/details'},
      //     {type: "line", text: "Si no reconoce esta actividad, no se requiere ninguna acción adicional."}
      // ],
      //   salutation: '¡Saludos!'
        subject: this.translatePipe.transform('notification.purchaseInfo.subject', {orderId: orderId}) + ' - ' + moment().format("DD/MM/YYYY HH:mm:ss"),
        greeting: `${this.translatePipe.transform('notification.hello')}`,
        messageBody: [
          {
            type: "html",
            html: `<h1 style='text-align: center;'><strong>${this.translatePipe.transform('general.order')} #${orderId}</strong></h1>`
          },
          {
            type: 'line', 
            text: this.translatePipe.transform('notification.purchaseInfo.body')[0]
          },
          {
            type: 'line',
            text: this.translatePipe.transform('notification.purchaseInfo.body')[1]
          },
          {
            type: 'action', 
            action: this.translatePipe.transform("general.here"), url: environment.dataEvent.appURL + '/pages/purchases/' + orderId + '/details'
          },
          {
            type: "line", 
            text: `${this.translatePipe.transform('notification.noRecognizeActivity')}.`
          }
        ],
        salutation: `${this.translatePipe.transform('notification.greetings')}`
      });

      return true;
      
    } catch (err) {
      console.log('Error on PurchaseService.sendPurchaseInformationNotification', err);
      return false;
    }
  }

  async sendPurchaseBankTransferInformationNotification(params: any) {
    try {
      const {
        email, 
        orderId,
        bankOptionData
      } = params;

      /** Enviar notificación de datos para transferencia bancaria */
      await this.quickNotificationSrv.sendEmailNotification({
        type: "purchaseBankTransferInfo",
        email: email,
        subject: `Datos de Transferencia #${orderId} - WLDC Cartagena 2024 - ` + moment().format("DD/MM/YYYY HH:mm:ss"),
        greeting: `¡Hola!`,
        messageBody: [
          {type: "html", html: `<h1 style='text-align: center;'><strong>Orden #${orderId}</strong></h1>`},
          {type: 'line', text: `Estamos muy felices de contar con tu presencia en la edición WLDC 2024.`},

          {type: "html", html: `<h4 style='text-align: center; margin: 0;'><strong>${bankOptionData.label}</strong></h4>`},
          {type: 'html', html: `<p style='text-align: center; margin: 0;'><strong>Razon:</strong> ${bankOptionData.accountTitle}</p>`},
          {type: 'html', html: `<p style='text-align: center; margin: 0;'><strong>Nro. Cuenta:</strong> ${bankOptionData.nrAccount}</p>`},
          {type: 'html', html: `<p style='text-align: center; margin: 0;'><strong>Swift:</strong> ${bankOptionData.swift}</p>`},
          {type: 'line', text: ``},
          
          {type: 'line', text: `A continuación encontrarás los detalles de tu orden:`},
          {type: 'action', action: 'Aquí', url: environment.dataEvent.appURL + '/pages/purchases/' + orderId + '/details'},
          {type: "line", text: "Si no reconoce esta actividad, no se requiere ninguna acción adicional."}
      ],
        salutation: '¡Saludos!'
        // subject: this.translatePipe.transform('notification.purchaseInfo.subject', {orderId: orderId}) + ' - ' + moment().format("DD/MM/YYYY HH:mm:ss"),
        // greeting: `${this.translatePipe.transform('notification.hello')}`,
        // messageBody: [
        //   {
        //     type: "html",
        //     html: `<h1 style='text-align: center;'><strong>${this.translatePipe.transform('general.order')} #${orderId}</strong></h1>`
        //   },
        //   {
        //     type: 'line', 
        //     text: this.translatePipe.transform('notification.purchaseInfo.body')[0]
        //   },
        //   {
        //     type: 'line',
        //     text: this.translatePipe.transform('notification.purchaseInfo.body')[1]
        //   },
        //   {
        //     type: 'action', 
        //     action: this.translatePipe.transform("general.here"), url: environment.dataEvent.appURL + '/pages/purchases/' + orderId + '/details'
        //   },
        //   {
        //     type: "line", 
        //     text: `${this.translatePipe.transform('notification.noRecognizeActivity')}.`
        //   }
        // ],
        // salutation: `${this.translatePipe.transform('notification.greetings')}`
      });

      return true;
      
    } catch (err) {
      console.log('Error on PurchaseService.sendPurchaseBankTransferInformationNotification', err);
      return false;
    }
  }































  async updatePurchaseInstallmentCouta(docId: string, index: number, data: any) {
    // try {
    //   // console.log({
    //   //   docId,
    //   //   index,
    //   //   data
    //   // });
    //   const snapshot = await lastValueFrom(
    //     this.afs.collection(this.purchaseCollection).doc(docId).get()
    //   );

    //   const result = await handlerObjectResult(snapshot);

    //   const { installments } = result;
    //   const newInstallments = installments.map((item: any, i: number) => {
    //     if (i === index) {
    //       return {
    //         ...item,
    //         ...data
    //       }
    //     }
    //     return item;
    //   });

    //   await this.updatePurchase(environment.dataEvent.keyDb, docId, { installments: newInstallments });

    //   return true;

    // } catch (err) {
    //   console.log('Error on PurchaseService.updatePurchaseInstallmentCouta', err);
    //   return false;
    // }
  }

  async updatePurchaseCounter(docId: string, field: any, data = 1) {
    // const ref = this.afs.collection(this.purchaseCollection).doc(docId);
    // await ref.update({ [field]: increment(data) });
  }

  async sendPurchaseSummaryNotification(uid: string, orderId: string) {
    // try {
    //   const result = await lastValueFrom(
    //     this.http.post(`${URL_ROOT}email-notification/purchase-summary`, { uid, orderId })
    //   );

    //   return result;

    // } catch (err) {
    //   console.log('Error on PurchaseService.sendPurchaseSummaryNotification', err);
    //   throw err;
    // }
  }

  async sendPurchaseTransferNotification(orderId: string) {
    // try {
    //   const result = await lastValueFrom(
    //     this.http.post(`${URL_ROOT}email-notification/purchase-transfer-information`, { orderId })
    //   );

    //   return result;

    // } catch (err) {
    //   console.log('Error on PurchaseService.sendPurchaseTransferNotification', err);
    //   throw err;
    // }
  }

  async sendPurchaseTransferRejectedNotification(orderId: string) {
    // try {
    //   const result = await lastValueFrom(
    //     this.http.post(`${URL_ROOT}email-notification/purchase-transfer-rejected`, { orderId })
    //   );

    //   return result;

    // } catch (err) {
    //   console.log('Error on PurchaseService.sendPurchaseTransferRejectedNotification', err);
    //   throw err;
    // }
  }

  async sendPurchaseTransferApprovedNotification(orderId: string, params: any = {}) {
    // try {
    //   const result = await lastValueFrom(
    //     this.http.post(`${URL_ROOT}email-notification/purchase-transfer-approved`, { orderId, ...params })
    //   );

    //   return result;

    // } catch (err) {
    //   console.log('Error on PurchaseService.sendPurchaseTransferRejectedNotification', err);
    //   throw err;
    // }
  }



  async getPurchaseDocument(docId: string): Promise<any> {
    // const snapshot = await this.afs.collection(this.purchaseCollection).doc(docId).get().toPromise();
    // return await handlerObjectResult(snapshot);
  }

  userPurchaseList(uid: string) {
    // return this.getDynamic([
    //   { field: "uid", condition: "==", value: uid }
    // ], { orderBy: [{ field: "createdAt", order: "desc" }] });
  }


  userPurchaseListPending(uid: string) {
    // return this.getDynamic([
    //   { field: "uid", condition: "==", value: uid },
    //   { field: "completed", condition: "==", value: false },
    //   { field: "status", condition: "==", value: 'pending' },
    // ], { orderBy: [{ field: "createdAt", order: "desc" }] });
  }

  userPurchaseListCompleted(uid: string) {
    // return this.getDynamic([
    //   { field: "uid", condition: "==", value: uid },
    //   { field: "completed", condition: "==", value: true },
    // ], { orderBy: [{ field: "createdAt", order: "desc" }] });
  }

  userPurchaseListRejected(uid: string) {
    // return this.getDynamic([
    //   { field: "uid", condition: "==", value: uid },
    //   { field: "completed", condition: "==", value: false },
    //   { field: "status", condition: "==", value: 'rejected' }
    // ], { orderBy: [{ field: "createdAt", order: "desc" }] });
  }

  getDynamic(eventId: string, where: any[] = [], opts: any = {}): Observable<any[]> {
    const { idField = "_id", orderBy = [] } = opts;

    return this.afs.collection(this.purchaseCollection).doc(eventId).collection(
      'purchases',
      (ref) => {
        let query: any = ref;
        for (const row of where) { query = query.where(row.field, row.condition, row.value); }

        for (const order of orderBy) { query = query.orderBy(order.field, order.order); }
        return query;
      }
    ).valueChanges({ idField });
  }

  async getDynamicPromise(eventId: string, where: any[] = [], opts: any = {}): Promise<any[]> {
    const { idField = "_id", orderBy = [] } = opts;

    const snapshot = await lastValueFrom(
      this.afs.collection(this.purchaseCollection).doc(eventId).collection(
        'purchases',
        (ref) => {
          let query: any = ref;
          for (const row of where) { query = query.where(row.field, row.condition, row.value); }

          for (const order of orderBy) { query = query.orderBy(order.field, order.order); }
          return query;
        }
      ).get()
    );

    return await handlerArrayResult(snapshot, { idField });
  }

  async getAllPurchaseExcel() {
    try {
      const url = `${environment.API_URL}admin/all-purchase-report`;
      const snapshot: any = await lastValueFrom(this.http.get(url));
      const { results } = snapshot;
      console.log('results', results);
      const currentTime = moment().valueOf();
      this.excelSrv.exportAsExcelFile(results, 'purchases-list' + currentTime + '.xlsx');
      return;

    } catch (err) {
      console.log('Error on BalanceService@getVipBalance', err);
      throw err;
    }
  }

}


export interface PurchaseInformationNotificationParams {
  email: string,
  orderId: string,
  uid?: string
}
