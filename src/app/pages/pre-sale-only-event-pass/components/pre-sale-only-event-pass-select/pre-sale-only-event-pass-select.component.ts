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

  private nroParticipants = 0;

  constructor(
    public preSaleSrv: PreSaleService,
    private router: Router,
    private sweetAlert2Srv: Sweetalert2Service,
    private translatePipe: TranslatePipe,
  ) { }

  ngOnInit(): void {
  }

  onUpdateQuantity(params: any) {
    this.preSaleSrv.updateDocumentLocalStorage({nroParticipants: params.quantity});
    console.log(params);
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

    this.preSaleSrv.updateDocumentLocalStorage({step: '/pre-sale-categories/step2'});
    this.router.navigate(['/pre-sale-event-pass', 'step2']);
  }

}
