import { Component, Input, OnInit, Output } from '@angular/core';
import { Subject } from 'rxjs';

@Component({
  selector: 'app-input-number-form-two',
  templateUrl: './input-number-form-two.component.html',
  styleUrls: ['./input-number-form-two.component.css']
})
export class InputNumberFormTwoComponent implements OnInit {

  @Input() label: string = 'Label';
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
