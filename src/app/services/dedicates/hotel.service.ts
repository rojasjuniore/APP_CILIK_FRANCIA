import { Injectable } from '@angular/core';
import { AngularFirestore, Query } from '@angular/fire/compat/firestore';
import { increment } from '@angular/fire/firestore';
import { finalize, lastValueFrom, Observable } from 'rxjs';
import { handlerArrayResult, handlerObjectResult } from '../../helpers/model.helper';
import { getStorage, ref, deleteObject } from "firebase/storage";

import { pick } from 'underscore';
import moment from 'moment';
import { AngularFireStorage } from '@angular/fire/compat/storage';
import { environment } from 'src/environments/environment';
import { EventInfoService } from './event-info.service';
import { TranslateService } from '@ngx-translate/core';

@Injectable({
  providedIn: 'root'
})
export class HotelService {

  public purchases = environment.production ? 'purchases' : 'purchases-dev';
  public roomTypesCollection = environment.production ? 'room__types' : 'room__types-dev';
  public additionalsCollection = environment.production ? 'room__additionals' : 'room__additionals-dev';
  public categoryPassesCollection = environment.production ? 'categoryPasses' : 'categoryPasses-dev';
  public roomStock = environment.production ? 'room__stock' : 'room__stock-dev';
  public roomsCollection = environment.production ? 'rooms' : 'rooms-dev';

  loading = false;

  /**
   * Tipos de ubicación
   */
  public roomLocations: any = {
    1: 'beachHouse',
    2: 'seaTower',
  };

  /**
   * Tipos de Habitación
   */
  public roomTypes = {
    HAB1: {
      code: 'HAB1',
      // label: 'HABITACION SUPERIOR SENCILLA EN CASA DE PLAYA',
      label: 'room.HAB1',
      location: 1,
      include: 'room.include',
      notInclude: 'room.notInclude',
    },
    HAB2: {
      code: 'HAB2',
      // label: 'HABITACION JUNIOR O DUPLEX EN CASA DE PLAYA',
      label: 'room.HAB2',
      location: 1,
      include: 'room.include',
      notInclude: 'room.notInclude'
    },
    HAB3: {
      code: 'HAB3',
      // label: 'HABITACION SUPERIOR SENCILLA EN TORRE DEL MAR',
      label: 'room.HAB3',
      location: 2,
      include: 'room.include',
      notInclude: 'room.notInclude'
    },
    HAB4: {
      code: 'HAB4',
      // label: 'HABITACION JUNIOR SUITE EN TORRE DEL MAR',
      label: 'room.HAB4',
      location: 2,
      include: 'room.include',
      notInclude: 'room.notInclude'
    },
    HAB5: {
      code: 'HAB5',
      // label: 'HABITACION SUPERIOR SENCILLA EN CASA DE PLAYA',
      label: 'room.HAB5',
      location: 1,
      include: 'room.includeNoEvents',
      notInclude: 'room.notIncludeNoEvents',
    },
    HAB6: {
      code: 'HAB6',
      // label: 'HABITACION SUPERIOR SENCILLA EN CASA DE PLAYA',
      label: 'room.HAB6',
      location: 1,
      include: 'room.includeNoEvents',
      notInclude: 'room.notIncludeNoEvents',
    },
  };

