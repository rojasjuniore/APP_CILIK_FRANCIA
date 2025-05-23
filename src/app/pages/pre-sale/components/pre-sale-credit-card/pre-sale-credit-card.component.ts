import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { PreSaleService } from 'src/app/services/pre-sale.service';

@Component({
  selector: 'app-pre-sale-credit-card',
  templateUrl: './pre-sale-credit-card.component.html',
  styleUrls: ['./pre-sale-credit-card.component.css']
})
export class PreSaleCreditCardComponent implements OnInit {

  constructor(
    private router: Router,
    private preSaleSrv: PreSaleService,
  ) { }

  ngOnInit(): void { }

  onBack(){
    this.preSaleSrv.updateDocumentLocalStorage({step: '/pre-sale/payment-method'});
    this.router.navigate(['/pre-sale/payment-method']);
  }

  onNext(){
    this.preSaleSrv.updateDocumentLocalStorage({step: '/purchase/summary', completed: true});
    this.router.navigate(['/purchase/summary']);;

  }

}
