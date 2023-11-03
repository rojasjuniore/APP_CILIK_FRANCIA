import { Component, Input, OnChanges, OnInit, Output, SimpleChanges } from '@angular/core';
import { Subject } from 'rxjs';
import { CodeStorageService } from 'src/app/services/code-storage.service';

@Component({
  selector: 'app-cart-hotel-event-card-item',
  templateUrl: './cart-hotel-event-card-item.component.html',
  styleUrls: ['./cart-hotel-event-card-item.component.css']
})
export class CartHotelEventCardItemComponent implements OnInit, OnChanges {

  @Input() item: any;
  @Input() couponObj: any;
  @Output() onRemoveItem = new Subject<any>();

  public loader = false;
  cupon: any;

  constructor(
    private codeStorageSrv: CodeStorageService
  ) { }

  ngOnInit(): void {
    // this.cupon = this.codeStorageSrv.findByConcept(this.couponObj.coupons, 'hotelAndEvent');

  }


  ngOnChanges(changes: SimpleChanges): void {
    if (changes.couponObj && changes.couponObj.currentValue) {
      this.cupon = this.codeStorageSrv.findByConcept(this.couponObj.coupons, 'hotelAndEvent');
    } else {
      this.cupon = null;
    }
  }



  // get totales() {
  //   if (!this.item) { return 0; }
  //   return this.item.totales;
  // }


  get total() {
    if (!this.item) return 0;
    return Math.ceil(this.item.totales);
  }

  get totales() {
    if (!this.item) return 0;
    const total = Number(this.item.totales);

    if (this.cupon && this.cupon.type === 'percentage') {
      return Math.ceil(total - (total * (this.cupon.value / 100)));
    } else if (this.cupon && this.cupon.type === 'amount') {
      return Math.ceil(total - this.cupon.value);
    } else {
      return total;  // Return the original total if the discount type is not recognized
    }
  }


  get descuento() {
    if (!this.item || !this.cupon) return 0;
    const total = Number(this.item.totales);

    if (this.cupon.type === 'percentage') {
      return Math.ceil(total * (this.cupon.value / 100));
    } else if (this.cupon.type === 'amount') {
      return Math.ceil(this.cupon.value);
    } else {
      return 0;  // Return 0 if the discount type is not recognized
    }
  }



  /**
   * Fecha de ingreso
   */
  get checkIn() {
    if (!this.item) { return null; }
    return this.item.room.dates[0].date;
  }

  /**
   * Fecha de salida
   */
  get checkOut() {
    if (!this.item) { return null; }
    return this.item.room.dates[this.item.room.dates.length - 1].date;
  }

  get nroNights() {
    if (!this.item) { return 0; }
    return this.item.room.dates.length - 1;
  }

  remove() {
    this.loader = true;
    this.onRemoveItem.next(this.item);
  }

}
