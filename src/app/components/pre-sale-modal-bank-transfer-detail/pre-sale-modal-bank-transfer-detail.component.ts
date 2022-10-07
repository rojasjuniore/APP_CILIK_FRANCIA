import { Component, OnInit, Output } from '@angular/core';
import { TranslatePipe } from '@ngx-translate/core';
import { Subject, Subscription } from 'rxjs';
import { AuthenticationService } from 'src/app/services/authentication.service';
import { BsModalService } from 'src/app/services/bs-modal.service';
import { PreSaleService } from 'src/app/services/pre-sale.service';
import { PurchaseService } from 'src/app/services/purchase.service';
import { Sweetalert2Service } from 'src/app/services/sweetalert2.service';

@Component({
  selector: 'app-pre-sale-modal-bank-transfer-detail',
  templateUrl: './pre-sale-modal-bank-transfer-detail.component.html',
  styleUrls: ['./pre-sale-modal-bank-transfer-detail.component.css']
})
export class PreSaleModalBankTransferDetailComponent implements OnInit {

  @Output() onUpdateTransfer = new Subject();

  public mi: any;
  loading = false;
  orderPendings: any = [];

  
  public bankMethodsType: any;
  public bankMethods = [
    {
      label: 'Bancolombia',
      value: 'Colombia',
      accountTitle: 'Fundación Ballet Nacional El Firulete',
      nrAccount: '10570863272 Ahorros',
      swift: 'COLOCOBM',
      status: true,
      select: false
    },
    {
      label: 'ADCB BANK',
      value: 'Dubai',
      accountTitle: 'BNF FZ LLC',
      nrAccount: '957211920010',
      swift: 'ADCBAEAA',
      status: true,
      select: false
    },
  ];

  bankSelect = '';

  constructor(private bsModalSrv: BsModalService,
              public preSaleSrv: PreSaleService,
              private sweetAlert2Srv: Sweetalert2Service,
              private translatePipe: TranslatePipe,
              private purchaseSrv: PurchaseService,
              private authSrv: AuthenticationService,) { }

  ngOnInit(): void {
    this.buildModal();
    this.orders();

  }

  buildModal(){
    this.mi = this.bsModalSrv.buildModal("modalBackTransfer");
  }

  async showModal(){
    this.mi.show();
  
  }

  async orders(){
    const uid = await this.authSrv.getUIDPromise();
    this.purchaseSrv.userPurchaseList(String(uid)).subscribe({
      next: (resp) => {
        console.log(resp)
        this.orderPendings = [];
        if(resp){
          
          resp.forEach(x => {
            if(x.status && x.status === 'pending'){
              this.orderPendings.push(x)
            }
          })
        }
       
      }
    })

  }

  async closeModal(status: boolean){
    if(status){
      
      if(this.bankSelect === ''){
        let message = this.translatePipe.transform('formValidations.selectIncorrectBank');
        this.sweetAlert2Srv.showInfo(message);
        return
      }

      if(this.orderPendings.length >= 2){
        let message = this.translatePipe.transform('formValidations.limitOrder');
        this.sweetAlert2Srv.showInfo(message);
        return 
      }else{
        this.preSaleSrv.updateDocumentLocalStorage({ 
          bankTransferSelect: this.bankSelect,
          status: 'pending',
          captureBank: [],
          paymentMethodType: 'bankTransfer'
        });




      }

      
    
      
    }
    this.onUpdateTransfer.next(status);
    this.bankMethods.map(x => x.select = false);
    this.bankSelect = '';
    this.mi.hide();
    

    
    
  }

  selectBank(bank){
    this.bankMethods.map(x => x.select = false);
    bank.select = true;
    this.bankSelect = bank;
  }

  ngOnDestroy(): void {
  }

}
