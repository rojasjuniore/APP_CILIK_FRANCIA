import { Component, OnInit, Output } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { Subject, Subscription } from 'rxjs';
import { BsModalService } from 'src/app/services/bs-modal.service';

@Component({
  selector: 'app-modal-store-only-categories',
  templateUrl: './modal-store-only-categories.component.html',
  styleUrls: ['./modal-store-only-categories.component.css']
})
export class ModalStoreOnlyCategoriesComponent implements OnInit {

  @Output() onCloseModal = new Subject<ModalOnlyCategoriesEvent>();

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
      label: 'general.solo',
      value: 'solo',
      description: 'general.nroSoloists'
    },
    {
      label: 'general.couple',
      value: 'couple',
      description: 'general.nroCouples'
    },
    {
      label: 'general.group',
      value: 'group',
      description: 'general.nroGroupMembers'
    },
  ];

  private sub$!: Subscription;

  constructor(
    private bsModalSrv: BsModalService,
    private router: Router,
    private fb: FormBuilder,
  ) {
    this.form = this.fb.group({
      categoryTypes: ['', [Validators.required]],
      quantity: [0, [Validators.required, Validators.min(1)]],
    });
  }

  ngOnInit(): void {
    this.buildModal();
  }

  buildModal(){
    this.mi = this.bsModalSrv.buildModal("modalStoreOnlyCategories");

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

  get description() {
    return this.categoryTypes.find((item: any) => item.value === this.form.value.categoryTypes)?.description;
  }

  get totales() {
    if(!this.item) { return 0 ;}
    if(!this.f['categoryTypes'].value) { return 0; }

    const type = this.f['categoryTypes'].value;

    if(type === 'solo'){
      return Number(this.item.prices[type] * this.f['quantity'].value);
    }

    if(type === 'couple'){
      return Number(this.item.prices[type] * 2) * this.f['quantity'].value;
    }

    if(type === 'group'){
      return Number(this.item.prices[type] * this.f['quantity'].value);
    }

    return 0;
  }

  onSelectCategoryType(item: any){
    console.log('onSelectCategoryType', item);
    this.form.patchValue({categoryTypes: item.value});

    /** Si es grupo */
    if(item.value === 'group'){

      /** Añadir regla de minimo 3 */
      this.form.controls['quantity'].setValidators([Validators.required, Validators.min(3)]);

      /** Actualizar mensaje de validación */
      this.vm.quantity = this.vm.quantity.map((item: any) => {
        return (item.type === 'min') ? { type: 'min', message: 'formValidations.min3' } : item;
      });
    }

    this.step = 'quantity';
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
    this.step = 'category';

    /** Actualizar mensaje de validación */
    this.vm.quantity = this.vm.quantity.map((item: any) => {
      return (item.type === 'min') ? { type: 'min', message: 'formValidations.min1' } : item;
    });

    this.mi.hide();
  }

  ngOnDestroy(): void { this.sub$.unsubscribe(); }

}

export interface ModalOnlyCategoriesEvent {
  status?: boolean;
  form?: any;
  data?: any;
}
