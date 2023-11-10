import { Injectable } from '@angular/core';
import { AngularFireDatabase } from '@angular/fire/compat/database';
import { Sweetalert2Service } from './sweetalert2.service';
import { environment } from 'src/environments/environment';

@Injectable({
  providedIn: 'root'
})
export class VersionService {

  constructor(
    private sweetalert2Srv: Sweetalert2Service,
    private db: AngularFireDatabase) { }



  checkForUpdates(localVersion: string) {
    // La URL de tu función desplegada de Firebase Functions
    this.db.object('version-wldc' + environment.dataEvent.keyDb).valueChanges().subscribe(async (data: any) => {
      console.log('version', data['version']);
      if (data['version'] !== localVersion) {

        const ask = await this.sweetalert2Srv.askConfirm('Hay una nueva versión disponible, ¿deseas actualizar?');
        if (!ask) { return; }

        // Si la versión es diferente, forzar una actualización
        window.location.reload();

        sessionStorage.clear();
        sessionStorage.removeItem('clave');
      }
    });
  }
}
