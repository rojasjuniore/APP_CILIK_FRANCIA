import { Component, Input, OnInit } from '@angular/core';

@Component({
  selector: 'app-store-item-card',
  templateUrl: './store-item-card.component.html',
  styleUrls: ['./store-item-card.component.css']
})
export class StoreItemCardComponent implements OnInit {

  @Input() item: StoreItemCardParams = {
    isRecommended: true,
    img: 'assets/images/icons/plan-icon-1.png',
    title: 'Card Title',
    include: 'Lorem ipsum dolor sit amet, consectetur adipiscing elit.',
    headerColor: 'red',
  }

  constructor() { }

  ngOnInit(): void {
  }

}

export interface StoreItemCardParams {
  isRecommended: boolean;
  img: string;
  title: string;
  include: string;
  notInclude?: string;
  important?: string;
  headerColor: string;
}
