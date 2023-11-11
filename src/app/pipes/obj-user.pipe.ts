import { Pipe, PipeTransform } from '@angular/core';
import { AngularFireDatabase } from '@angular/fire/compat/database';
import { AngularFirestore } from '@angular/fire/compat/firestore';

@Pipe({
  name: 'objUser'
})
export class ObjUserPipe implements PipeTransform {

  constructor(
    private afs: AngularFirestore,
    private db: AngularFireDatabase) { }

  async transform(value): Promise<any> {
    if (!value) return "No validado";

    try {
      const data = await this.getUserNameDB(value);
      if (data) {
        // console.warn(2, 'data', data);
        return data;
      }

      const profile = await this.getProfileAfs(value);
      console.warn(1, 'profile', profile);
      return profile ?? "No se encontraron datos"; // retorna un mensaje si profile también es nulo
    } catch (error) {
      console.error('Error al obtener los datos', error);
      throw error; // O manejarlo de otra manera según la lógica de tu aplicación
    }
  }




  getProfileAfs(uid) {
    return new Promise((resolve) => {
      return this.afs
        .collection('users').
        doc(uid)
        .valueChanges()
        .subscribe((data: any) => {
          resolve(data);
        });
    })
  }


  /**
   * 
   * @param uid 
   * @returns 
   */
  getUserNameDB(uid) {
    return new Promise((resolve) => {
      return this.db.object(`/users/${uid}`)
        .valueChanges()
        .subscribe((data: any) => {
          resolve(data);
        });
    })
  }
}
