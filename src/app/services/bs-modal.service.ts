import { Injectable } from '@angular/core';

import * as bootstrap from 'bootstrap';

@Injectable({
  providedIn: 'root'
})
export class BsModalService {

  constructor() { }

  /**
   * Método para generar modal a partir de libreria de bootstrap
   * @param modalId 
   * @param opts 
   * @returns 
   */
  buildModal(modalId: string, opts: BootstrapModalOptions = {}){
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


/**
 * Interface para definir opciones de modal
 */
export interface BootstrapModalOptions {
  backdrop?: boolean | string;
  keyboard?: boolean;
  focus?: boolean;
}
