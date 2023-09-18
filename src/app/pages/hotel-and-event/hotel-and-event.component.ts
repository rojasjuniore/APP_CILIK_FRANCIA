import { Component, OnDestroy, OnInit, ViewChild } from '@angular/core';
import { Subscription, catchError, distinctUntilChanged, map, of, switchMap } from 'rxjs';
import { AuthenticationService } from 'src/app/services/authentication.service';
import { CartService } from 'src/app/services/cart.service';
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
    private cartSrv: CartService
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

  openModalRoomsList(){
    this.modalRoomsList.showModal({});
  }

  resetRooms(){
    this.rooms = [];
  }

  ngOnDestroy(): void {
    this.sub$.unsubscribe();
  }

}
