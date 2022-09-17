import { Component, Input, OnInit } from '@angular/core';

@Component({
  selector: 'app-pre-sale-categories-step-counter',
  templateUrl: './pre-sale-categories-step-counter.component.html',
  styleUrls: ['./pre-sale-categories-step-counter.component.css']
})
export class PreSaleCategoriesStepCounterComponent implements OnInit {

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
