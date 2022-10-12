import { Component, OnInit, ViewChild } from '@angular/core';
import { PurchaseSummaryModalDetailsComponent } from 'src/app/components/purchase-summary-modal-details/purchase-summary-modal-details.component';
import { AuthenticationService } from 'src/app/services/authentication.service';
import { HotelService } from 'src/app/services/hotel.service';

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
  loading = false;
  show = false;

  constructor(private hotelService: HotelService,
              private authSrv: AuthenticationService) { localStorage.setItem('auth', 'adm') }

  ngOnInit(): void {
    this.getOrderList();
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
