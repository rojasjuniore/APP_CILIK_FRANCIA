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
  public item: any;
  public form: FormGroup;
  public vm: any = {
    dates: [
      { type: 'required', message: 'Este campo es requerido' },
      { type: 'minlength', message: 'La cantidad mínima es 1' },
    ],
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
      dates: ['', [Validators.required, Validators.minLength(1)]],
    });
  }

  ngOnInit(): void { }

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
      // this.closeModal({status: true, data: this.item});
      console.log('formData', formData);
      return;

    } catch (err) {
      console.log('Error on ModalUpdateVoucherStatusFormComponent.onSubmit', err);
      return;
    }
  }

  async closeModal(params: ModalUpdateVoucherStatusEvent = {}){
    const {status = false, data = null} = params;

    this.onCloseModal.next({status, data});

    this.form.patchValue({ categoryTypes: '', quantity: 0});
    this.submitted = false;
    this.item = null;
    this.mi.hide();
  }

  ngOnDestroy(): void { this.sub$.unsubscribe(); }

}

export interface ModalUpdateVoucherStatusEvent {
  status?: boolean;
  data?: any;
}
