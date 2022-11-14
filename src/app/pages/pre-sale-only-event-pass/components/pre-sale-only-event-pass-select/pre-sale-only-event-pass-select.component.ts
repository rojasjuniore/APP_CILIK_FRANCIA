import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { TranslatePipe } from '@ngx-translate/core';
import moment from 'moment';
import { PreSaleService } from 'src/app/services/pre-sale.service';
import { Sweetalert2Service } from 'src/app/services/sweetalert2.service';

@Component({
  selector: 'app-pre-sale-only-event-pass-select',
  templateUrl: './pre-sale-only-event-pass-select.component.html',
  styleUrls: ['./pre-sale-only-event-pass-select.component.css']
})
export class PreSaleOnlyEventPassSelectComponent implements OnInit {

  public nroParticipants = 0;

  public eventPassPriceList = [
    {"from": "2022/11/01", "to": "2022/11/30", "price": 234},
    {"from": "2022/12/01", "to": "2022/12/28", "price": 265},
    {"from": "2022/12/29", "to": "2023/01/28", "price": 299},
  ];
  public eventPassPriceFull = 299;
  public eventPassPrice = 299;

  constructor(
    public preSaleSrv: PreSaleService,
    private router: Router,
    private sweetAlert2Srv: Sweetalert2Service,
    private translatePipe: TranslatePipe,
  ) {
    const { eventPasses } = this.preSaleSrv.checkAndLoadDocumentLocalStorage();
    this.nroParticipants = (eventPasses.length > 0) ? eventPasses[0].quantity : 0;
    this.parsePrice();
  }

  ngOnInit(): void {}

  parsePrice(){
    const currentDate = moment();
    let indexPrice = this.eventPassPriceList.length - 1;

    for (let index = 0; index < this.eventPassPriceList.length; index++) {
      const row = this.eventPassPriceList[index];
      const from = moment(row.from, 'YYYY/MM/DD').startOf('day');
      const to = moment(row.to, 'YYYY/MM/DD').endOf('day');
      const isBetween = currentDate.isBetween(from, to);

      // console.log({
      //   currentDate: currentDate.format('DD/MM/YYYY'),
      //   from: from.format('DD/MM/YYYY'),
      //   to: to.format('DD/MM/YYYY'),
      // });

      if(isBetween){
        indexPrice = index;
        break;
      }
    }

    console.log('this.eventPassPriceList[indexPrice]', this.eventPassPriceList[indexPrice]);
    this.eventPassPrice = this.eventPassPriceList[indexPrice].price;
    return;
  }

  onUpdateQuantity(params: any) {
    this.nroParticipants = params.quantity;

    if(params.quantity > 0){
      const eventPasses = Object.assign({}, this.preSaleSrv.EVENTPASS_DEFAULT, {
        quantity: params.quantity, 
        price: this.eventPassPrice, 
        fullPrice: this.eventPassPriceFull
      });
      this.preSaleSrv.updateDocumentLocalStorage({nroParticipants: params.quantity, eventPasses: [eventPasses]});
    }else{
      this.preSaleSrv.updateDocumentLocalStorage({nroParticipants: params.quantity, eventPasses: []});
    }
  }

  async onNext(){
    if(this.nroParticipants === 0){
      /**
       * TODO: Translate
       */
      // const message = await this.translatePipe.transform('formValidations.additionalCategoriesRequired');
      const message = 'Debe seleccionar al menos un participante';
      this.sweetAlert2Srv.showWarning(message);
      return;
    }

    this.preSaleSrv.updateDocumentLocalStorage({step: '/pre-sale-event-pass/step2'});
    this.router.navigate(['/pre-sale-event-pass', 'step2']);
  }

}
