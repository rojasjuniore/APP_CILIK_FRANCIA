import { Location } from '@angular/common';
import { Injectable } from '@angular/core';
import { ActivatedRouteSnapshot, CanActivate, Router, RouterStateSnapshot, UrlTree } from '@angular/router';
import { Observable } from 'rxjs';
import { TicketService } from '../services/ticket.service';

@Injectable({
  providedIn: 'root'
})
export class CheckTicketOnLocalStorageGuard implements CanActivate {

  constructor(
    private ticketSrv: TicketService,
    private location: Location,
    private router: Router,
  ){ }

  async canActivate(
    route: ActivatedRouteSnapshot,
    state: RouterStateSnapshot
  ): Promise<boolean | UrlTree> 
  {
    // console.log('CheckTicketOnLocalStorageGuard');
    const ticketDataString = window.localStorage.getItem('ticketData');
    const txHash = this.ticketSrv.getTxHash();

    /** Si no estan definidas */
    if(!ticketDataString || !txHash){
      console.warn('Not found ticket data or txHash');
      // this.location.back();
      await this.router.navigate(['/pre-reserve']);
      return false;
    }

    /** Parsear string a JSON */
    const ticketData = JSON.parse(ticketDataString);

    /**
     * Validar si la orden de compra es valida
     */
     const toCompare = await this.ticketSrv.generateHash([ticketData.price, ticketDataString]);
     if(!(txHash == toCompare)){
       console.warn('Invalid buyData, buy document was modified');
      //  this.location.back();
      await this.router.navigate(['/pre-reserve']);
       return false;
     }

    return true;
  }
  
}
