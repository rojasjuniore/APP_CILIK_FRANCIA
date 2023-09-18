import { AfterViewInit, Component, Input, OnDestroy, OnInit, Output } from '@angular/core';
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
export class InputSigleCalendarComponent implements OnInit, AfterViewInit, OnDestroy {

  @Input() _id: string = 'datepicker';
  @Input() placeholder: string = 'Selecciona una fecha';


  @Input() startDate!: string; // Fecha máxima de inicio Formato MM/DD/YYYY
  @Input() endDate!: string; // Fecha máxima de fin Formato MM/DD/YYYY

  // https://bootstrap-datepicker.readthedocs.io/en/latest/options.html#maxviewmode
  @Input() minViewMode: number = 0;
  @Input() maxViewMode: number = 0;

  @Input() clearBtn: boolean = false;

  // https://bootstrap-datepicker.readthedocs.io/en/latest/options.html#language
  @Input() language: string = 'es';

  @Input() multidate: boolean = false;
  @Input() multidateSeparator!: string; //Default: “,”

  @Output() onUpdateDates = new Subject<string | string[]>();

  public datesSelected: string | string[] = '';


  constructor() { }

  ngOnInit(): void {
  }

  ngAfterViewInit() {
    const options = {
      format: 'mm/dd/yyyy',
      startDate: this.startDate,
      endDate: this.endDate,
      multidate: this.multidate,
      multidateSeparator: this.multidateSeparator,
      language: this.language,
      clearBtn: this.clearBtn,
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
    })
    .on('changeDate', (e: any) => {
      // Si es multidate
      if(this.multidate) {
        this.datesSelected = e.dates.map((item: any) => moment(item).format('MM/DD/YYYY'));
      } else {
        this.datesSelected = moment(e.date).format('MM/DD/YYYY');
      }

      this.onUpdateDates.next(this.datesSelected);
    })
    // .on('clearDate', (e: any) => { })
  }

  show(){
    $(`#${this._id}`).datepicker('show');
  }

  clearDates(){
    $(`#${this._id}`).datepicker('clearDates');
    this.datesSelected = '';
    this.onUpdateDates.next(this.datesSelected);
  }


  ngOnDestroy() {
    $(`#${this._id}`).datepicker('destroy');
  }

}
