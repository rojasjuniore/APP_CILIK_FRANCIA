import { Component, Input, OnChanges, OnInit, Output, SimpleChanges } from '@angular/core';
import { Subject } from 'rxjs';
import { HotelService } from 'src/app/services/dedicates/hotel.service';
import { PreSaleService } from 'src/app/services/pre-sale.service';

@Component({
  selector: 'app-pre-sale-add-room-button',
  templateUrl: './pre-sale-add-room-button.component.html',
  styleUrls: ['./pre-sale-add-room-button.component.css']
})
export class PreSaleAddRoomButtonComponent implements OnInit, OnChanges {

  @Input() capacity = 1;
  @Input() disabled = false;
  @Output() onAddRoom = new Subject();

  public loading = false;

  constructor(
    private hotelSrv: HotelService,
    private preSaleSrv: PreSaleService,
  ) { }

  ngOnInit(): void {
  }

  ngOnChanges(changes: SimpleChanges): void {
    const { disabled } = changes;

    if(disabled){
      this.disabled = disabled.currentValue;
    }
  }

  async addRoom(capacity = 1){
    try {
      this.loading = true;
      const { orderType } = this.preSaleSrv.getDocumentLocalStorage();

      const result = await this.hotelSrv.getRoomDefaultByCapacity(capacity, orderType);
      this.onAddRoom.next(
        this.hotelSrv.parseRoomDefaultByCapacityDocument(result)
      );
      return;
      
    } catch (err) {
      console.log('Error on PreSalePackagesListComponent.addRoom()', err);
    }finally{
      this.loading = false;
    }
  }

}
