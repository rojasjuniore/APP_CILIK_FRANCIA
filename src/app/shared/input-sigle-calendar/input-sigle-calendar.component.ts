import { AfterViewInit, Component, Input, OnChanges, OnDestroy, OnInit, Output, SimpleChanges } from '@angular/core';
import 'bootstrap-datepicker';
import moment from 'moment';
import { Subject } from 'rxjs';
// jquery
declare var $: any;

@Component({
  selector: 'app-input-sigle-calendar',
  templateUrl: './input-sigle-calendar.component.html',
  styleUrls: ['./input-sigle-calendar.component.css']
})
export class InputSigleCalendarComponent implements OnInit, AfterViewInit, OnChanges, OnDestroy {

  @Input() _id: string = 'datepicker';
  @Input() placeholder: string = 'Selecciona una fecha';


  @Input() startDate!: string; // Fecha máxima de inicio Formato MM/DD/YYYY
  @Input() endDate!: string; // Fecha máxima de fin Formato MM/DD/YYYY

  // https://bootstrap-datepicker.readthedocs.io/en/latest/options.html#maxviewmode
  @Input() minViewMode: number = 0;
  @Input() maxViewMode: number = 0;
  @Input() weekStart: number = 0;

  @Input() clearBtn: boolean = false;
  @Input() keyboardNavigation: boolean = false;

  // https://bootstrap-datepicker.readthedocs.io/en/latest/options.html#language
  @Input() language: string = 'es';

  @Input() multidate: boolean = false;
  @Input() multidateSeparator!: string; //Default: “,”

  @Output() onUpdateDates = new Subject<string | string[]>();

  public datesSelected: any = '';


  constructor() { }

  ngOnInit(): void {
  }

  ngAfterViewInit() {
    this.buildDatepicker();
  }

  ngOnChanges(changes: SimpleChanges): void {
    const { startDate, endDate } = changes;

    if(startDate && startDate.currentValue) {
      this.startDate = startDate.currentValue;
      $(`#${this._id}`).datepicker('setStartDate', this.startDate);
    }

    if(endDate && endDate.currentValue) {
      this.endDate = endDate.currentValue;
      $(`#${this._id}`).datepicker('setEndDate', this.endDate);
    }
  }

  public buildDatepicker(){
    const options = {
      format: 'mm/dd/yyyy',
      startDate: this.startDate,
      endDate: this.endDate,
      multidate: this.multidate,
      multidateSeparator: this.multidateSeparator,
      language: this.language,
      clearBtn: this.clearBtn,
      keyboardNavigation: this.keyboardNavigation,
    };

    const filter = Object.keys(options).reduce((acc, key) => {
      if (options[key]) {
        acc[key] = options[key];
      }
      return acc;
    }, {});

    // Configura el datepicker
    $(`#${this._id}`).datepicker({
      ...filter,
      minViewMode: this.minViewMode,
      maxViewMode: this.maxViewMode,
      weekStart: this.weekStart,
    })
    .on('changeDate', (e: any) => {
      // Si es multidate
      if(this.multidate) {
        this.datesSelected = e.dates.map((item: any) => ({
          dateParsed: moment(item).format('MM/DD/YYYY'),
          order: moment(item).valueOf()
        }))
        .sort((a: any, b: any) => a.order - b.order)
        .map((item: any) => item.dateParsed);
      } else {
        this.datesSelected = moment(e.date).format('MM/DD/YYYY');
      }

      const res = (this.multidate)
        ? this.datesSelected.map((item: any) => moment(item, 'MM/DD/YYYY').format('YYYY-MM-DD'))
        : moment(this.datesSelected).format('YYYY-MM-DD');
      this.onUpdateDates.next(res);
    })
    // .on('clearDate', (e: any) => { })
  }

  show(){
    $(`#${this._id}`).datepicker('show');
  }

  clearDates(){
    /** Se llama dos veces al método por un BUG en la libreria */
    $(`#${this._id}`).datepicker('clearDates');
    $(`#${this._id}`).datepicker('clearDates');
    
    this.datesSelected = '';
    this.onUpdateDates.next(this.datesSelected);
  }

  ngOnDestroy() {
    $(`#${this._id}`).datepicker('destroy');
  }

}
