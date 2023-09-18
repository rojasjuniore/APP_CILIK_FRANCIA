import { Component, OnInit, ViewChild } from '@angular/core';
import moment from 'moment';
import { NgxSpinnerService } from 'ngx-spinner';
import { CartService } from 'src/app/services/cart.service';
import { CustomizationfileService } from 'src/app/services/customizationfile/customizationfile.service';
import { EventInfoService } from 'src/app/services/dedicates/event-info.service';
import { Sweetalert2Service } from 'src/app/services/sweetalert2.service';
import { ModalOnlyInputNumberComponent } from 'src/app/shared/modal-only-input-number/modal-only-input-number.component';
import { ModalStoreOnlyCategoriesComponent } from 'src/app/shared/modal-store-only-categories/modal-store-only-categories.component';
import { environment } from 'src/environments/environment';

@Component({
  selector: 'app-store',
  templateUrl: './store.component.html',
  styleUrls: ['./store.component.css']
})
export class StoreComponent implements OnInit {

  @ViewChild('modalOnlyInputNumber') modalOnlyInputNumber!: ModalOnlyInputNumberComponent;
  @ViewChild('modalOnlyCategories') modalOnlyCategories!: ModalStoreOnlyCategoriesComponent;

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
    private sweetAlert2Srv: Sweetalert2Service,
    private eventInfoSrv: EventInfoService,
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

      /** FULL PASS */
      if(item.slug === 'full-pass'){
        const allDays = this.eventInfoSrv.eventDates;
        this.modalOnlyInputNumber.showModal({...item, dates: allDays});
        return;
      }

      /** WEEKEND PASS */
      if(item.slug === 'weekend-pass'){
        const weekendDays = this.eventInfoSrv.getWeekendDays();
        this.modalOnlyInputNumber.showModal({...item, dates: weekendDays});
        return;
      }

      if(item.slug === 'category-pass'){
        this.modalOnlyCategories.showModal({...item});
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
      const { status, quantity, form,  data } = params;

      /** Se cancelo la ejecución */
      if(!status){ return; }

      await this.spinner.show();

      let toCart: any[] = [];
      const uid: any = this._cf.getUid();

      switch (data.slug) {
        case 'full-pass':
          /** Crear items a añadir */
          toCart = new Array(quantity).fill({...data, quantity: 1, capacity: 1})
          .map((item: any) => ({...item, seed: this.cartSrv.generateId()}));
          break;

        case 'weekend-pass':
          /** Crear items a añadir */
          toCart = new Array(quantity).fill({...data, quantity: 1, capacity: 1})
          .map((item: any) => ({...item, seed: this.cartSrv.generateId()}));
          break;
      
        default:
          console.log('default');
          break;
      }

      /** Almacenar articulos en el carrito */
      await this.cartSrv.addOnCart(environment.dataEvent.keyDb, uid, toCart);

      this.sweetAlert2Srv.showToast('Artículo agregado al carrito', 'success');
      return;
      
    } catch (err) {
      console.log('Error on StoreComponent.onModalInputNumberResponse', err);
      return;
    } finally {
      this.spinner.hide();
    }
  }

  async onModalCategoriesResponse(params: any){
    try {
      console.log('onModalCategoriesResponse', params);
      const { status, form,  data } = params;

      /** Se cancelo la ejecución */
      if(!status){ return; }

      await this.spinner.show();

      let toCart: any[] = [];
      const uid: any = this._cf.getUid();

      if(form.categoryTypes === 'solo'){
        toCart = new Array(form.quantity).fill({...data, quantity: 1, categoryType: form.categoryTypes, capacity: 1})
        .map((item: any) => ({...item, seed: this.cartSrv.generateId()}));
      }

      if(form.categoryTypes === 'couple'){
        toCart = new Array(form.quantity).fill({...data, quantity: 1, categoryType: form.categoryTypes, capacity: 2})
        .map((item: any) => ({...item, seed: this.cartSrv.generateId()}));
      }

      if(form.categoryTypes === 'group'){
        toCart = new Array(1).fill({...data, quantity: 1, categoryType: form.categoryTypes, capacity: form.quantity})
        .map((item: any) => ({...item, seed: this.cartSrv.generateId()}));
      }

      /** Almacenar articulos en el carrito */
      await this.cartSrv.addOnCart(environment.dataEvent.keyDb, uid, toCart);

      this.sweetAlert2Srv.showToast('Categoria agregada al carrito', 'success');
      return;
      
    } catch (err) {
      console.log('Error on StoreComponent.onModalInputNumberResponse', err);
      return;
    } finally {
      this.spinner.hide();
    }
  }

}
