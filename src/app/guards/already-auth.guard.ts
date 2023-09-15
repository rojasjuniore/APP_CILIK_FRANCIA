import { Injectable } from '@angular/core';
import { ActivatedRouteSnapshot, CanActivate, Router, RouterStateSnapshot, UrlTree } from '@angular/router';
import { Observable, map, of, switchMap, tap } from 'rxjs';
import { AuthenticationService } from '../services/authentication.service';

@Injectable({
  providedIn: 'root'
})
export class AlreadyAuthGuard implements CanActivate {

  constructor(
    private authSrv: AuthenticationService,
    private router: Router
  ) { }

  // canActivate(
  //   next: ActivatedRouteSnapshot,
  //   state: RouterStateSnapshot
  // ): 
  //   Observable<boolean> 
  // {
  //   return this.authSrv.afAuth.authState.pipe(
  //     map(user => user ? user.uid : null),
  //     tap((uid) => console.log('AlreadyAuthGuard', { uid })),
  //     map((uid) => {
  //       if (!uid) { return true; }
  //       this.router.navigate(["/pages"]);
  //       return false;
  //     })
  //   );
  // }

  canActivate(
    next: ActivatedRouteSnapshot,
    state: RouterStateSnapshot
  ): Promise<boolean> {
    return new Promise((resolve, reject) => {
      this.authSrv.afAuth
      .onAuthStateChanged((user: any) => {
        console.log('AlreadyAuthGuard', { user })

        if (!user) { return resolve(true); }
        
        this.router.navigate(["/pages/dashboard"]);
        return resolve(false);
        
      });
    });
  }
}
