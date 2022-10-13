import { Component, OnInit, ViewChild } from '@angular/core';
import { Observable } from 'rxjs';
import { PurchaseSummaryModalDetailsComponent } from 'src/app/components/purchase-summary-modal-details/purchase-summary-modal-details.component';
import { AuthenticationService } from 'src/app/services/authentication.service';
import { HotelService } from 'src/app/services/hotel.service';
import { PurchaseService } from 'src/app/services/purchase.service';

@Component({
  selector: 'app-list-order',
  templateUrl: './list-order.component.html',
  styleUrls: ['./list-order.component.css']
})
export class ListOrderComponent implements OnInit {
  
  @ViewChild (PurchaseSummaryModalDetailsComponent) modalDetails!: PurchaseSummaryModalDetailsComponent;

  public listOrders: any = [];
  public listOrdersPending: any = [];
  public listOrdersCompleted: any = [];
  public listOrdersRejected: any = [];

  public orderListP$!: Observable<any[]>;
  public orderListC$!: Observable<any[]>;
  public orderListR$!: Observable<any[]>;

  loading = false;
  show = false;

  constructor(
    private hotelService: HotelService,
    private purchaseSrv: PurchaseService,
    private authSrv: AuthenticationService
  ) { 
    localStorage.setItem('auth', 'adm') 
  }

  ngOnInit(): void {

    /** Ordenes Pagos por transferencia pendientes */
    this.orderListP$ = this.purchaseSrv.getDynamic([
      {field: 'paymentMethodType', condition: '==', value: 'bankTransfer'},
      {field: 'status', condition: '==', value: 'pending'},
    ], {
      orderBy: [{field: 'createdAt', order: 'asc'}]
    });

    /** Ordenes Pagos por transferencia completadas */
    this.orderListC$ = this.purchaseSrv.getDynamic([
      {field: 'paymentMethodType', condition: '==', value: 'bankTransfer'},
      {field: 'status', condition: '==', value: 'completed'},
    ], {
      orderBy: [{field: 'createdAt', order: 'desc'}]
    });

    /** Ordenes Pagos por transferencia rechazadas */
    this.orderListR$ = this.purchaseSrv.getDynamic([
      {field: 'paymentMethodType', condition: '==', value: 'bankTransfer'},
      {field: 'status', condition: '==', value: 'rejected'},
    ], {
      orderBy: [{field: 'createdAt', order: 'desc'}]
    });



    // this.getOrderList();
  }




  async getOrderList(){
    this.loading = true;
    this.listOrders = [];
    this.listOrdersPending = [];
    this.listOrdersCompleted = [];
    this.listOrdersRejected = [];

    await this.hotelService.getOrderPending().subscribe({
      next: (resp) => {
        console.log(resp);
        this.listOrders = resp;
        this.listOrders.forEach(x => {
          if(x.status){
            switch (x.status){
              case 'pending':
                this.listOrdersPending.push(x);
              break;

              case 'completed':
                this.listOrdersCompleted.push(x);
              break;

              case 'rejected':
                this.listOrdersRejected.push(x);
              break;
            }
          }else{
            this.listOrdersCompleted.push(x)
          }
        })
        this.loading = false;
      }
    });
  }

  onShowDetails(order: any){
    this.show = true;
    setTimeout(() => {
      this.modalDetails.showModal(order);
    }, 100);
  }

}
