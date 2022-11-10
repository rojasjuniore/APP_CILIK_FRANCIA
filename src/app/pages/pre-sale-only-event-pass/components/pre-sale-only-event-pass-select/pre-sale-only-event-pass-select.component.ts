import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-pre-sale-only-event-pass-select',
  templateUrl: './pre-sale-only-event-pass-select.component.html',
  styleUrls: ['./pre-sale-only-event-pass-select.component.css']
})
export class PreSaleOnlyEventPassSelectComponent implements OnInit {

  constructor() { }

  ngOnInit(): void {
  }

  onUpdateQuantity(params: any) {
    console.log(params);
  }

}
