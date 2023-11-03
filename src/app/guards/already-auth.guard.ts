import { Injectable } from '@angular/core';
import { CanActivate, Router } from '@angular/router';
import { AngularFireAuth } from '@angular/fire/compat/auth';
import { map, take } from 'rxjs/operators';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class AlreadyAuthGuard implements CanActivate {

  constructor(
    private afAuth: AngularFireAuth,
    private router: Router
  ) { }

  canActivate(): Observable<boolean> {
    return this.afAuth.authState.pipe(
      take(1),
      map(user => {
        if (user) {
          // Si es un usuario anónimo, permitir el paso.
          if (user.isAnonymous) {
            return true;
          } else {
            // Si es un usuario autenticado y no es anónimo, redirigir y no permitir el paso.
            this.router.navigate(['/pages/dashboard']);
            return false;
          }
        }
        // Si no hay usuario, permitir el paso.
        return true;
      })
    );
  }
}
