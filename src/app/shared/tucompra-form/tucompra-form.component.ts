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
  public vm = {};
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
        '',
        [
          Validators.required,
          Validators.minLength(6),
          Validators.pattern(/^[0-9]+$/)
        ]
      ],
      tipoDocumento: ['', [Validators.required]],
      nombreComprador: [
        '',
        [
          Validators.required,
          Validators.pattern(/^[a-zA-Z ]+$/)
        ]
      ],
      apellidoComprador: [
        '',
        [
          Validators.required,
          Validators.pattern(/^[a-zA-Z ]+$/)
        ]
      ],
      correoComprador: [
        '',
        [
          Validators.required,
          Validators.pattern(/^(([^<>()\[\]\\.,;:\s@"]+(\.[^<>()\[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/)
        ]
      ],
      celularComprador: [
        '',
        [
          Validators.required,
          Validators.pattern(/^[0-9]+$/),
          Validators.minLength(9),
          Validators.maxLength(10)
        ]
      ],
      direccionComprador: ['', [Validators.required]],
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
