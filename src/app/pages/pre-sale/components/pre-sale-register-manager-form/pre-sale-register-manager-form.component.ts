import { Component, OnInit, Output,ViewChild  } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { AuthenticationService } from 'src/app/services/authentication.service';
import { PreSaleService } from 'src/app/services/pre-sale.service';
import { TemporalTokenService } from 'src/app/services/temporal-token.service';
import { Sweetalert2Service } from 'src/app/services/sweetalert2.service';
import data from '../../../../../assets/i18n/from.json';
import { PreSaleModalNroParticipantsComponent } from '../pre-sale-modal-nro-participants/pre-sale-modal-nro-participants.component';

@Component({
  selector: 'app-pre-sale-register-manager-form',
  templateUrl: './pre-sale-register-manager-form.component.html',
  styleUrls: ['./pre-sale-register-manager-form.component.css']
})
export class PreSaleRegisterManagerFormComponent implements OnInit {

  @ViewChild(PreSaleModalNroParticipantsComponent) modalNroParticipants!: PreSaleModalNroParticipantsComponent;

  public package: any;
  public form!: FormGroup;
  public vm = {
    email: [
      {type: 'required', message: 'El email es requerido'},
      {type: 'pattern', message: 'El email no es válido'},
    ],
    name: [
      {type: 'required', message: 'El nombre es requerido'},
      {type: 'pattern', message: 'El nombre no es válido'},
    ],
    last_name: [
      {type: 'required', message: 'El apellido es requerido'},
      {type: 'pattern', message: 'El apellido no es válido'},
    ],
    telefono: [
      {type: 'required', message: 'El telefono es requerido'},
      {type: 'pattern', message: 'El telefono no es válido'},
    ],
    dni: [
      {type: 'required', message: 'El DNI es requerido'},
      {type: 'pattern', message: 'El DNI no es válido'},
    ]
  };
  public submit = false;
  public paises;
  public checkEmailStatus = 0;
  public submitStatus = 0;
  public valid = false;
  public validTelefono = false;
  public packag;
  public local;

  public email;


  constructor(
    public preSaleSrv: PreSaleService,
    public temporalTokenSrv: TemporalTokenService,
    private fb: FormBuilder,
    private authSrv: AuthenticationService,
    private sweetAlert2Srv: Sweetalert2Service,
  ) {
    this.buildForm();
  }

  ngOnInit(): void {
    
    const packageDoc = window.localStorage.getItem('preSaleDoc');
    this.package = JSON.parse(packageDoc || '{}');
    this.paises=data;
    this.local = localStorage.getItem('package');
    this.packag = JSON.parse(this.local)
    for (let i = 0; i < data.length; i++) {
      console.log(`${data[i].name}`)
    }
  }

