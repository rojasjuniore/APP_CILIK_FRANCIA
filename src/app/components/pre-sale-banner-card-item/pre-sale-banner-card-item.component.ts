import { Component, Input, OnInit } from '@angular/core';

@Component({
  selector: 'app-pre-sale-banner-card-item',
  templateUrl: './pre-sale-banner-card-item.component.html',
  styleUrls: ['./pre-sale-banner-card-item.component.css']
})
export class PreSaleBannerCardItemComponent implements OnInit {

  @Input() orderType = "fullPass";

  constructor() { }

  ngOnInit(): void {
  }

}
