import { Component, OnInit, Output } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Subject } from 'rxjs';

@Component({
  selector: 'app-purchase-upload-voucher-form',
  templateUrl: './purchase-upload-voucher-form.component.html',
  styleUrls: ['./purchase-upload-voucher-form.component.css']
})
export class PurchaseUploadVoucherFormComponent implements OnInit {

  @Output() onCompleteForm = new Subject<any>();

  public form: FormGroup;
  public vm = {
    reference: [
      { type: 'required', message: 'La referencia es requerida' },
      { type: 'pattern', message: 'La referencia solo puede contener letras y números' },
    ],
    bankTransferFile: [
      { type: 'required', message: 'El comprobante de transferencia es requerido' },
    ],
  };
  public submitted = false;

  constructor(
    private fb: FormBuilder,
  ) {
    this.form = this.fb.group({
      reference: [
        '', 
        [
          Validators.required,
          // only letters and numbers
          Validators.pattern('^[a-zA-Z0-9]+$'),
        ]
      ],
      bankTransferFile: ['', Validators.required],
    });
  }

  ngOnInit(): void {
  }

  get f() { return this.form.controls; }

  async onSelectBankTransferFile(event: any) {
    console.log('event', event);
    const file = (event) ? event : '';
    this.form.patchValue({ bankTransferFile: file });
    this.onSubmit();
  }

  async onSubmit() {
    try {
      this.submitted = true;
      const formData = this.form.value;

      if(!this.form.valid){
        console.log('Invalid form');
        return;
      }

      const data = {
        reference: `${formData.reference}`.trim(),
        bankTransferFile: formData.bankTransferFile,
      }

      console.log('Try to submit', data);
      this.onCompleteForm.next(data);
      return;

    } catch (err) {
      console.log('Error on PurchaseUploadVoucherFormComponent.onSubmit', err);
      return;
    }
  }

}
