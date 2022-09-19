import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { TranslatePipe } from '@ngx-translate/core';
import { PreSaleService } from 'src/app/services/pre-sale.service';
import { Sweetalert2Service } from 'src/app/services/sweetalert2.service';

@Component({
  selector: 'app-remove-order-on-back-button',
  templateUrl: './remove-order-on-back-button.component.html',
  styleUrls: ['./remove-order-on-back-button.component.css']
})
export class RemoveOrderOnBackButtonComponent implements OnInit {

  constructor(
    private translatePipe: TranslatePipe,
    private preSaleSrv: PreSaleService,
    private sweetAlert2Srv: Sweetalert2Service,
    private router: Router,
  ) { }

  ngOnInit(): void {
  }

  async removePreSaleOrder(){
    const message = this.translatePipe.transform('general.removeOrder');
    const ask = await this.sweetAlert2Srv.askConfirm(message);
    if (!ask) { return ;}

    this.preSaleSrv.removeDocumentLocalStorage();
    this.router.navigate(['/pages/dashboard']);
  }

}
