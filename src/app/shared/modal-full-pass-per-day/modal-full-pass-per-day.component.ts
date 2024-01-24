import { Component, OnInit, Output } from '@angular/core';
import { FormGroup, FormBuilder, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { Subject, Subscription } from 'rxjs';
import { ModalOnlyCategoriesEvent } from '../modal-store-only-categories/modal-store-only-categories.component';
import { BsModalService } from 'src/app/services/bs-modal.service';
import { PassesService } from 'src/app/services/dedicates/passes.service';

@Component({
  selector: 'app-modal-full-pass-per-day',
  templateUrl: './modal-full-pass-per-day.component.html',
  styleUrls: ['./modal-full-pass-per-day.component.css']
})
export class ModalFullPassPerDayComponent implements OnInit {

  @Output() onCloseModal = new Subject<any>();

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
  public step = 'category'; // category, quantity
  public categoryTypes: any[] = [
    {
      label: 'Wednesday Pass',
      value: 'wednesdayPass',
      description: 'general.WednesdayPass'
    },
    {
      label: 'Thursday Pass',
      value: 'thursdayPass',
      description: 'general.thursdayPass'
    },
    {
      label: 'Friday Pass',
      value: 'fridayPass',
      description: 'general.fridayPass'
    },
    {
      label: 'Saturday Pass',
      value: 'saturdayPass',
      description: 'general.saturdayPass'
    },
    {
      label: 'Sunday Pass',
      value: 'sundayPass',
      description: 'general.sundayPass'
    },
  ];

  private sub$!: Subscription;

  constructor(
    private bsModalSrv: BsModalService,
    private router: Router,
    private fb: FormBuilder,
    private passesSvc: PassesService
  ) {
    this.form = this.fb.group({
      categoryTypes: ['', [Validators.required]],
      quantity: [0, [Validators.required, Validators.min(1)]],
    });
  }

  ngOnInit(): void {
    console.log('ModalFullPassPerDayComponent.ngOnInit', this.item);
    console.log('ModalFullPassPerDayComponent.ngOnInit', this.form.value);
    this.buildModal();
  }

  buildModal() {
    this.mi = this.bsModalSrv.buildModal("modalFullPassPerDay");

    this.sub$ = this.router.events.subscribe((event) => {

      /** Si la modal esta desplegada al cambiar de ruta */
      if (this.mi._isShown) { this.closeModal(); }

    });
  }

  async showModal(item: any) {
    this.item = item;
    console.log('showModal', item);
    this.mi.show();
  }

  get f() { return this.form.controls; }


  get description() {
    // console.log('get description', this.form.value.categoryTypes);
    return this.categoryTypes.find((item: any) => item.value === this.form.value.categoryTypes)?.description;
  }

  get price() {
    if (!this.item) { return 0; }
    if (!this.f['categoryTypes'].value) { return 0; }

    const type = this.f['categoryTypes'].value;

    // if (type === 'wednesdayPass') {
    //   console.log(this.item, 'pruba1')
    //   return Number(this.item.prices[type]);

    // }

    // if (type === 'couples') {
    //   return Number(this.item.prices[type] * 2);
    // }

    // if (type === 'groups') {
    //   return Number(this.item.prices[type]);
    // }
    // console.log(this.passesSvc.passPrice['full-pass-per-day'][1]?.[type], 'pruba2')
    const value= this.passesSvc.passPrice['full-pass-per-day'][1]?.[type];
    return Number(this.item.prices = value);

  }

  get totales() {
    if (!this.item) { return 0; }
    if (!this.f['categoryTypes'].value) { return 0; }

    const type = this.f['categoryTypes'].value;

    // if (type === 'soloist') {
    //   return Number(this.item.prices[type] * this.f['quantity'].value);
    // }

    // if (type === 'couples') {
    //   return Number(this.item.prices[type] * 2) * this.f['quantity'].value;
    // }

    // if (type === 'groups') {
    //   return Number(this.item.prices[type] * this.f['quantity'].value);
    // }

    return Number(this.item.prices * this.f['quantity'].value);
    return 0;
  }

  onSelectCategoryType(item: any) {
    // console.log('onSelectCategoryType', item);
    this.form.patchValue({ categoryTypes: item.value });

    // /** Si es grupo */
    //   if (item.value === 'groups') {

    //   /** Añadir regla de minimo 3 */
    //   this.form.controls['quantity'].setValidators([Validators.required, Validators.min(3)]);

    //   /** Actualizar mensaje de validación */
    //   this.vm.quantity = this.vm.quantity.map((item: any) => {
    //     return (item.type === 'min') ? { type: 'min', message: 'formValidations.min3' } : item;
    //   });
    // }

    this.step = 'quantity';
  }

  onInputValueChange(value: number) {
    console.log(value)
    this.form.patchValue({ quantity: value });
  }

  async onSubmit() {
    try {
      this.submitted = true;
      const formData = this.form.value;

      if (!this.form.valid) {
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

  async closeModal(params: ModalOnlyCategoriesEvent = {}) {
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

    this.form.patchValue({ categoryTypes: '', quantity: 0 });
    this.submitted = false;
    this.item = null;
    this.step = 'category';

    /** Actualizar mensaje de validación */
    this.vm.quantity = this.vm.quantity.map((item: any) => {
      return (item.type === 'min') ? { type: 'min', message: 'formValidations.min1' } : item;
    });

    this.mi.hide();
  }

  ngOnDestroy(): void { this.sub$.unsubscribe(); }
}
