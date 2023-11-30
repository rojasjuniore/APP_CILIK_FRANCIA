import { Component, Input, OnInit, ViewChild } from '@angular/core';
import { PurchaseAdviserModalComponent } from '../purchase-adviser-modal/purchase-adviser-modal.component';

@Component({
  selector: 'app-purchase-adviser',
  templateUrl: './purchase-adviser.component.html',
  styleUrls: ['./purchase-adviser.component.css']
})
export class PurchaseAdviserComponent implements OnInit {
  @Input() orderDoc: any;
  @ViewChild('purchaseAdviserModal') purchaseAdviserModal!: PurchaseAdviserModalComponent;
  public installments: any
  public isValidOrder = false;
  public installmentObj: any;
  public amount = 0;


  constructor() { }

  ngOnInit(): void {
  }

  buttonPay() {
    this.isValidOrder = true;
    setTimeout(() => {
      this.purchaseAdviserModal.showModal({});
    }, 300);
  }


  onModalAdviserView($event) {
    console.log($event)
  }


}
