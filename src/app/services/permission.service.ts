import { Injectable } from '@angular/core';
import { AngularFirestore } from '@angular/fire/compat/firestore';

@Injectable({
  providedIn: 'root'
})
export class PermissionService {

  public rolCollection = "permission__roles";
  public userRolesCollection = "users";

  constructor(
    private afs: AngularFirestore,
  ) { }

  async addRole(slug: string, data: any){
    try {
      await this.afs.collection(this.rolCollection).doc(slug).set(data);
      return true;
    } catch (err) {
      console.warn('Error on try to create a document', err);
      return false;
    }
  }
  
  async updateRole(slug: string, data: any){
    try {
      await this.afs.collection(this.rolCollection).doc(slug).update(data);
      return true;
    } catch (err) {
      console.warn('Error on try to update a document', err);
      return false;
      
    }
  }

  async updateUserRoles(uid: string, roles: any){
    try {
      await this.afs.collection(this.userRolesCollection).doc(uid).update({roles});
      return true;
    } catch (err) {
      console.warn('Error on try to update user groups', err);
      return false;
    }
  }

}
