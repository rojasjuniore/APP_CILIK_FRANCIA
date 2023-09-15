import { Injectable } from '@angular/core';
import { ActivatedRouteSnapshot, CanActivate, Router, RouterStateSnapshot, UrlTree } from '@angular/router';
import { Observable, map } from 'rxjs';
import { AuthenticationService } from '../services/authentication.service';

@Injectable({
  providedIn: 'root'
})
export class IsAuthGuard implements CanActivate {

  constructor(
    private authSrv: AuthenticationService,
    private router: Router
  ) { }

  canActivate(
    next: ActivatedRouteSnapshot,
    state: RouterStateSnapshot
  ): 
    Observable<boolean> 
  {
    return this.authSrv.afAuth.authState.pipe(
      map(user => user ? user.uid : null),
      // tap((uid) => console.log({ uid })),
      map((uid) => {
        if (uid) { return true; }
        this.router.navigate(["/sign-in"]);
        return false;
      })
    );
  }

  // canActivate(
  //   next: ActivatedRouteSnapshot,
  //   state: RouterStateSnapshot
  // ): 
  //   Promise<boolean> 
  // {
  //   return new Promise((resolve, reject) => {
  //     this.authSrv.afAuth
  //     .onAuthStateChanged((user: any) => {
  //       // console.log({ user })

  //       if (user) return resolve(true);
        
  //       this.router.navigate(["/sign-in"]);
  //       return resolve(false);
        
  //     });
  //   });
  // }
}
