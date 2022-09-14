import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { PreSaleService } from 'src/app/services/pre-sale.service';

@Component({
  selector: 'app-pre-sale-paypal',
  templateUrl: './pre-sale-paypal.component.html',
  styleUrls: ['./pre-sale-paypal.component.css']
})
export class PreSalePaypalComponent implements OnInit {

  public preSaleDocument: any;

  constructor(
    private router: Router,
    private preSaleSrv: PreSaleService,
  ) {
    this.preSaleDocument = this.preSaleSrv.checkAndLoadDocumentLocalStorage();
  }

  ngOnInit(): void { }


  get total(){
    const roomsAmount = this.preSaleDocument.rooms
      .map((room: any) => room.price)
      .reduce((a: number, b: number) => a + b, 0);

    const additionalDaysAmount = this.preSaleDocument.rooms
      .map((room) => room.additionals)
      .filter((row) => row.length > 0)
      .map((data) => data.map((row) => row.quantity * row.price).reduce((prev, curr) => prev + curr, 0))
      .reduce((prev, curr) => prev + curr, 0);

    const additionalCategoryPasses = this.preSaleDocument.additionalCategoryPasses
      .map((row) => row.quantity * row.price)
      .reduce((prev, curr) => prev + curr, 0)
      
    return [roomsAmount, additionalDaysAmount, additionalCategoryPasses]
    .reduce((prev, curr) => prev + curr, 0);
  }


  onBack(){
    this.preSaleSrv.updateDocumentLocalStorage({step: '/pre-sale/payment-method'});
    this.router.navigate(['/pre-sale/payment-method']);
  }
  onNext(){
    this.preSaleSrv.updateDocumentLocalStorage({step: '/purchase/summary', completed: true});
    this.router.navigate(['/purchase/summary']);
  }

}
