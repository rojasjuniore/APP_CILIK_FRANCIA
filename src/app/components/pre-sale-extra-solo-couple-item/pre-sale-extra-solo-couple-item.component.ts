import { Component, Input, OnChanges, OnInit, Output, SimpleChanges } from '@angular/core';
import { from, Observable, Subject } from 'rxjs';
import { HotelService } from 'src/app/services/hotel.service';

@Component({
  selector: 'app-pre-sale-extra-solo-couple-item',
  templateUrl: './pre-sale-extra-solo-couple-item.component.html',
  styleUrls: ['./pre-sale-extra-solo-couple-item.component.css']
})
export class PreSaleExtraSoloCoupleItemComponent implements OnInit, OnChanges {

  @Input() min = 0;
  @Input() max = 99;
  @Input() quantity = 0;

  @Output() onUpdateQuantity = new Subject();

  public document$!: Observable<any>;

  constructor(
    private hotelSrv: HotelService,
  ) { }

  ngOnInit(): void {
    this.document$ = from(this.hotelSrv.getCategoryPassesByCode('couple'));
  }

  get coupleCounter(){
    const result = (this.quantity / 2);
    return result > 0 ? result : 0;
  }
  
  ngOnChanges(changes: SimpleChanges): void {
    const { quantity } = changes;
    if (quantity) {
      this.quantity = quantity.currentValue;
    }
  }

  updateQuantity(params: any) {
    const { data, quantity } = params;
    this.quantity = quantity * 2;
    this.onUpdateQuantity.next({
      type: 'couple', 
      quantity: this.quantity, 
      price: data.price,
      fullPrice: data.fullPrice,
      label: data.label,
      order: 1,
    });
  }

}
