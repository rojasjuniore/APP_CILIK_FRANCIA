import { Component, OnInit, ViewChild } from '@angular/core';
import { Router } from '@angular/router';
import moment from 'moment';
import { NgxSpinnerService } from 'ngx-spinner';
import { CartService } from 'src/app/services/cart.service';
import { CustomizationfileService } from 'src/app/services/customizationfile/customizationfile.service';
import { EventInfoService } from 'src/app/services/dedicates/event-info.service';
import { PassesService } from 'src/app/services/dedicates/passes.service';
import { Sweetalert2Service } from 'src/app/services/sweetalert2.service';
import { ModalOnlyInputNumberComponent } from 'src/app/shared/modal-only-input-number/modal-only-input-number.component';
import { ModalStoreOnlyCategoriesComponent } from 'src/app/shared/modal-store-only-categories/modal-store-only-categories.component';
import { ModalStoreOnlyDayPassComponent } from 'src/app/shared/modal-store-only-day-pass/modal-store-only-day-pass.component';
import { environment } from 'src/environments/environment';

@Component({
  selector: 'app-store',
  templateUrl: './store.component.html',
  styleUrls: ['./store.component.css']
})
export class StoreComponent implements OnInit {

  @ViewChild('modalOnlyInputNumber') modalOnlyInputNumber!: ModalOnlyInputNumberComponent;
  @ViewChild('modalOnlyCategories') modalOnlyCategories!: ModalStoreOnlyCategoriesComponent;
  @ViewChild('modalOnlyDayPass') modalOnlyDayPass!: ModalStoreOnlyDayPassComponent;

  public storeOptions: any[] = this.eventInfoSrv.storeOptions;

  constructor(
    private spinner: NgxSpinnerService,
    private cartSrv: CartService,
    private _cf: CustomizationfileService,
    private sweetAlert2Srv: Sweetalert2Service,
    private eventInfoSrv: EventInfoService,
    private passesSrv: PassesService,
    private router: Router,
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
      // console.log(item);

      /** Ejecutar validación de carrito de compras */
      await this.runShoppingCartCheck();

      const currentDate = moment().format('YYYY-MM-DD');

      /** FULL PASS */
      if(item.slug === 'full-pass'){

        /** Obtener días del evento */
        const allDays = this.eventInfoSrv.eventDates;

        /** Obtener precio del pase */
        const passPrice = this.passesSrv.getPassPriceByDateAndSlug(currentDate ,item.slug);

        this.modalOnlyInputNumber.showModal({
          ...item, 
          dates: allDays,
          price: passPrice.price,
        });
        return;
      }

      /** WEEKEND PASS */
      if(item.slug === 'weekend-pass'){

        /** Obtener días del evento */
        const weekendDays = this.eventInfoSrv.getWeekendDays();

        /** Obtener precio del pase */
        const passPrice = this.passesSrv.getPassPriceByDateAndSlug(currentDate ,item.slug);

        this.modalOnlyInputNumber.showModal({
          ...item,
          dates: weekendDays,
          price: passPrice.price,
        });
        return;
      }

      /** CATEGORY PASS */
      if(item.slug === 'category-pass'){

        /** Obtener precio del pase */
        const passPrice = this.passesSrv.getPassPriceByDateAndSlug(currentDate ,item.slug);
        console.log('passPrice', passPrice);

        this.modalOnlyCategories.showModal({
          ...item,
          prices: passPrice,
        });
        return;
      }

      /** DAY PASS */
      if(item.slug === 'day-pass'){
        this.modalOnlyDayPass.showModal({
          ...item,
          multidate: true,
          startDate: moment(this.eventInfoSrv.getStartEventDate().date).format('MM/DD/YYYY'),
          endDate: moment(this.eventInfoSrv.getEndEventDate().date).format('MM/DD/YYYY'),
        });
        return;
      }

      /** HOTEL AND EVENT */
      if(item.slug === 'hotel-event'){
        this.router.navigate(['/pages/hotel-and-event']);
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
      const allDays = this.eventInfoSrv.eventDates;

      if(form.categoryTypes === 'solo'){
        toCart = new Array(form.quantity).fill({...data, quantity: 1, categoryType: form.categoryTypes, capacity: 1})
        .map((item: any) => ({...item, dates: allDays, seed: this.cartSrv.generateId()}));
      }

      if(form.categoryTypes === 'couple'){
        toCart = new Array(form.quantity).fill({...data, quantity: 1, categoryType: form.categoryTypes, capacity: 2})
        .map((item: any) => ({...item, dates: allDays, seed: this.cartSrv.generateId()}));
      }

      if(form.categoryTypes === 'group'){
        toCart = new Array(1).fill({...data, quantity: 1, categoryType: form.categoryTypes, capacity: form.quantity})
        .map((item: any) => ({...item, dates: allDays, seed: this.cartSrv.generateId()}));
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

  async onModalDayPassResponse(params: any){
    try {
      console.log('onModalCategoriesResponse', params);
      const { status, form,  data } = params;

      /** Se cancelo la ejecución */
      if(!status){ return; }

      await this.spinner.show();

      const dates = this.eventInfoSrv.eventDates.filter((date: any) => form.dates.includes(date.date));

      const toCart = new Array(form.quantity).fill({...data, quantity: 1, capacity: 1, dates})
      .map((item: any) => ({...item, seed: this.cartSrv.generateId()}));
      // console.log('toCart', toCart);

      const uid: any = this._cf.getUid();


      /** Almacenar articulos en el carrito */
      await this.cartSrv.addOnCart(environment.dataEvent.keyDb, uid, toCart);

      this.sweetAlert2Srv.showToast('Artículo agregado al carrito', 'success');
      return;
      
    } catch (err) {
      console.log('Error on StoreComponent.onModalDayPassResponse', err);
      return;
    } finally {
      this.spinner.hide();
    }
  }

}
