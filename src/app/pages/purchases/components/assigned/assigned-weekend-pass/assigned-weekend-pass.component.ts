import { Component, Input, OnInit } from '@angular/core';

@Component({
  selector: 'app-assigned-weekend-pass',
  templateUrl: './assigned-weekend-pass.component.html',
  styleUrls: ['./assigned-weekend-pass.component.css']
})
export class AssignedWeekendPassComponent implements OnInit {
  @Input() division: any;
  @Input() orderDocId: any;
  @Input() index: any;
  @Input() type: any;
  item: any;

  constructor() { }

  ngOnInit(): void {
    // console.log('this.division', this.division);
    this.item = (this.division.accreditation == undefined) ? this.division : this.division.accreditation;
    // console.log('this.item', this.item);
  }

}
