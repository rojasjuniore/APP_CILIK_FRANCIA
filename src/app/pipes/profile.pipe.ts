import { Pipe, PipeTransform } from '@angular/core';
import { AngularFireDatabase } from '@angular/fire/compat/database';

@Pipe({
  name: 'profile'
})
export class ProfilePipe implements PipeTransform {

  constructor(public db: AngularFireDatabase) { }

  async transform(value): Promise<any> {
    if (!value)  return "No validado";
    const name = await this.getUserName(value);
    return name;
  }


  /**
   * 
   * @param uid 
   * @returns 
   */
  getUserName(uid) {
    return new Promise((resolve) => {
      return this.db.object(`/users/${uid}/name`)
        .valueChanges()
        .subscribe((data: any) => {
          resolve(data);
        });
    })
  }

}
