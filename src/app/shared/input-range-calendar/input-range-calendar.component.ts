import { AfterViewInit, Component, Input, OnChanges, OnInit, Output, SimpleChanges } from '@angular/core';
import { end } from '@popperjs/core';
import 'daterangepicker';

// jquery
import $ from 'jquery';
import moment from 'moment';
import { Subject } from 'rxjs';

@Component({
  selector: 'app-input-range-calendar',
  templateUrl: './input-range-calendar.component.html',
  styleUrls: ['./input-range-calendar.component.css']
})
export class InputRangeCalendarComponent implements OnInit, AfterViewInit, OnChanges {

  @Output() onUpdateDates = new Subject<string>();

  @Input() _id: string = 'dateRangePicker';

/** https://www.daterangepicker.com/#options */

  @Input() autoUpdateInput =  true;

  @Input() autoApply =  false;

  @Input() opens =  'right'; // left, right, center

  @Input() drops =  'auto'; // up, down, auto


  @Input() buttonClasses =  'btn btn-sm';

  @Input() applyButtonClasses =  'btn-primary';

  @Input() cancelButtonClasses =  'btn-default';


  @Input() cancelLabel =  'Cancel';
  @Input() applyLabel =  'Apply';


  /** Fechas limites en formato DD/MM/YYYY */
  @Input() startDate: string = moment().startOf('week').format('MM/DD/YYYY');
  @Input() endDate: string = moment().endOf('week').format('MM/DD/YYYY');

  @Input() minDate: string = moment().startOf('week').format('MM/DD/YYYY');
  @Input() maxDate: string = moment().endOf('week').format('MM/DD/YYYY');

  constructor() { }

  ngOnInit(): void {
    // console.log({
    //   startDate: this.startDate,
    //   endDate: this.endDate,
    // });
  }

  ngOnChanges(changes: SimpleChanges): void {
    const {
      startDate,
      endDate,
      minDate,
      maxDate,
    } = changes;

    if(startDate && startDate.currentValue) {
      this.startDate = startDate.currentValue;
      // $(`#${this._id}`).data('daterangepicker').setStartDate(this.startDate);
    }

    if(endDate && endDate.currentValue) {
      this.endDate = endDate.currentValue;
      // $(`#${this._id}`).data('daterangepicker').setEndDate(this.endDate);
    }
  }

  ngAfterViewInit() {
    this.buildDatepicker();
  }

  public buildDatepicker(){

    const options = {
      autoApply: this.autoApply,
      autoUpdateInput: this.autoUpdateInput,
      startDate: this.startDate,
      endDate: this.endDate,
      minDate: this.minDate,
      maxDate: this.maxDate,
      opens: this.opens,
      drops: this.drops,
      buttonClasses: this.buttonClasses,
      applyButtonClasses: this.applyButtonClasses,
      cancelButtonClasses: this.cancelButtonClasses,
      locale: { 
        cancelLabel: this.cancelLabel,
        applyLabel: this.applyLabel
      } 
    };

    console.log('options', options);
    $(`#${this._id}`).daterangepicker({...options});

    // console.log('prop', $(`#${this._id}`).data('daterangepicker'));

    $(`#${this._id}`).on('apply.daterangepicker', (ev, picker) => {
      const startDate = picker.startDate.format('YYYY-MM-DD');
      const endDate = picker.endDate.format('YYYY-MM-DD');
      console.log({startDate, endDate});
      this.onUpdateDates.next(`${startDate};${endDate}`);
    });
  }

  show(){
    $(`#${this._id}`).data('daterangepicker').show();
  }

}
