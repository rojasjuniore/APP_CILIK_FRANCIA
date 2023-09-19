import { Component, OnDestroy, OnInit, ViewChild } from '@angular/core';
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
      if(!cart) { return; }

      const { product = [] } = cart;
      const filter = product.filter((item: any) => item.slug === 'hotel-event');

      this.uid = cart.uid;
      this.rooms = filter;
    });
  }

  openModalRoomsList(): void{
    this.modalRoomsList.showModal({
      currentDate: moment().format('YYYY-MM-DD'),
      multidate: true,
      startDate: moment(this.eventInfoSrv.beforeLimit).format('MM/DD/YYYY'),
      endDate: moment(this.eventInfoSrv.afterLimit).format('MM/DD/YYYY'),
    });
  }

  async onAddRoom(room: any){
    // console.log('onAddRoom', room);
    try {

      if(!room.status){ return; }

      await this.spinner.show();

      const eventOption = this.eventInfoSrv.getStoreOptionBySlug('hotel-event');

      const toCart = {
        room: room.data,
        ...eventOption,
        seed: this.cartSrv.generateId()
      };

      await this.cartSrv.addOnCart(environment.dataEvent.keyDb, this.uid, [toCart]);

      this.sweetAlert2Srv.showToast('Artículo agregado al carrito', 'success');
      return;
      
    } catch (err) {
      console.log('Error on HotelAndEventComponent.onAddRoom', err);
      return;
    } finally {
      this.spinner.hide();
    }
  }

  async onRemoveRoom(room: any){
    this.cartSrv.removeOnCart(environment.dataEvent.keyDb, this.uid, room);
  }

  async resetRooms(){
    // console.log('resetRooms');
    try {
      const ask = await this.sweetAlert2Srv.askConfirm('¿Está seguro de eliminar todas las habitaciones?');
      if(!ask){ return; }

      await this.spinner.show();

      const snapshot = await Promise.all(
        this.rooms.map((item: any) => this.cartSrv.removeOnCart(environment.dataEvent.keyDb, this.uid, item))
      );
      console.log('snapshot', snapshot);

      this.sweetAlert2Srv.showToast('Habitaciones eliminadas', 'success');
      return;
      
    } catch (err) {
      console.log('Error on HotelAndEventComponent.resetRooms', err);
      return;
    } finally {
      this.spinner.hide();
    }
  }

  ngOnDestroy(): void {
    this.sub$.unsubscribe();
  }

}
