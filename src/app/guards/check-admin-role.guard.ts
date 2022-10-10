import { Injectable } from '@angular/core';
import { ActivatedRouteSnapshot, CanActivate, RouterStateSnapshot, UrlTree } from '@angular/router';
import { Observable, of } from 'rxjs';
import { AuthenticationService } from '../services/authentication.service';
import { PermissionService } from '../services/permission.service';

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

    const uid = window.localStorage.getItem('uid') || null;
    // console.log('uid', uid);

    if(!uid){
      return of(false);
    }

    return this.permissionSrv.checkUserHasRoles(uid);
    // return of(true);
  }
  
}
