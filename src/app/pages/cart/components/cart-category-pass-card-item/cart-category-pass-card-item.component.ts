import { Component, Input, OnChanges, OnInit, Output, SimpleChanges } from '@angular/core';
import { Subject } from 'rxjs';
import { CodeStorageService } from 'src/app/services/code-storage.service';

@Component({
  selector: 'app-cart-category-pass-card-item',
  templateUrl: './cart-category-pass-card-item.component.html',
  styleUrls: ['./cart-category-pass-card-item.component.css']
})
export class CartCategoryPassCardItemComponent implements OnInit, OnChanges {

  @Input() item: any;
  @Input() couponObj: any;
  @Output() onRemoveItem = new Subject<any>();
  cupon: any;

  constructor(
    private codeStorageSrv: CodeStorageService
  ) { }


  ngOnChanges(changes: SimpleChanges): void {
    if (changes.couponObj.currentValue) {
      this.cupon = this.codeStorageSrv.findByConcept(this.couponObj.coupons, 'categoryPass');
    } else {
      this.cupon = null;
    }
  }

  ngOnInit(): void { }

  get total() {
    if (!this.item) return 0;
    return Number(this.item.totales);
  }

  get totales() {
    if (!this.item) return 0;
    const total = Number(this.item.totales);

    if (this.cupon && this.cupon.type === 'percentage') {
      return Math.ceil(Number(total - (total * (this.cupon.value / 100))))
    } else if (this.cupon && this.cupon.type === 'amount') {
      return Math.ceil(Number(total - this.cupon.value));
    } else {
      return Math.ceil((total));  // Return the original total if the discount type is not recognized
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

  remove(): void { this.onRemoveItem.next(this.item); }

}
