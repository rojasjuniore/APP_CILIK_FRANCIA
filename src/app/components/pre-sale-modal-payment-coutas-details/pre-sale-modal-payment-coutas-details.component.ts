import { Component, OnDestroy, OnInit, Output } from '@angular/core';
import { Router } from '@angular/router';
import { Subject, Subscription } from 'rxjs';
import { BsModalService } from 'src/app/services/bs-modal.service';

@Component({
  selector: 'app-pre-sale-modal-payment-coutas-details',
  templateUrl: './pre-sale-modal-payment-coutas-details.component.html',
  styleUrls: ['./pre-sale-modal-payment-coutas-details.component.css']
})
export class PreSaleModalPaymentCoutasDetailsComponent implements OnInit, OnDestroy {

  @Output() onUpdateInstallments = new Subject();

  public mi: any;
  private sub$!: Subscription;

  constructor(
    private bsModalSrv: BsModalService,
    private router: Router,
  ) { }

  ngOnInit(): void {
    this.buildModal();

    this.sub$ = this.router.events
    .subscribe((event) => {

      /** Si la modal esta desplegada al cambiar de ruta */
      if(this.mi._isShown){
        this.closeModal(false);
      }

    });
  }

  buildModal(){
    this.mi = this.bsModalSrv.buildModal("modalCuotasPaymentDetails");
  }

  async showModal(){
    this.mi.show();
  }

  async closeModal(status: boolean){
    this.onUpdateInstallments.next(status);
    this.mi.hide();
  }

  ngOnDestroy(): void {
    this.sub$.unsubscribe();
  }

}
