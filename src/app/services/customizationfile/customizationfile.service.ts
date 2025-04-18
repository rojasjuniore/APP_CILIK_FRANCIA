import { Injectable } from "@angular/core";
import { environment } from "src/environments/environment";
@Injectable({
  providedIn: "root",
})
export class CustomizationfileService {

  constructor() { }

  getVersion() {
    return "0.0.50"
  }

  getPROVISIONAKEY() {
    return this.getKeyDb()
  }

  getTranslate() {
    return window.localStorage.getItem("translate");
  }

  getKeyDb() {
    return window.localStorage.getItem("keyDB") || environment.dataEvent.keyDb;
  }

  setKeyDb(key: string) {
    return window.localStorage.setItem("keyDB", key);
  }

  getUid() {
    return window.localStorage.getItem("uid");
  }

  transformarString(string) {
    if (!string) { return null; }
    const number = string.toString();
    return number.replace(/[`~!@#$%^&*()_|+\-=?;:'",.<>\{\}\[\]\\\/]/gi, "").toLowerCase()
  }

}
