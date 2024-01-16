import { Injectable } from '@angular/core';
import { AngularFireDatabase } from '@angular/fire/compat/database';
import { AngularFirestore, Query } from "@angular/fire/compat/firestore";
import moment from 'moment';
import { Observable, catchError, map, of, switchMap } from 'rxjs';
import { handlerObjectResult, handlerArrayResult, handlerObjectResultRDB } from '../helpers/model.helper';
import { HttpClient } from '@angular/common/http';
import { environment } from 'src/environments/environment';

@Injectable({
  providedIn: 'root'
})
export class DevisionService {

  public collection = "divisions_list";

  constructor(
    private http: HttpClient,
    public afs: AngularFirestore,
    public db: AngularFireDatabase,
  ) { }



  searchCategory(key_db: string, block: string) {
    /** Crear observable para cargar divisiones */
    return this.afs
      .collection("divisions_list")
      .doc(key_db)
      .collection("list", (ref) => ref.where("id_categoria", "==", block).orderBy("sub_categoria"))
      .valueChanges({ idField: "id" })
      .pipe(
        map((res: any[]) =>
          (res.length == 0)
            ? []
            : res.sort((a, b) => {
              if (a.id_sub_categoria > b.id_sub_categoria) { return 1; }
              if (a.id_sub_categoria < b.id_sub_categoria) { return -1; }
              return 0;
            })
        ),
        // tap((res: any) => console.log('getDivision', res)),
        /** TODO: Deshabilitar cambio temporalmente */
        switchMap(async (res: any) => {
          // try {

          //   const documents = await this.documentSrv.getById(this.id, this.uid);
          //   // console.log('documents', documents);
          //   const participantLocationType = documents?.participantLocationType || null;
          //   // console.log('participantLocationType', participantLocationType);

          //   if (participantLocationType === 'local') {

          //     if (block.value === 'jab') {
          //       return res;
          //     } else if (block.value === 'jap') {
          //       return res.filter((item: any) => item.id_sub_categoria == 'ge-1');
          //     } else {
          //       return res;
          //     }

          //   } else {
          //     return res;
          //   }

          // } catch (err) {
          //   console.log('Error on DivisionPurchasePage.searchCategory', err);
          //   return res;
          // }

          return res;
        }),
        catchError((err) => {
          console.log("Error al obtener las divisiones", err);
          return of([])
        })
      );
  }



  async getMyRegisteredDivisionsToPromise(data) {
    try {
      const snapshot = await this.http.post(`${environment.urlrootFunctions}/accreditations/getDivision`, data).toPromise();
      return snapshot;

    } catch (err) {
      console.log('Error on ManageUsersService:divisionRulesToPromise', err);
      throw err;
    }
  }




  async divisionRulesToPromise(data: { division: any, key_db: string, block: string }) {
    try {
      const snapshot = await this.http.post(`${environment.urlrootFunctions}/division/rules`, data).toPromise();
      return snapshot;

    } catch (err) {
      console.log('Error on ManageUsersService:divisionRulesToPromise', err);
      throw err;
    }
  }





  createId() {
    return this.afs.createId();
  }

  /**
   * Registrar
   * @param data
   * @returns
   */
  async store(eventId: any, data: any) {
    const snapshot = await this.afs.collection(this.collection).doc(eventId).collection('list').add(data);
    return snapshot.id;
  }

  /**
   * Actualizar
   * @param docId
   * @param data
   * @returns
   */
  async update(eventId: any, docId: string, data: any) {
    const fmt = { ...data, updated_At: moment().valueOf() };
    return await this.afs.collection(this.collection).doc(eventId).collection('list').doc(docId).update(fmt);
  }

  /**
   * 
   * @param createId 
   * @param data 
   * @returns 
   */
  setRealtime(eventId: any, createId, data) {
    return this.db.list(this.collection).set(createId, Object.assign({}, data, { keydb: eventId }));
  }

