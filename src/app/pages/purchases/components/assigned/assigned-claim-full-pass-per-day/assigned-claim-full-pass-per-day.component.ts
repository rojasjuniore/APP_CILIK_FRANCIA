import { Component, Input, OnInit } from '@angular/core';

@Component({
  selector: 'app-assigned-claim-full-pass-per-day',
  templateUrl: './assigned-claim-full-pass-per-day.component.html',
  styleUrls: ['./assigned-claim-full-pass-per-day.component.css']
})
export class AssignedClaimFullPassPerDayComponent implements OnInit {
  @Input() division: any;
  @Input() orderDocId: any;
  @Input() index: any;
  @Input() type: any;
  item: any;

  constructor() { }

  ngOnInit(): void {
    this.item = (this.division.accreditation == undefined) ? this.division : this.division.accreditation;
  }

}
