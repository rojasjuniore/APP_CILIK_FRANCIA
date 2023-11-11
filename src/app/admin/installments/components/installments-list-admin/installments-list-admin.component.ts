import { Component, OnInit, SimpleChanges } from '@angular/core';
import { FormBuilder, FormGroup } from '@angular/forms';
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

  public queries = {
    pending: {
      available: true,
      sort: "pending",
      query: [
        { field: 'status', condition: '==', value: 'pending' },
        { field: 'paymentMethod', condition: '==', value: 'installments' },
        // {field: 'uid', condition: '==', value: null},
      ],
      opts: { orderBy: [{ field: "createdAt", order: "desc" }] }
    },
    paymentProcess: {
      available: true,
      sort: "paymentProcess",
      query: [
        { field: 'status', condition: '==', value: 'paymentProcess' },
        { field: 'paymentMethod', condition: '==', value: 'installments' },
        // {field: 'uid', condition: '==', value: null},
      ],
      opts: { orderBy: [{ field: "createdAt", order: "desc" }] }
    },
    completed: {
      available: true,
      sort: "completed",
      query: [
        { field: 'status', condition: '==', value: 'completed' },
        { field: 'paymentMethod', condition: '==', value: 'installments' },
        // {field: 'uid', condition: '==', value: null},
      ],
      opts: { orderBy: [{ field: "createdAt", order: "desc" }] }
    },
    rejected: {
      available: true,
      sort: "rejected",
      query: [
        { field: 'status', condition: '==', value: 'rejected' },
        { field: 'paymentMethod', condition: '==', value: 'installments' },
        // {field: 'uid', condition: '==', value: null},
      ],
      opts: { orderBy: [{ field: "createdAt", order: "desc" }] }
    },
  };

  constructor(
    private purchaseSrv: PurchaseService,
    private router: Router,
  ) { }


  ngOnInit(): void {
  }


  onItemDetails(item: any): void {
    this.router.navigate([`/admin/installments-admin/${item.orderId}/manager`]);
  }
}