  /**
   * Subtipos de habitación
   */
  public subRoomTypes = {
    HAB101: {
      code: 'HAB1',
      subcode: 'HAB101',
      label: 'room.capacityLabel.1',
      capacity: 1,
      nroBeds: 1,
      bedsLabel: ['room.bed.doubleBed'],
    },
    HAB102: {
      code: 'HAB1',
      subcode: 'HAB102',
      label: 'room.capacityLabel.2',
      capacity: 2,
      nroBeds: 2,
      bedsLabel: ['room.bed.doubleBed'],
    },
    HAB103: {
      code: 'HAB1',
      subcode: 'HAB103',
      label: 'room.capacityLabel.3',
      capacity: 3,
      nroBeds: 2,
      bedsLabel: ['room.bed.doubleBed', 'room.bed.kingBedPlusAdditional'],
    },
    HAB201: {
      code: 'HAB2',
      subcode: 'HAB201',
      label: 'room.capacityLabel.1',
      capacity: 1,
      nroBeds: 1,
      bedsLabel: ['room.bed.kingBed'],
    },
    HAB202: {
      code: 'HAB2',
      subcode: 'HAB202',
      label: 'room.capacityLabel.2',
      capacity: 2,
      nroBeds: 1,
      bedsLabel: ['room.bed.kingBed'],
    },
    HAB203: {
      code: 'HAB2',
      subcode: 'HAB203',
      label: 'room.capacityLabel.3',
      capacity: 3,
      nroBeds: 1,
      bedsLabel: ['room.bed.kingBedPlusAdditional'],
    },
    HAB301: {
      code: 'HAB3',
      subcode: 'HAB301',
      label: 'room.capacityLabel.1',
      capacity: 1,
      nroBeds: 1,
      bedsLabel: ['room.bed.doubleBed'],
    },
    HAB302: {
      code: 'HAB3',
      subcode: 'HAB302',
      label: 'room.capacityLabel.2',
      capacity: 2,
      nroBeds: 2,
      bedsLabel: ['room.bed.doubleBed'],
    },
    HAB303: {
      code: 'HAB3',
      subcode: 'HAB303',
      label: 'room.capacityLabel.3',
      capacity: 3,
      nroBeds: 2,
      bedsLabel: ['room.bed.doubleBed', 'room.bed.kingBedPlusAdditional'],
    },
    HAB401: {
      code: 'HAB4',
      subcode: 'HAB401',
      label: 'UNA PERSONA EN LA HABITACION',
      capacity: 1,
      nroBeds: 1,
      bedsLabel: ['room.bed.kingBed'],
    },
    HAB402: {
      code: 'HAB4',
      subcode: 'HAB402',
      label: 'room.capacityLabel.2',
      capacity: 2,
      nroBeds: 1,
      bedsLabel: ['room.bed.kingBed'],
    },
    HAB403: {
      code: 'HAB4',
      subcode: 'HAB403',
      label: 'room.capacityLabel.3',
      capacity: 3,
      nroBeds: 1,
      bedsLabel: ['room.bed.kingBedPlusAdditional'],
    },
    HAB501: {
      code: 'HAB5',
      subcode: 'HAB501',
      label: 'room.capacityLabel.1',
      capacity: 1,
      nroBeds: 1,
      bedsLabel: ['room.bed.doubleBed'],
    },
    HAB502: {
      code: 'HAB5',
      subcode: 'HAB502',
      label: 'room.capacityLabel.2',
      capacity: 2,
      nroBeds: 2,
      bedsLabel: ['room.bed.doubleBed'],
    },
    HAB503: {
      code: 'HAB5',
      subcode: 'HAB503',
      label: 'room.capacityLabel.3',
      capacity: 3,
      nroBeds: 2,
      bedsLabel: ['room.bed.doubleBed', 'room.bed.kingBedPlusAdditional'],
    },
    HAB601: {
      code: 'HAB6',
      subcode: 'HAB601',
      label: 'room.capacityLabel.1',
      capacity: 1,
      nroBeds: 1,
      bedsLabel: ['room.bed.doubleBed'],
    },
    HAB602: {
      code: 'HAB6',
      subcode: 'HAB602',
      label: 'room.capacityLabel.2',
      capacity: 2,
      nroBeds: 2,
      bedsLabel: ['room.bed.doubleBed'],
    },
    HAB603: {
      code: 'HAB6',
      subcode: 'HAB603',
      label: 'room.capacityLabel.3',
      capacity: 3,
      nroBeds: 2,
      bedsLabel: ['room.bed.doubleBed', 'room.bed.kingBedPlusAdditional'],
    },
  }

