import { Pipe, PipeTransform } from "@angular/core";

@Pipe({
  name: "hiddenEmail",
})
export class HideEmailPipe implements PipeTransform {
  transform(email: any, ...args: any[]): any {
    // console.log("value", email);
    // return  email.replace(/^(.{2})[^@]+/, "$1XXX");
    if (!email) {
      return;
    }
    return this.censorEmail(email);
  }

  censorWord(str) {
    // console.log("str.length ", str.length);
    if (str.length > 1) {
      return str[0] + "*".repeat(str.length - 2) + str.slice(-1);
    } else {
      return "hidden";
    }
  }

  censorEmail(email) {
    // console.log("email", email);
    var arr = email.split("@");

    return this.censorWord(arr[0]) + "@" + this.censorWord(arr[1]);
  }
}
