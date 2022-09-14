import { Injectable } from '@angular/core';
import { BehaviorSubject, distinctUntilChanged, interval, map } from 'rxjs';

import * as bootstrap from 'bootstrap';

@Injectable({
  providedIn: 'root'
})
export class PreReserveService {

  /** Ticket seleccionado */
  public ticketSelected$ = new BehaviorSubject<null | any>(null);

  /** Ticket a expandir información */
  public ticketToExpand$ = new BehaviorSubject<null | string>(null);


  private modalId = 'modalTicketDetails';
  public modalTicketDetails: any;

  constructor() {
    /** Crear modal de bootstrap */
    // this.modalTicketDetails = this.buildModal(this.modalId);
  }


  /**
   * Llamar a crear modal principal del servicio
   */
  buildLocalModal(){
    this.modalTicketDetails = this.buildModal(this.modalId);
  }

  /**
   * Obtener documento de pre orden de reserva desde el 
   * local storage como un observable
   * @returns 
   */
  getPreSaleDocumentObservable(){
    return interval(1500)
      .pipe(
        map( () => {
          const document = window.localStorage.getItem('preSaleDocument');
          return JSON.parse(document || '{}');
        }),
        distinctUntilChanged((prev, curr) => JSON.stringify(prev) === JSON.stringify(curr))
      );
  }


    /**
   * Método para generar modal a partir de libreria de bootstrap
   * @param modalId 
   * @param opts 
   * @returns 
   */
  buildModal(modalId: string = this.modalId, opts: any = {}){
    const {
      backdrop = true,
      keyboard = true,
      focus = true
    } = opts;

    return  new bootstrap.Modal(document.getElementById(modalId), {
      backdrop,
      keyboard,
      focus
    });
  }
}
