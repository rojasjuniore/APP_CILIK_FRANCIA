import { AfterViewInit, Component, Input, OnChanges, OnInit, Output, SimpleChanges } from '@angular/core';
import { FormBuilder } from '@angular/forms';
import { Router } from '@angular/router';
import { Subject, Subscription } from 'rxjs';
import { BsModalService } from 'src/app/services/bs-modal.service';

@Component({
  selector: 'app-modal-coupon-find-owner',
  templateUrl: './modal-coupon-find-owner.component.html',
  styleUrls: ['./modal-coupon-find-owner.component.css']
})
export class ModalCouponFindOwnerComponent implements OnInit, OnChanges, AfterViewInit {

  @Output() onCloseModal = new Subject<any>();

  @Input() _id: string = 'modalCouponFindOwner';

  @Input() ownerType!: string;

  public mi: any;

  private sub$!: Subscription;

  constructor(
    private bsModalSrv: BsModalService,
    private router: Router,
    private fb: FormBuilder,
  ) { }

  ngOnInit(): void {
  }

  ngOnChanges(changes: SimpleChanges): void {
    const { ownerType } = changes;

    if(ownerType && ownerType.currentValue){
      this.ownerType = ownerType.currentValue;
    }
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
    // this.item = item;
    this.mi.show();
  }

  async closeModal(params: any = {}){
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

    // this.form.patchValue({ categoryTypes: '', quantity: 0});
    // this.submitted = false;
    // this.item = null;
    this.mi.hide();
  }

  ngOnDestroy(): void { this.sub$.unsubscribe(); }

}
