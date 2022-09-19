import { Component, OnInit, ViewChild } from '@angular/core';
import { Router } from '@angular/router';
import { HotelService } from 'src/app/services/hotel.service';
import { PreSaleService } from 'src/app/services/pre-sale.service';
import { Sweetalert2Service } from 'src/app/services/sweetalert2.service';
import { PreSaleModalRoomTypeDetailsComponent } from '../../../../components/pre-sale-modal-room-type-details/pre-sale-modal-room-type-details.component';
import { PreSaleModalAdditionalDaysComponent } from 'src/app/components/pre-sale-modal-additional-days/pre-sale-modal-additional-days.component';
import { TranslatePipe } from '@ngx-translate/core';
import { PreSaleAddRoomButtonComponent } from 'src/app/components/pre-sale-add-room-button/pre-sale-add-room-button.component';

@Component({
  selector: 'app-pre-sale-packages-list',
  templateUrl: './pre-sale-packages-list.component.html',
  styleUrls: ['./pre-sale-packages-list.component.css']
})
export class PreSalePackagesListComponent implements OnInit {

  @ViewChild(PreSaleModalRoomTypeDetailsComponent) modalRoomTypeDetails!: PreSaleModalRoomTypeDetailsComponent;
  @ViewChild(PreSaleModalAdditionalDaysComponent) modalRoomAdditionalDays!: PreSaleModalAdditionalDaysComponent;
  @ViewChild(PreSaleAddRoomButtonComponent) btnAddRoom!: PreSaleAddRoomButtonComponent;
  
  public nroParticipants: any = 0;

  public roomData: any = {nroParticipants: 0, type: 1};
  public rooms: any[] = [];
  public setup: any;

  constructor(
    private preSaleSrv: PreSaleService,
    private hotelSrv: HotelService,
    private sweetAlertSrv: Sweetalert2Service,
    private router: Router,
    private translatePipe: TranslatePipe,
  ) {

    /** TODO: pendiente por eliminar */
    // this.preSaleSrv.buildAndStore({nroParticipants: 1}, false);
    const { nroParticipants, rooms, setup } = this.preSaleSrv.checkAndLoadDocumentLocalStorage();
    this.nroParticipants = nroParticipants;
    this.rooms = rooms;
    this.setup = setup;
  }

  ngOnInit(): void {}

  /**
   * Cambiar configuración de setup de orde
   */
  onUpdateSetup(setup: any){

    if(setup === 'automatic' && this.nroParticipants == 0){
      const message = this.translatePipe.transform('formValidations.nroCompetitorsRequired');
      this.sweetAlertSrv.showWarning(message);
      return;
    }

    this.setup = setup;
    this.preSaleSrv.updateDocumentLocalStorage({setup: setup});

    if(setup === 'automatic'){ this.runHelp();}
  }

  triggerAddRoomButton(){
    this.onUpdateSetup('manual');
    this.btnAddRoom.addRoom();
  }

  /**
   * Al actualizar contador de número de participantes
   * @param nroParticipants 
   */
  onUpdateNroParticipants(nroParticipants: any) {
    this.nroParticipants = nroParticipants;

    /**
     * Actualizar porcentaje de descuento por grupo
     */
    let groupDiscount = 0;
    if(this.nroParticipants >= 20){
      groupDiscount = 0.10;
    }else if(this.nroParticipants >= 10){
      groupDiscount = 0.05;
    }

    this.preSaleSrv.updateDocumentLocalStorage({
      nroParticipants: nroParticipants,
      groupDiscount,
    });
  }

  /**
   * Al hacer click en el boton de agregar habitacion
   * @param roomDoc 
   */
  onAddRoom(roomDoc: any){
    this.rooms.push(Object.assign(roomDoc, {
      additionals: [], roomId: null
    }));
    this.preSaleSrv.updateDocumentLocalStorage({rooms: this.rooms});
  }

  /**
   * Al hacer click en el boton de eliminar habitacion
   * @param index 
   */
  removeRoom(index: any){
    this.rooms.splice(index, 1);
    this.preSaleSrv.updateDocumentLocalStorage({rooms: this.rooms});
  }

  /**
   * Al manupilar nro de participantes por habitacion
   * @param param 
   */
  onUpdatePlanCardItem(param: any) {
    // console.log('param', param);
    const { index, data } = param;
    this.rooms[index] = Object.assign({}, this.rooms[index], data);
    this.preSaleSrv.updateDocumentLocalStorage({rooms: this.rooms});
  }

  onMorePLanCardItem(index: any) {
    this.modalRoomTypeDetails.showModal({index, data: this.rooms[index]});
  }

  onAddAdditionalDays(index: any){
    this.modalRoomAdditionalDays.showModal({index, data: this.rooms[index]});
  }

  /**
   * Nro de participantes en total por habitaciones
   */
  get nroParticipantsByRoom(){
    const nroParticipans = this.rooms
    .map((room: any) => room.capacity)
    .reduce((acc: any, next: any) => acc + next, 0);

    return nroParticipans;
  }

  /**
   * Nro de participantes restantes por asignar habitación
   */
  get participantsLeft(){
    return this.nroParticipants - this.nroParticipantsByRoom;
  }

  /**
   * Calcular grupos por habitacion
   * @param value 
   * @returns 
   */
  calculateGroups(value: number){
    const groups: number[] = [];
    let to = value;
    while (to > 0) {
  
      if (to >= 3) {
        groups.push(3);
        to -= 3;
      } else if (to >= 2) {
        groups.push(2);
        to -= 2;
      } else if (to >= 1) {
        groups.push(1);
        to -= 1;
      }
    }

    return groups;
  }

  /**
   * Ejecutar ayudante para calcular grupos por habitacion
   * @returns 
   */
  async runHelp(){
    try {

      this.rooms = [];

      const groups = this.calculateGroups(this.nroParticipants);
      // console.log({groups});

      const toAwait = groups.map(async(group) => this.hotelSrv.getRoomDefaultByCapacity(group));
      const snapshot = await Promise.all(toAwait);
      // console.log({snapshot});

      /**
       * Parsar y setear valores por defecto
       */
      snapshot.map((doc: any) => Object.assign(
        {additionals: [], roomId: null}, this.hotelSrv.parseRoomDefaultByCapacityDocument(doc)
      )).forEach((room: any) => this.rooms.push(room));
      // console.log({rooms: this.rooms});

      this.preSaleSrv.updateDocumentLocalStorage({rooms: this.rooms});
      
    } catch (err) {
      console.log('Error on PreSalePackagesListComponent.runHelp', err);
    }
  }

  onNext(){

    if(this.nroParticipants == 0 || this.participantsLeft > 0){
      const message = this.translatePipe.transform('formValidations.roomStepParticipantsLeft');
      this.sweetAlertSrv.showWarning(message);
      return;
    }

    if(this.participantsLeft < 0){
      const message = this.translatePipe.transform('formValidations.roomStepParticipantsExceded');
      this.sweetAlertSrv.showWarning(message);
      return;
    }

    this.preSaleSrv.updateDocumentLocalStorage({step: '/pre-sale/step2'});
    this.router.navigate(['/pre-sale', 'step2']);
  }

}
