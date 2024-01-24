import { AfterViewInit, Component, Input, OnInit, Output, ViewChild } from '@angular/core';
import { Subject, Subscription } from 'rxjs';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { BsModalService } from 'src/app/services/bs-modal.service';
import { Router } from '@angular/router';
import { HotelService } from 'src/app/services/dedicates/hotel.service';
import { InputGroupNumberFormComponent } from '../input-group-number-form/input-group-number-form.component';

@Component({
  selector: 'app-modal-hotel-event-rooms-list',
  templateUrl: './modal-hotel-event-rooms-list.component.html',
  styleUrls: ['./modal-hotel-event-rooms-list.component.css']
})
export class ModalHotelEventRoomsListComponent implements OnInit, AfterViewInit {

  @ViewChild('inputNumber') inputGroupNumber!: InputGroupNumberFormComponent;

  @Output() onCloseModal = new Subject<ModalOnlyCategoriesEvent>();

  @Input() _id: string = 'modalHotelEventRoomsList';

  public mi: any;
  public item: any;
  public form: FormGroup;
  public vm: any = {
    dates: [
      { type: 'required', message: 'formValidations.required' },
      { type: 'minlength', message: 'formValidations.minlength2Dates' },
    ],
    capacity: [
      { type: 'required', message: 'formValidations.required' },
      { type: 'min', message: 'formValidations.min1' },
    ],
  };
  public submitted = false;

  public roomList: any[] = [];

  private sub$!: Subscription;

  private slug = '';

  constructor(
    private bsModalSrv: BsModalService,
    private router: Router,
    private fb: FormBuilder,
    private hotelSrv: HotelService,
  ) {
    this.form = this.fb.group({
      dates: ['', [Validators.required, Validators.minLength(2)]],
      capacity: [1, [Validators.required, Validators.min(1)]],
    });
  }

  ngOnInit(): void {
    console.log('ModalHotelEventRoomsListComponent.ngOnInit', this.slug);
  }

  ngAfterViewInit(): void {
    this.buildModal();
  }

  buildModal() {
    this.mi = this.bsModalSrv.buildModal(this._id);

    this.sub$ = this.router.events.subscribe((event) => {

      /** Si la modal esta desplegada al cambiar de ruta */
      if (this.mi._isShown) { this.closeModal(); }

    });
  }



  searchRooms() {
    // console.log('searchRooms', this.form.value);
    this.submitted = true;
    const formData = this.form.value;

    if (!this.form.valid) {
      this.form.markAllAsTouched();
      return;
    }

    this.roomList = this.hotelSrv
      .getRoomsByDate(this.item.currentDate)
      .filter((item: any) => {
        console.log('slug', this.item.slug);
        console.log('item', item);
        if (this.item.slug === 'hotel-event') {
          return item.code !== 'HAB5' && item.code !== 'HAB6';
        } else if (this.item.slug === 'hotel-without-event') {
          return item.code === 'HAB5' || item.code === 'HAB6';
        } else {
          return true; // Enviar todos los otros casos
        }
      })
      .filter((item: any) => item.capacity == formData.capacity)
      /** Obtener precio de las fechas seleccionadas */
      .map((item: any) => {

        /** Obtener precio por cada día */
        const dates = formData.dates.map((date: string) => this.hotelSrv.getRoomPriceByDate(item.subcode, date, this.item.slug));

        /** Setear CERO 0 a la ultima fecha - Reglas del negocio */
        dates[dates.length - 1].price = 0;

        return {
          ...item,
          dates: dates
        }
      })
      /** Calcular total de la habitación */
      .map((item: any) => ({
        ...item,
        totales: item.dates.map((date: any) => date.price || 0).reduce((a: any, b: any) => a + b),
      }))
      /** Ordenar de menor a mayor precio */
      .sort((a: any, b: any) => a.totales - b.totales);
  }

  async showModal(item: any) {
    console.log('item', item);
    this.item = item;
    this.mi.show();
  }

  get f() { return this.form.controls; }

  onInputDatesChange(value: string | string[]) {
    console.log('onInputDatesChange', value);
    this.form.patchValue({ dates: value });
    this.roomList = [];
  }

  onInputNumberChange(value: number) {
    // console.log('onInputNumberChange', value);
    this.form.patchValue({ capacity: value });
  }

  onSelectRoom(item: any) {
    /** Responde a elemento padre */
    this.closeModal({ status: true, data: item });
  }


  /**
   * TODO: revisar antes de eliminar
   * @param value 
   */
  onInputValueChange(value: number) {
    this.form.patchValue({ quantity: value });
  }

  /** TODO: - revisar antes de eliminar */
  async onSubmit() {
    try {
      this.submitted = true;
      const formData = this.form.value;

      if (!this.form.valid) {
        console.log('Formulario inválido');
        return;
      }

      /** Responde a elemento padre */
      this.closeModal({ status: true, data: this.item });
      return;

    } catch (err) {
      console.log('Error on ModalOnlyInputNumberComponent.onSubmit', err);
      return;
    }
  }

  async closeModal(params: ModalOnlyCategoriesEvent = {}) {
    const { status = false, data = null } = params;

    this.onCloseModal.next({ status, data });

    this.form.patchValue({ dates: '', capacity: 1 });
    this.submitted = false;
    this.item = null;
    this.mi.hide();
    this.roomList = [];
    this.form.updateValueAndValidity();
    this.inputGroupNumber.quantity = 1;
  }

  ngOnDestroy(): void { this.sub$.unsubscribe(); }

}

export interface ModalOnlyCategoriesEvent {
  status?: boolean;
  data?: any;
}
