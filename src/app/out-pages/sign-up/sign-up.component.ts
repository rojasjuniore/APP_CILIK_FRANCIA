import { Component, OnInit } from '@angular/core';
import { Sweetalert2Service } from '../../services/sweetalert2.service';
import { Router } from '@angular/router';
import data from '../../../assets/i18n/from.json';
import { AuthenticationService, checkIdentificationForExists, checkIfEmailDoesExist } from 'src/app/services/authentication.service';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { MustMatch } from 'src/app/helpers/must-match.validator';
import { DataService } from 'src/app/services/data.service';
import { TemporalTokenService } from 'src/app/services/temporal-token.service';
import { EmailNotificationService } from 'src/app/services/email-notification.service';
import { CommonService } from 'src/app/services/common.service';
import { TranslatePipe } from '@ngx-translate/core';
import { CustomizationfileService } from 'src/app/services/customizationfile/customizationfile.service';
import { QuickNotificationService } from 'src/app/services/quick-notification/quick-notification.service';
import moment from 'moment';
import { DocumentService } from 'src/app/services/documents/document.service';
import { environment } from 'src/environments/environment';

@Component({
  selector: 'app-sign-up',
  templateUrl: './sign-up.component.html',
  styleUrls: ['./sign-up.component.css']
})
export class SignUpComponent implements OnInit {

  public paises;
  public valid = false;
  public email = '';
  public password = '';
  public validPassword = false;
  public datad = {
    email: "",
    password: "",
    dni: "",
    phone: "",
    name: "",
    surnames: ""
  };
  public submitStatus = 0;

  public DB: any = AuthenticationService;

  public form!: FormGroup;
  public vm = {
    name: [
      { type: 'required', message: 'formValidations.required' },
      { type: 'pattern', message: 'formValidations.onlyCharacters' }
    ],
    surnames: [
      { type: 'required', message: 'formValidations.required' },
      { type: 'pattern', message: 'formValidations.onlyCharacters' }
    ],
    identificationType: [
      { type: 'required', message: 'formValidations.required' }
    ],
    identification: [
      { type: 'required', message: 'formValidations.required' },
      { type: 'minlength', message: 'formValidations.minlength6' },
      { type: 'pattern', message: 'formValidations.onlyNumbers' },
      { type: 'existingIdentification', message: 'formValidations.dniStored' },
    ],
    prefijo: [
      { type: 'required', message: 'formValidations.required' },
    ],
    phone: [
      { type: 'required', message: 'formValidations.required' },
      { type: 'pattern', message: 'formValidations.onlyNumbers' },
      { type: 'minlength', message: 'formValidations.minlength8' },
      { type: 'maxlength', message: 'formValidations.maxlength15' }
    ],
    email: [
      { type: 'required', message: 'formValidations.required' },
      { type: 'pattern', message: 'formValidations.email' },
      { type: 'emailStored', message: 'formValidations.emailStored' },
    ],
    password: [
      { type: 'required', message: 'formValidations.required' },
      { type: 'minlength', message: 'formValidations.minlength6' },
      { type: 'maxlength', message: 'formValidations.maxlength12' }
    ],
    confirmPassword: [
      { type: 'required', message: 'formValidations.required' },
      { type: 'mustMatch', message: 'formValidations.passwordsNotMatch' }
    ],
    termsAndCondition: [
      { type: 'required', message: 'formValidations.required' }
    ],
    imageUseAuthorization: [
      { type: 'required', message: 'formValidations.required' }
    ],
    informedConsentForMinors: [
      { type: 'required', message: 'formValidations.required' }
    ],
  };
  public submit = false;
  public loader = false;
  public phoneData: any[];
  public typeInput = 'password';

  constructor(
    private fb: FormBuilder,
    private dataSrv: DataService,
    private authenticationSrv: AuthenticationService,
    private router: Router,
    private commonService: CommonService,
    private sweetAlert2Srv: Sweetalert2Service,
    private temporalTokenSrv: TemporalTokenService,
    private quickNotificationSrv: QuickNotificationService,
    private translatePipe: TranslatePipe,
    private _cf: CustomizationfileService,
    private documentSrv: DocumentService
  ) {

    /** Phone number prefix list */
    this.phoneData = this.dataSrv.customCountryList;

    /** Build Form */
    this.buildForm();

  }

