import { Component, Input, OnChanges, OnInit, Output, SimpleChanges } from '@angular/core';
import { Subject } from 'rxjs';

@Component({
  selector: 'app-input-group-number-form',
  templateUrl: './input-group-number-form.component.html',
  styleUrls: ['./input-group-number-form.component.css']
})
export class InputGroupNumberFormComponent implements OnInit, OnChanges {

  @Input() placeholder: string = '00';
  @Input() quantity!: number;
  @Input() min = 1;
  @Input() max = 0;

  @Output() onUpdateQuantity = new Subject<number>();

  constructor() { }

  ngOnInit(): void {
    if(this.quantity === undefined) {
      this.quantity = this.min;
    }
  }

  ngOnChanges(changes: SimpleChanges): void {
    const { quantity, min, max, placeholder } = changes;

    if(quantity && quantity.currentValue) {
      this.quantity = quantity.currentValue;
    }

    if(min && min.currentValue) {
      this.min = min.currentValue;
    }

    if(max && max.currentValue) {
      this.max = max.currentValue;
    }

    if(placeholder && placeholder.currentValue) {
      this.placeholder = placeholder.currentValue;
    }
  }

  handlerQuantity(type: string){
    switch (type) {
      case 'add':
        this.quantity = this.quantity + 1;  
        this.onUpdateQuantity.next(this.quantity);
        break;
    
      default:
        this.quantity = this.quantity - 1;
        this.onUpdateQuantity.next(this.quantity);
        break;
    }
  }

}
