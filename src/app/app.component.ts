import { Component } from '@angular/core';
import { CustomTranslateService } from 'src/app/services/custom-translate.service';
import { DataService } from './services/data.service';
import { HotelService } from './services/hotel.service';

import { pick } from 'underscore';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css'],
})
export class AppComponent {
  title = 'xpocripto';
  public currentLanguage: string;
  constructor(
    public translateSrv: CustomTranslateService,
    private dataSrv: DataService,
    private hotelSrv: HotelService
  ) {
    this.currentLanguage = this.translateSrv.currentLanguage;
  }

  ngOnInit(): void {
    // this.contractService.connectAccount()
    // this.contractService.reInitializating()
    // this.test();
  }

  changeLanguage(language: string) {
    this.translateSrv.changeLanguage(language);
    this.currentLanguage = language;
  }

  /**
   * @description Prueba de contadores
   */
  // async test(){
  //   await this.hotelSrv.updateRoomTypeSupply('HAB10000', -1)
  // }

  /**
   * @description Registrar habitaciones
   */
  // async test(){
  //   const roomTypes = await this.dataSrv.getDataFile('roomTypes');

  //   const toAwait: any[] = [];

  //   for (const room of roomTypes) {
  //     for (let index = 1; index <= room.quantity; index++) {
  //       const snapshot = pick(room, [
  //         'ubicationType',
  //         'ubicationTypeDescription',
  //         'description',
  //         'capacity',
  //       ]);

  //       const roomCodeCounter = room.roomCounter + index;
  //       const roomCode = `${room.roomCodePrefix}${roomCodeCounter}`;

  //       const data = Object.assign({
  //           roomCodeType: room.roomCode,
  //           roomCode,
  //           paymentType: null,
  //           paymentTypeDescription: null,
  //           paymentOrderID: null,
  //           additionals: null,
  //           roomQRCode: null,
  //       }, snapshot);

  //       console.log('room', data);

  //       toAwait.push(this.hotelSrv.storeRoom(roomCode, data));
  //     }
  //   }

  //   await Promise.all(toAwait);

  //   console.log('stored rooms');
  // }

  /**
   * @description Registrar tipos de habitaciones
   */
  // async test(){
  //   const roomTypes = await this.dataSrv.getDataFile('roomTypes');
  //   console.log('roomTypes', roomTypes);

  //   const toAwait = roomTypes.map(async (roomType) => this.hotelSrv.storeRoomType(roomType.roomCode, roomType));
  //   await Promise.all(toAwait);

  //   console.log({roomTypes});
  //   console.log('stored roomTypes');
  // }

  /**
   * @description Registrar adicionales
   */
  // async test(){
  //   const roomTypes = await this.dataSrv.getDataFile('additionals');

  //   const toAwait = roomTypes.map(async (row) => this.hotelSrv.storeAdditionals(row.roomCode, row));
  //   await Promise.all(toAwait);

  //   console.log({roomTypes});
  //   console.log('stored additionals');
  // }

  /**
   * @description Registrar pases de categoria adicionales
   */
  // async test(){
  //   const roomTypes = await this.dataSrv.getDataFile('categories');

  //   const toAwait = roomTypes.map(async (row) => this.hotelSrv.storeCategoriesPasses(row.type, row));
  //   await Promise.all(toAwait);

  //   console.log({roomTypes});
  //   console.log('stored categories passes');
  // }

  public getState(outlet) {
    return outlet.activatedRouteData.state;
  }
}