  ngOnInit(): void {
    this.paises = data;
  }

  /**
 * filter
 */

  filter() {
    let text: any = document.getElementById("filter")
    console.log(text.value);

    var result = this.phoneData.filter(function (item) {
      return item.name.indexOf(text?.value.toLowerCase()) > -1;
    });

    console.log(result);

    this.phoneData = result
  }



  /**
   * Show or hide password
   */
  changeTypeInput() {
    this.typeInput = this.typeInput === 'password' ? 'text' : 'password';
  }

  buildForm() {
    this.form = this.fb.group({
      name: [
        '',
        [
          Validators.required,
          Validators.pattern(/^[a-zA-Z ]+$/)
        ]
      ],
      surnames: [
        '',
        [
          Validators.required,
          Validators.pattern(/^[a-zA-Z ]+$/)
        ]
      ],
      identificationType: ['cedula', Validators.required],
      identification: ['',
        [
          Validators.required,
          // Validators.minLength(6),
          // Validators.pattern(/^[0-9]+$/)
          // only letters and numbers
          // Validators.pattern(/^[a-zA-Z0-9]+$/)
        ],
        [
          checkIdentificationForExists(this.authenticationSrv)
        ]
      ],
      prefijo: ["", [
        Validators.required
      ]],
      phone: ['', [
        Validators.required,
        Validators.pattern(/^[0-9]+$/),
        Validators.minLength(8),
        Validators.maxLength(15)
      ]],
      email: ['',
        [
          Validators.required,
          Validators.pattern(/^(([^<>()\[\]\\.,;:\s@"]+(\.[^<>()\[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/)
        ],
        [
          checkIfEmailDoesExist(this.authenticationSrv)
        ]
      ],
      password: ['', [
        Validators.required,
        Validators.minLength(6),
        Validators.maxLength(12)
      ]],
      confirmPassword: ['', Validators.required],
      tac: [false, [Validators.requiredTrue]],
      imageUseAuthorization: [false, [Validators.requiredTrue]],
      informedConsentForMinors: [false, [Validators.requiredTrue]],
    }, { validator: MustMatch('password', 'confirmPassword') });
  }

  get f() { return this.form.controls; }

  /**
   * Guardar perfil del nuevo usuario
   *
   * @param profile
   * @param userNew
   */
  async saveProfile(profile: any, userNew: any) {
    /**
     * - Extraer UID del usuario
     * - Validar si existe
     */
    const uid = userNew.user.uid;
    if (!uid) { throw new Error("NO UID"); }

    /**
      * - Convertir a string numero de identificación
      * - Convertir a minisculas nombre completo
      * - Convertir a minusculas dirección de email
      * - Definir imagen base de avatar
      */
    const identification = this._cf.transformarString(profile.identification);
    const name = `${profile.name} ${profile.surnames}`.toLowerCase();
    const email = profile.email.toLowerCase();
    const avatar = '/assets/img/002-man.svg';
    const identificationType = profile.identificationType;


    /**
      * - Crear documento usuario
      * - Crear documento perfil de usuario
      */
    const [userDoc, profileDoc] = await Promise.all([
      this.authenticationSrv.buildAndStoreUserDoc(Object.assign({}, profile, { uid, avatar, name, identification, email, identificationType })),
      this.authenticationSrv.buildAndStoreProfileDoc(Object.assign({}, profile, { uid, email, identification, identificationType }))
    ]);


    /**
     * - Crear documento de perfil para Realtime
     * - Almacenar perfil en Realtime
     * - Almacenar identificador de token push del usuario creado
     */
    const profileDocReal = Object.assign(userDoc, { profile: profileDoc });
    // console.log("profileDocReal", profileDocReal);
    await this.authenticationSrv.db.object(`users/${uid}`).update(profileDocReal),

      /**
       * - Almacenar identificador del usuario en el localStorage
       * - Almacenar documento del perfil en el localStorage
       * - Almacenar imagen de avatar en localStorage
       */
      localStorage.setItem("uid", uid);
    localStorage.setItem("profile", JSON.stringify(profileDoc));
    localStorage.setItem("avatar", avatar);

    return true;
  }

  async onSubmit() {
    try {

      this.submit = true;
      this.loader = true;
      // console.log('data', this.form.value);

      if (!this.form.valid) {
        this.form.markAllAsTouched();
        return;
      }

      const formData = this.form.value;
      const data = {
        name: this.commonService.noSpecialCharacters(formData.name),
        surnames: this.commonService.noSpecialCharacters(formData.surnames),
        identificationType: formData.identificationType,
        identification: formData.identification,
        prefijo: formData.prefijo,
        phone: formData.phone,
        email: `${formData.email}`.trim().toLowerCase(),
      };
      // console.log('try to submit', data);

      /** Ejecutar 2FA en proceso de registro */
      const run2FA = await this.temporalTokenSrv.runByEmail(data.email);
      if (!run2FA) {
        return;
      }

      const password = `${formData.password}`.trim();


      const currentUser: any = await this.authenticationSrv.afAuth.currentUser;
      const isAnonymous: any = currentUser?.isAnonymous;


      /** Crear usuario en sistema de autenticación */
      const afsUser = await this.authenticationSrv.createUserWithEmailAndPassword(data.email, password);

      // Si el usuario actual es anónimo, migra los datos al nuevo UID
      if (isAnonymous && currentUser) {
        await this.authenticationSrv.migrateData(currentUser.uid, afsUser.user.uid);
      }

      // console.log('afsUser', afsUser);
      const uid = afsUser.user.uid;
      console.log('uid', uid);

      /** Guardar usuario - Utilizando la estructura de CILIK */
      await this.saveProfile(formData, afsUser);

      /** Guardar Aceptación de terminos para el evento */
      await this.documentSrv.updateOrStore(environment.dataEvent.keyDb, afsUser.user.uid, {
        tac: formData.tac,
        tacAt: moment().valueOf(),
        imageUseAuthorization: formData.imageUseAuthorization,
        informedConsentForMinors: formData.informedConsentForMinors,
      });

      /** Enviar mail de bienvenida */
      const names = `${data.name} ${data.surnames}`.trim().toUpperCase();
      await this.quickNotificationSrv.sendEmailNotification({
        type: "signUpNotification",
        email: data.email,
        subject: this.translatePipe.transform('notification.signUp.subject', { names: names }) + ` - ` + moment().format("DD/MM/YYYY HH:mm:ss"),
        greeting: this.translatePipe.transform('notification.signUp.greeting', { names: names }),
        messageBody: [
          {
            type: "html",
            html: `<h1 style='text-align: center;'><strong>${this.translatePipe.transform('notification.signUp.body.0')}</strong></h1>`
          },
          {
            type: 'line',
            text: this.translatePipe.transform('notification.signUp.body.1')
          },
          {
            type: 'line',
            text: this.translatePipe.transform('notification.signUp.body.2')
          },
          {
            type: "line",
            text: this.translatePipe.transform('notification.noRecognizeActivity')
          }
        ],
        salutation: this.translatePipe.transform('notification.greetings')
      });

      this.sweetAlert2Srv.showSuccess(
        this.translatePipe.transform('general.successfulRegistration')
      );

      const returnUrl = localStorage.getItem('returnUrl') || '/pages/dashboard';
      localStorage.removeItem('returnUrl'); // Limpia la URL de retorno una vez que se usa
      this.router.navigateByUrl(returnUrl);
      return;

    } catch (err) {
      console.log('Error on SignUpComponent.onSubmit', err);
      this.sweetAlert2Srv.showError("Error al crear usuario")
      return;
    } finally {
      this.loader = false;
    }
  }




  async openPopup() {
    if (this.datad.password == "") {
      this.validPassword = true;
    } else if (this.datad.email == "") {
      this.valid = true;
    } else {
      this.submitStatus = 1;
      const id = await this.authenticationSrv.storeUser(this.datad)
      this.submitStatus = 0;
      this.router.navigate(['registro-exitoso']);
    }
  }

  modelChangeFn(newValue: string) {
    console.log(this.password)
    var validEmail = /^\w+([.-_+]?\w+)*@\w+([.-]?\w+)*(\.\w{2,10})+$/;

    // Using test we can check if the text match the pattern
    if (validEmail.test(newValue)) {
      this.valid = false;

    } else {
      this.valid = true;

    }
  }

  modelChangePassword(newValue: string) {
    console.log(this.datad)
    this.validPassword = false;

  }


}
