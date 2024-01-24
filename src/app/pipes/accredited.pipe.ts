import { Pipe, PipeTransform } from '@angular/core';
import { PurchaseService } from '../services/purchase.service';
import { environment } from 'src/environments/environment';

@Pipe({
  name: 'accredited'
})
export class AccreditedPipe implements PipeTransform {


  constructor(private purchaseSrv: PurchaseService) { }

  async transform(orderID: string, index: number): Promise<boolean> {
    try {
      const purchasesSnapshot: any = await this.purchaseSrv.getPurchasesToPromise(environment.dataEvent.keyDb, orderID);

      if (!purchasesSnapshot.exists) {
        console.warn('No purchase found for orderID:', orderID);
        return false;
      }

      const purchases = purchasesSnapshot.data();
      const product = purchases.product?.[index];

      if (!product) {
        console.warn(`No product found at index ${index} for orderID:`, orderID);
        return false;
      }

      // console.log('product', product);
      return product._accredited ?? false;

    } catch (error) {
      console.error('Error in transform function for orderID', orderID, ':', error);
      throw error; // or return false if you prefer not to throw
    }
  }


}
