import { Component, OnInit, ViewChild } from '@angular/core';
import { Router } from '@angular/router';
import { TranslateService } from '@ngx-translate/core';
import moment from 'moment';
import { NgxSpinnerService } from 'ngx-spinner';
import { CartService } from 'src/app/services/cart.service';
import { CustomizationfileService } from 'src/app/services/customizationfile/customizationfile.service';
import { EventInfoService } from 'src/app/services/dedicates/event-info.service';
import { PassesService } from 'src/app/services/dedicates/passes.service';
import { Sweetalert2Service } from 'src/app/services/sweetalert2.service';
import { ModalFullPassPerDayComponent } from 'src/app/shared/modal-full-pass-per-day/modal-full-pass-per-day.component';
import { ModalOnlyInputNumberComponent } from 'src/app/shared/modal-only-input-number/modal-only-input-number.component';
import { ModalStoreOnlyCategoriesComponent } from 'src/app/shared/modal-store-only-categories/modal-store-only-categories.component';
import { ModalStoreOnlyDayPassComponent } from 'src/app/shared/modal-store-only-day-pass/modal-store-only-day-pass.component';
import { ModalWeekenFestComponent } from 'src/app/shared/modal-weeken-fest/modal-weeken-fest.component';
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
  @ViewChild('modalFullPassPerDayComponent') modalFullPassPerDayComponent!: ModalFullPassPerDayComponent;
  @ViewChild('modalWeekenFestComponent') modalWeekenFestComponent!: ModalWeekenFestComponent;





  public storeOptions: any[] = this.eventInfoSrv.storeOptions.filter((item: any) => item.available);

  constructor(
    private spinner: NgxSpinnerService,
    private cartSrv: CartService,
    private _cf: CustomizationfileService,
    private sweetAlert2Srv: Sweetalert2Service,
    private eventInfoSrv: EventInfoService,
    private passesSrv: PassesService,
    private router: Router,
    private translate: TranslateService
  ) { }

  ngOnInit(): void {
  }

  async runShoppingCartCheck() {
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

  async onSelectItem(item: any) {
    try {
      // console.log(item);

      /** Ejecutar validación de carrito de compras */
      await this.runShoppingCartCheck();

      const currentDate = moment().format('YYYY-MM-DD');

      /** FULL PASS */
      if (item.slug === 'full-pass') {

        /** Obtener días del evento */
        const allDays = this.eventInfoSrv.eventDates;

        /** Obtener precio del pase */
        const passPrice = this.passesSrv.getPassPriceByDateAndSlug(currentDate, item.slug);

        this.modalOnlyInputNumber.showModal({
          ...item,
          dates: allDays,
          price: passPrice.price,
        });
        return;
      }

      /**
       * TODO: WEEKEND FEST
       */
      if (item.slug === 'weekend-fest') {

        /** Obtener precio del pase */
        const passPrice = this.passesSrv.getPassPriceByDateAndSlug(currentDate, item.slug);
        // console.log('category-pass', passPrice);

        this.modalWeekenFestComponent.showModal({
          ...item,
          prices: passPrice,
        });
        return;
      }

      /** WEEKEND PASS */
      if (item.slug === 'weekend-pass') {

        /** Obtener días del evento */
        const weekendDays = this.eventInfoSrv.getWeekendDays();

        /** Obtener precio del pase */
        const passPrice = this.passesSrv.getPassPriceByDateAndSlug(currentDate, item.slug);

        this.modalOnlyInputNumber.showModal({
          ...item,
          dates: weekendDays,
          price: passPrice.price,
        });
        return;
      }

      /** CATEGORY PASS */
      if (item.slug === 'category-pass') {

        /** Obtener precio del pase */
        const passPrice = this.passesSrv.getPassPriceByDateAndSlug(currentDate, item.slug);
        // console.log('category-pass', passPrice);

        this.modalOnlyCategories.showModal({
          ...item,
          prices: passPrice,
        });
        return;
      }

      /** DAY PASS */
      if (item.slug === 'day-pass') {

        /** Obtener precio del pase */
        const passPrice = this.passesSrv.getPassPriceByDateAndSlug(currentDate, item.slug);
        // console.log('passPrice', passPrice);

        this.modalOnlyDayPass.showModal({
          ...item,
          prices: passPrice,
          multidate: true,
          startDate: moment(this.eventInfoSrv.getStartEventDate().date).format('MM/DD/YYYY'),
          endDate: moment(this.eventInfoSrv.getEndEventDate().date).format('MM/DD/YYYY'),
        });
        return;
      }

      if (item.slug === 'full-pass-per-day') {
        // console.log('full-pass-per-day');
        const passPrice = this.passesSrv.getPassPriceByDateAndSlug(currentDate, item.slug);
        // console.log('passPrice', passPrice);

        this.modalFullPassPerDayComponent.showModal({
          ...item,
          prices: passPrice,
          multidate: true,
          startDate: moment(this.eventInfoSrv.getStartEventDate().date).format('MM/DD/YYYY'),
          endDate: moment(this.eventInfoSrv.getEndEventDate().date).format('MM/DD/YYYY'),
        });


        return;
      }

      /** HOTEL AND EVENT */
      if (item.slug === 'hotel-event') {
        this.router.navigate(['/pages/hotel-and-event', item.slug]);
        return;
      }

      if (item.slug === 'hotel-without-event') {
        this.router.navigate(['/pages/hotel-and-event', item.slug]);
        return;
      }

      return;

    } catch (err) {
      console.log('Error on StoreComponent.onSelectItem', err);
      return;
    }
  }

  async onModalInputNumberResponse(params: any) {
    try {
      // console.log('onModalInputNumberResponse', params);
      const { status, quantity, form, data } = params;

      /** Se cancelo la ejecución */
      if (!status) { return; }

      await this.spinner.show();

      let toCart: any[] = [];
      const uid: any = this._cf.getUid();

      switch (data.slug) {
        case 'full-pass':
          /** Crear items a añadir */
          toCart = new Array(quantity).fill({ ...data, quantity: 1, capacity: 1 })
            .map((item: any) => ({
              ...item,
              totales: item.price,
              seed: this.cartSrv.generateId()
            }));
          break;

        case 'weekend-pass':
          /** Crear items a añadir */
          toCart = new Array(quantity).fill({ ...data, quantity: 1, capacity: 1 })
            .map((item: any) => ({
              ...item,
              totales: item.price,
              seed: this.cartSrv.generateId()
            }));
          break;

        default:
          console.log('default');
          break;
      }

      /** Almacenar articulos en el carrito */
      await this.cartSrv.addOnCart(environment.dataEvent.keyDb, uid, toCart);
      this.sweetAlert2Srv.showToast(
        this.translate.instant("alert.itemAddedToCart"),
        'success'
      );
      return;

    } catch (err) {
      console.log('Error on StoreComponent.onModalInputNumberResponse', err);
      return;
    } finally {
      this.spinner.hide();
    }
  }

  async onModalFullPassPerDayComponent(params: any) {
    try {
      console.log('onModalFullPassPerDayComponent', params);
      const { status, form, data } = params;

      /** Se cancelo la ejecución */
      if (!status) { return; }

      // console.log('form', { status, form, data });

      await this.spinner.show();

      let toCart: any[] = [];
      const uid: any = this._cf.getUid();
      const allDays = this.eventInfoSrv.eventDates;

      toCart = new Array(form.quantity).fill({ ...data, quantity: 1, categoryType: form.categoryTypes, capacity: 1 })
        .map((item: any) => ({
          ...item,
          totales: Number(item.prices),
          dates: allDays,
          seed: this.cartSrv.generateId()
        }));



      /** Almacenar articulos en el carrito */
      await this.cartSrv.addOnCart(environment.dataEvent.keyDb, uid, toCart);

      this.sweetAlert2Srv.showToast(
        this.translate.instant("alert.itemAddedToCart"),
        'success'
      );
      return;

    } catch (err) {
      console.log('Error on StoreComponent.onModalInputNumberResponse', err);
      return;
    } finally {
      this.spinner.hide();
    }
  }

  async onModalCategoriesResponse(params: any) {
    try {
      console.log('onModalCategoriesResponse', params);
      const { status, form, data } = params;

      /** Se cancelo la ejecución */
      if (!status) { return; }

      await this.spinner.show();

      let toCart: any[] = [];
      const uid: any = this._cf.getUid();
      const allDays = this.eventInfoSrv.eventDates;

      if (form.categoryTypes === 'soloist') {
        toCart = new Array(form.quantity).fill({ ...data, quantity: 1, categoryType: form.categoryTypes, capacity: 1 })
          .map((item: any) => ({
            ...item,
            totales: Number(item.prices.soloist),
            dates: allDays,
            seed: this.cartSrv.generateId()
          }));
      }

      if (form.categoryTypes === 'couples') {
        toCart = new Array(form.quantity).fill({ ...data, quantity: 1, categoryType: form.categoryTypes, capacity: 2 })
          .map((item: any) => ({
            ...item,
            totales: Number(item.prices.couples * 2),
            dates: allDays,
            seed: this.cartSrv.generateId()
          }));
      }

      if (form.categoryTypes === 'groups') {
        toCart = new Array(1).fill({ ...data, quantity: 1, categoryType: form.categoryTypes, capacity: form.quantity })
          .map((item: any) => ({
            ...item,
            totales: Number(item.prices.groups * form.quantity),
            dates: allDays,
            seed: this.cartSrv.generateId()
          }));
      }

      /** Almacenar articulos en el carrito */
      await this.cartSrv.addOnCart(environment.dataEvent.keyDb, uid, toCart);

      this.sweetAlert2Srv.showToast(
        this.translate.instant("alert.itemAddedToCart"),
        'success'
      );
      return;

    } catch (err) {
      console.log('Error on StoreComponent.onModalInputNumberResponse', err);
      return;
    } finally {
      this.spinner.hide();
    }
  }



  async onModalWeekedPassResponse(params: any) {
    try {
      console.log('onModalWeekedPassResponse', params);
      const { status, form, data } = params;

      /** Se cancelo la ejecución */
      if (!status) { return; }

      await this.spinner.show();

      let toCart: any[] = [];
      const uid: any = this._cf.getUid();
      const allDays = this.eventInfoSrv.eventDates;

      if (form.categoryTypes === 'soloist') {
        toCart = new Array(form.quantity).fill({ ...data, quantity: 1, categoryType: form.categoryTypes, capacity: 1 })
          .map((item: any) => ({
            ...item,
            totales: Number(item.prices.soloist),
            dates: allDays,
            seed: this.cartSrv.generateId()
          }));
      }

      if (form.categoryTypes === 'couples') {
        toCart = new Array(form.quantity).fill({ ...data, quantity: 1, categoryType: form.categoryTypes, capacity: 2 })
          .map((item: any) => ({
            ...item,
            totales: Number(item.prices.couples * 2),
            dates: allDays,
            seed: this.cartSrv.generateId()
          }));
      }

      if (form.categoryTypes === 'groups') {
        toCart = new Array(1).fill({ ...data, quantity: 1, categoryType: form.categoryTypes, capacity: form.quantity })
          .map((item: any) => ({
            ...item,
            totales: Number(item.prices.groups * form.quantity),
            dates: allDays,
            seed: this.cartSrv.generateId()
          }));
      }

      /** Almacenar articulos en el carrito */
      await this.cartSrv.addOnCart(environment.dataEvent.keyDb, uid, toCart);

      this.sweetAlert2Srv.showToast(
        this.translate.instant("alert.itemAddedToCart"),
        'success'
      );
      return;

    } catch (err) {
      console.log('Error on StoreComponent.onModalInputNumberResponse', err);
      return;
    } finally {
      this.spinner.hide();
    }
  }

  async onModalDayPassResponse(params: any) {
    try {
      // console.log('onModalDayPassResponse', params);
      const { status, form, data } = params;

      /** Se cancelo la ejecución */
      if (!status) { return; }

      await this.spinner.show();

      const dates = this.eventInfoSrv.eventDates
        .filter((date: any) => form.dates.includes(date.date))
        .map((row: any) => ({
          ...row,
          price: data.prices.dayOfWeek[moment(row.date).day()],
        }))

      const toCart = new Array(form.quantity).fill({ ...data, quantity: 1, capacity: 1, dates })
        .map((item: any) => ({
          ...item,
          totales: dates.map((date: any) => date.price).reduce((a: number, b: number) => a + b, 0),
          seed: this.cartSrv.generateId()
        }));
      // console.log('toCart', toCart);

      const uid: any = this._cf.getUid();

      /** Almacenar articulos en el carrito */
      await this.cartSrv.addOnCart(environment.dataEvent.keyDb, uid, toCart);
      this.sweetAlert2Srv.showToast(
        this.translate.instant("alert.itemAddedToCart"),
        'success'
      );
      return;

    } catch (err) {
      console.log('Error on StoreComponent.onModalDayPassResponse', err);
      return;
    } finally {
      this.spinner.hide();
    }
  }

}