  /**
   * Precios de habitaciones
   */
  public roomPrices = {
    HAB101: [
      {
        ranges: { from: '2023-11-17', to: '2023-12-16' },
        before: 149,
        after: 149,
        dayOfWeek: [0, 184, 184, 149, 149, 169, 179]
      },
      {
        ranges: { from: '2023-12-17', to: '2024-01-30' },
        before: 172,
        after: 172,
        dayOfWeek: [0, 193, 193, 175, 187, 199, 224]
      },
    ],
    HAB102: [
      {
        ranges: { from: '2023-11-17', to: '2023-12-16' },
        before: 84,
        after: 84,
        dayOfWeek: [0, 121, 121, 79, 89, 99, 109]
      },
      {
        ranges: { from: '2023-12-17', to: '2024-01-30' },
        before: 97,
        after: 97,
        dayOfWeek: [0, 127, 127, 115, 127, 139, 164]
      },
    ],
    HAB103: [
      {
        ranges: { from: '2023-11-17', to: '2023-12-16' },
        before: 72,
        after: 72,
        dayOfWeek: [0, 110, 110, 69, 79, 89, 99]
      },
      {
        ranges: { from: '2023-12-17', to: '2024-01-30' },
        before: 82,
        after: 82,
        dayOfWeek: [0, 116, 116, 103, 115, 128, 152]
      },
    ],
    HAB201: [
      {
        ranges: { from: '2023-11-17', to: '2023-12-16' },
        before: 228,
        after: 228,
        dayOfWeek: [0, 263, 263, 263, 273, 289, 315]
      },
      {
        ranges: { from: '2023-12-17', to: '2024-01-30' },
        before: 263,
        after: 263,
        dayOfWeek: [0, 276, 276, 276, 287, 303, 331]
      },
    ],
    HAB202: [
      {
        ranges: { from: '2023-11-17', to: '2023-12-16' },
        before: 123,
        after: 123,
        dayOfWeek: [0, 158, 158, 158, 173, 184, 210]
      },
      {
        ranges: { from: '2023-12-17', to: '2024-01-30' },
        before: 141,
        after: 141,
        dayOfWeek: [0, 165, 165, 165, 182, 193, 221]
      },
    ],
    HAB203: [
      {
        ranges: { from: '2023-11-17', to: '2023-12-16' },
        before: 98,
        after: 98,
        dayOfWeek: [0, 133, 133, 133, 147, 161, 185]
      },
      {
        ranges: { from: '2023-12-17', to: '2024-01-30' },
        before: 112,
        after: 112,
        dayOfWeek: [0, 140, 140, 140, 154, 169, 194]
      },
    ],
    HAB301: [
      {
        ranges: { from: '2023-11-17', to: '2023-12-16' },
        before: 170,
        after: 170,
        dayOfWeek: [0, 205, 205, 205, 216, 231, 257]
      },
      {
        ranges: { from: '2023-12-17', to: '2024-01-30' },
        before: 196,
        after: 196,
        dayOfWeek: [0, 215, 215, 215, 227, 243, 270]
      },
    ],
    HAB302: [
      {
        ranges: { from: '2023-11-17', to: '2023-12-16' },
        before: 94,
        after: 94,
        dayOfWeek: [0, 131, 131, 131, 142, 158, 184]
      },
      {
        ranges: { from: '2023-12-17', to: '2024-01-30' },
        before: 108,
        after: 108,
        dayOfWeek: [0, 138, 138, 138, 149, 165, 193]
      },
    ],
    HAB303: [
      {
        ranges: { from: '2023-11-17', to: '2023-12-16' },
        before: 78,
        after: 78,
        dayOfWeek: [0, 116, 116, 116, 127, 142, 168]
      },
      {
        ranges: { from: '2023-12-17', to: '2024-01-30' },
        before: 90,
        after: 90,
        dayOfWeek: [0, 121, 121, 121, 133, 149, 176]
      },
    ],
    HAB401: [
      {
        ranges: { from: '2023-11-17', to: '2023-12-16' },
        before: 319,
        after: 319,
        dayOfWeek: [0, 349, 349, 349, 362, 378, 399]
      },
      {
        ranges: { from: '2023-12-17', to: '2024-01-30' },
        before: 367,
        after: 367,
        dayOfWeek: [0, 366, 366, 366, 380, 397, 419]
      },
    ],
    HAB402: [
      {
        ranges: { from: '2023-11-17', to: '2023-12-16' },
        before: 168,
        after: 168,
        dayOfWeek: [0, 202, 202, 202, 215, 227, 254]
      },
      {
        ranges: { from: '2023-12-17', to: '2024-01-30' },
        before: 194,
        after: 194,
        dayOfWeek: [0, 212, 212, 212, 226, 238, 267]
      },
    ],
    HAB403: [
      {
        ranges: { from: '2023-11-17', to: '2023-12-16' },
        before: 128,
        after: 128,
        dayOfWeek: [0, 163, 163, 163, 175, 190, 215]
      },
      {
        ranges: { from: '2023-12-17', to: '2024-01-30' },
        before: 147,
        after: 147,
        dayOfWeek: [0, 171, 171, 171, 184, 200, 226]
      },
    ],
    HAB501: [
      {
        ranges: { from: '2023-11-17', to: '2023-12-16' },
        before: 124,
        after: 124,
        dayOfWeek: [124, 124, 124, 124, 124, 124, 124]
      },
      {
        ranges: { from: '2023-12-17', to: '2024-01-30' },
        before: 149,
        after: 149,
        dayOfWeek: [149, 149, 149, 149, 149, 149, 149]
      },
    ],
    HAB502: [
      {
        ranges: { from: '2023-11-17', to: '2023-12-16' },
        before: 70,
        after: 70,
        dayOfWeek: [70, 70, 70, 70, 70, 70, 70]
      },
      {
        ranges: { from: '2023-12-17', to: '2024-01-30' },
        before: 84,
        after: 84,
        dayOfWeek: [84, 84, 84, 84, 84, 84, 84]
      },
    ],
    HAB503: [
      {
        ranges: { from: '2023-11-17', to: '2023-12-16' },
        before: 60,
        after: 60,
        dayOfWeek: [60, 60, 60, 60, 60, 60, 60]
      },
      {
        ranges: { from: '2023-12-17', to: '2024-01-30' },
        before: 72,
        after: 72,
        dayOfWeek: [72, 72, 72, 72, 72, 72, 72]
      },
    ],
    HAB601: [
      {
        ranges: { from: '2023-11-17', to: '2023-12-16' },
        before: 124,
        after: 124,
        dayOfWeek: [124, 124, 124, 124, 124, 124, 124]
      },
      {
        ranges: { from: '2023-12-17', to: '2024-01-30' },
        before: 149,
        after: 149,
        dayOfWeek: [149, 149, 149, 149, 149, 149, 149]
      },
    ],
    HAB602: [
      {
        ranges: { from: '2023-11-17', to: '2023-12-16' },
        before: 70,
        after: 70,
        dayOfWeek: [70, 70, 70, 70, 70, 70, 70]
      },
      {
        ranges: { from: '2023-12-17', to: '2024-01-30' },
        before: 84,
        after: 84,
        dayOfWeek: [84, 84, 84, 84, 84, 84, 84]
      },
    ],
    HAB603: [
      {
        ranges: { from: '2023-11-17', to: '2023-12-16' },
        before: 60,
        after: 60,
        dayOfWeek: [60, 60, 60, 60, 60, 60, 60]
      },
      {
        ranges: { from: '2023-12-17', to: '2024-01-30' },
        before: 72,
        after: 72,
        dayOfWeek: [72, 72, 72, 72, 72, 72, 72]
      },
    ],
  }

