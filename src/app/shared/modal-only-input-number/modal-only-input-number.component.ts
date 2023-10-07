import { Component, OnInit, Output } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { Subject, Subscription } from 'rxjs';
import { BsModalService } from 'src/app/services/bs-modal.service';

@Component({
  selector: 'app-modal-only-input-number',
  templateUrl: './modal-only-input-number.component.html',
  styleUrls: ['./modal-only-input-number.component.css']
})
export class ModalOnlyInputNumberComponent implements OnInit {

  @Output() onCloseModal = new Subject<ModalOnlyInputNumberEvent>();

  public mi: any;
  public item: any;
  public form: FormGroup;
  public vm: any = {
    quantity: [
      { type: 'required', message: 'formValidations.required' },
      { type: 'min', message: 'formValidations.min1' },
    ]
  };
  public submitted = false;

  private sub$!: Subscription;

  constructor(
    private bsModalSrv: BsModalService,
    private router: Router,
    private fb: FormBuilder,
  ) {
    this.form = this.fb.group({
      quantity: [0, [Validators.required, Validators.min(1)]],
    });
  }

  ngOnInit(): void {
    this.buildModal();
  }

  buildModal(){
    this.mi = this.bsModalSrv.buildModal("modalOnlyInputNumber");

    this.sub$ = this.router.events.subscribe((event) => {

      /** Si la modal esta desplegada al cambiar de ruta */
      if(this.mi._isShown){ this.closeModal(); }

    });
  }

  async showModal(item: any){
    this.item = item;
    this.mi.show();
  }

  get f() { return this.form.controls; }

  onInputValueChange(value: number){
    this.form.patchValue({quantity: value});
  }

  async onSubmit(){
    try {
      this.submitted = true;
      const formData = this.form.value;

      if(!this.form.valid){
        console.log('Formulario inválido');
        return;
      }
      
      /** Responde a elemento padre */
      this.closeModal({
        status: true,
        quantity: formData.quantity,
        data: this.item,
      });
      return;

    } catch (err) {
      console.log('Error on ModalOnlyInputNumberComponent.onSubmit', err);
      return;
    }
  }

  async closeModal(params: ModalOnlyInputNumberEvent = {}){
    const {
      status = false,
      quantity = 0,
      data = null,
    } = params;

    this.onCloseModal.next({
      status,
      quantity,
      data,
    });

    this.form.patchValue({quantity: 0});
    this.submitted = false;
    this.item = null;
    this.mi.hide();
  }

  ngOnDestroy(): void { this.sub$.unsubscribe(); }

}

export interface ModalOnlyInputNumberEvent {
  status?: boolean;
  quantity?: number;
  data?: any;
}
