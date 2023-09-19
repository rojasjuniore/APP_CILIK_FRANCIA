import { Component, Input, OnChanges, OnInit, Output, SimpleChanges } from '@angular/core';
import { Subject } from 'rxjs';
import { HotelService } from 'src/app/services/hotel.service';

@Component({
  selector: 'app-hotel-and-event-room-list-item-card',
  templateUrl: './hotel-and-event-room-list-item-card.component.html',
  styleUrls: ['./hotel-and-event-room-list-item-card.component.css']
})
export class HotelAndEventRoomListItemCardComponent implements OnInit, OnChanges {

  @Input() item: any = {}
  @Input() dates: any[] = [];

  @Output() onSelectRoom = new Subject();

  public loading = false;

  constructor(
    private hotelSrv: HotelService,
  ) { }

  ngOnInit(): void {
  }

  ngOnChanges(changes: SimpleChanges): void {
    const { dates } = changes;
    if(dates && dates.currentValue){
      // console.log('this.dates', this.dates);
      this.updateDates(this.dates);
    }
  }

  get totales(){
    if(this.dates.length == 0) { return 0;}
    return this.dates.map((date: any) => date.price).reduce((a: any, b: any) => a + b);
  }

  updateDates(dates: any){
    this.loading = true;

    /** Realizar calculo de montos */
    const prices = dates.map((date: string) => this.hotelSrv.getRoomPriceByDate(this.item.subcode , date))
    .sort((a: any, b: any) => a.order - b.order);

    /** Actualizar variable de fechas */
    this.dates = prices;

    this.loading = false;
  }

  selectRoom(){
    this.onSelectRoom.next({
      ...this.item, 
      dates: this.dates,
      totales: this.totales,
    });
  }

}
