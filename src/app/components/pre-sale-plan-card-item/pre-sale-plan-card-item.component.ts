import { Component, Input, OnInit, Output } from '@angular/core';
import { Subject } from 'rxjs';
import { HotelService } from 'src/app/services/hotel.service';

@Component({
  selector: 'app-pre-sale-plan-card-item',
  templateUrl: './pre-sale-plan-card-item.component.html',
  styleUrls: ['./pre-sale-plan-card-item.component.css']
})
export class PreSalePlanCardItemComponent implements OnInit {

  @Input() index!: number;
  @Input() item: any;
  @Output() onUpdateNroParticipants = new Subject();
  @Output() onUpdateRoom= new Subject();
  @Output() onUpdateAdditionalDays = new Subject();
  @Output() onRemove = new Subject();

  public type!: number;

  constructor(
    private hotelSrv: HotelService,
  ) { }

  ngOnInit(): void { }

  get pricePerPeople(){
    return this.item.price / this.item.capacity;
  }

  get additionalAmount(){
    return this.item?.additionals
    .map((row) => row.quantity * row.price)
    .reduce((a, b) => a + b, 0);
  }

  get additionalsDays() {
    return this.item?.additionals
    .map((row) => row.quantity)
    .reduce((a, b) => a + b, 0);
  }

  get subTotal(){
    const price = this.item.price;

    return price + this.additionalAmount;
  }

  async onUpdateQuantity(quantity: number) {
    // console.log('quantity', quantity);
    const toParse = await this.hotelSrv.getRoomDefaultByCapacity(quantity);
    const roomDoc = this.hotelSrv.parseRoomDefaultByCapacityDocument(toParse);
    // console.log('roomDoc', roomDoc);
    const data = Object.assign({additionals: []}, roomDoc);
    this.item = data;
    this.onUpdateNroParticipants.next({index: this.index, data});
  }

  removeItem() {
    this.onRemove.next(this.index);
  }

}
