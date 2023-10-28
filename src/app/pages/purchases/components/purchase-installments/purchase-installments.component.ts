import { Component, Input, OnChanges, OnInit, Output, SimpleChanges, ViewChild } from '@angular/core';
import moment from 'moment';
import { Sweetalert2Service } from 'src/app/services/sweetalert2.service';
import { PurchaseInstallmentsModalComponent } from '../purchase-installments-modal/purchase-installments-modal.component';
import { InstallmentsService } from 'src/app/services/installments.service';

@Component({
  selector: 'app-purchase-installments',
  templateUrl: './purchase-installments.component.html',
  styleUrls: ['./purchase-installments.component.css']
})
export class PurchaseInstallmentsComponent implements OnInit, OnChanges {
  @Input() orderDoc: any;
  public installments: any
  public isValidOrder = false;
  public installmentObj: any;
  @ViewChild('modalInstallmentsView') modalInstallmentsView!: PurchaseInstallmentsModalComponent;


  constructor(
    private installmentsSrv: InstallmentsService,
    private sweetalert2Srv: Sweetalert2Service) { }



  ngOnChanges(changes: SimpleChanges): void {
    // console.log('changes', changes);
    if (changes.orderDoc && changes.orderDoc.currentValue) {
      this.isValidOrder = this.installmentsSrv.isValidPaymentDate(this.orderDoc.installments[0]);
      this.installments = this.installmentsSrv.installmentsList(this.orderDoc.installments);
    }
  }



  ngOnInit(): void {
    this.isValidOrder = this.installmentsSrv.isValidPaymentDate(this.orderDoc.installments[0]);
    this.installments = this.installmentsSrv.installmentsList(this.orderDoc.installments);
  }

  /**
   * @dev Pagar cuota
   * @param installment 
   * @returns 
   */
  toPay(installment) {
    if (installment.status == 'completed') {
      return this.sweetalert2Srv.showInfo('La cuota ya ha sido pagada');
    }
    if (!installment.isActiveToPay) {
      return this.sweetalert2Srv.showInfo('No se puede pagar esta cuota');
    }
    console.log('toPay', installment);
    this.installmentObj = installment;

    setTimeout(() => {
      this.modalInstallmentsView.showModal(this.installmentObj);
    }, 300);
    return
  }


  onModalInstallmentsView($event) {
    console.log($event)
  }



}
