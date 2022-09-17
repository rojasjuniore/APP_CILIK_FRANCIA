import { Component, OnInit, Output } from '@angular/core';
import { Subject } from 'rxjs';
import { BsModalService } from 'src/app/services/bs-modal.service';

@Component({
  selector: 'app-pre-sale-modal-only-categories-terms',
  templateUrl: './pre-sale-modal-only-categories-terms.component.html',
  styleUrls: ['./pre-sale-modal-only-categories-terms.component.css']
})
export class PreSaleModalOnlyCategoriesTermsComponent implements OnInit {

  @Output() onCloseModal = new Subject();

  public mi: any;

  constructor(
    private bsModalSrv: BsModalService,
  ) { }

  ngOnInit(): void {
    this.buildModal();
  }

  buildModal(){
    this.mi = this.bsModalSrv.buildModal("staticBackdrop");
  }

  async showModal(){
    this.mi.show();
  }

  async closeModal(status: boolean){
    this.onCloseModal.next(status);
    this.mi.hide();
  }

}
