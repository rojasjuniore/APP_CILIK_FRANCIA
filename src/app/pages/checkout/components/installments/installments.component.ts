import { Component, Input, OnInit, Output } from '@angular/core';
import { Subject } from 'rxjs';
import { Sweetalert2Service } from 'src/app/services/sweetalert2.service';

@Component({
  selector: 'app-installments',
  templateUrl: './installments.component.html',
  styleUrls: ['./installments.component.css']
})
export class InstallmentsComponent implements OnInit {
  @Input() installments: any = [];
  @Input() totales: any = [];
  @Output() onSelectOption = new Subject<any>();

  constructor(
    private sweetalert2Srv: Sweetalert2Service
  ) { }

  ngOnInit(): void {
    console.log(this.installments);
    console.log(this.totales);
  }



  /**
   * @dev   Método para seleccionar la opción de pago
   */
  async confirmOption() {

    this.onSelectOption.next(this.installments);
  }


}
