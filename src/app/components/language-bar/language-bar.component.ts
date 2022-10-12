import { Component, OnInit } from '@angular/core';
import { CustomTranslateService } from 'src/app/services/custom-translate.service';

@Component({
  selector: 'app-language-bar',
  templateUrl: './language-bar.component.html',
  styleUrls: ['./language-bar.component.css']
})
export class LanguageBarComponent implements OnInit {

  constructor(
    public translateSrv: CustomTranslateService,
  ) { }

  ngOnInit(): void {
  }

  changeLanguage(lang: string){
    this.translateSrv.changeLanguage(lang);
    window.localStorage.setItem('lang', lang);
  }

}
