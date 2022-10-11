import { Component, OnInit, ViewChild } from '@angular/core';
import { PurchaseSummaryModalDetailsComponent } from 'src/app/components/purchase-summary-modal-details/purchase-summary-modal-details.component';
import { HotelService } from 'src/app/services/hotel.service';

@Component({
  selector: 'app-list-order',
  templateUrl: './list-order.component.html',
  styleUrls: ['./list-order.component.css']
})
export class ListOrderComponent implements OnInit {
  
  @ViewChild (PurchaseSummaryModalDetailsComponent) modalDetails!: PurchaseSummaryModalDetailsComponent;


  public listOrders: any = [];
  loading = false;

  constructor(private hotelService: HotelService) { }

  ngOnInit(): void {
    this.getOrderList()
    
  }

  async getOrderList(){
    this.loading = true;
    await this.hotelService.getOrderPending().subscribe({
      next: (resp) => {
        console.log(resp);
        this.listOrders = resp;
        this.listOrders.reverse();
        this.loading = false;
      }
    });
  }

  onShowDetails(order: any){
    console.log('order', order);
    this.modalDetails.showModal(order);
  }

}
