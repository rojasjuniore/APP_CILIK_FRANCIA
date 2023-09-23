import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';

@Component({
  selector: 'app-purchase-details',
  templateUrl: './purchase-details.component.html',
  styleUrls: ['./purchase-details.component.css']
})
export class PurchaseDetailsComponent implements OnInit {

  public orderId!: string;

  constructor(
    private router: ActivatedRoute,
  ) {

    const orderId = this.router.snapshot.paramMap.get('orderId');
    console.log('orderId', orderId);
    this.orderId = orderId || '';
  }

  ngOnInit(): void {
  }

  get totales() {
    return 0;
  }

}
