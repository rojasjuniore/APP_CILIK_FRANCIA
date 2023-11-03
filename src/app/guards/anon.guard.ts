import { Injectable } from '@angular/core';
import { CanActivate, Router, ActivatedRouteSnapshot, RouterStateSnapshot } from '@angular/router';
import { AngularFireAuth } from '@angular/fire/compat/auth';
import { map, take } from 'rxjs/operators';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class AnonGuard implements CanActivate {
  constructor(private afAuth: AngularFireAuth, private router: Router) { }

  canActivate(
    next: ActivatedRouteSnapshot,
    state: RouterStateSnapshot
  ): Observable<boolean> | Promise<boolean> | boolean {
    return this.afAuth.authState.pipe(
      take(1),
      map(user => {
        const isAnon = user?.isAnonymous;
        if (isAnon) {

          /**
           * TODO:  Guarda la URL de intento en algún servicio de estado o localstorag
           */
          localStorage.setItem('returnUrl', state.url);

          // Redirige a la página de inicio de sesión
          this.router.navigate(['/auth/sign-in']);
          return false;
        }
        // Permite la activación de la ruta si no es anónimo
        return true;
      })
    );
  }
}
