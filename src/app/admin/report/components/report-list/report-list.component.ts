import { Component, Input, OnChanges, OnInit, SimpleChanges } from '@angular/core';
import { Observable, map, tap } from 'rxjs';
import { PurchaseService } from 'src/app/services/purchase.service';
import { environment } from 'src/environments/environment';

@Component({
  selector: 'app-report-list',
  templateUrl: './report-list.component.html',
  styleUrls: ['./report-list.component.css']
})
export class ReportListComponent implements OnInit, OnChanges {
  @Input() list: any[] = [];
  constructor() { }

  ngOnInit(): void {
  }

  ngOnChanges(changes: SimpleChanges): void {
    const { list } = changes;
    if (list && list.currentValue) {
      this.list = list.currentValue;
    }
  }

}