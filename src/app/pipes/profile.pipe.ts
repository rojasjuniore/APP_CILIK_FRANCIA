import { Pipe, PipeTransform } from '@angular/core';
import { AngularFireDatabase } from '@angular/fire/compat/database';
import { AngularFirestore } from '@angular/fire/compat/firestore';
import { collect } from 'underscore';

@Pipe({
  name: 'profile'
})
export class ProfilePipe implements PipeTransform {

  constructor(
    private afs: AngularFirestore,
    private db: AngularFireDatabase) { }

  async transform(value): Promise<any> {
    if (!value) return "No validado";
    let name = await this.getUserNameDB(value);
    if (!name) {
      const profile: any = await this.getProfileAfs(value);
      if (profile) {
        name = profile.name;
      }
    }
    return name;
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
      return this.db.object(`/users/${uid}/name`)
        .valueChanges()
        .subscribe((data: any) => {
          resolve(data);
        });
    })
  }

}
