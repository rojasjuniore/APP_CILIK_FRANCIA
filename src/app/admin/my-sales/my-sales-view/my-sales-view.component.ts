import { Component, OnDestroy, OnInit, Output } from '@angular/core';
import { Router } from '@angular/router';
import { Subject, Subscription } from 'rxjs';
import { BsModalService } from 'src/app/services/bs-modal.service';
import { CommonService } from 'src/app/services/common.service';

@Component({
  selector: 'app-my-sales-view',
  templateUrl: './my-sales-view.component.html',
  styleUrls: ['./my-sales-view.component.css']
})
export class MySalesViewComponent implements OnInit, OnDestroy {
  mi: any;
  item: any;
  @Output() onCloseModal = new Subject<any>();
  private sub$!: Subscription;

  constructor(
    private commonSrv: CommonService,
    private router: Router,
    private bsModalSrv: BsModalService,) { }

  ngOnInit(): void {
    this.buildModal();
  }

  buildModal() {
    this.mi = this.bsModalSrv.buildModal("mySaleView");
    this.sub$ = this.router.events.subscribe((event) => {

      /** Si la modal esta desplegada al cambiar de ruta */
      if (this.mi._isShown) { this.closeModal(); }

    });
  }

  async showModal(item: any) {
    this.item = item;
    this.mi.show({ id: 1, class: 'modal-lg' });
  }


  async closeModal() {
    this.mi.hide();
  }

  /**
   * 
   * @param url 
   */
  goTolink(url) {
    this.commonSrv.goToLink(url);
  }

  ngOnDestroy(): void { this.sub$.unsubscribe(); }


}
