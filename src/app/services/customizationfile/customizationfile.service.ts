import { Injectable } from "@angular/core";
import { BehaviorSubject } from "rxjs";
import { environment } from "src/environments/environment";

@Injectable({
  providedIn: "root",
})
export class CustomizationfileService {

  constructor() { }

  version() { return "0.0.66" }

  getPROVISIONAKEY() {
    return this.getKeyDb()
  }

  getTranslate() {
    return window.localStorage.getItem("translate");
  }

  getKeyDb() {
    return window.localStorage.getItem("keyDB");
  }

  setKeyDb(key: string) {
    return window.localStorage.setItem("keyDB", key);
  }

  getUid() {
    return window.localStorage.getItem("uid");
  }

}
