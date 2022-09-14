import { Component, Input, OnInit } from '@angular/core';

@Component({
  selector: 'app-my-purchases-list-item',
  templateUrl: './my-purchases-list-item.component.html',
  styleUrls: ['./my-purchases-list-item.component.css']
})
export class MyPurchasesListItemComponent implements OnInit {

  @Input() order: any;

  constructor() { }

  ngOnInit(): void {
  }

  showDetails(){
    
  }

}
