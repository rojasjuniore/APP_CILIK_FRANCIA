import { Component, Input, OnInit } from '@angular/core';

@Component({
  selector: 'app-assigned-hotel',
  templateUrl: './assigned-hotel.component.html',
  styleUrls: ['./assigned-hotel.component.css']
})
export class AssignedHotelComponent implements OnInit {
  @Input() division: any;
  @Input() orderDocId: any;
  @Input() index: any;
  @Input() type: any;
  item: any;

  constructor() { }

  ngOnInit(): void {
    this.item = (this.division.accreditation == undefined) ? this.division : this.division.accreditation;
    // console.log('this.item', this.item);
  }

}
