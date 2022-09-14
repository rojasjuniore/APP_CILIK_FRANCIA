import { Component, Input, OnInit, Output } from '@angular/core';
import { Subject } from 'rxjs';

@Component({
  selector: 'app-my-purchases-list-item',
  templateUrl: './my-purchases-list-item.component.html',
  styleUrls: ['./my-purchases-list-item.component.css']
})
export class MyPurchasesListItemComponent implements OnInit {

  @Input() order: any;
  @Output() onShowDetails = new Subject();

  constructor() { }

  ngOnInit(): void {
  }

  showDetails(){
    this.onShowDetails.next(this.order);
  }

}
