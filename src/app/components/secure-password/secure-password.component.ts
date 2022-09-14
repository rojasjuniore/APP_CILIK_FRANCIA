import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Sweetalert2Service } from '../../services/sweetalert2.service';
import { AuthenticationService } from 'src/app/services/authentication.service';
import { TemporalTokenService } from 'src/app/services/temporal-token.service';
import { Router } from '@angular/router';
import { MustMatch } from 'src/app/helpers/must-match.validator';


@Component({
  selector: 'app-secure-password',
  templateUrl: './secure-password.component.html',
  styleUrls: ['./secure-password.component.css']
})
export class SecurePasswordComponent implements OnInit {

  public valid = false;
  public validRepeatPassword=false;
  public validPassword = false;
  public validPasswordEquals=false;
  public datad = {
    email:"",
    password:"",
    repeatPassword:"",
  };
  public validUser=false;
  public checkEmailStatus=0;


  public uid!: string;
  public form!: FormGroup;
  public vm = {
    email: [
      { type: 'required', message: 'Correo electronico es requerido *' },
      { type: 'pattern', message: 'Por favor, introduce una dirección de correo electrónico válida *' },
      { type: 'invalidEmail', message: 'Por favor, introduce una dirección de correo electrónico válida *' }
    ],
    password: [
      {type: 'required', message: 'Se requiere contraseña *'},
      {type: 'minlength', message: 'La contraseña debe contener 6 caracteres como mínimo *'},
      {type: 'maxlength', message: 'La contraseña no puede tener más de 12 caracteres *'}
    ],
    confirmPassword: [
      {type: 'required', message: 'Se requiere confirmar contraseña *'},
      {type: 'mustMatch', message: 'La contraseña y la contraseña de confirmación deben coincidir *'}
    ],
  };
  public submit = false;
  public loader = false;
  public formStatus = 1;

  constructor(
    public temporalTokenSrv: TemporalTokenService,
    private authSrv: AuthenticationService,
    private fb: FormBuilder,
    private router: Router,
    private sweetAlert2Srv: Sweetalert2Service
  ) {
    this.buildForm();
  }

  ngOnInit(): void {
  }

  buildForm(){
    this.form = this.fb.group({
      email: ['', 
        [
          Validators.required, 
          Validators.pattern(/^(([^<>()\[\]\\.,;:\s@"]+(\.[^<>()\[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/)
        ]
      ],
      password: ['',
        [
          Validators.required,
          Validators.minLength(6),
          Validators.maxLength(12)
        ]
      ],
      confirmPassword: ['', Validators.required],
    }, {validator: MustMatch('password', 'confirmPassword')})
  }

  get f() { return this.form.controls; }

  async onSubmit(){
    this.submit = true;

    try {
      this.loader = true;

      if(this.form.invalid){
        this.form.markAllAsTouched();
        return;
      }

      const formData = this.form.value;
      console.log('formData', formData);
      await this.authSrv.updateUserPassword(this.uid, formData.password);

      this.form.reset();
      this.formStatus = 1;
      this.submit = false;
      this.router.navigate(['sign-in']);
      this.sweetAlert2Srv.showToast('Password updated successfully', 'success');
      return;

    } catch (err) {
      console.log('Error on SecurePasswordComponent.onSubmit: ', err);
      return;
    }finally{
      this.loader = false;
    }
  }

  async sendCode(e: Event){
    const target = e.target as HTMLInputElement;
    target.disabled = true;
    try {
      this.submit = true;

      if(this.f.email.errors){ return; }

      const find = await this.authSrv.getByEmailAddress(this.f.email.value);
      if(!find){
        this.f.email.setErrors({invalidEmail: true});
        return;
      }
      // console.log('find', find);
      this.uid = find._id;

      const code = await this.temporalTokenSrv.runByEmail(this.f.email.value);
      if(!code){ return; }

      this.f.email.disable();
      this.formStatus = 2;
      this.submit = false;
      return;
      
    } catch (err) {
      console.log('Error on SecurePasswordComponent.prueba: ', err);
      return;
    }finally{
      target.disabled = false;
    }
  }

  saverange(newValue) {
    //console.log(newValue)
    var validEmail =  /^\w+([.-_+]?\w+)*@\w+([.-]?\w+)*(\.\w{2,10})+$/;

    // Using test we can check if the text match the pattern
    if( validEmail.test(newValue) ){
      this.valid=false;
      this.checkEmailStatus = 1;
    }else{
      this.valid=true;
      this.checkEmailStatus = 0;

    }
    console.log(this.checkEmailStatus)
  } 




  async openPopup() {

    if(this.datad.password==''){
      this.validPassword=true;
    }else if(this.datad.repeatPassword==''){
      this.validRepeatPassword=true;
    }else if(this.datad.password !== this.datad.repeatPassword){
      this.validPasswordEquals=true;
    }else{
      this.router.navigate(['sign-in']);
    }
    
  }

  modelChangeFn(newValue: string) {
    this.validUser=false;
    var validEmail =  /^\w+([.-_+]?\w+)*@\w+([.-]?\w+)*(\.\w{2,10})+$/;

    // Using test we can check if the text match the pattern
    if( validEmail.test(newValue) ){
      this.valid=false;

    }else{
      this.valid=true;

    }
  }

  modelChangePassword(newValue: string) {
    this.validUser=false;
    this.validPassword=false;
    this.validRepeatPassword=false;
    this.validPasswordEquals=false;
  }
}
