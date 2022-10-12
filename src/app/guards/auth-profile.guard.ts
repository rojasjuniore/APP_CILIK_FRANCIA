import { Injectable } from '@angular/core';
import { ActivatedRouteSnapshot, CanActivate, CanActivateChild, Router, RouterStateSnapshot } from '@angular/router';
import { map, Observable } from 'rxjs';
import { AuthenticationService } from '../services/authentication.service';

@Injectable({
  providedIn: 'root'
})
export class AuthProfileGuard implements CanActivate, CanActivateChild {

  constructor(
    private router: Router,
    private authService: AuthenticationService
  ) { }

  canActivate(
    route: ActivatedRouteSnapshot,
    state: RouterStateSnapshot
  ): Observable<boolean> {

    const profiles = route.data.profiles || [];
    // console.log('router profiles', profiles);

    return this.authService.userDoc$.pipe(
      map((user: any) => {
        const roles = user.roles || [];

        /** No posee roles asignados */
        if(profiles.roles == 0){ 
          this.router.navigate(['/admin']);
          return false; 
        }

        /** La ruta no posee perfiles asignados */
        if(profiles.length == 0){ return true; }

        /** La ruta posee perfiles asignados */
        const hasProfile = roles.some((role: any) => profiles.includes(role));
        if(!hasProfile){ 
          this.router.navigate(['/admin']); 
          return false;
        }

        return true;
      })
    );
  }
  
  canActivateChild(
    childRoute: ActivatedRouteSnapshot,
    state: RouterStateSnapshot
  ): Observable<boolean> {

    // console.log('childRoute', childRoute);

    const profiles = childRoute.data.profiles || [];
    console.log('childRoute profiles', profiles);

    return this.authService.userDoc$.pipe(
      map((user: any) => {
        const roles = user.roles || [];

        /** No posee roles asignados */
        if(profiles.roles == 0){ 
          this.router.navigate(['/admin']);
          return false; 
        }

        /** La ruta no posee perfiles asignados */
        if(profiles.length == 0){ return true; }

        /** La ruta posee perfiles asignados */
        const hasProfile = roles.some((role: any) => profiles.includes(role));
        if(!hasProfile){ 
          this.router.navigate(['/admin']); 
          return false;
        }

        return true;
      })
    );
  }
  
}
