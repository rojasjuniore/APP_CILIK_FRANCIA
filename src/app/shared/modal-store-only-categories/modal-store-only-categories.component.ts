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
      { type: 'required', message: 'Este campo es requerido' },
      { type: 'min', message: 'La cantidad mínima es 1' },
    ]
  };
  public submitted = false;


  public step = 'category'; // category, quantity
  public categoryTypes: any[] = [
    {
      label: 'Solista',
      value: 'solo',
      description: 'Cantidad de solistas'
    },
    {
      label: 'Pareja',
      value: 'couple',
      description: 'Cantidad de parejas'
    },
    {
      label: 'Grupo',
      value: 'group',
      description: 'Nro. participantes'
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

  onSelectCategoryType(item: any){
    this.form.patchValue({categoryTypes: item.value});
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
    this.mi.hide();
  }

  ngOnDestroy(): void { this.sub$.unsubscribe(); }

}

export interface ModalOnlyCategoriesEvent {
  status?: boolean;
  form?: any;
  data?: any;
}