  buildForm(){
    this.form = this.fb.group({
      email: [
        {
          value: '',
          disabled: false,
        }, 
        [
          Validators.required,
          Validators.pattern(/^(([^<>()\[\]\\.,;:\s@"]+(\.[^<>()\[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/)

        ]
      ],
      name: [
        {
          value: '',
          disabled: true,
        },
        [
          Validators.required,
          Validators.pattern('[a-zA-Z ]*'), 
        ]
      ],
      last_name: [
        {
          value: '',
          disabled: true,
        },
        [
          Validators.required,
          Validators.pattern('[a-zA-Z ]*'), 
        ]
      ],
      dni: [
        {
          value: '',
          disabled: true,
        },
        [
          Validators.required,
          Validators.pattern(/^\d+$/),
        ]
      ],
    });
  }

  get f(){ return this.form.controls; }

  savetelefono(newValue) {
    console.log(newValue)
    var validPhone =  /^[\+]?[(]?[0-9]{3}[)]?[-\s\.]?[0-9]{3}[-\s\.]?[0-9]{4,6}$/im;
    //console.log(newValue)
    // Using test we can check if the text match the pattern
    if( validPhone.test(newValue) ){
      this.validTelefono=false;
      /*this.f.name.enable();
      this.f.last_name.enable();
      this.f.dni.enable();
      this.f.email.enable();*/

      //this.submit = false;
     // this.checkEmailStatus = 2;
    }else{
      this.validTelefono=true;
      //this.checkEmailStatus = 1;
      //this.f.email.disable();
    }
  } 

  saverange(newValue) {
    //console.log(newValue)
    var validEmail =  /^\w+([.-_+]?\w+)*@\w+([.-]?\w+)*(\.\w{2,10})+$/;

    // Using test we can check if the text match the pattern
    if( validEmail.test(newValue) ){
      this.valid=false;
      this.f.name.enable();
      this.f.last_name.enable();
      this.f.dni.enable();
      this.f.email.enable();
      this.email=newValue;
      this.submit = false;
      this.checkEmailStatus = 4;
    }else{
      this.valid=true;
      this.checkEmailStatus = 1;
      //this.f.email.disable();
    }
  } 


  async checkEmail(){
    try {

      this.submit = true;
      if(this.f.email.errors) { 
        return;
      }

      this.checkEmailStatus = 1;
      this.f.email.disable();

      const find = await this.authSrv.getByEmailAddress(this.f.email.value);

      if(find){ 
        console.log('user exist');
      }

      this.f.name.enable();
      this.f.last_name.enable();
      this.f.dni.enable();
      this.f.email.enable();

      this.submit = false;
      this.checkEmailStatus = 4;
      return;
      
    } catch (err) {
      console.log('Error on PreSaleRegisterManagerFormComponent.checkEmail', err);
      return;
    }
  }

      /** Seleccionar paquete */
      async selectPackage(item: any) { 
        this.package = Object.assign({
          nroGuests: 0,
          extras: {
            nro: 0,
            items: [],
            summary: [],
            total: 0,
          }
        }, item); 
    
        // this.step = 2;
        this.modalNroParticipants.showModal(this.package);
      }


  async onSubmit(){
    this.submit = true;

    if(this.form.invalid){
      this.form.markAllAsTouched();
      return;
    }

    try {

      this.submitStatus = 1;
      const formData = this.form.value;

      const data = {
        email: `${formData.email}`.trim().toLowerCase(),
        name: `${formData.name}`.trim().toLowerCase(),
        last_name: `${formData.last_name}`.trim().toLowerCase(),
        dni: formData.dni,
      }

      /** Validar si existe el usuario */
      const find = await this.authSrv.getByEmailAddress(formData.email);
      if(find){

        /** Confirmar si desea utilizar la información almacenada */
        const ask = await this.sweetAlert2Srv.askConfirm(`El usuario ${formData.email} ya existe, se utilizara la información asociada a el para generar la orden. ¿Desea continuar?`);
        if(!ask) { return; }

        data.email = find.email;
        data.name = find.name;
        data.dni = find.dni;
      }

      return await this.onNext(data);
      
    } catch (err) {
      console.log('Error on PreSaleRegisterManagerFormComponent.onSubmit', err);
      this.submitStatus = 0;
      return;
    }
  }


  async onNext(formData: any){
    const doc = Object.assign({}, this.package, { 
      billingInformation: formData,
      summary: {
        members: 0,
        rooms: [],
        nrRooms: 0,
        subTotal: 0,
        tax: 0,
        discount: 0,
        total: 0,
        
      }
    });
    window.localStorage.setItem('preSaleDoc', JSON.stringify(doc));
    window.location.href = '/pre-sale/step3';
    //this.preSaleSrv.nextStep('step3');
  }

  async prueba(){
    let respuesta = await this.temporalTokenSrv.runByEmail(this.email);
    respuesta ? this.checkEmailStatus = 2 : this.checkEmailStatus = 4;
  }

  async onSetNroParticipants(nro: any) {
    console.log('onSetNroParticipants', nro);
    localStorage.setItem('usuario',JSON.stringify(nro) );
    this.package.nroGuests = nro;

    window.localStorage.setItem('preSaleDoc', JSON.stringify(this.package));
    this.preSaleSrv.nextStep('step2')
  }

}
