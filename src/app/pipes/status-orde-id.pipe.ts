import { Pipe, PipeTransform } from '@angular/core';
import { PurchaseService } from '../services/purchase.service';
import { environment } from 'src/environments/environment';

@Pipe({
  name: 'statusOrdeID'
})
export class StatusOrdeIDPipe implements PipeTransform {

  constructor(private purchaseSrv: PurchaseService) { }

  async transform(orderID): Promise<boolean> {
    try {
      const purchasesSnapshot: any = await this.purchaseSrv.getPurchasesToPromise(environment.dataEvent.keyDb, orderID);

      if (purchasesSnapshot.exists) {
        const purchases = purchasesSnapshot.data();
        console.log('statusOrdeID', purchases);
        const status = purchases.payload.type === 'success';
        console.log('statusOrdeID', status);
        return status;
      } else {
        console.warn('No purchase found for orderID:', orderID);
      }
    } catch (error) {
      console.error('Error in transform function for orderID', orderID, ':', error);
    }

    return false;
  }


}
