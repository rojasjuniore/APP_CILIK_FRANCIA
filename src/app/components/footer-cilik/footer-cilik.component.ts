import { Component, OnInit } from '@angular/core';
import { CommonService } from 'src/app/services/common.service';

@Component({
  selector: 'app-footer-cilik',
  templateUrl: './footer-cilik.component.html',
  styleUrls: ['./footer-cilik.component.css']
})
export class FooterCilikComponent implements OnInit {

  constructor(
    private commonSrv: CommonService,
  ) { }

  ngOnInit(): void {
  }

  get currentVersion(){ return this.commonSrv.getCurrentVersion(); }

}
