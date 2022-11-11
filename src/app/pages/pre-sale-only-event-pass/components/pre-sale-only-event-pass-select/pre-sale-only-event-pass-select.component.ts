import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { TranslatePipe } from '@ngx-translate/core';
import { PreSaleService } from 'src/app/services/pre-sale.service';
import { Sweetalert2Service } from 'src/app/services/sweetalert2.service';

@Component({
  selector: 'app-pre-sale-only-event-pass-select',
  templateUrl: './pre-sale-only-event-pass-select.component.html',
  styleUrls: ['./pre-sale-only-event-pass-select.component.css']
})
export class PreSaleOnlyEventPassSelectComponent implements OnInit {

  public nroParticipants = 0;

  constructor(
    public preSaleSrv: PreSaleService,
    private router: Router,
    private sweetAlert2Srv: Sweetalert2Service,
    private translatePipe: TranslatePipe,
  ) {
    const { eventPasses } = this.preSaleSrv.checkAndLoadDocumentLocalStorage();
    this.nroParticipants = (eventPasses) ? eventPasses[0].quantity : 0;
  }

  ngOnInit(): void {
  }

  onUpdateQuantity(params: any) {
    if(params.quantity > 0){
      const eventPasses = Object.assign({}, this.preSaleSrv.EVENTPASS_DEFAULT, {quantity: params.quantity});
      this.preSaleSrv.updateDocumentLocalStorage({nroParticipants: params.quantity, eventPasses: [eventPasses]});
    }else{
      this.preSaleSrv.updateDocumentLocalStorage({nroParticipants: params.quantity, eventPasses: []});
    }
  }

  async onNext(){

    if(this.nroParticipants === 0){
      /**
       * TODO: Translate
       */
      // const message = await this.translatePipe.transform('formValidations.additionalCategoriesRequired');
      const message = 'Debe seleccionar al menos un participante';
      this.sweetAlert2Srv.showWarning(message);
      return;
    }

    console.log('can continue');
    // this.preSaleSrv.updateDocumentLocalStorage({step: '/pre-sale-categories/step2'});
    // this.router.navigate(['/pre-sale-event-pass', 'step2']);
  }

}
