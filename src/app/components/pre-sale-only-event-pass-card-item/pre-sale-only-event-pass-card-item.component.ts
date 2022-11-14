import { Component, Input, OnChanges, OnInit, Output, SimpleChanges } from '@angular/core';
import { from, Observable, Subject } from 'rxjs';
import { HotelService } from 'src/app/services/hotel.service';

@Component({
  selector: 'app-pre-sale-only-event-pass-card-item',
  templateUrl: './pre-sale-only-event-pass-card-item.component.html',
  styleUrls: ['./pre-sale-only-event-pass-card-item.component.css']
})
export class PreSaleOnlyEventPassCardItemComponent implements OnInit, OnChanges {

  @Input() min = 0;
  @Input() max = 99;
  @Input() quantity = 0;

  @Output() onUpdateQuantity = new Subject();

  public document$!: Observable<any>;

  constructor( ) { }

  ngOnInit(): void { }

  ngOnChanges(changes: SimpleChanges): void {
    const { quantity } = changes;
    if (quantity) {
      this.quantity = quantity.currentValue;
    }
  }

  updateQuantity(quantity: any) {
    // const { data, quantity } = params;
    this.quantity = quantity;
    this.onUpdateQuantity.next({ quantity });
    // this.onUpdateQuantity.next({
    //   type: 'solo', 
    //   quantity, 
    //   price: data.price,
    //   fullPrice: data.fullPrice,
    //   label: data.label,
    //   order: 0
    // });
  }

}
