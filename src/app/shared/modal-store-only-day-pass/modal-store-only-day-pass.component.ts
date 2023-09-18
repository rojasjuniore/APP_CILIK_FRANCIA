import { AfterViewInit, Component, Input, OnInit, Output, ViewChild } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { Subject, Subscription } from 'rxjs';
import { BsModalService } from 'src/app/services/bs-modal.service';
import { InputSigleCalendarComponent } from '../input-sigle-calendar/input-sigle-calendar.component';

@Component({
  selector: 'app-modal-store-only-day-pass',
  templateUrl: './modal-store-only-day-pass.component.html',
  styleUrls: ['./modal-store-only-day-pass.component.css']
})
export class ModalStoreOnlyDayPassComponent implements OnInit, AfterViewInit {

  @ViewChild('inputDates') inputDates!: InputSigleCalendarComponent;

  @Output() onCloseModal = new Subject<ModalOnlyCategoriesEvent>();

  @Input() _id: string = 'modalStoreOnlyDayPass';

  public mi: any;
  public item: any;
  public form: FormGroup;
  public vm: any = {
    dates: [
      { type: 'required', message: 'Este campo es requerido' },
      { type: 'minlength', message: 'La cantidad mínima es 1' },
    ],
    quantity: [
      { type: 'required', message: 'Este campo es requerido' },
      { type: 'min', message: 'La cantidad mínima es 1' },
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
      dates: ['', [Validators.required, Validators.minLength(1)]],
      quantity: [0, [Validators.required, Validators.min(1)]],
    });
  }

  ngOnInit(): void {
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

  async showModal(item: any){
    this.item = item;
    this.mi.show();
  }

  get f() { return this.form.controls; }

  onInputDatesChange(value: string | string[]){
    this.form.patchValue({dates: value});
  }

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
        form: formData,
        data: this.item,
      });
      return;

    } catch (err) {
      console.log('Error on ModalOnlyInputNumberComponent.onSubmit', err);
      return;
    }
  }

  async closeModal(params: ModalOnlyCategoriesEvent = {}){
    const {
      status = false,
      form = null,
      data = null,
    } = params;

    this.onCloseModal.next({
      status,
      form,
      data,
    });

    this.form.patchValue({ categoryTypes: '', quantity: 0});
    this.submitted = false;
    this.item = null;
    this.mi.hide();
  }

  ngOnDestroy(): void { this.sub$.unsubscribe(); }

}

export interface ModalOnlyCategoriesEvent {
  status?: boolean;
  form?: any;
  data?: any;
}