  // public roomPricesNoEvents = {
  //   HAB101: [
  //     {
  //       ranges: { from: '2023-11-17', to: '2023-12-16' },
  //       before: 149,
  //       after: 149,
  //       dayOfWeek: [0, 184, 184, 149, 149, 169, 179]
  //     },
  //     {
  //       ranges: { from: '2023-12-17', to: '2024-01-30' },
  //       before: 172,
  //       after: 172,
  //       dayOfWeek: [0, 193, 193, 175, 187, 199, 224]
  //     },
  //   ],
  //   HAB102: [
  //     {
  //       ranges: { from: '2023-11-17', to: '2023-12-16' },
  //       before: 84,
  //       after: 84,
  //       dayOfWeek: [0, 121, 121, 79, 89, 99, 109]
  //     },
  //     {
  //       ranges: { from: '2023-12-17', to: '2024-01-30' },
  //       before: 97,
  //       after: 97,
  //       dayOfWeek: [0, 127, 127, 115, 127, 139, 164]
  //     },
  //   ],
  //   HAB103: [
  //     {
  //       ranges: { from: '2023-11-17', to: '2023-12-16' },
  //       before: 72,
  //       after: 72,
  //       dayOfWeek: [0, 110, 110, 69, 79, 89, 99]
  //     },
  //     {
  //       ranges: { from: '2023-12-17', to: '2024-01-30' },
  //       before: 82,
  //       after: 82,
  //       dayOfWeek: [0, 116, 116, 103, 115, 128, 152]
  //     },
  //   ],
  //   HAB201: [
  //     {
  //       ranges: { from: '2023-11-17', to: '2023-12-16' },
  //       before: 228,
  //       after: 228,
  //       dayOfWeek: [0, 263, 263, 263, 273, 289, 315]
  //     },
  //     {
  //       ranges: { from: '2023-12-17', to: '2024-01-30' },
  //       before: 263,
  //       after: 263,
  //       dayOfWeek: [0, 276, 276, 276, 287, 303, 331]
  //     },
  //   ],
  //   HAB202: [
  //     {
  //       ranges: { from: '2023-11-17', to: '2023-12-16' },
  //       before: 123,
  //       after: 123,
  //       dayOfWeek: [0, 158, 158, 158, 173, 184, 210]
  //     },
  //     {
  //       ranges: { from: '2023-12-17', to: '2024-01-30' },
  //       before: 141,
  //       after: 141,
  //       dayOfWeek: [0, 165, 165, 165, 182, 193, 221]
  //     },
  //   ],
  //   HAB203: [
  //     {
  //       ranges: { from: '2023-11-17', to: '2023-12-16' },
  //       before: 98,
  //       after: 98,
  //       dayOfWeek: [0, 133, 133, 133, 147, 161, 185]
  //     },
  //     {
  //       ranges: { from: '2023-12-17', to: '2024-01-30' },
  //       before: 112,
  //       after: 112,
  //       dayOfWeek: [0, 140, 140, 140, 154, 169, 194]
  //     },
  //   ],
  //   HAB301: [
  //     {
  //       ranges: { from: '2023-11-17', to: '2023-12-16' },
  //       before: 170,
  //       after: 170,
  //       dayOfWeek: [0, 205, 205, 205, 216, 231, 257]
  //     },
  //     {
  //       ranges: { from: '2023-12-17', to: '2024-01-30' },
  //       before: 196,
  //       after: 196,
  //       dayOfWeek: [0, 215, 215, 215, 227, 243, 270]
  //     },
  //   ],
  //   HAB302: [
  //     {
  //       ranges: { from: '2023-11-17', to: '2023-12-16' },
  //       before: 94,
  //       after: 94,
  //       dayOfWeek: [0, 131, 131, 131, 142, 158, 184]
  //     },
  //     {
  //       ranges: { from: '2023-12-17', to: '2024-01-30' },
  //       before: 108,
  //       after: 108,
  //       dayOfWeek: [0, 138, 138, 138, 149, 165, 193]
  //     },
  //   ],
  //   HAB303: [
  //     {
  //       ranges: { from: '2023-11-17', to: '2023-12-16' },
  //       before: 78,
  //       after: 78,
  //       dayOfWeek: [0, 116, 116, 116, 127, 142, 168]
  //     },
  //     {
  //       ranges: { from: '2023-12-17', to: '2024-01-30' },
  //       before: 90,
  //       after: 90,
  //       dayOfWeek: [0, 121, 121, 121, 133, 149, 176]
  //     },
  //   ],
  //   HAB401: [
  //     {
  //       ranges: { from: '2023-11-17', to: '2023-12-16' },
  //       before: 319,
  //       after: 319,
  //       dayOfWeek: [0, 349, 349, 349, 362, 378, 399]
  //     },
  //     {
  //       ranges: { from: '2023-12-17', to: '2024-01-30' },
  //       before: 367,
  //       after: 367,
  //       dayOfWeek: [0, 366, 366, 366, 380, 397, 419]
  //     },
  //   ],
  //   HAB402: [
  //     {
  //       ranges: { from: '2023-11-17', to: '2023-12-16' },
  //       before: 168,
  //       after: 168,
  //       dayOfWeek: [0, 202, 202, 202, 215, 227, 254]
  //     },
  //     {
  //       ranges: { from: '2023-12-17', to: '2024-01-30' },
  //       before: 194,
  //       after: 194,
  //       dayOfWeek: [0, 212, 212, 212, 226, 238, 267]
  //     },
  //   ],
  //   HAB403: [
  //     {
  //       ranges: { from: '2023-11-17', to: '2023-12-16' },
  //       before: 128,
  //       after: 128,
  //       dayOfWeek: [0, 163, 163, 163, 175, 190, 215]
  //     },
  //     {
  //       ranges: { from: '2023-12-17', to: '2024-01-30' },
  //       before: 147,
  //       after: 147,
  //       dayOfWeek: [0, 171, 171, 171, 184, 200, 226]
  //     },
  //   ],
  // }

