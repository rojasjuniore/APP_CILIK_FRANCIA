import { Component, Input, OnInit, Output } from '@angular/core';
import { Router } from '@angular/router';
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
    private router: Router,
  ) { }

  ngOnInit(): void { }

  async alreadyPaid() {
    return this.sweetAlert2Srv.showInfo('Esta cuota ya fue pagada');
  }

  async showPaymentMethods() {
    const { url } = this.item;
    console.log('url', url);
    return this.router.navigate([url]);
    // return this.onSelectShowPaymentMethods.next({
    //   item: this.item,
    //   index: this.index,
    //   type: this.item.paymentMethod,
    //   payed: this.item.payed,
    // });
  }

}
