import { Component } from '@angular/core';
import { CustomTranslateService } from 'src/app/services/custom-translate.service';
import { DataService } from './services/data.service';
import { HotelService } from './services/hotel.service';

import { pick, omit } from 'underscore';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css'],
})
export class AppComponent {

  public title = 'WLDC';
  public currentLanguage: string;

  constructor(
    public translateSrv: CustomTranslateService,
    private dataSrv: DataService,
    private hotelSrv: HotelService
  ) {
    this.currentLanguage = this.translateSrv.currentLanguage;
  }

  ngOnInit(): void {
    this.translateSrv.changeLanguage('en');
    // this.contractService.connectAccount()
    // this.contractService.reInitializating()
  }

  changeLanguage(language: string) {
    this.translateSrv.changeLanguage(language);
    this.currentLanguage = language;
  }

  /**
   * @description Prueba de contadores
   */
  // async test(){
  //   await this.hotelSrv.updateRoomStockSupplyCounter('HAB10000', -1)
  // }

  /**
   * @description Registrar stock de habitaciones
   */
  async storeRoomStock(){
    const roomTypes = await this.dataSrv.getDataFile('roomStock');
    console.log('roomTypes', roomTypes);

    const toAwait = roomTypes.map(async (roomType) => this.hotelSrv.storeRoomStock(roomType.code, roomType));
    await Promise.all(toAwait);

    console.log({roomTypes});
    console.log('stored room stock');
  }


  /**
   * @description Registrar tipos de habitaciones
   */
  async storeRoomTypes(){
    const roomTypes = await this.dataSrv.getDataFile('roomTypes');
    console.log('roomTypes', roomTypes);

    const toAwait = roomTypes.map(async (roomType) => this.hotelSrv.storeRoomType(roomType.roomCode, roomType));
    await Promise.all(toAwait);

    console.log({roomTypes});
    console.log('stored roomTypes');
  }

  /**
   * @description Registrar adicionales
   */
  async storeRoomAdditionals(){
    const roomTypes = await this.dataSrv.getDataFile('roomAdditionals');

    const toAwait = roomTypes.map(async (row) => this.hotelSrv.storeAdditionals(row.roomCode, row));
    await Promise.all(toAwait);

    console.log({roomTypes});
    console.log('stored additionals');
  }

  /**
   * @description Registrar pases de categoria adicionales
   */
  async storeCategoriesPasses(){
    const roomTypes = await this.dataSrv.getDataFile('categories');

    const toAwait = roomTypes.map(async (row) => this.hotelSrv.storeCategoriesPasses(row.type, row));
    await Promise.all(toAwait);

    console.log({roomTypes});
    console.log('stored categories passes');
  }

  /**
   * @description Registrar habitaciones
   */
  async storeRooms(){
    const roomTypes = await this.dataSrv.getDataFile('roomStock');

    const toAwait: any[] = [];

    for (const room of roomTypes) {
      if(room.status){
        for (let index = 1; index <= room.totalStock; index++) {
          const snapshot = omit(room, [
            'totalStock',
            'saved',
            'stock',
            'supply',
            'roomCounter'
          ]);
  
          const roomCodeCounter = room.roomCounter + index;
          const roomCode = `${room.prefix}${roomCodeCounter}`;
          const status = (index <= room.supply) ? true : false;
          console.log('roomCode', roomCode);
  
          const data = Object.assign({}, snapshot, {
              roomCode,
              roomType: null,
              paymentType: null,
              paymentTypeDescription: null,
              paymentOrderID: null,
              additionals: null,
              roomQRCode: null,
              status
          });
  
          // console.log('room', data);
  
          toAwait.push(this.hotelSrv.storeRoom(roomCode, data));
        }
      }
    }

    await Promise.all(toAwait);

    console.log('stored rooms');
  }

  public getState(outlet) {
    return outlet.activatedRouteData.state;
  }
}
