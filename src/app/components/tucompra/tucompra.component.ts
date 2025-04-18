import { Component, Input, OnChanges, OnInit, SimpleChanges, ViewChild } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { NgxSpinnerService } from 'ngx-spinner';
import { purchaseTotales } from 'src/app/helpers/purchase-totales.helper';
import { AuthenticationService } from 'src/app/services/authentication.service';
import { PreSaleService } from 'src/app/services/pre-sale.service';
import { PurchaseService } from 'src/app/services/purchase.service';
import { TucompraService } from 'src/app/services/tucompra/tucompra.service';
import { environment } from 'src/environments/environment';

@Component({
  selector: 'app-tucompra',
  templateUrl: './tucompra.component.html',
  styleUrls: ['./tucompra.component.css']
})
export class TucompraComponent implements OnInit, OnChanges {

  @Input() payConfig!: any;
  @ViewChild('userForm') userForm!: any;

  public form!: FormGroup;
  public vm: any = {
    documentoComprador: [
      { type: 'required', message: 'Documento es requerido' },
      { type: 'minlength', message: 'Documento debe tener mínimo 6 caracteres' },
      { type: 'pattern', message: 'Documento debe ser numérico' },
    ],
    tipoDocumento: [
      { type: 'required', message: 'Tipo de documento es requerido' },
    ],
    nombreComprador: [
      { type: 'required', message: 'Nombre es requerido' },
      { type: 'pattern', message: 'Nombre debe ser alfabético'}
    ],
    apellidoComprador: [
      { type: 'required', message: 'Apellido es requerido' },
      { type: 'pattern', message: 'Nombre debe ser alfabético'}
    ],
    correoComprador: [
      { type: 'required', message: 'Correo es requerido' },
      { type: 'pattern', message: 'Correo debe ser válido' },
    ],
    celularComprador: [
      { type: 'required', message: 'Celular es requerido' },
      { type: 'pattern', message: 'Celular debe ser numérico' },
      { type: 'minlength', message: 'Celular debe tener mínimo 9 caracteres' },
      { type: 'maxlength', message: 'Celular debe tener máximo 10 caracteres' },
    ],
    direccionComprador: [
      { type: 'required', message: 'Dirección es requerido' },
    ],
  };
  public submitted = false;

  tuCompraObject: any
  preSaleDocument: any

  constructor(
    private fb: FormBuilder,
    private preSaleSrv: PreSaleService,
    private authSrv: AuthenticationService,
    private tuCompraSrv: TucompraService,
    private spinner: NgxSpinnerService,
  ) {

    this.form = this.fb.group({
      documentoComprador: [
        '123456',
        [
          Validators.required,
          Validators.minLength(6),
          Validators.pattern(/^[0-9]+$/)
        ]
      ],
      tipoDocumento: ['PAS', [Validators.required]],
      nombreComprador: [
        'Pedro', 
        [
          Validators.required,
          Validators.pattern(/^[a-zA-Z ]+$/)
        ]
      ],
      apellidoComprador: [
        'Lars',
        [
          Validators.required,
          Validators.pattern(/^[a-zA-Z ]+$/)
        ]
      ],
      correoComprador: [
        'plars@gmail.com', 
        [
          Validators.required,
          Validators.pattern(/^(([^<>()\[\]\\.,;:\s@"]+(\.[^<>()\[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/)
        ]
      ],
      celularComprador: [
        '1234567890', 
        [
          Validators.required,
          Validators.pattern(/^[0-9]+$/),
          Validators.minLength(9),
          Validators.maxLength(10)
        ]
      ],
      direccionComprador: ['lorem', [Validators.required]],
    });
  }

  ngOnInit() {
    // this.preSaleDocument = this.preSaleSrv.checkAndLoadDocumentLocalStorage();

    // const profile: any = await this.getProfile();
    // console.log('profile', profile);
    // console.log('this.preSaleDocument', this.preSaleDocument);

    // this.tuCompraObject = {
    //   url: environment.tuCompra.url,
    //   usuario: environment.tuCompra.Idsistema,
    //   factura: Date.now(),
    //   valor: this.total,
    //   descripcionFactura: "Compra de boletas para el evento",
    //   documentoComprador: profile.identificationNumber || profile.identification,
    //   tipoDocumento: "PAS",
    //   nombreComprador: profile.name,
    //   apellidoComprador: profile.surnames,
    //   correoComprador: profile.email,
    //   telefonoComprador: `${profile.prefijo}${profile.phone}`,
    //   ciudadComprador: profile.city || "Cartagena",
    //   paisComprador: profile.country || "COLOMBIA",
    //   celularComprador: `${profile.prefijo}${profile.phone}`,
    //   direccionComprador: profile.address || "colombia",
    //   tipoMoneda: "USD",
    //   lenguaje: "ES",
    //   campoExtra1: "Campo extra 1",
    //   campoExtra2: "Campo extra 2",
    //   campoExtra3: "Campo extra 3",

    // }

    // console.log('this.tuCompraObject', this.tuCompraObject);

  }

  ngOnChanges(changes: SimpleChanges): void {
    const { payConfig } = changes;
    if (payConfig && payConfig.currentValue) { this.tuCompraObject = payConfig.currentValue; }
  }

  get f() { return this.form.controls; }

  /**
   * @dev Pay with TuCompra
   */
  payWithTuCompra() {
    console.log('payWithTuCompra');


    /** ajecutar el webchecout */
    document.forms["tuCompraPresale"].submit();

  }



  get total() {
    return purchaseTotales(this.preSaleDocument).total;
  }


  getProfile() {
    const uid = this.authSrv.getLocalUID()
    return this.authSrv.getProfile(uid)
  }


  async onSubmit(){
    try {
      this.form.updateValueAndValidity();
      this.submitted = true;
      const formData= this.form.value;
      console.log('formData', formData);
      

      if(this.form.invalid){
        return;
      }

      await this.spinner.show();

      const newFormData = Object.entries({...this.payConfig, ...formData})
      // remove null values
      .filter(([_, v]) => v !== null)
      // convert to json
      .reduce((acc, [k, v]) => ({ ...acc, [k]: v }), {});
      // console.log('newFormData', newFormData);

      /** Construir inputs */
      const tuCompraInputs = Object.entries(newFormData).map(([k, v]) => this.tuCompraSrv.createHTMLInputTag(k, v));
      console.log('tuCompraInputs', tuCompraInputs); 

      const tuCompraForm = document.createElement('form');
      tuCompraForm.action = environment.tuCompra.url; 
      tuCompraForm.method = 'POST';
      tuCompraForm.id= 'tuCompraPresale';

      /** Agregar inputs al formulario */
      for (const input of tuCompraInputs) {
        tuCompraForm.appendChild(input);
      }

      /** Agregar formulario al DOM */
      document.body.appendChild(tuCompraForm);


      /** Obtener documento de orden de compra desde el localStorage */
      const order = this.preSaleSrv.getDocumentLocalStorage();

      /** Finalizar documento de orden de compra */
      await this.preSaleSrv.completePreSaleOrder(
        {...this.payConfig, ...formData},
        {
          completed: false,
          payed: false,
          status: 'pending',
        }
      );

      /** Realizar Submit */
      tuCompraForm.submit();
      console.log('Trying to create preSale');
      return;

    } catch (err) {
      console.log('Error on TucompraComponent.onSubmit', err);
      return;
    } finally {
      // await this.spinner.hide();
    }
  }


}
