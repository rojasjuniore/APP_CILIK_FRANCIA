import { Component, OnInit } from '@angular/core';
import { BsModalService } from 'src/app/services/bs-modal.service';

@Component({
  selector: 'app-purchase-summary-modal-details',
  templateUrl: './purchase-summary-modal-details.component.html',
  styleUrls: ['./purchase-summary-modal-details.component.css']
})
export class PurchaseSummaryModalDetailsComponent implements OnInit {

  public mi: any;
  public order: any;

  constructor(
    private bsModalSrv: BsModalService,
  ) { }

  ngOnInit(): void {
    this.buildModal();
  }

  async buildModal() {
    this.mi = this.bsModalSrv.buildModal('modalMyPurhcaseDetail');
  }

  async showModal(order: any) {
    this.order = order;
    this.mi.show();
  }

  closeModal(){
    this.mi.hide();
  }

}
