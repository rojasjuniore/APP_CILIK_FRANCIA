import { Component, Input, OnInit, Output } from '@angular/core';
import { Subject } from 'rxjs';
import { Sweetalert2Service } from 'src/app/services/sweetalert2.service';

@Component({
  selector: 'app-pruchase-installment-pay-couta-card-item',
  templateUrl: './pruchase-installment-pay-couta-card-item.component.html',
  styleUrls: ['./pruchase-installment-pay-couta-card-item.component.css']
})
export class PruchaseInstallmentPayCoutaCardItemComponent implements OnInit {

  @Input() index: number = 0;
  @Input() item: any;

  @Output() onSelectShowPaymentMethods = new Subject();

  constructor(
    private sweetAlert2Srv: Sweetalert2Service,
  ) { }

  ngOnInit(): void {
    this.showPaymentMethods();
  }

  async alreadyPaid() {
    return this.sweetAlert2Srv.showInfo('Esta cuota ya fue pagada');
  }

  async showPaymentMethods() {
    return this.onSelectShowPaymentMethods.next({
      item: this.item,
      index: this.index,
      type: this.item.paymentMethod
    });
  }

}
