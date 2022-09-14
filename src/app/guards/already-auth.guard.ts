import { Injectable } from '@angular/core';
import { ActivatedRouteSnapshot, CanActivate, Router, RouterStateSnapshot, UrlTree } from '@angular/router';
import { Observable } from 'rxjs';
import { AuthenticationService } from '../services/authentication.service';

@Injectable({
  providedIn: 'root'
})
export class AlreadyAuthGuard implements CanActivate {

  constructor(
    private authSrv: AuthenticationService,
    private router: Router
  ) { }

  canActivate(
    next: ActivatedRouteSnapshot,
    state: RouterStateSnapshot
  ): 
    Promise<boolean> 
  {
    return new Promise((resolve, reject) => {
      this.authSrv.afAuth
      .onAuthStateChanged((user: any) => {
        // console.log({ user })

        if (!user) {
          return resolve(true);
        }
        
        this.router.navigate(["/pages/dashboard"]);
        return resolve(false);
        
      });
    });
  }
}