  constructor(
    private afs: AngularFirestore,
    private storage: AngularFireStorage,
    private eventInfoSrv: EventInfoService,
    private translate: TranslateService
  ) { }


  getRoomsByDate(date: string = moment().format('YYYY-MM-DD')) {
    return Object.entries(this.roomTypes).map(([key, value]) => {

      const subRoomsTypes = Object.values(this.subRoomTypes)
        .filter((row: any) => row.code === key)
        .map((row: any) => {

          const priceList = this.roomPrices[row.subcode];
          const price = priceList.find((row: any) => {

            const from = moment(row.ranges.from, 'YYYY/MM/DD').startOf('day');
            const to = moment(row.ranges.to, 'YYYY/MM/DD').endOf('day');

            return moment(date, 'YYYY/MM/DD').isBetween(from, to);

          });

          return {
            code: value.code,
            title: value.label,
            location: value.location,
            locationLabel: "room.location." + this.roomLocations[value.location],
            include: value.include,
            notInclude: value.notInclude,
            subcode: row.subcode,
            capacity: row.capacity,
            capacityLabel: row.label,
            before: price?.before || 0,
            beforeFull: (price?.before || 0) * row.capacity,
            after: price?.after || 0,
            afterFull: (price?.after || 0) * row.capacity,
            ranges: price?.ranges || {},
            dayOfWeek: price?.dayOfWeek || [],
            nroBeds: row.nroBeds,
            bedsLabel: row.bedsLabel,
          }
        })

      return subRoomsTypes;
    })
      .flat();
  }

