import { Component, Input, OnChanges, OnInit, Output, SimpleChanges } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Subject } from 'rxjs';
import { AuthenticationService } from 'src/app/services/authentication.service';
import { CartService } from 'src/app/services/cart.service';
import { TucompraService } from 'src/app/services/tucompra/tucompra.service';
import { environment } from 'src/environments/environment';

@Component({
  selector: 'app-tucompra-form',
  templateUrl: './tucompra-form.component.html',
  styleUrls: ['./tucompra-form.component.css']
})
export class TucompraFormComponent implements OnInit, OnChanges {

  @Input() amount: number = 0;

  @Output() onSendForm = new Subject<any>();

  public form!: FormGroup;
  public vm: any = {
    documentoComprador: [
      { type: 'required', message: 'formValidations.required' },
      { type: 'minlength', message: 'formValidations.minlength6' },
      { type: 'pattern', message: 'formValidations.onlyNumbers' },
    ],
    tipoDocumento: [
      { type: 'required', message: 'formValidations.required' },
    ],
    nombreComprador: [
      { type: 'required', message: 'formValidations.required' },
      { type: 'pattern', message: 'formValidations.onlyCharacters' }
    ],
    apellidoComprador: [
      { type: 'required', message: 'formValidations.required' },
      { type: 'pattern', message: 'formValidations.onlyCharacters' }
    ],
    correoComprador: [
      { type: 'required', message: 'formValidations.required' },
      { type: 'pattern', message: 'formValidations.email' },
    ],
    celularComprador: [
      { type: 'required', message: 'formValidations.required' },
      { type: 'pattern', message: 'formValidations.onlyNumbers' },
      { type: 'minlength', message: 'formValidations.minlength9' },
      { type: 'maxlength', message: 'formValidations.maxlength10' },
    ],
    direccionComprador: [
      { type: 'required', message: 'formValidations.required' },
    ],
  };
  public submitted = false;
  public showLoader = false;

  constructor(
    private fb: FormBuilder,
    private authSrv: AuthenticationService,
    private cartSrv: CartService,
    private tuCompraSrv: TucompraService
  ) {
    this.buildForm();
  }

  ngOnInit(): void {
  }

  ngOnChanges(changes: SimpleChanges): void {
    const { amount } = changes;

    if (amount && amount.currentValue) {
      this.amount = amount.currentValue;
    }
  }

  buildForm() {
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

  async onSubmit(){
    try {
      this.submitted = true;
      const formData = this.form.value;

      if (!this.form.valid) {
        return;
      }

      this.showLoader = true;
      this.form.disable();

      const uid = await this.authSrv.getUIDPromise();
      const orderId = this.cartSrv.generateId();

      const extraField = {
        type: 'presale',
        uid: uid,
        keyDB: environment.dataEvent.keyDb,
        orderId: orderId,
        paymentMethod: 'TUCOMPRA'
      };

      const data = this.tuCompraSrv.buildDocument({
        ...formData,
        valor: this.amount,
        // campoExtra1: JSON.stringify(extraField),
        campoExtra1: extraField,
        campoExtra2: [environment.dataEvent.appURL, '/pages/purchases/', orderId, '/details'], 
        telefonoComprador: formData.celularComprador,
        paisComprador: 'COLOMBIA',
        ciudadComprador: 'Cartagena'
      });
      // console.log('data', data);

      /** Capturar solo campos con valores*/
      const newFormData = Object.entries(data)
        .filter(([_, v]) => v !== null)
        .reduce((acc, [k, v]) => ({ ...acc, [k]: v }), {});

      // console.log('Try to submit form', newFormData);
      this.onSendForm.next(newFormData);
      return;
      
    } catch (err) {
      console.log('Error on TuompraFormComponent.onSubmit', err);
      return;
    }
  }

  get f() { return this.form.controls; }

}
