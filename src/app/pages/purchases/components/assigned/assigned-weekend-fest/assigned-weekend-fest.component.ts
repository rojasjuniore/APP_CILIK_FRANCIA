import { Component, Input, OnInit } from '@angular/core';

@Component({
  selector: 'app-assigned-weekend-fest',
  templateUrl: './assigned-weekend-fest.component.html',
  styleUrls: ['./assigned-weekend-fest.component.css']
})
export class AssignedWeekendFestComponent implements OnInit {
  @Input() division: any;
  @Input() orderDocId: any;
  @Input() index: any;
  item: any;
  constructor() { }

  ngOnInit(): void {
    // console.log('app-assigned-weekend-fest', this.division);
    this.item = (this.division.accreditation == undefined) ? this.division : this.division.accreditation;
    // console.log('this.item', this.item);
  }

}
