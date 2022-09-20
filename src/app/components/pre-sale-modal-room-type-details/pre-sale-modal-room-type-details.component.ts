import { Component, OnDestroy, OnInit, Output } from '@angular/core';
import { NavigationCancel, Router, RouterEvent } from '@angular/router';
import { filter, map, Observable, Subject, Subscription } from 'rxjs';
import { BsModalService } from 'src/app/services/bs-modal.service';
import { HotelService } from 'src/app/services/hotel.service';
import { Sweetalert2Service } from 'src/app/services/sweetalert2.service';

import { omit } from 'underscore';

@Component({
  selector: 'app-pre-sale-modal-room-type-details',
  templateUrl: './pre-sale-modal-room-type-details.component.html',
  styleUrls: ['./pre-sale-modal-room-type-details.component.css']
})
export class PreSaleModalRoomTypeDetailsComponent implements OnInit, OnDestroy {

  @Output() onUpdateRoom = new Subject();

  // public edit = false;
  public mi: any;
  public index: any;
  public item: any;

  public list$!: Observable<any>;

  private sub$!: Subscription;

  constructor(
    private bsModalSrv: BsModalService,
    private hotelSrv: HotelService,
    private sweetAler2tSrv: Sweetalert2Service,
    private router: Router,
  ) { }

  ngOnInit(): void {
    this.buildModal();

    this.sub$ = this.router.events
    .subscribe((event) => {

      /** Si la modal esta desplegada al cambiar de ruta */
      if(this.mi._isShown){
        this.closeModal();
      }

    });
  }

  async buildModal() {
    this.mi = this.bsModalSrv.buildModal('modalRoomTypeDetails');
  }

  async showModal(params: any) {
    const { data, index } = params;
    // console.log('params', params);
    // console.log('data', data);
    
    this.index = index;
    this.item = data;

    this.list$ = this.hotelSrv.getDynamicRoomTypeCollection([
      {field: 'capacity', condition: '==', value: data.capacity},
    ], {
      orderBy: [{field: 'priority', order: 'asc'}]
    })
    .pipe(
      map((data: any[]) => data.map((row) => this.hotelSrv.parseRoomPrice(row)) ),
      map((data: any[]) => data.map((row) => omit(row, ['priceList'])) ),
    );

    await this.mi.show();
  }

  async onUpdateRoomDoc(data: any){
    const ask = await this.sweetAler2tSrv.askConfirm('¿Estas seguro de actualizar la habitación?');

    if(!ask){ return; };

    data = Object.assign({additionals: []}, this.hotelSrv.parseRoomDefaultByCapacityDocument(data));
    // console.log('data', data);
    this.onUpdateRoom.next({index: this.index, data});
    this.closeModal();
  }

  async closeModal(){
    await this.mi.hide();
  }

  ngOnDestroy(): void {
    this.sub$.unsubscribe();
  }

}
