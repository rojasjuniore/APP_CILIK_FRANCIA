import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-bank-transfer',
  templateUrl: './bank-transfer.component.html',
  styleUrls: ['./bank-transfer.component.css']
})
export class BankTransferComponent implements OnInit {

  public queries = {
    pending: {
      available: true,
      sort: "pending",
      query: [
        { field: 'status', condition: '==', value: 'pending' },
        { field: 'paymentMethod', condition: '==', value: 'bankTransfer' },
        // {field: 'uid', condition: '==', value: null},
      ],
      opts: { orderBy: [{ field: "createdAt", order: "desc" }] }
    },
    paymentProcess: {
      available: true,
      sort: "paymentProcess",
      query: [
        { field: 'status', condition: '==', value: 'paymentProcess' },
        { field: 'paymentMethod', condition: '==', value: 'bankTransfer' },
        // {field: 'uid', condition: '==', value: null},
      ],
      opts: { orderBy: [{ field: "createdAt", order: "desc" }] }
    },
    completed: {
      available: true,
      sort: "completed",
      query: [
        { field: 'status', condition: '==', value: 'completed' },
        { field: 'paymentMethod', condition: '==', value: 'bankTransfer' },
        // {field: 'uid', condition: '==', value: null},
      ],
      opts: { orderBy: [{ field: "createdAt", order: "desc" }] }
    },
    rejected: {
      available: true,
      sort: "rejected",
      query: [
        { field: 'status', condition: '==', value: 'rejected' },
        { field: 'paymentMethod', condition: '==', value: 'bankTransfer' },
        // {field: 'uid', condition: '==', value: null},
      ],
      opts: { orderBy: [{ field: "createdAt", order: "desc" }] }
    },
  };



  public opts = {
    orderBy: [{ field: "createdAt", order: "asc" }]
  }

  constructor() { }

  ngOnInit(): void {
  }

}
