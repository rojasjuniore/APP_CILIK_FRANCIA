import { Injectable } from '@angular/core';
import { Router } from '@angular/router';
import { BehaviorSubject, lastValueFrom, Observable, of } from 'rxjs';
import { map, switchMap } from 'rxjs/operators';
import { CommonService } from 'src/app/services/common.service';
import { AngularFireAuth } from '@angular/fire/compat/auth';
import { AngularFireDatabase } from '@angular/fire/compat/database';
import { AngularFirestore, Query } from '@angular/fire/compat/firestore';
import { bool, string } from 'prop-types';
import { AbstractControl, AsyncValidatorFn, ValidationErrors } from '@angular/forms';
import { handlerArrayResult, handlerObjectResult } from '../helpers/model.helper';

import moment from 'moment';
import { environment } from 'src/environments/environment';
import { HttpClient } from '@angular/common/http';

@Injectable({
  providedIn: 'root'
})
export class AuthenticationService {

  public authenticationState = new BehaviorSubject(false);
  public incompleteProfile = new BehaviorSubject(false);
  public profile = new BehaviorSubject({});
  public token = new BehaviorSubject({});
  public activeUser = new BehaviorSubject(null);
  public avatar = new BehaviorSubject("/assets/images/002-man.svg");
  public presence = new BehaviorSubject({ status: "offline", timestamp: Date.now() });
  public emailVerified = new BehaviorSubject({ email: "", emailVerified: "" });
  public user: any
  public role: any;
  public authProfiles = new BehaviorSubject([]);
  public tutorials!: Observable<any[]>;
  public aviso!: any;
  public uid$: Observable<null | any>;
  public userDoc$: Observable<null | any>;

  public collection = 'users';

  constructor(
    public commonService: CommonService,
    public db: AngularFireDatabase,
    public afs: AngularFirestore,
    public afAuth: AngularFireAuth,
    public router: Router,
    private _http: HttpClient,
  ) {

    // @dev use Device Language
    this.afAuth.useDeviceLanguage();

    /** Observable para obtener identificador del usuario */
    this.uid$ = this.afAuth.authState
      .pipe(map(user => user ? user.uid : null));

    /** Observable para obtener documento de usuario */
    this.userDoc$ = this.afAuth.authState
      .pipe(
        map((user) => user ? user.uid : null),
        switchMap((uid: any) => {

          return (uid)
            ? this.getByUID(uid)
            : of(null);
        })
      );
  }


  login() {
    return new Promise<void>(async (resolve) => {
      this.afAuth.authState.subscribe(async (user) => {
        if (!user) {
          window.localStorage.setItem("auth", "false");
          this.authenticationState.next(false);
          return resolve();
        }



        this.user = user;

        this.getAuthProfiles(user.uid)
        this.saveTokenPush(user.uid);
        this.getPresence(user.uid);
        this.getAvatar(user.uid)
        this.getProfile(user.uid)
        this.token.next(user.uid)

        /// this.emailVerified.next({ email: user.email?.toString(), emailVerified: user.emailVerified });

        this.authenticationState.next(true);
        resolve();

      });
    });
  }

  saveTokenPush(uid) {
    localStorage.setItem("uid", uid)
  }

  async setEmailVerified() {
    console.log("setemailVerified");

    let user: any = this.afAuth.currentUser

    const result = await user.sendEmailVerification()
      .catch(err => {
        console.log("err", err)
      })

    return result
  }


  getUID() {
    return new Promise((resolve) => {
      this.token.subscribe(res => {
        if (!res) { resolve(null) }
        resolve(res)
      })
    })

  }

  async getUIDPromise() {
    return new Promise((resolve, reject) => {
      this.uid$.subscribe(uid => {
        resolve(uid);
      })
    });
  }



  getAvatar(uid) {
    this.db
      .object(`/users/${uid}/avatar`)
      .valueChanges()
      .subscribe((img: any) => {
        if (!img) { return }
        this.avatar.next(img);
      });
  }

  getPresence(uid) {
    return new Promise((resolve) => {
      this.db
        .object(`presence/${uid}`)
        .valueChanges()
        .subscribe((status: any) => {
          if (!status) { return }
          this.presence.next(status);
          resolve(status)
        });
    })

  }

  getProfile(uid) {
    return new Promise((resolve) => {
      this.afs.collection('profile')
        .doc(uid)
        .valueChanges()
        .subscribe((res: any) => {
          if (!res) { return }
          this.profile.next(res)
          resolve(res)
        })

    })
  }

  /**
   * Obtener documento de perfil desde el localStorage
   * @returns 
   */
  getLocalProfile() {
    const profileToParse = window.localStorage.getItem('profile') || '{}';
    return JSON.parse(profileToParse);
  }

  /**
   * Obtener identificador del usuario desde el localStorage
   * @returns 
   */
  getLocalUID() {
    return window.localStorage.getItem('uid') || null;
  }

  /**
   * 
   * @param uid 
   */
  setLocalUID(uid: any) {
    window.localStorage.setItem('uid', uid);
  }

  createAnonymousUser(): Promise<any> {
    return this.afAuth.signInAnonymously();
  }

  signInWithEmail(credentials) {
    return this.afAuth.signInWithEmailAndPassword(
      credentials.email,
      credentials.password
    );
  }


  /**
   * Crear documento de usuario en coleccion de usuarios
   * @param userDoc 
   * @returns 
   */
  async storeUser(userDoc: any) {
    const snapshot = await this.afs.collection('users').add(userDoc);
    return snapshot.id;
  }


  /**
   * Actualizar documento de usuario
   * @param uid 
   * @param data 
   * @returns 
   */
  async updateUser(uid: string, data: any) {
    return await this.afs.collection('users').doc(uid).update(data);
  }

