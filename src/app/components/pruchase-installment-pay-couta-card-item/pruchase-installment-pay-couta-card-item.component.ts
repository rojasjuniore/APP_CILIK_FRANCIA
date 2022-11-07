import { Component, Input, OnInit, Output } from '@angular/core';
import { Router } from '@angular/router';
import { Subject } from 'rxjs';
import { Sweetalert2Service } from 'src/app/services/sweetalert2.service';
import { environment } from 'src/environments/environment';

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
    // console.log('url', url);

    /** Eliminar de la cadena baseURL */
    const newUrl = url.replace(environment.urlWeb,'');
    console.log(newUrl);

    return this.router.navigate([ '/' + newUrl]);
  }

}
