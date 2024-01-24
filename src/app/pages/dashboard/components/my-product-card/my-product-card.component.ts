import { Component, Input, OnInit } from '@angular/core';

@Component({
  selector: 'app-my-product-card',
  templateUrl: './my-product-card.component.html',
  styleUrls: ['./my-product-card.component.css']
})
export class MyProductCardComponent implements OnInit {
  @Input() products!: any;
  constructor() { }

  ngOnInit(): void {
  }

}
