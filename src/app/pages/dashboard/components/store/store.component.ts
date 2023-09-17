import { Component, OnInit, ViewChild } from '@angular/core';
import moment from 'moment';
import { NgxSpinnerService } from 'ngx-spinner';
import { CartService } from 'src/app/services/cart.service';
import { CustomizationfileService } from 'src/app/services/customizationfile/customizationfile.service';
import { Sweetalert2Service } from 'src/app/services/sweetalert2.service';
import { ModalOnlyInputNumberComponent } from 'src/app/shared/modal-only-input-number/modal-only-input-number.component';
import { environment } from 'src/environments/environment';

@Component({
  selector: 'app-store',
  templateUrl: './store.component.html',
  styleUrls: ['./store.component.css']
})
export class StoreComponent implements OnInit {

  @ViewChild('modalOnlyInputNumber') modalOnlyInputNumber!: ModalOnlyInputNumberComponent;

  public storeOptions: any[] = [
    {
      isRecommended: true,
      img: 'assets/images/icons/plan-icon-1.png',
      title: 'Hotel y Evento',
      slug: 'hotel-event',
      include: 'incluye texto',
      noInclude: null,
      headerColor: 'red',
    },
    {
      isRecommended: false,
      img: 'assets/images/icons/plan-icon-2.png',
      title: 'Full Pass',
      slug: 'full-pass',
      include: 'incluye texto',
      noInclude: null,
      headerColor: 'red',
    },
    {
      isRecommended: false,
      img: 'assets/images/icons/plan-icon-2.png',
      title: 'Pase por día',
      slug: 'day-pass',
      include: 'incluye texto',
      noInclude: null,
      headerColor: 'red',
    },
    {
      isRecommended: false,
      img: 'assets/images/icons/plan-icon-2.png',
      title: 'Pase de fin de semana',
      slug: 'weekend-pass',
      include: 'incluye texto',
      noInclude: null,
      headerColor: 'red',
    },
    {
      isRecommended: false,
      img: 'assets/images/icons/plan-icon-2.png',
      title: 'Pases de Categoria',
      slug: 'category-pass',
      include: 'incluye texto',
      noInclude: null,
      headerColor: 'red',
    },
  ];

  constructor(
    private spinner: NgxSpinnerService,
    private cartSrv: CartService,
    private _cf: CustomizationfileService,
    private sweetAlert2Srv: Sweetalert2Service
  ) { }

  ngOnInit(): void {
  }

  async runShoppingCartCheck(){
    try {
      await this.spinner.show();

      /** Crear Carrito si no existe o verificar si existe antes de procesar */
      await this.cartSrv.buildAndStore(environment.dataEvent.keyDb);
      return;
      
    } catch (err) {
      console.log('Error on StoreComponent.runShoppingCartCheck', err);
      return;
    } finally {
      this.spinner.hide();
    }
  }

  async onSelectItem(item: any){
    try {
      console.log(item);

      /** Ejecutar validación de carrito de compras */
      await this.runShoppingCartCheck();

      if(['full-pass'].includes(item.slug)){
        this.modalOnlyInputNumber.showModal(item);
        return;
      }
      
      return;
      
    } catch (err) {
      console.log('Error on StoreComponent.onSelectItem', err);
      return;
    } 
  }

  async onModalInputNumberResponse(params: any){
    try {
      console.log('onModalInputNumberResponse', params);
      const { status, quantity, data } = params;

      /** Se cancelo la ejecución */
      if(!status){ return; }

      await this.spinner.show();

      let toCart: any[] = [];
      const uid: any = this._cf.getUid();

      switch (data.slug) {
        case 'full-pass':

          toCart = new Array(quantity).fill({...data, quantity: 1})
          .map((item: any, index: number) => ({...item, seed: moment().valueOf() + (index + 1) }))
          // console.log('snapshot', toCart);

          /** Almacenar articulos en el carrito */
          await this.cartSrv.addOnCart(environment.dataEvent.keyDb, uid, toCart);

          this.sweetAlert2Srv.showToast('Artículo agregado al carrito', 'success');
          return;
      
        default:
          console.log('default');
          break;
      }
      
    } catch (err) {
      console.log('Error on StoreComponent.onModalInputNumberResponse', err);
      return;
    } finally {
      this.spinner.hide();
    }
  }

}
