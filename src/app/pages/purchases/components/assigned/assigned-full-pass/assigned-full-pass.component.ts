import { Component, Input, OnInit } from '@angular/core';

@Component({
  selector: 'app-assigned-full-pass',
  templateUrl: './assigned-full-pass.component.html',
  styleUrls: ['./assigned-full-pass.component.css']
})
export class AssignedFullPassComponent implements OnInit {
  @Input() division: any;
  @Input() orderDocId: any;
  @Input() index: any;
  item: any;
  constructor() { }

  ngOnInit(): void {
    // console.log('app-assigned-full-pass', this.division.accreditation);
    this.item = (this.division.accreditation == undefined) ? this.division : this.division.accreditation;
    // console.log('this.item', this.item);
  }

}
