import { Component, Input, OnChanges, OnInit, SimpleChanges, ViewChild } from '@angular/core';
import moment from 'moment';
import { Sweetalert2Service } from 'src/app/services/sweetalert2.service';
import { PurchaseInstallmentsModalComponent } from '../purchase-installments-modal/purchase-installments-modal.component';

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


  constructor(private sweetalert2Srv: Sweetalert2Service) { }



  ngOnChanges(changes: SimpleChanges): void {
    console.log('changes', changes);
    if (changes.orderDoc && changes.orderDoc.currentValue) {
      this.isValidOrder = this.isValidPaymentDate(this.orderDoc.installments[0]);
      this.installments = this.installmentsList(this.orderDoc.installments);
    }
  }



  ngOnInit(): void {
    this.isValidOrder = this.isValidPaymentDate(this.orderDoc.installments[0]);
    this.installments = this.installmentsList(this.orderDoc.installments);
  }

  /**
   * @dev Pagar cuota
   * @param installment 
   * @returns 
   */
  toPay(installment) {
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

  /**
   * 
   * @param installments 
   * @returns 
   */
  installmentsList(installments) {
    // console.log('installments', installments);
    let activeQuotaFound = false;
    return installments.map((cuota, index) => {
      const fechaCuota = moment(cuota.date);
      const isOverdue = moment().isAfter(fechaCuota) && cuota.status === "pending";

      if (!activeQuotaFound && (isOverdue || cuota.status === "pending")) {
        activeQuotaFound = true;
        return {
          ...cuota,
          index: index,
          isOverdue: isOverdue,
          isActiveToPay: true
        };
      }

      return {
        ...cuota,
        isOverdue: isOverdue,
        isActiveToPay: false
      };
    });

  }


  /**
   * @dev Comprobar si la fecha de pago es válida
   * @param createdAt 
   */
  isValidPaymentDate(installments) {
    if (installments.status == 'completed') return false;
    // console.log('createdAt', installments);
    const now = moment();  // Fecha y hora actual
    const createdAtMoment = moment(installments);

    // Comprobar si han pasado más de 48 horas
    if (now.diff(createdAtMoment, 'hours') > 48) {
      console.log(true);
      return true;
    } else {
      return false;
    }
  }

}