  /**
   * Es antes de la fecha del evento
   * @param date
   * @returns
   */
  isBeforeEventDate(date: string) {
    return moment(date).isBefore(this.eventInfoSrv.getStartEventDate().date);
  }

  /**
   * Es después de la fecha del evento
   * @param date
   * @returns
   */
  isAfterEventDate(date: string) {
    return moment(date).isAfter(this.eventInfoSrv.getEndEventDate().date);
  }

  /**
   * Es en la fecha del evento
   * @param date
   * @returns
   */
  isEventDate(date: string) {
    return moment(date).isBetween(
      this.eventInfoSrv.getStartEventDate().date,
      this.eventInfoSrv.getEndEventDate().date,
      'days',
      '[]'
    );
  }


  getRoomPriceByDate(code: string, date: string, type: string) {
    let discountRate = 0;

    if (type == "hotel-event") {
      discountRate = 0.35; // Descuento del 35% para hoteles con evento
    } else if (type == "hotel-without-event") {
      discountRate = 0.18; // Descuento del 18% para hoteles sin evento
    }

    console.log('discountRate', discountRate);



    const subRoom = this.subRoomTypes[code];
    const roomPrices = this.roomPrices[code];

    const currentDate = moment().format('YYYY-MM-DD');
    const priceList = roomPrices.find((row: any) => {
      const from = moment(row.ranges.from, 'YYYY-MM-DD').startOf('day');
      const to = moment(row.ranges.to, 'YYYY-MM-DD').endOf('day');

      return moment(currentDate, 'YYYY-MM-DD').isBetween(from, to);
    });

    const snapshot = {
      date,
      order: moment(date).valueOf(),
      code,
      capacity: subRoom.capacity,
      isBefore: this.isBeforeEventDate(date),
      isAfter: this.isAfterEventDate(date),
      isEvent: this.isEventDate(date),
      price: 0,
    };

    /** Si la fecha de agendar es para días antes o despues del evento */
    if (snapshot.isBefore || snapshot.isAfter) {
      // console.log('priceList', priceList);
      const field = snapshot.isBefore ? 'before' : 'after';
      const roomPrice = Number(priceList[field] * snapshot.capacity)
      // snapshot.price = roomPrice;
      snapshot.price = roomPrice * (1 - discountRate); // Aplicar el descuento

    } else {
      // console.log('priceList', priceList);
      const dayOfWeek = moment(date).day();
      const roomPrice = (dayOfWeek === 0) ? priceList['after'] : priceList['dayOfWeek'][dayOfWeek];
      // snapshot.price = Number(roomPrice * snapshot.capacity);

      snapshot.price = Number(roomPrice * snapshot.capacity) * (1 - discountRate); // Aplicar el descuento

    }


    console.log('snapshot', snapshot);
    return snapshot;
  }

  /**
   * TODO: revisar todo de aqui hacia abajo para eliminar
   */

  buildRoomDoc(params: any = {}) {
    return {
      roomId: params.roomId || null,
      nroParticipants: params.nroParticipants || 1,
      ubicationType: params.ubicationType || 1,
      price: params.price || 0,
      additionals: params.additionals || [],
    }
  }

  parseRoomDefaultByCapacityDocument(doc: any) {
    return pick(doc, [
      'capacity',
      'price',
      'ubicationType',
      'ubicationTypeDescription',
      'description',
      'percentage',
      'fullPrice',
      'pricePerPeople',
      'discount',
      'discountPerPeople',
      'roomCode',
      'roomCodePrefix',
      '_id'
    ]);
  }

