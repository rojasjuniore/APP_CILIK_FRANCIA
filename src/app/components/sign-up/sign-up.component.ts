import { Component, OnInit } from '@angular/core';
import { Sweetalert2Service } from '../../services/sweetalert2.service';
import { Router } from '@angular/router';
import data from '../../../assets/i18n/from.json';
import { AuthenticationService, checkIfEmailDoesExist } from 'src/app/services/authentication.service';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { MustMatch } from 'src/app/helpers/must-match.validator';
import { DataService } from 'src/app/services/data.service';
import { TemporalTokenService } from 'src/app/services/temporal-token.service';
import { EmailNotificationService } from 'src/app/services/email-notification.service';
import { CommonService } from 'src/app/services/common.service';
import { TranslatePipe } from '@ngx-translate/core';

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
    last_name: ""
  };
  public submitStatus = 0;

  public DB: any = AuthenticationService;

  public form!: FormGroup;
  public vm = {
    firstName: [
      { type: 'required', message: 'formValidations.required' },
      { type: 'pattern', message: 'formValidations.onlyCharacters' }
    ],
    lastName: [
      { type: 'required', message: 'formValidations.required' },
      { type: 'pattern', message: 'formValidations.onlyCharacters' }
    ],
    documentType: [
      { type: 'required', message: 'formValidations.required' }
    ],
    dni: [
      { type: 'required', message: 'formValidations.required' },
      { type: 'minlength', message: 'formValidations.minlength6' },
      { type: 'pattern', message: 'formValidations.onlyNumbers' },
      { type: 'dniStored', message: 'formValidations.dniStored' },
    ],
    prefix: [
      { type: 'required', message: 'formValidations.required' },
    ],
    phoneNumber: [
      { type: 'required', message: 'formValidations.required' },
      { type: 'pattern', message: 'formValidations.onlyNumbers' },
      { type: 'minlength', message: 'formValidations.minlength9' },
      { type: 'maxlength', message: 'formValidations.maxlength10' }
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
      { type: 'required', message: 'formValidations.required'},
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
    private emailNotificationSrv: EmailNotificationService,
    private translatePipe: TranslatePipe,
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
   * Show or hide password
   */
  changeTypeInput() {
    this.typeInput = this.typeInput === 'password' ? 'text' : 'password';
  }

  buildForm() {
    this.form = this.fb.group({
      firstName: [
        '',
        [
          Validators.required,
          Validators.pattern(/^[a-zA-Z ]+$/)
        ]
      ],
      lastName: [
        '',
        [
          Validators.required,
          Validators.pattern(/^[a-zA-Z ]+$/)
        ]
      ],
      documentType: ['dni', Validators.required],
      dni: ['', [
        Validators.required,
        Validators.minLength(6),
        Validators.pattern(/^[0-9]+$/)
      ]],
      prefix: ["+57", [
        Validators.required
      ]],
      phoneNumber: ['', [
        Validators.required,
        Validators.pattern(/^[0-9]+$/),
        Validators.minLength(9),
        Validators.maxLength(10)
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
      termsAndCondition: [false, [Validators.requiredTrue]],
      imageUseAuthorization: [false, [Validators.requiredTrue]],
      informedConsentForMinors: [false, [Validators.requiredTrue]],

    }, { validator: MustMatch('password', 'confirmPassword') })
  }

  get f() { return this.form.controls; }

  async onSubmit() {
    try {

      this.submit = true;
      this.loader = true;

      if (!this.form.valid) {
        this.form.markAllAsTouched();
        return;
      }

      const formData = this.form.value;

      const checkDNI = await this.authenticationSrv.checkDNI(formData.dni, formData.documentType);
      if(checkDNI){
        this.f.dni.setErrors({ dniStored: true });
        return;
      }


      const data = {
        firstName: this.commonService.noSpecialCharacters(formData.firstName),
        lastName: this.commonService.noSpecialCharacters(formData.lastName),
        documentType: formData.documentType,
        dni: formData.dni,
        prefix: formData.prefix,
        phoneNumber: formData.phoneNumber,
        email: `${formData.email}`.trim().toLowerCase(),
        roles: ['user'],
      };
      console.log('try to submit', data);


      /** valid document */
      const validDocument = await this.authenticationSrv.getByDocument(data.dni, data.documentType);
      console.log('validDocument', validDocument);
      if (validDocument != null) {
        const message = this.translatePipe.transform('formValidations.dniStored');
        this.sweetAlert2Srv.showWarning(message);
        return
      }


      /** Ejecutar 2FA en proceso de registro */
      const run2FA = await this.temporalTokenSrv.runByEmail(formData.email);
      if (!run2FA) {
        return;
      }

      const password = `${formData.password}`.trim();

      /** Crear usuario en sistema de autenticación */
      const afsUser = await this.authenticationSrv.createUserWithEmailAndPassword(data.email, password);
      console.log('afsUser', afsUser);

      const uid = afsUser.user?.uid;

      /** Registrar usuario */
      await this.authenticationSrv.store(`${uid}`, data);

      /** Enviar mail de bienvenida */
      await this.emailNotificationSrv.sendWelcomeNotification([data.firstName, data.lastName].join(' '), data.email);

      /** Guardar identificador en el localStorage */
      this.authenticationSrv.setLocalUID(uid);

      const message = this.translatePipe.transform('general.successfulRegistration');
      this.sweetAlert2Srv.showSuccess(message, 2);

      return this.router.navigate(['pages','dashboard']);

    } catch (err) {
      console.log('Error on SignUpComponent.onSubmit', err);
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
