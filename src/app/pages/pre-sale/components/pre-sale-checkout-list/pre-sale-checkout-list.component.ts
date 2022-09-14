import { Component, OnInit  } from '@angular/core';
import { PreSaleService } from 'src/app/services/pre-sale.service';
import { Sweetalert2stepsService } from 'src/app/services/sweetalert2steps.service';
import { Router } from '@angular/router';
import { Sweetalert2Service } from '../../../../services/sweetalert2.service';
import { Location } from '@angular/common';

@Component({
  selector: 'app-pre-sale-checkout-list',
  templateUrl: './pre-sale-checkout-list.component.html',
  styleUrls: ['./pre-sale-checkout-list.component.css']
})
export class PreSaleCheckoutListComponent implements OnInit {

  public preSaleDocument: any;

  constructor(
    public preSaleSrv: PreSaleService,
    private router: Router,
    private sweetAlert2Srv: Sweetalert2Service,
    public location: Location,
  ) {
    this.loadLocalData();
  }

  ngOnInit(): void { }

  loadLocalData(){
    this.preSaleDocument = this.preSaleSrv.checkAndLoadDocumentLocalStorage();
  }

  get rooms(){
    return this.preSaleDocument.rooms || [];
  }

  get additionalCategoryPasses(){
    return this.preSaleDocument.additionalCategoryPasses || [];
  }

  /** ======================================
   *                Rooms
   ====================================== */

  async onUpdateItem(params: any){
    this.router.navigate(['/pre-sale', 'step1']);
  }

  async onRemoveItem(params: any){
    const ask = await this.sweetAlert2Srv.askConfirm(`¿Desea remover de la orden la habitación #${params.index + 1}?`);
    if(!ask){ return; }

    const rooms = this.rooms.filter((value, index) => index != params.index);
    const nroParticipants = rooms.map((row) => row.capacity).reduce((acc, next) => acc + next, 0);

    this.preSaleSrv.updateDocumentLocalStorage({rooms, nroParticipants});
    this.loadLocalData();
  }

  /** ======================================
   *      Additional Category Passes
   ====================================== */

  async onUpdateAdditionalCategoryPasses(params: any){
    this.router.navigate(['/pre-sale', 'step2']);
  }

  async onRemoveAdditionalCategoryPasses(params: any){
    if(this.preSaleDocument.additionalCategoryPasses.length == 0){ return; }

    const ask = await this.sweetAlert2Srv.askConfirm(`¿Desea eliminar todas las categorías adicionales?`);
    if(!ask){ return; }
    
    this.preSaleSrv.updateDocumentLocalStorage({additionalCategoryPasses: []});
    this.loadLocalData();
  }

  onBack(){
    this.preSaleSrv.updateDocumentLocalStorage({step: '/pre-sale/step2'});
    this.router.navigate(['/pre-sale', 'step2']);
  }

  onNext(){
    this.preSaleSrv.updateDocumentLocalStorage({step: '/pre-sale/payment-method'});
    this.router.navigate(['/pre-sale', 'payment-method']);
  }

}