  parseRoomPrice(room: any, type = 'fullPass') {
    const currentDate = moment();
    let price = room?.fullPrice;
    let indexPrice = room.priceList.length - 1;

    for (let index = 0; index < room.priceList.length; index++) {
      const row = room.priceList[index];
      const from = moment(row.from, 'YYYY/MM/DD').startOf('day');
      const to = moment(row.to, 'YYYY/MM/DD').endOf('day');
      const isBetween = currentDate.isBetween(from, to);
      const rowType = row.type || type;

      // console.log({
      //   currentDate: currentDate.format('DD/MM/YYYY'),
      //   from: from.format('DD/MM/YYYY'),
      //   to: to.format('DD/MM/YYYY'),
      // });

      if (isBetween && rowType === type) {
        indexPrice = index;
        break;
      }
    }

    // console.log('room.priceList[indexPrice]', room.priceList[indexPrice]);

    return Object.assign({}, room, room.priceList[indexPrice]);
  }

  /** ===============================================
   *                  ROOM STOCK
  ================================================== */
  async storeRoomStock(docId: string, data: any) {
    return this.afs.collection(this.roomStock).doc(docId).set(data);
  }

  async updateRoomStock(docId: string, data: any) {
    return this.afs.collection(this.roomStock).doc(docId).update(data);
  }

  async updateRoomStockSupplyCounter(docId: string, data = 1) {
    const ref = this.afs.collection(this.roomStock).doc(docId);
    await ref.update({ supply: increment(data) });
  }

  getDynamicRoomCollection(where: any[] = [], opts: any = {}): Observable<any> {
    const { idField = "_id", orderBy = [] } = opts;

    return this.afs.collection(
      this.roomStock,
      (ref) => {
        let query: Query = ref;
        for (const row of where) { query = query.where(row.field, row.condition, row.value); }

        for (const order of orderBy) { query = query.orderBy(order.field, order.order); }
        return query;
      }
    ).valueChanges({ idField });
  }

  /** ===============================================
   *                   ROOM TYPES
  ================================================== */
  async storeRoomType(docId: string, data: any) {
    return this.afs.collection(this.roomTypesCollection).doc(docId).set(data);
  }

  async updateRoomType(docId: string, data: any) {
    return this.afs.collection(this.roomTypesCollection).doc(docId).update(data);
  }


  async getRoomDefaultByCapacity(capacity: number, type = 'fullPass') {
    const snapshot = await lastValueFrom(
      this.afs.collection(
        this.roomTypesCollection,
        (ref) => ref.where('capacity', '==', capacity).where('priority', '==', 0)
      ).get()
    );

    const result = await handlerArrayResult(snapshot);
    return this.parseRoomPrice(result.shift(), type);
  }

  getDynamicRoomTypeCollection(where: any[] = [], opts: any = {}): Observable<any> {
    const { idField = "_id", orderBy = [] } = opts;

    return this.afs.collection(
      this.roomTypesCollection,
      (ref) => {
        let query: Query = ref;
        for (const row of where) { query = query.where(row.field, row.condition, row.value); }

        for (const order of orderBy) { query = query.orderBy(order.field, order.order); }
        return query;
      }
    ).valueChanges({ idField });
  }

  async getDynamicRoomTypesCollectionPromise(where: any[] = [], opts: any = {}): Promise<any> {
    const { idField = "_id", orderBy = [] } = opts;

    const snapshot = await lastValueFrom(
      this.afs.collection(
        this.roomTypesCollection,
        (ref) => {
          let query: Query = ref;
          for (const row of where) { query = query.where(row.field, row.condition, row.value); }

          for (const order of orderBy) { query = query.orderBy(order.field, order.order); }
          return query;
        }
      ).get()
    );

    return handlerArrayResult(snapshot, idField);
  }

  /** ===============================================
   *                 ROOMS COLLECTION
  ================================================== */

  async updateRoom(docId: string, data: any) {
    return this.afs.collection(this.roomsCollection).doc(docId).update(data);
  }

  async storeRoom(docId: string, data: any) {
    return this.afs.collection(this.roomsCollection).doc(docId).set(data);
  }

  /**
   * Restaurar habitaciones a su estado original a través del identificador de la orden de compra
   * @param orderId
   * @returns
   */
  async restoreRoomsOnReject(orderId: string) {
    const snapshot = await lastValueFrom(
      this.afs.collection(this.roomsCollection, (ref) => ref.where('paymentOrderID', '==', orderId)).get()
    );

    const result = await handlerArrayResult(snapshot);
    const promises = result.map(async (row: any) => {
      return this.afs.collection(this.roomsCollection).doc(row._id).update({ paymentOrderID: null, additionals: [] });
    });

    await Promise.all(promises);
    return true;
  }

