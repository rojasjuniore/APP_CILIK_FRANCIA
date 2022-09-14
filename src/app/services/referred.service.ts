import { Injectable } from '@angular/core';



@Injectable({
  providedIn: 'root'
})
export class ReferredService {
  REFERRED = "_referred"
  constructor() { }

  // @dev set Referred
  setCode(code: string) {
    window.localStorage.setItem(this.REFERRED, code);
  }

  // @dev get Referred
  getCode(): string {
    return window.localStorage.getItem(this.REFERRED) || "";
  }

  // @dev remove Referred
  removeCode() {
    window.localStorage.removeItem(this.REFERRED);
  }

}
