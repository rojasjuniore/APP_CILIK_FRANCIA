import { Component, Input, OnInit } from '@angular/core';
@Component({
  selector: 'app-weekend-fest-card-item',
  templateUrl: './weekend-fest-card-item.component.html',
  styleUrls: ['./weekend-fest-card-item.component.css']
})
export class WeekendFestCardItemComponent implements OnInit {
  @Input() item: any;

  constructor() { }

  ngOnInit(): void { }

  get totales(){
    if(!this.item) return 0;
    return Number(this.item.totales);
  }

}