  async getAvailableRoomByCodeType(code: string) {
    const snapshot = await lastValueFrom(
      this.afs.collection(this.roomsCollection,
        (ref) => ref.where('code', '==', code)
          .where('paymentOrderID', '==', null)
          .orderBy('roomCode', 'asc')
          .limit(1)
      ).get()
    );

    const result = await handlerArrayResult(snapshot);
    return (result.length > 0) ? result.shift() : null;
  }

  /** ===============================================
   *               ROOM ADDITIONALS
  ================================================== */
  async storeAdditionals(docId: string, data: any) {
    return this.afs.collection(this.additionalsCollection).doc(docId).set(data);
  }

  getDynamicAdditionalsCollection(where: any[] = [], opts: any = {}): Observable<any> {
    const { idField = "_id", orderBy = [] } = opts;

    return this.afs.collection(
      this.additionalsCollection,
      (ref) => {
        let query: Query = ref;
        for (const row of where) { query = query.where(row.field, row.condition, row.value); }

        for (const order of orderBy) { query = query.orderBy(order.field, order.order); }
        return query;
      }
    ).valueChanges({ idField });
  }

  async getAdditonalDaysByRoomCode(roomCode: string) {
    const snapshot = await lastValueFrom(
      this.afs.collection(this.additionalsCollection).doc(roomCode).get()
    );
    const result = await handlerObjectResult(snapshot);
    return this.parseRoomPrice(result);
  }

  /** ===============================================
   *               CATEGORY PASSES
  ================================================== */
  async storeCategoriesPasses(docId: string, data: any) {
    return this.afs.collection(this.categoryPassesCollection).doc(docId).set(data);
  }

  async getCategoriesPasses() {
    const snapshot = await lastValueFrom(
      this.afs.collection(this.categoryPassesCollection, (ref) => ref.orderBy('order', 'asc')).get()
    );
    const result = await handlerArrayResult(snapshot);
    return result.map((row) => this.parseRoomPrice(row));
  }

  async getCategoryPassesByCode(code: string) {
    const snapshot = await lastValueFrom(
      this.afs.collection(this.categoryPassesCollection).doc(code).get()
    );
    const result = await handlerObjectResult(snapshot);
    return this.parseRoomPrice(result);
  }

  // Subida de img comprobantes

  async uploadComprobantes(img, idOrden, order) {
    // if(imgTempCapture !== ''){
    //   console.log(imgTempCapture)
    //   this.deleteImgComprobante(idOrden);
    // }
    let filePath = `upload_comprobantes/img_comprobante_idOrden_${idOrden}_${Math.random()}`;
    let fileRef = this.storage.ref(filePath);
    let observe = this.storage.upload(filePath, img);
    return observe.snapshotChanges().pipe(
      finalize(() => {
        fileRef.getDownloadURL().subscribe({
          next: (url) => {
            console.log(url)
            order.metadata.captureBank.push({
              nota: '',
              url
            });
            this.loading = false;
            return this.updateCaptureImgComprobante(idOrden, order)
          }
        })
      })
    ).subscribe()

  }

  async updateCaptureImgComprobante(idOrden, order) {
    const ref = this.afs.collection(this.purchases).doc(idOrden)
    await ref.update({ metadata: order.metadata });
  }

  // async deleteImgComprobante(imgTemp){
  //   const storage = getStorage();

  //     // Create a reference to the file to delete
  //     const desertRef = ref(storage, `upload_comprobantes/img_comprobante_idOrden_${imgTemp}`);

  //     // Delete the file
  //     deleteObject(desertRef).then(() => {
  //       console.log('ELiminado la imagen');
  //     }).catch((error) => {
  //       console.log('Ocurrio un error', error);
  //     });

  // }


  getOrderPending() {
    // , ref =>   ref.where('status', '==', 'pending')
    return this.afs.collection(this.purchases).valueChanges()
  }



  async updateOrder(docId: string, data: any) {
    if (data.status === 'rejected') {
      this.afs.collection(this.roomsCollection, ref => ref.where('paymentOrderID', '==', docId)).valueChanges().subscribe({
        next: (resp: any) => {
          console.log(resp)
          if (resp && resp.length > 0) {
            this.afs.collection(this.roomsCollection).doc(resp[0].roomCode).update({ paymentOrderID: '', additionals: [] });
          }
        }
      })
    }
    return this.afs.collection(this.purchases).doc(docId).update(data);
  }




}
