import { Component, Input, OnInit } from '@angular/core';

@Component({
  selector: 'app-pre-sale-installment-couta-card-item',
  templateUrl: './pre-sale-installment-couta-card-item.component.html',
  styleUrls: ['./pre-sale-installment-couta-card-item.component.css']
})
export class PreSaleInstallmentCoutaCardItemComponent implements OnInit {

  @Input() index: number = 0;
  @Input() item: any;

  constructor() { }

  ngOnInit(): void {
  }

}
