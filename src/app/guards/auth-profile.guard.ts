import { Injectable } from '@angular/core';
import { ActivatedRouteSnapshot, CanActivate, CanActivateChild, Router, RouterStateSnapshot } from '@angular/router';
import { map, Observable, of, switchMap, tap } from 'rxjs';
import { AuthenticationService } from '../services/authentication.service';
import { environment } from 'src/environments/environment';
import { PermissionService } from '../services/permission.service';

@Injectable({
  providedIn: 'root'
})
export class AuthProfileGuard implements CanActivate {

  constructor(
    private router: Router,
    private authSrv: AuthenticationService,
    private permissionSrv: PermissionService,
  ) { }

  canActivate(
    route: ActivatedRouteSnapshot,
    state: RouterStateSnapshot
  ): Observable<boolean> {

    const profiles = route.data.profiles || [];
    console.log('router profiles', profiles);

    return this.authSrv.afAuth.authState.pipe(
      map(user => user ? user.uid : null),
      // tap((uid) => console.log({ uid })),
      switchMap((uid) => (uid)
        ? this.permissionSrv.getUserEventFullRolesObservable(environment.dataEvent.keyDb, uid)
        : of({superAdmin: false, roles: []})
      ),
      // tap((user) => console.log({ user })),
      map((user: any) => {

        /** No tiene roles que verificar */
        if(profiles.length == 0){ return true; }

        /** Es Super-Admin */
        if(user.superAdmin) { return true; }

        /** Tiene roles asignados */
        if(user.roles.length > 0){

          /** Tiene alguno de los roles permitidos */
          if(user.roles.some((role: any) => profiles.includes(role))){
            return true;
          }

        }

        // return (user.superAdmin || user.roles.length > 0) ? true : false;
        this.router.navigate(['/admin']);
        return false;
      }),
      // tap((user) => console.log('canActivate',user)),
    );

    // return this.authSrv.userDoc$.pipe(
    //   map((user: any) => {
    //     const roles = user.roles || [];

    //     /** No posee roles asignados */
    //     if(profiles.roles == 0){ 
    //       this.router.navigate(['/admin']);
    //       return false; 
    //     }

    //     /** La ruta no posee perfiles asignados */
    //     if(profiles.length == 0){ return true; }

    //     /** La ruta posee perfiles asignados */
    //     const hasProfile = roles.some((role: any) => profiles.includes(role));
    //     if(!hasProfile){ 
    //       this.router.navigate(['/admin']); 
    //       return false;
    //     }

    //     return true;
    //   })
    // );
  }
  
  // canActivateChild(
  //   childRoute: ActivatedRouteSnapshot,
  //   state: RouterStateSnapshot
  // ): Observable<boolean> {

  //   // console.log('childRoute', childRoute);

  //   const profiles = childRoute.data.profiles || [];
  //   console.log('childRoute profiles', profiles);

  //   return this.authSrv.userDoc$.pipe(
  //     map((user: any) => {
  //       const roles = user.roles || [];

  //       /** No posee roles asignados */
  //       if(profiles.roles == 0){ 
  //         this.router.navigate(['/admin']);
  //         return false; 
  //       }

  //       /** La ruta no posee perfiles asignados */
  //       if(profiles.length == 0){ return true; }

  //       /** La ruta posee perfiles asignados */
  //       const hasProfile = roles.some((role: any) => profiles.includes(role));
  //       if(!hasProfile){ 
  //         this.router.navigate(['/admin']); 
  //         return false;
  //       }

  //       return true;
  //     })
  //   );
  // }
  
}
