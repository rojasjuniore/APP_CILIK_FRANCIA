import { Component, OnInit } from '@angular/core';
import { CommonService } from 'src/app/services/common.service';
import { CustomizationfileService } from 'src/app/services/customizationfile/customizationfile.service';
import { environment } from 'src/environments/environment';

@Component({
  selector: 'app-footer-cilik',
  templateUrl: './footer-cilik.component.html',
  styleUrls: ['./footer-cilik.component.css']
})
export class FooterCilikComponent implements OnInit {

  constructor(
    private customFileSrv: CustomizationfileService,
  ) { }

  ngOnInit(): void {
  }

  get currentVersion() { return environment.version }

}
