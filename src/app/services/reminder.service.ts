import { Injectable } from '@angular/core';
import { AngularFirestore } from '@angular/fire/compat/firestore';
import { lastValueFrom } from 'rxjs';
import { handlerArrayResult, handlerObjectResult } from '../helpers/model.helper';
import { environment } from 'src/environments/environment';

@Injectable({
  providedIn: 'root'
})
export class ReminderService {

  public reminderCollection = environment.production ? "reminders" : "reminders-dev";

  constructor(
    public afs: AngularFirestore,
  ) { }

  async store(data: any) {
    const id = this.afs.createId();
    const doc = this.afs.collection(this.reminderCollection).doc(id);
    await doc.set(data);
    return id;
  }

  async update(id: string, data: any) {
    return await this.afs.collection(this.reminderCollection).doc(id).update(data);
  }

  async delete(id: string) {
    return await this.afs.collection(this.reminderCollection).doc(id).delete();
  }

  async get(id: string) {
    const snapshot = await lastValueFrom(
      this.afs.collection(this.reminderCollection).doc(id).get()
    );
    return await handlerObjectResult(snapshot);
  }

  async getByPurchaseId(purchaseId: string) {
    const snapshot = await lastValueFrom(
      this.afs.collection(this.reminderCollection, ref => ref.where('purchaseId', '==', purchaseId)).get()
    );
    return await handlerArrayResult(snapshot);
  }
}
