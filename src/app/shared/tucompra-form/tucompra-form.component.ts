import { Component, Input, OnChanges, OnInit, Output, SimpleChanges } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Subject } from 'rxjs';

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

  constructor(
    private fb: FormBuilder,
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

      console.log('Try to submit form', formData);
      return;
      
    } catch (err) {
      console.log('Error on TuompraFormComponent.onSubmit', err);
      return;
    }
  }

  get f() { return this.form.controls; }

}
