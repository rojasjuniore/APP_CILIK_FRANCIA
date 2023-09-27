import { Injectable } from '@angular/core';
import { ActivatedRouteSnapshot, CanActivate, RouterStateSnapshot, UrlTree } from '@angular/router';
import { Observable, map, of, switchMap, tap } from 'rxjs';
import { AuthenticationService } from '../services/authentication.service';
import { PermissionService } from '../services/permission.service';
import { environment } from 'src/environments/environment';

@Injectable({
  providedIn: 'root'
})
export class CheckAdminRoleGuard implements CanActivate {

  constructor(
    private authSrv: AuthenticationService,
    private permissionSrv: PermissionService,
  ){}

  canActivate(
    route: ActivatedRouteSnapshot,
    state: RouterStateSnapshot
  ): Observable<boolean> {
    return this.authSrv.afAuth.authState.pipe(
      map(user => user ? user.uid : null),
      // tap((uid) => console.log({ uid })),
      switchMap((uid) => (uid)
        ? this.permissionSrv.getUserEventFullRolesObservable( environment.dataEvent.keyDb, uid)
        : of({superAdmin: false, roles: []})
      ),
      // tap((user) => console.log({ user })),
      map((user: any) => {
        return (user.superAdmin || user.roles.length > 0) ? true : false;
      })
    );
  }
  
}
