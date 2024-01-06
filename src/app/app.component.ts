import { Component } from '@angular/core';
import { CustomTranslateService } from 'src/app/services/custom-translate.service';
import { DataService } from './services/data.service';
import { HotelService } from './services/hotel.service';

import { pick, omit } from 'underscore';
import { NavigationEnd, Router } from '@angular/router';
import { CommonService } from './services/common.service';
import { CodeStorageService } from './services/code-storage.service';
import { VersionService } from './services/version.service';
import { environment } from 'src/environments/environment';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css'],
})
export class AppComponent {

  public title = 'WLDC';
  public currentLanguage: string;

  constructor(
    private codeStorageSrv: CodeStorageService,
    private commonSrv: CommonService,
    public translateSrv: CustomTranslateService,
    private dataSrv: DataService,
    private hotelSrv: HotelService,
    private router: Router,
    private versionSrv: VersionService,
  ) {
    this.currentLanguage = window.localStorage.getItem('lang') || 'en' || this.translateSrv.currentLanguage;

  }

  ngOnInit(): void {

    // Suponiendo que guardas la versión en tu archivo de entorno
    this.versionSrv.checkForUpdates(environment.version);


    this.translateSrv.changeLanguage(this.currentLanguage);

    this.router.events.subscribe((event) => {
      if (!(event instanceof NavigationEnd)) {
        return;
      }

      setTimeout(() => {
        window.scrollTo(0, 0)
      }, 0);
    });

    /**
     * TODO: obtenemos el code del referido
     */
    const codeCoupon: any = this.commonSrv.getParameterByName('code');
    if (codeCoupon) {
      this.codeStorageSrv.setItem(codeCoupon);
    }
  }

  changeLanguage(language: string) {
    this.translateSrv.changeLanguage(language);
    this.currentLanguage = language;
  }


  /**
   * @description Registrar stock de habitaciones
   */
  async storeRoomStock() {
    const roomTypes = await this.dataSrv.getDataFile('roomStock');
    console.log('roomTypes', roomTypes);

    const toAwait = roomTypes.map(async (roomType) => this.hotelSrv.storeRoomStock(roomType.code, roomType));
    await Promise.all(toAwait);

    console.log({ roomTypes });
    console.log('stored room stock');
  }


  /**
   * @description Registrar tipos de habitaciones
   */
  async storeRoomTypes() {
    const roomTypes = await this.dataSrv.getDataFile('roomTypes');
    console.log('roomTypes', roomTypes);

    const toAwait = roomTypes.map(async (roomType) => this.hotelSrv.storeRoomType(roomType.roomCode, roomType));
    await Promise.all(toAwait);

    console.log({ roomTypes });
    console.log('stored roomTypes');
  }

  /**
   * @description Registrar adicionales
   */
  async storeRoomAdditionals() {
    const roomTypes = await this.dataSrv.getDataFile('roomAdditionals');

    const toAwait = roomTypes.map(async (row) => this.hotelSrv.storeAdditionals(row.roomCode, row));
    await Promise.all(toAwait);

    console.log({ roomTypes });
    console.log('stored additionals');
  }

  /**
   * @description Registrar pases de categoria adicionales
   */
  async storeCategoriesPasses() {
    const roomTypes = await this.dataSrv.getDataFile('categories');

    const toAwait = roomTypes.map(async (row) => this.hotelSrv.storeCategoriesPasses(row.type, row));
    await Promise.all(toAwait);

    console.log({ roomTypes });
    console.log('stored categories passes');
  }

  /**
   * @description Registrar habitaciones
   */
  async storeRooms() {
    const roomTypes = await this.dataSrv.getDataFile('roomStock');

    const toAwait: any[] = [];

    for (const room of roomTypes) {
      if (room.status) {
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
