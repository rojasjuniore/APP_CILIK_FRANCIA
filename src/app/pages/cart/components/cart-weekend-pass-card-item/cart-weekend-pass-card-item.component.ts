import { Component, Input, OnChanges, OnInit, Output, SimpleChanges } from '@angular/core';
import { Subject } from 'rxjs';
import { CodeStorageService } from 'src/app/services/code-storage.service';

@Component({
  selector: 'app-cart-weekend-pass-card-item',
  templateUrl: './cart-weekend-pass-card-item.component.html',
  styleUrls: ['./cart-weekend-pass-card-item.component.css']
})
export class CartWeekendPassCardItemComponent implements OnInit, OnChanges {

  @Input() item: any;
  @Input() couponObj: any;
  @Output() onRemoveItem = new Subject<any>();
  cupon: any;

  constructor(
    private codeStorageSrv: CodeStorageService
  ) { }


  ngOnInit(): void {
  }


  ngOnChanges(changes: SimpleChanges): void {
    if (changes.couponObj.currentValue) {
      this.cupon = this.codeStorageSrv.findByConcept(this.couponObj.coupons, 'categoryPass');
    } else {
      this.cupon = null;
    }
  }

  // get totales() {
  //   if(!this.item) return 0;
  //   return Number(this.item.price) * Number(this.item.quantity);
  // }


  get total() {
    if (!this.item) return 0;
    return Number(this.item.price) * Number(this.item.quantity);
  }

  get totales() {
    if (!this.item) return 0;
    const total = Number(this.item.price) * Number(this.item.quantity);

    if (this.cupon && this.cupon.type === 'percentage') {
      return total - (total * (this.cupon.value / 100));
    } else if (this.cupon && this.cupon.type === 'amount') {
      return total - this.cupon.value;
    } else {
      return total;  // Return the original total if the discount type is not recognized
    }
  }


  get descuento() {
    if (!this.item || !this.cupon) return 0;
    const total = Number(this.item.price) * Number(this.item.quantity);

    if (this.cupon && this.cupon.type === 'percentage') {
      return total * (this.cupon.value / 100);
    } else if (this.cupon && this.cupon.type === 'amount') {
      return this.cupon.value;
    } else {
      return 0;  // Return 0 if the discount type is not recognized
    }
  }


  get checkIn() {
    if (!this.item) return '';
    return this.item.dates[0].date;
  }

  get checkOut() {
    if (!this.item) return '';
    return this.item.dates[this.item.dates.length - 1].date;
  }

  remove(): void { this.onRemoveItem.next(this.item); }

}

