import { Component, Input, OnInit, Output, SimpleChanges } from '@angular/core';
import { FormGroup, FormBuilder, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { Subject, Observable, of, Subscription } from 'rxjs';
import { BsModalService } from 'src/app/services/bs-modal.service';
import { SchoolService } from 'src/app/services/school.service';
import { UserService } from 'src/app/services/user/user.service';

@Component({
  selector: 'app-merchant-modal-edit-amount',
  templateUrl: './merchant-modal-edit-amount.component.html',
  styleUrls: ['./merchant-modal-edit-amount.component.css']
})
export class MerchantModalEditAmountComponent implements OnInit {

  @Output() onCloseModal = new Subject<any>();

  @Input() _id: string = 'modalAmountEditOwner';

  @Input() ownerType!: string;

  public mi: any;
  public form!: FormGroup;


  public results$: Observable<any[]> = of([]);

  private sub$!: Subscription;
  item: any;
  newTotal = 0;
  description = '';
  submitted!: boolean;

  constructor(
    private bsModalSrv: BsModalService,
    private router: Router,
    private fb: FormBuilder,
  ) {
    this.buildForm();
  }

  buildForm() {
    this.form = this.fb.group({
      newTotal: ['', [Validators.required, Validators.min(0), Validators.max(10000)]],
      description: ['', [Validators.required, Validators.minLength(10), Validators.maxLength(500)]],
    });
  }

  ngOnInit(): void { }

  ngOnChanges(changes: SimpleChanges): void {
    const { item } = changes;
    if (item && item.currentValue) {
      this.item = item.currentValue;
    }
  }


  ngAfterViewInit(): void {
    this.buildModal();
  }

  buildModal() {
    // console.log('buildModal', this._id);
    this.mi = this.bsModalSrv.buildModal(this._id);

    this.sub$ = this.router.events.subscribe((event) => {

      /** Si la modal esta desplegada al cambiar de ruta */
      if (this.mi._isShown) { this.closeModal(); }

    });
  }

  async showModal(item: any) {
    this.item = item;
    // console.log('showModal', this.item);
    this.form.patchValue({
      newTotal: this.item.totales,
      description: this.item.description || '',
    });
    this.mi.show();
  }

  onSubmit() {

    this.submitted = true;
    // console.log('this.form', this.form);
    if (!this.form.valid) {
      this.form.markAllAsTouched();
      return;
    }

    const { newTotal, description } = this.form.value;


    this.closeModal({
      status: true, data: {
        newTotal: newTotal,
        description: description,
      }
    });
  }

  onSelectItem(item: any) {
    // console.log('onSelectItem', item);
    // this.closeModal({ status: true, data: item });
  }


  async closeModal(params: any = {}) {
    const {
      status = false,
      data = null,
    } = params;

    this.onCloseModal.next({
      status,
      data,
    });

    this.form.patchValue({ value: '' });
    this.results$ = of([]);
    this.mi.hide();
  }

  ngOnDestroy(): void { this.sub$.unsubscribe(); }

}