  async set(docId: string, data: any) {
    return await this.afs.collection(this.collection).doc(docId).set(data);
  }

  async updateOrStore(eventId: string, docId: string, data: any) {
    const doc = await this.getById(docId);
    return (doc)
      ? await this.update(eventId, docId, data)
      : await this.set(docId, data);
  }

  /**
   * Actualizar documento de usuario dentro del evento
   * @param keyDB           Identificador del evento
   * @param uid             Identificador del usuario
   * @param data            Datos a actualizar
   * @returns 
   */
  async updateUserEventDocument(keyDB: string, uid: string, data: any) {
    return await this.db.database.ref(`/competition/${keyDB}/termsAndConditions/${uid}`).update(data);
  }

  /**
   * Obtener a través del identificador
   * @param docId
   * @returns
   */
  async getById(docId: string) {
    const snapshot = await this.afs
      .collection(this.collection)
      .doc(docId)
      .ref.get();
    return await handlerObjectResult(snapshot);
  }

  getByIdObservable(docId: string) {
    return this.afs
      .collection(this.collection)
      .doc(docId).valueChanges();
  }

  /**
   * Obtener listado completo
   * @returns
   */
  async getAll() {
    const snapshot = await this.afs.collection(this.collection).ref.get();
    return await handlerArrayResult(snapshot);
  }

  /**
   * Obtener documento de que válida si el usuario tiene documentos cargados
   * @param uid 
   * @returns 
   */
  async getUserDocument(uid: string) {
    const snapshot = await this.afs
      .collection(this.collection)
      .ref.where("uid", "==", uid)
      .get();
    return await handlerArrayResult(snapshot);
  }

  getUserDocumentObservable(uid: string) {
    return this.afs
      .collection(this.collection)
      .doc(uid)
      .valueChanges();
  }

  getUserEventTACObservable(keyDB: string, uid: string) {
    // return this.db.object(`/competition/${keyDB}/termsAndConditions/${uid}`).valueChanges();
    return this.afs.collection(this.collection).doc(keyDB).collection('list').doc(uid).valueChanges();
  }

  async getUserEventTAC(keyDB: string, uid: string) {
    // const snapshot = await this.db.database.ref(`/competition/${keyDB}/termsAndConditions/${uid}`).once("value");
    // return await handlerObjectResultRDB(snapshot);
    const snapshot = await this.afs.collection(this.collection).doc(keyDB).collection('list').doc(uid).ref.get();
    return await handlerObjectResult(snapshot);
  }

  async getEventSettings(keyDB: string) {
    const snapshot = await this.db.database.ref(`/competition/${keyDB}/settings`).once("value");
    const result = await handlerObjectResultRDB(snapshot);
    return (result)
      ? result
      : {
        requireDocuments: true,
        requireTAC: true
      };
  }

  /**
   * Obtener documento del usuario en un evento
   * @param keyDB 
   * @param uid 
   */
  async getUserEventDocument(keyDB: string, uid: string) {
    const snapshot = await this.db.database.ref(`/competition/${keyDB}/panticipants/${uid}`).once("value");
    return await handlerObjectResultRDB(snapshot);
  }

  /**
   * Obtener listado dinamico
   * @param where
   * @param where.field
   * @param where.condition
   * @param where.value
   * @param opts
   * @param opts.idField
   * @param opts.orderBy
   * @param opts.orderBy.field
   * @param opts.orderBy.order
   *
   * @returns
   */
  getDynamic(where: any[] = [], opts: any = {}): Observable<any> {
    const { idField = "_id", orderBy = [] } = opts;

    return this.afs
      .collection(this.collection, (ref) => {
        let query: Query = ref;
        for (const row of where) {
          query = query.where(row.field, row.condition, row.value);
        }

        for (const order of orderBy) {
          query = query.orderBy(order.field, order.order);
        }
        return query;
      })
      .valueChanges({ idField });
  }

}
