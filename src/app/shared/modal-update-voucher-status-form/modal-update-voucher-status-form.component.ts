import { Component, Input, OnInit, Output } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { Subject, Subscription } from 'rxjs';
import { BsModalService } from 'src/app/services/bs-modal.service';

@Component({
  selector: 'app-modal-update-voucher-status-form',
  templateUrl: './modal-update-voucher-status-form.component.html',
  styleUrls: ['./modal-update-voucher-status-form.component.css']
})
export class ModalUpdateVoucherStatusFormComponent implements OnInit {

  @Output() onCloseModal = new Subject<ModalUpdateVoucherStatusEvent>();

  @Input() _id: string = 'modalVoucherStatusForm';

  public mi: any;
  public form: FormGroup;
  public vm: any = {
    status: [
      { type: 'required', message: 'Este campo es requerido' },
    ],
    observation: [
      { type: 'required', message: 'Este campo es requerido' },
    ]
  };
  public submitted = false;

  public roomList: any[] = [];

  private sub$!: Subscription;

  constructor(
    private bsModalSrv: BsModalService,
    private router: Router,
    private fb: FormBuilder,
  ) {
    this.form = this.fb.group({
      status: ['', [Validators.required,]],
      observation: [''],
    });
  }

  ngOnInit(): void {
    this.form.get('status')?.valueChanges.subscribe((value) => {
      switch (value) {
        case "pending":
          this.form.get('observation')?.setValidators([Validators.required]);
          this.form.get('observation')?.updateValueAndValidity();
          break;
        case "rejected":
          this.form.get('observation')?.setValidators([Validators.required]);
          this.form.get('observation')?.updateValueAndValidity();
          break;
      
        default:
          this.form.get('observation')?.clearValidators();
          this.form.get('observation')?.updateValueAndValidity();
          break;
      }
    });
  }

  ngAfterViewInit(): void {
    this.buildModal();
  }

  buildModal(){
    this.mi = this.bsModalSrv.buildModal(this._id);

    this.sub$ = this.router.events.subscribe((event) => {

      /** Si la modal esta desplegada al cambiar de ruta */
      if(this.mi._isShown){ this.closeModal(); }

    });
  }

  get f() { return this.form.controls; }

  public async showModal(){
    // console.log('item', item);
    // this.item = item;
    this.mi.show();
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
      this.closeModal({status: true, data: formData});
      return;

    } catch (err) {
      console.log('Error on ModalUpdateVoucherStatusFormComponent.onSubmit', err);
      return;
    }
  }

  async closeModal(params: ModalUpdateVoucherStatusEvent = {}){
    const {status = false, data = null} = params;

    this.onCloseModal.next({status, data});

    this.form.patchValue({ status: '', observation: ''});
    this.submitted = false;
    this.mi.hide();
  }

  ngOnDestroy(): void {
    this.sub$.unsubscribe();
  }

}

export interface ModalUpdateVoucherStatusEvent {
  status?: boolean;
  data?: any;
}
