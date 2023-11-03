import { Injectable } from '@angular/core';
import { CanActivate, Router } from '@angular/router';
import { AngularFireAuth } from '@angular/fire/compat/auth';
import { Observable, of } from 'rxjs';
import { map, switchMap } from 'rxjs/operators';
import { AuthenticationService } from '../services/authentication.service';

@Injectable({
  providedIn: 'root'
})
export class AnonymouslyGuard implements CanActivate {

  constructor(
    private authSrv: AuthenticationService,
    private afAuth: AngularFireAuth,
    private router: Router) { }

  canActivate(): Observable<boolean> | Promise<boolean> | boolean {
    return this.afAuth.authState.pipe(
      switchMap((user) => {
        if (user) {
          // Si hay un usuario logueado (autenticado o anónimo)
          return of(true);
        } else {
          // Si no hay usuario logueado, iniciar sesión anónimamente
          return this.authSrv.loginAnonymously().then(() => true);
        }
      }),
      map((loggedIn) => {
        if (!loggedIn) {
          // Redirigir al login si no pudo autenticarse anónimamente
          this.router.navigate(['/login']);
          return false;
        }
        return true;
      })
    );
  }
}
