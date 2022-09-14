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

  get rooms(){
    const rooms = this.order?.rooms || [];
    return rooms.map((room: any, index: number) => Object.assign({}, room, { index: index + 1 }));
  }

  async showModal(order: any) {
    this.order = order;
    this.mi.show();
  }

  async share(){
    console.log('share');
  }

  async download(){
    console.log('download');
  }

  closeModal(){
    this.mi.hide();
  }

}
