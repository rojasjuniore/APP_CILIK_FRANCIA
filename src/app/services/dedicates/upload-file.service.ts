import { Injectable } from '@angular/core';
import { AngularFireStorage } from '@angular/fire/compat/storage';
import { finalize } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class UploadFileService {

  constructor(
    private storage: AngularFireStorage,
  ) { }

  async uploadFileDocumentIntoRoute(filePath: string, file: File) {
    return new Promise(async (resolve, reject) => {
      try {

        /** Crear Referencia en el Bucket */
        const fileRef = this.storage.ref(filePath);

        /** Crear tarea para subir archivp */
        const task = this.storage.upload(filePath, file);

        /** 
         * Ejecutar tarea y esperar respuesta 
         * - Retorna la URL del archivo subido
         */
        task
          .snapshotChanges()
          .pipe(
            finalize(() => {
              fileRef.getDownloadURL().subscribe((url) => {
                let uploadProgress = 0;
                resolve(url);
              });
            })
          )
          .subscribe();

      } catch (err) {
        return reject(err);
      }
    });
  }

  async removeByURL(url: string) {
    await this.storage.storage.refFromURL(url).delete();
    return true;
  }

}
