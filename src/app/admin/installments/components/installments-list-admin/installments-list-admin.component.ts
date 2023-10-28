import { Component, OnInit, SimpleChanges } from '@angular/core';
import { Router } from '@angular/router';
import { Observable, of } from 'rxjs';
import { PurchaseService } from 'src/app/services/purchase.service';
import { environment } from 'src/environments/environment';

@Component({
  selector: 'app-installments-list-admin',
  templateUrl: './installments-list-admin.component.html',
  styleUrls: ['./installments-list-admin.component.css']
})
export class InstallmentsListAdminComponent implements OnInit {

  public query = [
    { field: 'status', condition: '==', value: 'pending' },
    { field: 'paymentMethod', condition: '==', value: 'installments' },
  ];

  public opts = {
    orderBy: [{ field: "createdAt", order: "asc" }]
  }



  public purchases$!: Observable<any[]>;

  constructor(
    private purchaseSrv: PurchaseService,
    private router: Router,
  ) { }

  ngOnInit(): void {
    this.loadData();
  }

  ngOnChanges(changes: SimpleChanges): void {
    const { query, opts } = changes;

    if (query && query.currentValue) {
      // console.log('query', query.currentValue);
      this.query = query.currentValue;
    }

    if (opts && opts.currentValue) {
      // console.log('opts', opts.currentValue);
      this.opts = opts.currentValue;
    }

    this.loadData();
  }

  loadData() {
    if (this.query.length === 0) {
      this.purchases$ = of([]);
      return;
    }

    // console.log('query', this.query);
    /** Actualizar observable de listado de compras */
    this.purchases$ = this.purchaseSrv.getDynamic(environment.dataEvent.keyDb, this.query, this.opts);
    return;
  }

  onItemDetails(item: any): void {
    this.router.navigate([`/admin/installments-admin/${item.orderId}/manager`]);
  }
}
