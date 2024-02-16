import { Component, OnInit, ViewChild } from '@angular/core';
import { PurchaseInstallmentsModalComponent } from 'src/app/pages/purchases/components/purchase-installments-modal/purchase-installments-modal.component';
import { CustomizationfileService } from 'src/app/services/customizationfile/customizationfile.service';
import { MyProductService } from 'src/app/services/my-product.service';
import { Sweetalert2Service } from 'src/app/services/sweetalert2.service';

@Component({
  selector: 'app-pay-for-my-product',
  templateUrl: './pay-for-my-product.component.html',
  styleUrls: ['./pay-for-my-product.component.css']
})
export class PayForMyProductComponent implements OnInit {
  @ViewChild('modalInstallmentsView') modalInstallmentsView!: PurchaseInstallmentsModalComponent;
  private keydb: any
  private uid: any;
  public listDivision: any;
  public divisionObj: any;
  constructor(
    private sweetalert2Srv: Sweetalert2Service,
    private customifileSrv: CustomizationfileService,
    private myProductService: MyProductService
  ) { }

  ngOnInit(): void {
    this.uid = this.customifileSrv.getUid();
    this.keydb = this.customifileSrv.getKeyDb();
    this.getDivision();
  }


  async getDivision() {
    try {
      const result: any = await this.myProductService.getDivision(this.keydb, this.uid)
      this.listDivision = result.divisions
      console.log("pay", this.listDivision);
    } catch (err) {
      console.error(err);
    } finally {
      console.log('finally');
    }
  }


  toPay(division) {
    this.divisionObj = division;
    console.log('toPay', division);
    if (division.isPay) {
      return this.sweetalert2Srv.showInfo('Your product has already been paid for');
    }

    let price = 0;
    if (division.participants.length == 1) {
      price = 40
    } else if (division.participants.length == 2) {
      price = 60
    } else if (division.participants.length > 2) {
      price = division.participants.length * 15;
    }

    console.log('price', price);

    setTimeout(() => {
      this.modalInstallmentsView
        .showModal({
          division,
          price
        });
    }, 300);
    return
  }


  onModalInstallmentsView($event) {
    console.log($event)
    this.getDivision()
  }


}
