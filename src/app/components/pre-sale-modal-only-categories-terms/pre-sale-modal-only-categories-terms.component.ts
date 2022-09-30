import { Component, OnDestroy, OnInit, Output } from '@angular/core';
import { Router } from '@angular/router';
import { Subject, Subscription } from 'rxjs';
import { BsModalService } from 'src/app/services/bs-modal.service';

@Component({
  selector: 'app-pre-sale-modal-only-categories-terms',
  templateUrl: './pre-sale-modal-only-categories-terms.component.html',
  styleUrls: ['./pre-sale-modal-only-categories-terms.component.css']
})
export class PreSaleModalOnlyCategoriesTermsComponent implements OnInit, OnDestroy {

  @Output() onCloseModal = new Subject();

  public mi: any;

  private sub$!: Subscription;

  constructor(
    private bsModalSrv: BsModalService,
    private router: Router,
  ) { }

  ngOnInit(): void {
    this.buildModal();
  }

  buildModal(){
    this.mi = this.bsModalSrv.buildModal("modalTCcategoriasA");

    this.sub$ = this.router.events
    .subscribe((event) => {

      /** Si la modal esta desplegada al cambiar de ruta */
      if(this.mi._isShown){
        this.closeModal(false);
      }

    });
  }

  async showModal(){
    this.mi.show();
  }

  async closeModal(status: boolean){
    this.onCloseModal.next(status);
    this.mi.hide();
  }

  ngOnDestroy(): void {
    this.sub$.unsubscribe();
  }

}
