import { Injectable } from '@angular/core';
import { ActivatedRouteSnapshot, CanActivate, Router, RouterStateSnapshot, UrlTree } from '@angular/router';

import { Observable } from 'rxjs';
import { AuthenticationService } from '../services/authentication.service';

@Injectable({
  providedIn: 'root'
})
export class AuthRoleGuard implements CanActivate {

  constructor(private authService: AuthenticationService,
              private router: Router){}

  canActivate(
    route: ActivatedRouteSnapshot,
    state: RouterStateSnapshot) {
      

      this.authService.getUserAuth(localStorage.getItem('email')).subscribe({
        next: (resp: any) => {
          console.log(resp);
          if(resp && resp.length > 0){

            if(resp[0].role === 'admin'){
              localStorage.setItem('auth', 'adm')
              return true;
            }else{
              this.alert();
              return false;
            }

          }else{
            this.alert();
            return false;
          }
        }
      })
    return true;
  }


  alert(){
    this.router.navigateByUrl('/pages/dashboard');

  }
  
}
