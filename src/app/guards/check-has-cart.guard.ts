import { Injectable } from '@angular/core';
import { ActivatedRouteSnapshot, CanActivate, Router, RouterStateSnapshot, UrlTree } from '@angular/router';
import { Observable } from 'rxjs';
import { CartService } from '../services/cart.service';
import { environment } from 'src/environments/environment';
import { AuthenticationService } from '../services/authentication.service';

@Injectable({
  providedIn: 'root'
})
export class CheckHasCartGuard implements CanActivate {

  constructor(
    private authSrv: AuthenticationService,
    private cartSrv: CartService,
    private router: Router
  ) { }

  async canActivate(
    route: ActivatedRouteSnapshot,
    state: RouterStateSnapshot
  ): Promise<boolean> {
    try {
      
      const uid: any = await this.authSrv.getUIDPromise();

      if(!uid) {
        this.goToDashboard();
        return false;
      }
      const find = await this.cartSrv.getCartToPromise(environment.dataEvent.keyDb, uid);

      if(!find) {
        this.goToDashboard();
        return false;
      }

      return true;
    } catch (err) {
      console.log('Error on CheckHasCartGuard: ', err);
      this.goToDashboard();
      return false;
    }
  }

  goToDashboard() {
    this.router.navigate(["/pages/dashboard"]);
  }
  
}
