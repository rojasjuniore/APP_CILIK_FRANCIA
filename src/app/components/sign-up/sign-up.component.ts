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

@Component({
  selector: 'app-sign-up',
  templateUrl: './sign-up.component.html',
  styleUrls: ['./sign-up.component.css']
})
export class SignUpComponent implements OnInit {

  public paises;
  public valid = false;
  public email='';
  public password='';
  public validPassword = false;
  public datad = {
    email:"",
    password:"",
    dni:"",
    phone:"",
    name:"",
    last_name:""
  };
  public submitStatus = 0;

  public DB: any = AuthenticationService;

  public form!: FormGroup;
  public vm = {
    firstName: [
      {type: 'required', message: 'First name is required'},
      {type: 'pattern', message: 'First name must contain only letters'}
    ],
    lastName: [
      {type: 'required', message: 'Last name is required'},
      {type: 'pattern', message: 'Last name must contain only letters'}
    ],
    documentType: [
      {type: 'required', message: 'Document type is required'}
    ],
    dni: [
      {type: 'required', message: 'DNI is required'},
      {type: 'pattern', message: 'DNI must contain only numbers'}
    ],
    prefix: [
      {type: 'required', message: 'Prefix is required'},
      {type: 'pattern', message: 'Prefix must contain only numbers'}
    ],
    phoneNumber: [
      {type: 'required', message: 'Phone number is required'},
      {type: 'pattern', message: 'Phone number must contain only numbers'}
    ],
    email: [
      {type: 'required', message: 'Email is required'},
      {type: 'pattern', message: 'Email is not valid'},
      {type: 'emailStored', message: 'Email is already registered'},
    ],
    password: [
      {type: 'required', message: 'Password is required'},
      {type: 'minlength', message: 'Password must be at least 6 characters long'},
      {type: 'maxlength', message: 'Password cannot be more than 12 characters long'}
    ],
    confirmPassword: [
      {type: 'required', message: 'Confirm password is required'},
      {type: 'mustMatch', message: 'Password and confirm password must match'}
    ],
    termsAndCondition: [
      {type: 'required', message: 'Terms and condition is required'}
    ]
  };
  public submit = false;
  public loader = false;
  public phoneData: any[];

  constructor(
    private fb: FormBuilder,
    private dataSrv: DataService,
    private authenticationSrv: AuthenticationService,
    private router: Router,
    private sweetAlert2Srv: Sweetalert2Service,
    private temporalTokenSrv: TemporalTokenService,
    private emailNotificationSrv: EmailNotificationService,
  ) {

    /** Phone number prefix list */
    this.phoneData = this.dataSrv.getCountryPhone()
    .sort((a, b) => a.name.localeCompare(b.name));
    
    /** Build Form */
    this.buildForm();

  }

  ngOnInit(): void {
    this.paises=data;
  }

  buildForm(){
    this.form = this.fb.group({
      firstName: [
        'Pedro',
        [
          Validators.required,
          Validators.pattern(/^[a-zA-Z]+$/)
        ]
      ],
      lastName: [
        'Lars',
        [
          Validators.required,
          Validators.pattern(/^[a-zA-Z]+$/)
        ]
      ],
      documentType: ['dni', Validators.required],
      dni: ['123456789', [
        Validators.required,
        Validators.pattern(/^[0-9]+$/)
      ]],
      prefix: [57, [
        Validators.required,
        Validators.pattern(/^[0-9]+$/)
      ]],
      phoneNumber: ['1111111111', [
        Validators.required,
        Validators.pattern(/^[0-9]+$/)
      ]],
      email: ['developer2@bnf.com.co', 
        [
          Validators.required,
          Validators.pattern(/^(([^<>()\[\]\\.,;:\s@"]+(\.[^<>()\[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/)
        ],
        [
          checkIfEmailDoesExist(this.authenticationSrv)
        ]
      ],
      password: ['123456', [
        Validators.required,
        Validators.minLength(6),
        Validators.maxLength(12)
      ]],
      confirmPassword: ['123456', Validators.required],
      termsAndCondition: [false, [Validators.requiredTrue]]
    }, {validator: MustMatch('password', 'confirmPassword')})
  }

  get f() { return this.form.controls; }

  async onSubmit(){
    try {

      this.submit = true;
      this.loader = true;

      if(this.form.invalid){
        this.form.markAllAsTouched();
        return;
      }

      const formData = this.form.value;
      const data = {
        firstName: `${formData.firstName}`.trim().toLowerCase(),
        lastName: `${formData.lastName}`.trim().toLowerCase(),
        documentType: formData.documentType,
        dni: formData.dni,
        prefix: formData.prefix,
        phoneNumber: formData.phoneNumber,
        email: `${formData.email}`.trim().toLowerCase(),
      };
      console.log('try to submit', data);

      /** Ejecutar 2FA en proceso de registro */
      const run2FA = await this.temporalTokenSrv.runByEmail(formData.email);
      if(!run2FA){
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
 
       return this.router.navigate(['register-completed']);

    } catch (err) {
      console.log('Error on SignUpComponent.onSubmit', err);
      return;
    }finally{
      this.loader = false;
    }
  }


  async openPopup() {
    if(this.datad.password==""){
      this.validPassword=true;
    }else if(this.datad.email==""){
      this.valid=true;
    }else{
      this.submitStatus=1;
      const id = await this.authenticationSrv.storeUser(this.datad)
      this.submitStatus=0;
      this.router.navigate(['registro-exitoso']);
    }
  }

  modelChangeFn(newValue: string) {
    console.log(this.password)
    var validEmail =  /^\w+([.-_+]?\w+)*@\w+([.-]?\w+)*(\.\w{2,10})+$/;

    // Using test we can check if the text match the pattern
    if( validEmail.test(newValue) ){
      this.valid=false;

    }else{
      this.valid=true;

    }
  }

  modelChangePassword(newValue: string) {
    console.log(this.datad)
    this.validPassword=false;

  }


}
