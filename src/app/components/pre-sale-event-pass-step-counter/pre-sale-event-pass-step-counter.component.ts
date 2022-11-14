import { Component, Input, OnInit } from '@angular/core';

@Component({
  selector: 'app-pre-sale-event-pass-step-counter',
  templateUrl: './pre-sale-event-pass-step-counter.component.html',
  styleUrls: ['./pre-sale-event-pass-step-counter.component.css']
})
export class PreSaleEventPassStepCounterComponent implements OnInit {

  @Input() step: number = 1;

  constructor() { }

  ngOnInit(): void {
  }

  get progressBarWidth(): number {
    switch (this.step) {
      case 1: return 0;
      case 2: return 100;
      default: return 0;
    }
  }

}
