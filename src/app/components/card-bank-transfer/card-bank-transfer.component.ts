import { Component, Input, OnInit } from '@angular/core';
import { TranslatePipe } from '@ngx-translate/core';
import { HotelService } from 'src/app/services/hotel.service';
import { Sweetalert2Service } from 'src/app/services/sweetalert2.service';

@Component({
  selector: 'app-card-bank-transfer',
  templateUrl: './card-bank-transfer.component.html',
  styleUrls: ['./card-bank-transfer.component.css']
})
export class CardBankTransferComponent implements OnInit {

  @Input() order: any;

  constructor(
    private sweetAlert2Srv: Sweetalert2Service,
    private translatePipe: TranslatePipe,
    public hotelService: HotelService) { console.log(Math.random()) }

  ngOnInit(): void {
  }


  subirImg(event){
    if(event.target.files && event.target.files.length > 0){
      if(!['image/png', 'image/jpeg', 'image/jpg'].includes(event.target.files[0].type)){
        let message = this.translatePipe.transform('formValidations.selectIncorrectImg');
        this.sweetAlert2Srv.showInfo(message);
        return;
      }
      this.hotelService.loading = true;
      let file = event.target.files[0];
      this.hotelService.uploadComprobantes(file, this.order.orderId, this.order).then((resp) => {
        console.log(resp)
      })
    }
  }

}
