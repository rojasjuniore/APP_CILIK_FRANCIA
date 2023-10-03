import { AfterViewInit, Component, Input, OnInit } from '@angular/core';
import 'daterangepicker';

// jquery
import $ from 'jquery';
import moment from 'moment';

@Component({
  selector: 'app-input-range-calendar',
  templateUrl: './input-range-calendar.component.html',
  styleUrls: ['./input-range-calendar.component.css']
})
export class InputRangeCalendarComponent implements OnInit, AfterViewInit {

  @Input() _id: string = 'dateRangePicker';


  @Input() autoUpdateInput =  false;


  /** Fechas limites en formato DD/MM/YYYY */
  @Input() startDate: string = moment().startOf('week').format('DD/MM/YYYY');
  @Input() endDate: string = moment().endOf('week').format('DD/MM/YYYY');

  constructor() { }

  ngOnInit(): void { }

  ngAfterViewInit() {
    this.buildDatepicker();
  }

  public buildDatepicker(){

    const opts = {
      autoUpdateInput: this.autoUpdateInput,
      "startDate": this.startDate,
      "endDate": this.endDate,
    };

    // if(this.startDate && this.endDate) {
    //   opts['startDate'] = this.startDate;
    //   opts['endDate'] = this.endDate;
    // }

    console.log('opts', opts);
    $(`#${this._id}`).daterangepicker({...opts});
  }

}
