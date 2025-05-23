import { Injectable } from '@angular/core';
import { ActivatedRouteSnapshot, CanActivate, Router, RouterStateSnapshot, UrlTree } from '@angular/router';

import { Observable } from 'rxjs';
import { AuthenticationService } from '../services/authentication.service';

@Injectable({
  providedIn: 'root'
})
export class AuthRoleGuard implements CanActivate {

  constructor(private authService: AuthenticationService,
    private router: Router) { }

  canActivate(
    route: ActivatedRouteSnapshot,
    state: RouterStateSnapshot) {

    try {
      this.authService.getUserAuth(localStorage.getItem('email')).subscribe({
        next: (resp: any) => {

          const data = resp[0];
          const { roles = [] } = data;
          // console.log('resp', resp);
          if (resp && resp.length > 0) {

            if (roles.includes('admin-payments')) {
              localStorage.setItem('auth', 'adm')
              return true;
            } else {
              this.alert();
              return false;
            }

          } else {
            this.alert();
            return false;
          }
        }
      })
      return true;
    } catch (e) {
      console.log(e)
      this.alert();
      return false;
    }

  }


  alert() {
    this.router.navigateByUrl('/pages/dashboard');
  }

}
