import { Component, OnInit } from '@angular/core';
import { NgxSpinnerService } from 'ngx-spinner';
import { AuthenticationService } from 'src/app/services/authentication.service';
import { CustomTranslateService } from 'src/app/services/custom-translate.service';

@Component({
  selector: 'app-language-bar',
  templateUrl: './language-bar.component.html',
  styleUrls: ['./language-bar.component.css']
})
export class LanguageBarComponent implements OnInit {

  constructor(
    public translateSrv: CustomTranslateService,
    private authSrv: AuthenticationService,
    private spinner: NgxSpinnerService,
  ) { }

  ngOnInit(): void {
  }

  async changeLanguage(lang: string){

    this.translateSrv.changeLanguage(lang);
    window.localStorage.setItem('lang', lang);

    const uid = this.authSrv.getLocalUID();
    if(uid){
      await this.spinner.show();
      await this.authSrv.updateUser(uid, {language: lang});
      this.spinner.hide();
    }

    return;
  }

}
