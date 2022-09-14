import { Injectable } from '@angular/core';
import { Md5 } from 'ts-md5/dist/md5';

@Injectable({
  providedIn: 'root'
})
export class PayuService {
  payuConfig: any
  paymentString: any
  currency_symbol = "USD"
  constructor() { }

  md5(signature: string): any {
    const md5 = new Md5();
    return md5.appendStr(signature).end();
  }
}
