import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { NgxSpinnerService } from 'ngx-spinner';
import { purchaseTotales } from 'src/app/helpers/purchase-totales.helper';
import { AuthenticationService } from 'src/app/services/authentication.service';
import { PreSaleService } from 'src/app/services/pre-sale.service';
import { PurchaseService } from 'src/app/services/purchase.service';
import { environment } from 'src/environments/environment';

@Component({
  selector: 'app-tucompra',
  templateUrl: './tucompra.component.html',
  styleUrls: ['./tucompra.component.css']
})
export class TucompraComponent implements OnInit {
  tuCompraObject: any
  preSaleDocument: any
  constructor(
    private preSaleSrv: PreSaleService,
    private authSrv: AuthenticationService
  ) { }



  async ngOnInit(): Promise<void> {
    this.preSaleDocument = this.preSaleSrv.checkAndLoadDocumentLocalStorage();

    const profile: any = await this.getProfile();
    console.log('profile', profile);
    console.log('this.preSaleDocument', this.preSaleDocument);

    this.tuCompraObject = {
      url: environment.tuCompra.url,
      usuario: environment.tuCompra.Idsistema,
      factura: Date.now(),
      valor: this.total,
      descripcionFactura: "Compra de boletas para el evento",
      documentoComprador: profile.identificationNumber || profile.identification,
      tipoDocumento: "PAS",
      nombreComprador: profile.name,
      apellidoComprador: profile.surnames,
      correoComprador: profile.email,
      telefonoComprador: `${profile.prefijo}${profile.phone}`,
      ciudadComprador: profile.city || "Cartagena",
      paisComprador: profile.country || "COLOMBIA",
      celularComprador: `${profile.prefijo}${profile.phone}`,
      direccionComprador: profile.address || "colombia",
      tipoMoneda: "USD",
      lenguaje: "ES",
      campoExtra1: "Campo extra 1",
      campoExtra2: "Campo extra 2",
      campoExtra3: "Campo extra 3",

    }

    console.log('this.tuCompraObject', this.tuCompraObject);

  }


  /**
   * @dev Pay with TuCompra
   */
  payWithTuCompra() {
    console.log('payWithTuCompra');


    /** ajecutar el webchecout */
    document.forms["tuCompraPresale"].submit();

  }



  get total() {
    return purchaseTotales(this.preSaleDocument).total;
  }


  getProfile() {
    const uid = this.authSrv.getLocalUID()
    return this.authSrv.getProfile(uid)
  }


}
