import { Component, Input, OnInit } from '@angular/core';

@Component({
  selector: 'app-pre-sale-steps-counter',
  templateUrl: './pre-sale-steps-counter.component.html',
  styleUrls: ['./pre-sale-steps-counter.component.css']
})
export class PreSaleStepsCounterComponent implements OnInit {

  @Input() step: number = 1;

  constructor() { }

  ngOnInit(): void {
  }

  get progressBarWidth(): number {
    switch (this.step) {
      case 1: return 0;
      case 2: return 50;
      case 3: return 100;
      default: return 0;
    }
  }

}
