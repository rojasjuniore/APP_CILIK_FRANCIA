import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { AngularFirestore } from '@angular/fire/compat/firestore';
import { arrayRemove, arrayUnion, increment } from 'firebase/firestore';
import { combineLatest, lastValueFrom, map, Observable } from 'rxjs';
import { environment } from 'src/environments/environment';
import { handlerArrayResult, handlerObjectResult } from '../helpers/model.helper';
import { ExcelService } from './excel.service';
import { QuickNotificationService } from './quick-notification/quick-notification.service';
import { TranslatePipe } from '@ngx-translate/core';
import moment from 'moment';
import { AngularFireDatabase } from '@angular/fire/compat/database';

@Injectable({
  providedIn: 'root'
})
export class PurchaseService {

  public purchaseCollection = 'hotel_event';

  constructor(
    private db: AngularFireDatabase,
    private afs: AngularFirestore,
    private http: HttpClient,
    private excelSrv: ExcelService,
    private quickNotificationSrv: QuickNotificationService,
    private translatePipe: TranslatePipe,
  ) { }


  getCategoryClaims(eventId: string, codeDivision: string, divisionId: string) {
    return this.db.object(`/categoriesenabled/${eventId}/${codeDivision}/categories/${divisionId}`).valueChanges();
  }


  /**
   * 
   * @param eventId 
   * @param codeDivision 
   * @param divisionId 
   * @returns 
   */
  setCategoryPay(eventId: string, codeDivision: string, divisionId: string) {
    if (!eventId || !codeDivision || !divisionId) return;
    return this.db.object(`/categoriesenabled/${eventId}/${codeDivision}/categories/${divisionId}/isPay`).set(true);
  }

  getServer() {
    return lastValueFrom(this.http.get(`${environment.API_URL}/memory-usage`));
  }




  async storePurchase(eventId: string, docId: string, data: any) {
    console.log('storePurchase', eventId, docId, data);
    return await this.afs.collection(this.purchaseCollection).doc(eventId).collection('purchases').doc(docId).set(data);
  }

  async updatePurchase(eventId: string, docId: string, data: any) {
    return await this.afs.collection(this.purchaseCollection).doc(eventId).collection('purchases').doc(docId).update(data);
  }

  /// acreditacionm 
  async storePurchasePending(eventId: string, docId: string, data: any) {
    console.log('storePurchase', eventId, docId, data);
    return await this.afs.collection(this.purchaseCollection).doc(eventId).collection('pending').doc(docId).set(data);
  }

  async storePurchaseClaim(eventId: string, docId: string, data: any) {
    console.log('storePurchase', eventId, docId, data);
    return await this.afs.collection(this.purchaseCollection).doc(eventId).collection('claim').doc(docId).set(data);
  }


  async updatePurchaseClaim(eventId: string, docId: string, data: any) {
    return await this.afs.collection(this.purchaseCollection).doc(eventId).collection('claim')
  }




  updatePurchaseStore(eventId: string, docId: string, index: number, accreditation: any, claim, accredited): Promise<void> {
    // Obtener una referencia al documento
    const docRef = this.afs.collection(this.purchaseCollection).doc(eventId).collection('purchases').doc(docId);

    // Leer el documento actual y retornar una promesa
    return docRef.get().toPromise().then((doc: any) => {
      if (doc.exists) {
        const currentData = doc.data();

        // Asegúrate de que el array existe y es un array
        if (currentData && currentData['product'] && Array.isArray(currentData['product'])) {
          // Actualizar el elemento en la posición especificada
          const arrayActualizado = [...currentData['product']];

          if (claim) {
            arrayActualizado[index] = { ...arrayActualizado[index], _claim: claim, accreditation };
          } else if (accredited) {
            arrayActualizado[index] = { ...arrayActualizado[index], _accredited: accredited, accredited: accreditation };
          }

          // Añadir el campo 'claim' con valor 'true' al objeto en la posición especificada

          // Preparar el objeto de actualización
          let updateObject = {};
          updateObject['product'] = arrayActualizado;

          // Actualizar el documento
          return docRef.update(updateObject);
        }
      }
      // Manejar el caso donde el documento no existe o no tiene el formato esperado
      throw new Error("Documento no encontrado o formato inválido");
    });
  }



  /// 
  async getPurchasesToPromise(eventId: string, docId: string) {
    try {
      const snapshot = await this.afs.collection(this.purchaseCollection).doc(eventId).collection('purchases').doc(docId).get().toPromise();
      return snapshot;

    } catch (err) {
      console.log('Error on CartService.getCartToPromise', err);
      return null;
    }
  }



