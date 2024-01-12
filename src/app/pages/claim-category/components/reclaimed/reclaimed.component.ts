import { Component, Input, OnInit } from '@angular/core';

@Component({
  selector: 'app-reclaimed',
  templateUrl: './reclaimed.component.html',
  styleUrls: ['./reclaimed.component.css']
})
export class ReclaimedComponent implements OnInit {
  @Input() reclaimed: any;
  constructor() { }

  ngOnInit(): void {
    console.log(this.reclaimed);
  }

}
