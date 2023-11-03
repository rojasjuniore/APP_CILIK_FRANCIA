import { Injectable } from '@angular/core';
import { CanActivate, Router } from '@angular/router';
import { AngularFireAuth } from '@angular/fire/compat/auth';
import { map } from 'rxjs/operators';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class NoAnonGuard implements CanActivate {
  constructor(private afAuth: AngularFireAuth, private router: Router) { }

  canActivate(): Observable<boolean> | Promise<boolean> | boolean {
    return this.afAuth.authState.pipe(
      map(user => {
        if (user && !user.isAnonymous) {
          // El usuario está autenticado y no es anónimo, redireccionar a dashboard
          this.router.navigate(['/pages/dashboard']);
          return false; // No activar la ruta actual
        } else {
          // Permitir acceso a la ruta actual
          return true;
        }
      })
    );
  }
}
