import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-bank-transfer',
  templateUrl: './bank-transfer.component.html',
  styleUrls: ['./bank-transfer.component.css']
})
export class BankTransferComponent implements OnInit {

  public query = [
    {field: 'status', condition: '==', value: 'pending'},
    {field: 'paymentMethod', condition: '==', value: 'bankTransfer'},
  ];

  public opts = {
    orderBy: [{ field: "createdAt", order: "asc" }]
  }

  constructor() { }

  ngOnInit(): void {
  }

}
