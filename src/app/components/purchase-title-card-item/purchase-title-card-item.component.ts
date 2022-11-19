import { Component, Input, OnInit } from '@angular/core';

@Component({
  selector: 'app-purchase-title-card-item',
  templateUrl: './purchase-title-card-item.component.html',
  styleUrls: ['./purchase-title-card-item.component.css']
})
export class PurchaseTitleCardItemComponent implements OnInit {

  @Input() orderType = "fullPass";

  constructor() { }

  ngOnInit(): void {
  }

}
