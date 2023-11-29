import { Component, OnInit, Output } from '@angular/core';
import { Subject } from 'rxjs';

@Component({
  selector: 'app-adviser-checkout',
  templateUrl: './adviser-checkout.component.html',
  styleUrls: ['./adviser-checkout.component.css']
})
export class AdviserCheckoutComponent implements OnInit {
  @Output() onSelectOption = new Subject<any>();

  constructor() { }

  ngOnInit(): void {
  }


  /**
 * @dev   Método para seleccionar la opción de pago
 */
  async confirmOption() {
    this.onSelectOption.next(true);
  }



}
