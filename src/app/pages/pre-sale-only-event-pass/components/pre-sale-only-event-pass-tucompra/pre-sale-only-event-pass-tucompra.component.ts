import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { NgxSpinnerService } from 'ngx-spinner';
import { purchaseTotales } from 'src/app/helpers/purchase-totales.helper';
import { PreSaleService } from 'src/app/services/pre-sale.service';
import { TucompraService } from 'src/app/services/tucompra/tucompra.service';
import { environment } from 'src/environments/environment';

@Component({
  selector: 'app-pre-sale-only-event-pass-tucompra',
  templateUrl: './pre-sale-only-event-pass-tucompra.component.html',
  styleUrls: ['./pre-sale-only-event-pass-tucompra.component.css']
})
export class PreSaleOnlyEventPassTucompraComponent implements OnInit {

  public preSaleDocument: any;
  public tuCompraDoc: any;

  constructor(
    private router: Router,
    private spinner: NgxSpinnerService,
    private preSaleSrv: PreSaleService,
    private tuCompraSrv: TucompraService
  ) {
    this.preSaleDocument = this.preSaleSrv.checkAndLoadDocumentLocalStorage();

  }

  ngOnInit(): void {
    const tuCompraDoc = this.tuCompraSrv.buildDocument({
      usuario: environment.tuCompra.Idsistema,
      factura: Date.now(),
      valor: purchaseTotales(this.preSaleDocument).total || 0,
      descripcionFactura: "Compra de boletas para el evento - WLDC France 2025",
      campoExtra1: this.preSaleDocument.orderId
    });

    console.log('tuCompraDoc', tuCompraDoc);
    this.tuCompraDoc = tuCompraDoc;
  }

  get total(){
    return purchaseTotales(this.preSaleDocument).total || 0;
  }

  onBack(){
    this.preSaleSrv.updateDocumentLocalStorage({step: '/pre-sale-event-pass/payment-method'});
    this.router.navigate(['/pre-sale-event-pass/payment-method']);
  }

  onNext(){
    this.preSaleSrv.updateDocumentLocalStorage({step: '/purchase/summary', completed: true});
    this.router.navigate(['/purchase/summary']);
  }

}
