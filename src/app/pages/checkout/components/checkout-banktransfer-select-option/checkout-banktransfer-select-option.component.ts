import { Component, OnInit, Output } from '@angular/core';
import { Subject } from 'rxjs';
import { EventInfoService } from 'src/app/services/dedicates/event-info.service';

@Component({
  selector: 'app-checkout-banktransfer-select-option',
  templateUrl: './checkout-banktransfer-select-option.component.html',
  styleUrls: ['./checkout-banktransfer-select-option.component.css']
})
export class CheckoutBanktransferSelectOptionComponent implements OnInit {

  @Output() onSelectOption = new Subject<any>();

  public bankOptions: any[];
  public optionSelected: any;

  constructor(
    private eventInfoSrv: EventInfoService
  ) {
    this.bankOptions = this.eventInfoSrv.bankTransferOptionList.filter( (option: any) => option.status );
  }

  ngOnInit(): void {
  }

  selectOption(option: any){
    this.optionSelected = option;
  }

  confirmOption(){
    // console.log(this.optionSelected);
    this.onSelectOption.next(this.optionSelected);
  }

}
