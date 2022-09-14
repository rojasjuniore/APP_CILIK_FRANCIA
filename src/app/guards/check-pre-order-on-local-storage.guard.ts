import { Location } from '@angular/common';
import { Injectable } from '@angular/core';
import { ActivatedRouteSnapshot, CanActivate, RouterStateSnapshot, UrlTree } from '@angular/router';
import { Observable } from 'rxjs';
import { TicketService } from '../services/ticket.service';

@Injectable({
  providedIn: 'root'
})
export class CheckPreOrderOnLocalStorageGuard implements CanActivate {

  constructor(
    private ticketSrv: TicketService,
    private location: Location
  ){ }

  async canActivate(
    route: ActivatedRouteSnapshot,
    state: RouterStateSnapshot
  ): Promise<boolean | UrlTree> 
  {
    // console.log('Check PreOrder on LocalStorage');
    const preOrderString = window.localStorage.getItem('preOrder');
    const txHash = window.localStorage.getItem('txPreOrderHash');

    /** Si no estan definidas */
    if(!preOrderString || !txHash){
      console.warn('Not found pre order data or txHash');
      this.location.back();
      return false;
    }

    /** Parsear string a JSON */
    const preOrder = JSON.parse(preOrderString);

    /**
     * Validar si la orden de compra es valida
     */
     const toCompare = await this.ticketSrv.generateHash(
      [
        preOrder.subTotalAmount, 
        preOrder.ivaTxAmount, 
        preOrder.totalAmount,
        preOrderString
      ],
     );

     if(!(txHash == toCompare)){
       console.warn('Invalid preOrder, buy document was modified');
       this.location.back();
       return false;
     }

    return true;
  }
  
}
