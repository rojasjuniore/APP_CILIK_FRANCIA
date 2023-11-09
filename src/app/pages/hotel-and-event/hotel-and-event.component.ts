import { Component, OnDestroy, OnInit, ViewChild } from '@angular/core';
import { TranslateService } from '@ngx-translate/core';
import moment from 'moment';
import { NgxSpinnerService } from 'ngx-spinner';
import { Subscription, catchError, distinctUntilChanged, map, of, switchMap } from 'rxjs';
import { AuthenticationService } from 'src/app/services/authentication.service';
import { CartService } from 'src/app/services/cart.service';
import { EventInfoService } from 'src/app/services/dedicates/event-info.service';
import { Sweetalert2Service } from 'src/app/services/sweetalert2.service';
import { ModalHotelEventRoomsListComponent } from 'src/app/shared/modal-hotel-event-rooms-list/modal-hotel-event-rooms-list.component';
import { environment } from 'src/environments/environment';

@Component({
  selector: 'app-hotel-and-event',
  templateUrl: './hotel-and-event.component.html',
  styleUrls: ['./hotel-and-event.component.css']
})
export class HotelAndEventComponent implements OnInit, OnDestroy {

  @ViewChild('modalRoomsList') modalRoomsList!: ModalHotelEventRoomsListComponent;

  public uid!: string;
  public rooms: any[] = [];

  private sub$!: Subscription;

  constructor(
    private authSrv: AuthenticationService,
    private cartSrv: CartService,
    private eventInfoSrv: EventInfoService,
    private spinner: NgxSpinnerService,
    private sweetAlert2Srv: Sweetalert2Service,
    private translate: TranslateService
  ) { }

  ngOnInit(): void {
    this.sub$ = this.authSrv.uid$.pipe(
      // tap(console.log),
      switchMap((uid: any) => (uid)
        ? this.cartSrv.getCartObservable(environment.dataEvent.keyDb, uid)
        : of(null)
      ),
      catchError((err) => of(null)),
      distinctUntilChanged((prev, next) => JSON.stringify(prev) === JSON.stringify(next)),
    ).subscribe((cart: any) => {
      console.log('cart', cart);
      if (!cart) { return; }

      const { product = [] } = cart;
      const filter = product.filter((item: any) => item.slug === 'hotel-event');

      this.uid = cart.uid;
      this.rooms = filter;
    });
  }

  openModalRoomsList(): void {
    this.modalRoomsList.showModal({
      currentDate: moment().format('YYYY-MM-DD'),
      multidate: true,
      minDate: moment(this.eventInfoSrv.beforeLimit).format('MM/DD/YYYY'),
      maxDate: moment(this.eventInfoSrv.afterLimit).format('MM/DD/YYYY'),
      startDate: moment(this.eventInfoSrv.getStartEventDate().date).format('MM/DD/YYYY'),
      endDate: moment(this.eventInfoSrv.getEndEventDate().date).format('MM/DD/YYYY'),
    });
  }

  async onAddRoom(room: any) {
    // console.log('onAddRoom', room);
    try {

      if (!room.status) { return; }

      await this.spinner.show();

      const eventOption = this.eventInfoSrv.getStoreOptionBySlug('hotel-event');

      const toCart = {
        room: room.data,
        totales: room.data.totales,
        ...eventOption,
        seed: this.cartSrv.generateId()
      };

      await this.cartSrv.addOnCart(environment.dataEvent.keyDb, this.uid, [toCart]);
      this.sweetAlert2Srv.showToast(
        this.translate.instant("alert.itemAddedToCart"),
        'success'
      );
      return;

    } catch (err) {
      console.log('Error on HotelAndEventComponent.onAddRoom', err);

      /**
       * TODO: Mostrar error
       */

      this.sweetAlert2Srv.showToast("Ocurrió un error", "error ")
      setTimeout(() => {
        window.location.reload();
      }, 3000);

      return;
    } finally {
      this.spinner.hide();
    }
  }

  async onRemoveRoom(room: any) {
    this.cartSrv.removeOnCart(environment.dataEvent.keyDb, this.uid, room);
  }

  ngOnDestroy(): void {
    this.sub$.unsubscribe();
  }

}
