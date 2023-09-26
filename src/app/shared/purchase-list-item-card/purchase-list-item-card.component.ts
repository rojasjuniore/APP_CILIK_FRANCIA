import { Component, Input, OnChanges, OnInit, SimpleChanges } from '@angular/core';
import { Router } from '@angular/router';

@Component({
  selector: 'app-purchase-list-item-card',
  templateUrl: './purchase-list-item-card.component.html',
  styleUrls: ['./purchase-list-item-card.component.css']
})
export class PurchaseListItemCardComponent implements OnInit, OnChanges {

  @Input() item: any;

  constructor(
    private router: Router,
  ) { }

  ngOnInit(): void {
  }

  ngOnChanges(changes: SimpleChanges): void {
    const { item } = changes;

    if(item && item.currentValue) {
      this.item = item.currentValue;
    }
  }

  goToDetails(): void{
    console.log('goToDetails', this.item);
    this.router.navigate([`/pages/purchases/${this.item._id}/details`]);
  }

}