  /**
   * Actualizar contraseña de usuario
   * @param uid 
   * @param password 
   * @returns 
   */
  async updateUserPassword(uid: string, password: any) {
    try {
      const url = `${environment.API_URL}admin/reset-user-password`;

      const result = await lastValueFrom(this._http.post(url, { uid, password }));
      console.log('result', result);
      return true;

    } catch (err) {
      console.log('Error on AuthenticationService.updateUserEmail', err);
      throw err;
    }
  }


  createUserWithEmailAndPassword(
    email: string,
    password: string
  ): Promise<any> {
    return new Promise((resolve, reject) => {
      this.afAuth
        .createUserWithEmailAndPassword(email, password)
        .then((user) => {
          resolve(user);
        }).catch((error) => { reject(error); });
    });
  }

  sendPasswordResetEmail(emailAddress: string) {
    return this.afAuth.sendPasswordResetEmail(emailAddress);
  }

  getAuthProfiles(uid: string) {
    return new Promise((resolve) => {
      this.afs
        .collection('auth__assigments')
        .doc(uid)
        .valueChanges()
        .subscribe((res: any) => {

          /** If doesn't have assigment records */
          if (!res) { return resolve([]); }

          const { profiles = [] } = res;
          localStorage.setItem('ROLE', JSON.stringify(profiles));
          this.authProfiles.next(profiles);
          resolve(res);
        });
    });
  }

  async logout() {
    window.localStorage.clear();
    this.authenticationState.next(false);
    this.afAuth.signOut();

    this.router.navigate(["/sign-in"]);
  }


  getByUID(uid: any, opts = {}): Observable<any> {
    return this.afs.collection('users').doc(uid).valueChanges();
  }

  async getByUIDPromise(uid: any, opts = {}): Promise<any | null> {
    const snapshot = await lastValueFrom(this.afs.collection('users').doc(uid).get());
    return await handlerObjectResult(snapshot, opts);
  }

  async getByEmailAddress(email: any, opts = {}): Promise<any | null> {
    const snapshot = await lastValueFrom(this.afs.collection('users',
      (ref) => ref.where('email', '==', email).limit(1)
    ).get());

    const result = await handlerArrayResult(snapshot, opts);
    return (result.length > 0) ? result.pop() : null;
  }


  /**
   * 
   * @param documentType 
   * @param dni 
   * @param opts 
   * @returns 
   */
  async getByDocument(dni: any, documentType: any, opts = {}): Promise<any | null> {

    console.log('getByDocument', dni, documentType);


    const snapshot = await lastValueFrom(this.afs.collection('users',
      (ref) => ref
        .where('dni', '==', dni.toString())
        .where('documentType', '==', documentType.toString())
        .limit(1)
    ).get());

    const result = await handlerArrayResult(snapshot, opts);
    return (result.length > 0) ? result.pop() : null;
  }


  async getByWalletAddress(walletAddress: any, opts = {}): Promise<any | null> {
    const snapshot = await lastValueFrom(this.afs.collection('users',
      (ref) => ref.where('walletAddress', '==', walletAddress).limit(1)
    ).get());

    const result = await handlerArrayResult(snapshot, opts);
    return (result.length > 0) ? result.pop() : null;
  }

  /**
   * Registrar documento de usuario
   * @param data 
   * @returns 
   */
  async store(docId: string, data: any) {
    const fmt = Object.assign({}, data, { createdAt: moment().valueOf() })
    return await this.afs.collection(this.collection).doc(docId).set(fmt);
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
  getDynamic(collection: string, where: any[] = [], opts: any = {}): Observable<any[]> {
    const { idField = "_id", orderBy = [] } = opts;

    return this.afs.collection(collection,
      (ref) => {
        let query: Query = ref;
        for (const row of where) { query = ref.where(row.field, row.condition, row.value); }

        for (const order of orderBy) { query = ref.orderBy(order.field, order.order); }
        return query;
      }
    ).valueChanges({ idField });
  }

  async checkDNI(dni: string, documentType: string) {
    const snapshot = await lastValueFrom(
      this.afs.collection('users', (ref) => ref.where('dni', '==', dni).where('documentType', '==', documentType)).get()
    );
    const result = await handlerArrayResult(snapshot);
    return (result.length > 0) ? result.pop() : null;
  }


  
  getUserAuth(email){
    return this.afs.collection('users', ref =>   ref.where('email', '==', email)).valueChanges();
  }
}



/**
 * Validat si usuario registrado a través de un email
 *
 * @param service 
 * @returns 
 */
export function checkIfEmailDoesExist(service: AuthenticationService): AsyncValidatorFn {
  return (control: AbstractControl): Observable<ValidationErrors | null> => {
    return service.afs.collection('users', (ref) => ref.where('email', '==', `${control.value}`.trim()).limit(1)).get()
      .pipe(
        // tap((result) => console.log(result) ),
        map((data) => {
          // console.log({data});
          return (data.empty) ? null : { emailStored: true };
        })
      );
  }
}


/**
 * Validat si usuario registrado a través de un email
 *
 * @param service 
 * @returns 
 */
export function checkIfWalletAddressDoesExist(service: AuthenticationService): AsyncValidatorFn {
  return (control: AbstractControl): Observable<ValidationErrors | null> => {
    return service.afs.collection('users', (ref) => ref.where('walletAddress', '==', `${control.value}`.trim()).limit(1)).get()
      .pipe(
        // tap((result) => console.log(result) ),
        map((data) => {
          // console.log({data});
          return (data.empty) ? null : { walletStored: true };
        })
      );
  }
}
