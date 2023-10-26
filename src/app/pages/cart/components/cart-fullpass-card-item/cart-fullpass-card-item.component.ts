import { Component, Input, OnChanges, OnInit, Output, SimpleChanges } from '@angular/core';
import { Subject } from 'rxjs';
import { CodeStorageService } from 'src/app/services/code-storage.service';

@Component({
  selector: 'app-cart-fullpass-card-item',
  templateUrl: './cart-fullpass-card-item.component.html',
  styleUrls: ['./cart-fullpass-card-item.component.css']
})
export class CartFullpassCardItemComponent implements OnInit, OnChanges {

  @Input() item: any;

  @Input() couponObj: any;

  @Output() onRemoveItem = new Subject<any>();

  public loader = false;
  cupon: any;

  constructor(private codeStorageSrv: CodeStorageService) { }

  ngOnInit(): void {
  }

  ngOnChanges(changes: SimpleChanges): void {
    if (changes.couponObj.currentValue) {
      this.cupon = this.codeStorageSrv.findByConcept(this.couponObj.coupons, 'fullPass');
    } else {
      this.cupon = null;
    }
  }


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

    if (this.cupon.type === 'percentage') {
      return total * (this.cupon.value / 100);
    } else if (this.cupon.type === 'amount') {
      return this.cupon.value;
    } else {
      return 0;  // Return 0 if the discount type is not recognized
    }
  }

  remove(): void {
    this.loader = true;
    this.onRemoveItem.next(this.item);
  }

}
