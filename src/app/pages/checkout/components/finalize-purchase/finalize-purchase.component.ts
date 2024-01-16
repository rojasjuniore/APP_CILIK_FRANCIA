import { Component, OnInit, Output } from '@angular/core';
import { Subject } from 'rxjs';
import { OnPaypalCallback } from '../paypal-button/paypal-button.component';
import { Sweetalert2Service } from 'src/app/services/sweetalert2.service';

@Component({
  selector: 'app-finalize-purchase',
  templateUrl: './finalize-purchase.component.html',
  styleUrls: ['./finalize-purchase.component.css']
})
export class FinalizePurchaseComponent implements OnInit {

  @Output() onSelectOption = new Subject<any>();


  constructor(
    private sweetalert2Srv: Sweetalert2Service
  ) { }

  ngOnInit(): void {
  }


  async confirmOption() {
    const ask = await this.sweetalert2Srv.askConfirm('Are you sure to finalize the purchase?');
    console.log("ask", ask)
    if (!ask) return

    const obj = {
      type: 'success',
      date: Date.now()
    }

    console.log("obj", obj)
    return this.onSelectOption.next({ type: 'success', data: obj });
  }

}
