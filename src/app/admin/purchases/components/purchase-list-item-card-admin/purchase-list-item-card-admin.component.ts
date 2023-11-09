import { Component, Input, OnInit, Output, SimpleChanges } from '@angular/core';
import { Router } from '@angular/router';
import { Subject } from 'rxjs';

@Component({
  selector: 'app-purchase-list-item-card-admin',
  templateUrl: './purchase-list-item-card-admin.component.html',
  styleUrls: ['./purchase-list-item-card-admin.component.css']
})
export class PurchaseListItemCardAdminComponent implements OnInit {
  @Input() item: any;
  @Output() onItemDetails = new Subject<any>();

  constructor(
    private router: Router,
  ) { }

  ngOnInit(): void {
  }

  ngOnChanges(changes: SimpleChanges): void {
    const { item } = changes;

    if(item && item.currentValue) {
      this.item = item.currentValue;

      console.log('item', this.item);
    }
  }

  goToDetails(): void{
    // console.log('goToDetails', this.item);
    // this.router.navigate([`/pages/purchases/${this.item._id}/details`]);
    this.onItemDetails.next(this.item);
  }

}
