import { Component, Input, OnChanges, OnInit, Output, SimpleChanges } from '@angular/core';
import { Subject } from 'rxjs';
import { HotelService } from 'src/app/services/dedicates/hotel.service';

@Component({
  selector: 'app-hotel-and-event-room-list-item-card',
  templateUrl: './hotel-and-event-room-list-item-card.component.html',
  styleUrls: ['./hotel-and-event-room-list-item-card.component.css']
})
export class HotelAndEventRoomListItemCardComponent implements OnInit, OnChanges {

  @Input() item: any = {}
  @Input() recomendation: boolean = false;

  @Output() onSelectRoom = new Subject();

  public loading = false;

  constructor(
    private hotelSrv: HotelService,
  ) { }

  ngOnInit(): void {
    console.log('this.item', this.item);
  }

  ngOnChanges(changes: SimpleChanges): void {
    // const { dates } = changes;
    // if(dates && dates.currentValue){
    //   // console.log('this.dates', this.dates);
    //   this.updateDates(this.dates);
    // }
  }

  get totales(){
    // if(this.dates.length == 0) { return 0;}
    // return this.dates.map((date: any) => date.price || 0).reduce((a: any, b: any) => a + b);

    if(!this.item) { return 0; }
    return this.item.totales;
  }

  /**
   * Fecha de ingreso
   */
  get checkIn(){
    if(!this.item) { return null; }
    return this.item.dates[0].date;
  }

  /**
   * Fecha de salida
   */
  get checkOut(){
    if(!this.item) { return null; }
    return this.item.dates[this.item.dates.length - 1].date;
  }

  get nroNights() {
    if(!this.item) { return 0; }
    return this.item.dates.length - 1;
  }

  // updateDates(dates: any){
  //   this.loading = true;

  //   /** Realizar calculo de montos */
  //   const prices = dates.map((date: string) => this.hotelSrv.getRoomPriceByDate(this.item.subcode , date))
  //   .sort((a: any, b: any) => a.order - b.order);
  //   // console.log('prices', prices);

  //   /** Actualizar variable de fechas */
  //   this.dates = prices;

  //   this.loading = false;
  // }

  selectRoom(){
    this.onSelectRoom.next({
      ...this.item, 
      dates: this.item.dates,
      totales: this.item.totales,
    });
  }

}
