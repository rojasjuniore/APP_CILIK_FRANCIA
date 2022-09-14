import { Component, Input, OnInit, Output } from '@angular/core';
import { Subject } from 'rxjs';
import { HotelService } from 'src/app/services/hotel.service';

@Component({
  selector: 'app-pre-sale-add-room-button',
  templateUrl: './pre-sale-add-room-button.component.html',
  styleUrls: ['./pre-sale-add-room-button.component.css']
})
export class PreSaleAddRoomButtonComponent implements OnInit {


  @Input() capacity = 1;
  @Output() onAddRoom = new Subject();

  public loading = false;

  constructor(
    private hotelSrv: HotelService,
  ) { }

  ngOnInit(): void {
  }

  async addRoom(capacity = 1){
    try {
      this.loading = true;
      const result = await this.hotelSrv.getRoomDefaultByCapacity(capacity);
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
