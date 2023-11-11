import { Component, Input, OnInit, Output, SimpleChanges } from '@angular/core';
import { Router } from '@angular/router';
import { Subject } from 'rxjs';

@Component({
  selector: 'app-installments-purchase-list-item-card',
  templateUrl: './installments-purchase-list-item-card.component.html',
  styleUrls: ['./installments-purchase-list-item-card.component.css']
})
export class InstallmentsPurchaseListItemCardComponent implements OnInit {
  @Input() item: any;
  @Output() onItemDetails = new Subject<any>();

  constructor(
    private router: Router,
  ) { }

  ngOnInit(): void {
  }

  ngOnChanges(changes: SimpleChanges): void {
    const { item } = changes;
    if (item && item.currentValue) {
      this.item = item.currentValue;
    }
  }


  goToDetails(): void {
    this.router.navigate([`/admin/installments-admin/${this.item.orderId}/manager`]);

  }

}