  //  @dev Obtener el carrito de compras de un usuario
  async migrateDataPurchase(eventId: string, docId: string, newUid: string, oldUid: string): Promise<void> {

    console.log('migrateDataPurchase', eventId, docId, newUid, oldUid);

    // Obtener los datos del carrito del usuario anónimo
    const purchasesSnapshot: any = await this.getPurchasesToPromise(eventId, docId);
    console.log('purchases', purchasesSnapshot);
    if (purchasesSnapshot.exists) {

      const purchases = purchasesSnapshot.data();
      // @dev Actualizar el identificador del carrito
      purchases.uid = newUid;
      purchases.oldUid = oldUid;
      purchases.migrateUid = localStorage.getItem("uid");
      purchases.updatedAt = moment().format();
      console.log('purchases', purchases);
      // Migrar los datos del carrito
      await this.updatePurchase(environment.dataEvent.keyDb, docId, purchases);
    }

    return Promise.resolve();
  }



  getByEventAndId(eventId: string, docId: string) {
    return this.afs.collection(this.purchaseCollection).doc(eventId).collection('purchases').doc(docId).valueChanges(
      {
        idField: '_id'
      }
    );
  }



  getAllPurchases(eventId: string) {
    return this.afs.collection(this.purchaseCollection).doc(eventId).collection('purchases').valueChanges();
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
  async addOnArray(eventId: string, docId: string, data: any[], field: string = 'timeline') {
    await Promise.all(
      data.map(async (item: any) =>
        this.afs.collection(this.purchaseCollection).doc(eventId).collection('purchases').doc(docId).update({ [field]: arrayUnion(item) })
      )
    );
    return true;
  }

  /**
   * 
   * @param eventId 
   * @param docId 
   * @param data 
   * @param objs 
   * @returns 
   */
  updatedPurchaseInstallment(eventId: string, docId: string, objs: any) {
    console.log('updatedPurchaseInstallment');
    return this.afs
      .collection(this.purchaseCollection)
      .doc(eventId)
      .collection('purchases')
      .doc(docId)
      .set(
        { installments: objs },
        { merge: true }
      )
  }

  updatedPurchaseAdviser(eventId: string, docId: string, objs: any) {
    console.log('updatedPurchaseAdviser');
    return this.afs
      .collection(this.purchaseCollection)
      .doc(eventId)
      .collection('purchases')
      .doc(docId)
      .set(
        { adviserPaymentList: objs },
        { merge: true }
      )
  }

  /**
   * Remover elementos del arreglo
   * @param eventId           Id del evento
   * @param docId               Id del usuario
   * @param data              Datos a remover
   * @param field             Campo aplicar la operación
   * @returns 
   */
  async removeOnArray(eventId: string, docId: string, data: any, field: string = 'timeline') {
    return await this.afs.collection(this.purchaseCollection)
      .doc(eventId).collection('purchases').doc(docId).update({
        [field]: arrayRemove(data)
      });
  }

  /// Enviar email de notificación de compra realizada
  async sendPurchaseInformationNotification(params: PurchaseInformationNotificationParams) {
    try {
      const { email, orderId, name, uid } = params;

      /** Enviar notificación de compra realizada */
      await this.quickNotificationSrv.sendEmailNotification({
        type: "purchaseInfo",
        email: email,
        uid: uid,
        subject: this.translatePipe.transform('notification.purchaseInfo.subject', { orderId: orderId }),
        // greeting: `${this.translatePipe.transform('notification.hello')} ${name}`,
        greeting: ' ',
        messageBody: [
          {
            type: "html",
            html: `<h1 style='text-align: center;'><strong>${this.translatePipe.transform('notification.purchaseInfo.body.0')}</strong></h1>`
          },
          {
            type: 'line',
            text: `${this.translatePipe.transform('notification.hello')} ${name}`
          },
          {
            type: 'line',
            text: this.translatePipe.transform('notification.purchaseInfo.body.1')
          },
          {
            type: 'line',
            text: this.translatePipe.transform('notification.purchaseInfo.body.2')
          },
          {
            type: 'line',
            text: this.translatePipe.transform('notification.purchaseInfo.body.3')
          },
          {
            type: 'action',
            action: this.translatePipe.transform('notification.purchaseInfo.button'),
            url: environment.dataEvent.appURL + '/pages/purchases/' + orderId + '/details'
          },
          {
            type: 'line',
            text: this.translatePipe.transform('notification.purchaseInfo.body.4')
          },
          {
            type: 'line',
            text: this.translatePipe.transform('notification.purchaseInfo.body.5')
          },
          {
            type: 'line',
            text: 'WhatsApp: +57 314 772 2450'
          },
          {
            type: 'line',
            text: 'Instagram: @worldlatindancecup'
          },
          {
            type: 'line',
            text: this.translatePipe.transform('notification.purchaseInfo.body.6')
          },
        ],
        salutation: `${this.translatePipe.transform('notification.purchaseInfo.salutation')}`
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
        bankOptionData,
        totales
      } = params;

      /** Enviar notificación de datos para transferencia bancaria */
      await this.quickNotificationSrv.sendEmailNotification({
        type: "purchaseBankTransferInfo",
        email: email,
        subject: this.translatePipe.transform('notification.bankTransfer.subject'),
        greeting: ` `,
        messageBody: [
          {
            type: 'line',
            text: this.translatePipe.transform('notification.bankTransfer.body.0')
          },
          {
            type: "html",
            html: `<h4 style='text-align: center; margin: 0;'><strong>${bankOptionData.label}</strong></h4>`
          },
          {
            type: 'html',
            html: `<p style='text-align: center; margin: 0;'><strong>${this.translatePipe.transform('notification.bankTransfer.body.1')}:</strong> ${bankOptionData.beneficiaryName}</p>`
          },
          {
            type: 'html',
            html: `<p style='text-align: center; margin: 0;'><strong>${this.translatePipe.transform('notification.bankTransfer.body.2')}:</strong> ${bankOptionData.accountNumber}</p>`
          },
          {
            type: 'html',
            html: `<p style='text-align: center; margin: 0;'><strong>${this.translatePipe.transform('notification.bankTransfer.body.3')}:</strong> ${bankOptionData.nit}</p>`
          },
          {
            type: 'html',
            html: `<p style='text-align: center; margin: 0;'><strong>${this.translatePipe.transform('notification.bankTransfer.body.4')}:</strong> ${bankOptionData.swiftCode}</p>`
          },
          {
            type: 'html',
            html: `<p style='text-align: center; margin: 0;'><strong>${this.translatePipe.transform('notification.bankTransfer.body.5')}:</strong> ${totales} USD</p>`
          },
          {
            type: 'line',
            text: ``
          },
          {
            type: 'line',
            text: this.translatePipe.transform('notification.bankTransfer.body.6')
          },
          {
            type: 'html',
            html: `<p style='margin: 0;'>${this.translatePipe.transform('notification.bankTransfer.body.7')}</p>`
          },
          {
            type: 'html',
            html: `<p style='margin: 0;'><strong>WhatsApp:</strong> +57 314 772 2450</p>`
          },
          {
            type: 'html',
            html: `<p style='margin: 0;'><strong>Instagram:</strong> @worldlatindancecup</p>`
          },
          {
            type: 'line',
            text: ``
          },
        ],
        salutation: `${this.translatePipe.transform('notification.bankTransfer.salutation')}`
      });

      return true;

    } catch (err) {
      console.log('Error on PurchaseService.sendPurchaseBankTransferInformationNotification', err);
      return false;
    }
  }


  /// Enviar notificación de datos para transferencia bancaria
  async sendPurchaseInstallmentNotification(params: any) {
    try {
      const {
        email,
        orderId,
        installments,
        totales
      } = params;
      console.log('params', params);
      console.log('installments', installments);


      const cuotasHtml = installments.map(cuota => {
        return {
          type: 'html',
          html: `<p style='text-align: center; margin: 0;'>Cuota ${cuota.quota}: $${cuota.amount} (Fecha de pago: ${cuota.date})</p>`
        };
      });

      /** Enviar notificación de datos para transferencia bancaria */
      await this.quickNotificationSrv.sendEmailNotification({
        type: "purchaseInstallmentInfo",
        email: email,
        subject: "Información de pago de cuota",
        greeting: ` `,
        messageBody: [
          {
            type: 'line',
            text: "Has seleccionado la opción de pago en cuotas. A continuación, encontrarás el desglose de tus pagos."
          },
          {
            type: 'line',
            text: "Entendemos la importancia de la planificación financiera. Por eso, te ofrecemos esta flexibilidad."
          },
          {
            type: "html",
            html: `<h4 style='text-align: center; margin: 0;'><strong>Opciones de Pago: En Cuotas</strong></h4>`
          },
          {
            type: 'html',
            html: `<p style='text-align: center; margin: 0;'>Disfruta de una tasa fija y un plazo definido desde el inicio.</p>`
          },
          ...cuotasHtml,
          {
            type: 'html',
            html: `<p style='text-align: center; margin: 0;'>Es importante resaltar que el pago de la primera cuota debe realizarse dentro de las 48 horas siguientes a tu compra.</p>`
          },
          {
            type: 'html',
            html: `<p style='text-align: center; margin: 0;'>De no hacerlo, lamentablemente tu orden quedará cancelada.</p>`
          },
          {
            type: 'line',
            text: ``
          },
          {
            type: 'line',
            text: `Sigue las instrucciones para completar tu transacción. Si tienes dudas o inquietudes sobre el proceso de pago en cuotas, estamos aquí para ayudarte.`
          },
          {
            type: 'line',
            text: `*Aplican términos y condiciones.*`
          },
          {
            type: 'line',
            text: this.translatePipe.transform('notification.bankTransfer.body.6')
          },
          {
            type: 'html',
            html: `<p style='margin: 0;'>${this.translatePipe.transform('notification.bankTransfer.body.7')}</p>`
          },
          {
            type: 'html',
            html: `<p style='margin: 0;'><strong>WhatsApp:</strong> +57 314 772 2450</p>`
          },
          {
            type: 'html',
            html: `<p style='margin: 0;'><strong>Instagram:</strong> @worldlatindancecup</p>`
          },
          {
            type: 'line',
            text: ``
          },
        ],
        salutation: `${this.translatePipe.transform('notification.bankTransfer.salutation')}`
      });

      return true;

    } catch (err) {
      console.log('Error on PurchaseService.updatePurchaseInstallmentCouta', err);
      return false;
    }
  }


  async sendPurchaseAdviserNotification(params: any) {
    try {
      const {
        email,
        orderId,
        installments,
        totales
      } = params;

      await this.quickNotificationSrv.sendEmailNotification({
        type: "purchaseAdviserNotification",
        email: email,
        subject: "Procesando tu compra",
        greeting: ` `,
        messageBody: [
          {
            type: 'line',
            text: "Nos complace informarle que su compra será procesada próximamente. En breve, su asesor seleccionado verificará y confirmará todos los detalles de su pedido. Este paso es fundamental para asegurarnos de que su experiencia con nosotros sea excepcional."
          },
          {
            type: 'line',
            text: "Agradecemos su confianza en nosotros y esperamos que disfrute de su adquisición. Si tiene alguna pregunta o necesita asistencia adicional, no dude en ponerse en contacto con su asesor o con nuestro equipo."
          },
          {
            type: 'line',
            text: "Agradecemos su confianza en nosotros y esperamos que disfrute de su adquisición. Si tiene alguna pregunta o necesita asistencia adicional, no dude en ponerse en contacto con su asesor o con nuestro equipo."
          },
          {
            type: 'line',
            text: `*Aplican términos y condiciones.*`
          },
          {
            type: 'line',
            text: this.translatePipe.transform('notification.bankTransfer.body.6')
          },
          {
            type: 'html',
            html: `<p style='margin: 0;'>${this.translatePipe.transform('notification.bankTransfer.body.7')}</p>`
          },
          {
            type: 'html',
            html: `<p style='margin: 0;'><strong>WhatsApp:</strong> +57 314 772 2450</p>`
          },
          {
            type: 'html',
            html: `<p style='margin: 0;'><strong>Instagram:</strong> @worldlatindancecup</p>`
          },
          {
            type: 'line',
            text: ``
          },
        ],
        salutation: `${this.translatePipe.transform('notification.bankTransfer.salutation')}`
      });

      return true;

    } catch (err) {
      console.log('Error on PurchaseService.updatePurchaseInstallmentCouta', err);
      return false;
    }
  }

  /**
   * @dve Enviar notificación de datos para cuota de pago
   * @param params 
   * @returns 
   */
  async sendPurchaseInstallmentCuotaNotification(params: any) {
    try {
      const {
        email,
        orderId,
        installments,
        totales,
        index,
        status
      } = params;
      console.log('params', params);
      console.log('installments', installments);


      const cuotasHtml = installments.map(cuota => {
        return {
          type: 'html',
          html: `<ul style='margin: 20px 0; padding-left: 20px;'>Cuota ${cuota.quota}: $${cuota.amount} (Fecha de pago: ${cuota.date}) -  ${cuota.status}</ul>`
        };
      });

      /** Enviar notificación de datos para transferencia bancaria */
      await this.quickNotificationSrv.sendEmailNotification({
        type: "purchaseInstallmentInfo",
        email: email,
        subject: `Información de pago de cuota`,
        greeting: ` `,
        messageBody: [
          {
            "type": "line",
            "text": `Nos complace informarte que hasta la fecha has completado el pago de las siguiente cuota: #${index}`
          },
          ...cuotasHtml,
          {
            "type": "line",
            "text": "Te agradecemos por tu responsabilidad y puntualidad en los pagos. Si tienes alguna duda o consulta sobre tus cuotas, no dudes en contactarnos."
          },
          {
            "type": "line",
            "text": "¡Gracias por confiar en nosotros y te deseamos un excelente día!"
          },

          {
            type: 'line',
            text: this.translatePipe.transform('notification.bankTransfer.body.6')
          },
          {
            type: 'html',
            html: `<p style='margin: 0;'>${this.translatePipe.transform('notification.bankTransfer.body.7')}</p>`
          },
          {
            type: 'html',
            html: `<p style='margin: 0;'><strong>WhatsApp:</strong> +57 314 772 2450</p>`
          },
          {
            type: 'html',
            html: `<p style='margin: 0;'><strong>Instagram:</strong> @worldlatindancecup</p>`
          },
          {
            type: 'line',
            text: ``
          },
        ],
        salutation: `${this.translatePipe.transform('notification.bankTransfer.salutation')}`
      });

      return true;

    } catch (err) {
      console.log('Error on PurchaseService.updatePurchaseInstallmentCouta', err);
      return false;
    }
  }


  /// @dev Enviar notificación de datos para cuota de pago
  async sendPurchaseAdviserPaymentNotification(params: any) {
    try {
      const {
        email,
        orderId,
        adviserPaymentList,
        totales,
        index,
        status
      } = params;
      console.log('params', params);
      console.log('installments', adviserPaymentList);


      const paymentHtml = adviserPaymentList.map((payment, index) => {
        return {
          type: 'html',
          html: `<ul style='margin: 20px 0; padding-left: 20px;'>Pago: $${payment.amount} (Fecha de pago: ${payment.payedAt}) -  ${payment.paymentMethod}</ul>`
        };
      });

      /** Enviar notificación de datos para transferencia bancaria */
      await this.quickNotificationSrv.sendEmailNotification({
        type: "purchaseInstallmentInfo",
        email: email,
        subject: `Información de pago de cuota`,
        greeting: ` `,
        messageBody: [
          {
            "type": "line",
            "text": `Nos complace informarle que su pago número ${index + 1} se ha registrado exitosamente.`
          },
          ...paymentHtml,
          {
            "type": "line",
            "text": "Te agradecemos por tu responsabilidad y puntualidad en los pagos. Si tienes alguna duda o consulta, no dudes en contactarnos."
          },
          {
            "type": "line",
            "text": "¡Gracias por confiar en nosotros y te deseamos un excelente día!"
          },

          {
            type: 'line',
            text: this.translatePipe.transform('notification.bankTransfer.body.6')
          },
          {
            type: 'html',
            html: `<p style='margin: 0;'>${this.translatePipe.transform('notification.bankTransfer.body.7')}</p>`
          },
          {
            type: 'html',
            html: `<p style='margin: 0;'><strong>WhatsApp:</strong> +57 314 772 2450</p>`
          },
          {
            type: 'html',
            html: `<p style='margin: 0;'><strong>Instagram:</strong> @worldlatindancecup</p>`
          },
          {
            type: 'line',
            text: ``
          },
        ],
        salutation: `${this.translatePipe.transform('notification.bankTransfer.salutation')}`
      });

      return true;

    } catch (err) {
      console.log('Error on PurchaseService.updatePurchaseInstallmentCouta', err);
      return false;
    }
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


  /**
   * 
   * @param uid 
   * @returns 
   */
  mySalesPurchaseList(uid: any, status) {
    return this.getDynamic(environment.dataEvent.keyDb, [
      { field: "referred_by", condition: "==", value: uid },
      { field: "status", condition: "==", value: status }
    ], { orderBy: [{ field: "createdAt", order: "desc" }] })
  }


  /**
   * 
   * @param uid 
   * @param status 
   * @returns 
   */
  myMerchantPurchaseList(uid: any, status) {
    // console.log('myMerchantPurchaseList', environment.dataEvent.keyDb, uid, status);
    return this.getDynamic(environment.dataEvent.keyDb, [
      { field: "merchantIdentification", condition: "==", value: uid },
      { field: "status", condition: "==", value: status }
    ], { orderBy: [{ field: "createdAt", order: "desc" }] })
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


  combineQueries(eventId: string, uid: string) {
    const completedQuery = this.afs.collection(this.purchaseCollection)
      .doc(eventId).collection('purchases', ref =>
        ref.where('status', '==', 'completed')
          .where('uid', '==', uid)
          .orderBy('createdAt', 'desc')
      ).valueChanges(
        {
          idField: '_id'
        }
      );

    const preApprovedQuery = this.afs
      .collection(this.purchaseCollection).doc(eventId).collection('purchases', ref =>
        ref.where('status', '==', 'preApproved')
          .where('uid', '==', uid)
          .orderBy('createdAt', 'desc')
      ).valueChanges(
        {
          idField: '_id'
        }
      );

    return combineLatest([completedQuery, preApprovedQuery])
      .pipe(
        map(([completedResults, preApprovedResults]) => {
          return [...completedResults, ...preApprovedResults];
        })
      );
  }

  getDynamic(eventId: string, where: any[] = [], opts: any = {}): Observable<any[]> {
    const { idField = "_id", orderBy = [] } = opts;

    return this.afs.collection(this.purchaseCollection).doc(eventId).collection('purchases', (ref) => {
      let query: any = ref;
      for (const row of where) { query = query.where(row.field, row.condition, row.value); }

      for (const order of orderBy) { query = query.orderBy(order.field, order.order); }
      return query;
    }
    ).valueChanges({ idField });
  }

  claimPurchase(eventId: string, uid: any) {
    const userList = this.getDynamicClaim(eventId, [
      { field: 'uidList', condition: 'array-contains', value: uid },
    ])


    const userAdd = this.getDynamicClaim(eventId, [
      { field: 'uid_add', condition: '==', value: uid },
    ])


    return combineLatest([userList, userAdd])
      .pipe(
        map(([completedResults, preApprovedResults]) => {
          return [...completedResults, ...preApprovedResults];
        })
      );

  }
  /// 
  reclaimedPurchase(data: any) {
    return lastValueFrom(this.http.post(`${environment.urlrootFunctions}/payment_gateways/wldc2024`, data));
  }


  getDynamicClaim(eventId: string, where: any[] = [], opts: any = {}): Observable<any[]> {
    const { idField = "_id", orderBy = [] } = opts;
    // console.log('getDynamicClaim', eventId, where, opts);
    return this.afs.collection(this.purchaseCollection).doc(eventId).collection('claim', (ref) => {
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
      const url = `${environment.API_URL}/admin/all-purchase-report`;
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




  /**
   * @dev obtiene los totales
   * @param dataArray 
   * @returns 
   */
  getTotal(dataArray: any[]) {
    const totals = dataArray.reduce((acc, data) => {
      if (!data || !data.discount_with_coupon) {
        return {
          globalDiscount: 0,
          globalSubtotal: 0,
          globalTotalToPay: 0
        }
      }
      acc.globalDiscount += data.discount_with_coupon.globalDiscount;
      acc.globalSubtotal += data.discount_with_coupon.globalSubtotal;
      acc.globalTotalToPay += data.discount_with_coupon.globalTotalToPay;
      return acc;
    }, {
      globalDiscount: 0,
      globalSubtotal: 0,
      globalTotalToPay: 0
    });

    return totals
  }

  /**
   * @dev agrupa los totales por producto
   * @param dataArray 
   * @returns 
   */
  totalForItem(dataArray: any[]) {
    const flatArray = dataArray.flat();
    const groupedData = flatArray.reduce((acc, item) => {
      const keyEntry = acc.find(entry => entry.key === item.key);
      if (!keyEntry) {
        acc.push({ key: item.key, total: item.totales, count: 1 });
      } else {
        keyEntry.total += item.totales;
        keyEntry.count += 1;
      }
      return acc;
    }, []);
    return groupedData;
  }



}


export interface PurchaseInformationNotificationParams {
  email: string,
  orderId: string,
  uid?: string,
  name?: string,
}
