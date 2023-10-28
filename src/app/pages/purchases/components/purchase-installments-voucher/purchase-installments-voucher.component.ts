import { Component, Input, OnInit, Output } from '@angular/core';
import { EventInfoService } from 'src/app/services/dedicates/event-info.service';
import moment from 'moment';
import { ActivatedRoute } from '@angular/router';
import { TranslateService } from '@ngx-translate/core';
import { NgxSpinnerService } from 'ngx-spinner';
import { AuthenticationService } from 'src/app/services/authentication.service';
import { UploadFileService } from 'src/app/services/dedicates/upload-file.service';
import { PurchaseService } from 'src/app/services/purchase.service';
import { Sweetalert2Service } from 'src/app/services/sweetalert2.service';
import { environment } from 'src/environments/environment';
import { Subject } from 'rxjs/internal/Subject';
@Component({
  selector: 'app-purchase-installments-voucher',
  templateUrl: './purchase-installments-voucher.component.html',
  styleUrls: ['./purchase-installments-voucher.component.css']
})
export class PurchaseInstallmentsVoucherComponent implements OnInit {
  @Output() onSendForm = new Subject<any>();

  @Input() amount: any;
  @Input() item: any;
  @Input() orderDoc: any;
  bankOptions: { label: string; beneficiaryName: string; nit: string; phone: string; city: string; country: string; value: string; accountNumber: string; swiftCode: string; iban: string; bankBranch: string; branchOffice: string; bankAddress: string; bankPhone: string; status: boolean; slug: string; }[];
  optionSelected: any;
  constructor(
    private eventInfoSrv: EventInfoService) {
    this.bankOptions = this.eventInfoSrv.bankTransferOptionList.filter((option: any) => option.status);

  }

  ngOnInit(): void {
    this.optionSelected = this.bankOptions[0];
    // console.log('app-purchase-installments-voucher', this.item);
    // console.log('app-purchase-installments-voucher', this.orderDoc);
    // console.log('app-purchase-installments-voucher', this.amount);
    // console.log('app-purchase-installments-voucher', this.bankOptions);
  }



  async onLoadVoucher(formData: any) {


    this.onSendForm.next({
      formData,
      optionSelected: this.optionSelected
    });
  }


}
