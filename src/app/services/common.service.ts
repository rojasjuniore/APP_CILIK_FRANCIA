import { Injectable } from '@angular/core';


@Injectable({
  providedIn: 'root'
})
export class CommonService {

  constructor() { }


  // @dev  get Parameter By Name
  getParameterByName(name, url?) {
    if (!url) url = window.location.href;
    name = name.replace(/[\[\]]/g, "\\$&");
    var regex = new RegExp("[?&]" + name + "(=([^&#]*)|&|#|$)"),
      results = regex.exec(url);
    if (!results) return null;
    if (!results[2]) return "";
    return decodeURIComponent(results[2].replace(/\+/g, " "));
  }

  /**
   * 
   * @param str 
   * @returns 
   */
  noSpecialCharacters(str: any) {
    console.log(str);
    const noSpecialCharacters = str.replace(/[^a-zA-Z0-9 ]/g, '');
    console.log(noSpecialCharacters);
    return noSpecialCharacters.trim().toLowerCase();
  }


  // @dev sub addres
  getAddress(address: string) {
    if (!address) { return }
    return address.substring(0, 6) + '...' + address.substring(address.length - 4, address.length)
  }

  // @dev  go to link
  goToLink(url: string) {
    window.open(url, "_blank");
  }

  getCurrentVersion(){
    return '0.0.1';
  }

}
