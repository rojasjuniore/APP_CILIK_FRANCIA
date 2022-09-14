import { Component, OnInit, Output } from '@angular/core';
import { Subject } from 'rxjs';
import { BsModalService } from 'src/app/services/bs-modal.service';

@Component({
  selector: 'app-pre-sale-modal-payment-coutas-details',
  templateUrl: './pre-sale-modal-payment-coutas-details.component.html',
  styleUrls: ['./pre-sale-modal-payment-coutas-details.component.css']
})
export class PreSaleModalPaymentCoutasDetailsComponent implements OnInit {

  @Output() onUpdateInstallments = new Subject();

  public mi: any;

  constructor(
    private bsModalSrv: BsModalService,
  ) { }

  ngOnInit(): void {
    this.buildModal();
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

}
