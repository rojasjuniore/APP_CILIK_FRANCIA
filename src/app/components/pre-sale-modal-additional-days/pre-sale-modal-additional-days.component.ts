import { Component, OnDestroy, OnInit, Output } from '@angular/core';
import { Router } from '@angular/router';
import { from, Observable, Subject, Subscription } from 'rxjs';
import { BsModalService } from 'src/app/services/bs-modal.service';
import { HotelService } from 'src/app/services/hotel.service';
import { Sweetalert2Service } from 'src/app/services/sweetalert2.service';

@Component({
  selector: 'app-pre-sale-modal-additional-days',
  templateUrl: './pre-sale-modal-additional-days.component.html',
  styleUrls: ['./pre-sale-modal-additional-days.component.css']
})
export class PreSaleModalAdditionalDaysComponent implements OnInit, OnDestroy {

  @Output() onUpdateRoom = new Subject();

  // public edit = false;
  public mi: any;
  public index: any;
  public item: any;

  public list$!: Observable<any>;

  private sub$!: Subscription;

  constructor(
    private bsModalSrv: BsModalService,
    private hotelSrv: HotelService,
    private sweetAler2tSrv: Sweetalert2Service,
    private router: Router,
  ) { }

  ngOnInit(): void {
    this.buildModal();

    this.sub$ = this.router.events
    .subscribe((event) => {

      /** Si la modal esta desplegada al cambiar de ruta */
      if(this.mi._isShown){
        this.closeModal();
      }

    });
  }

  async buildModal() {
    this.mi = this.bsModalSrv.buildModal('modalRoomAdditionalDays');
  }

  async showModal(params: any) {
    const { data, index } = params;
    // console.log('data: ', {data});
    this.index = index;
    this.item = data;
    this.list$ = from(this.hotelSrv.getAdditonalDaysByRoomCode(data._id));
    this.mi.show();
  }

  get daysBefore(){
    let findIndex = this.item.additionals.findIndex((x: any) => x.type === 'before');
    return findIndex == -1 ? 0 : this.item.additionals[findIndex].quantity;
  }

  get daysAfter(){
    let findIndex = this.item.additionals.findIndex((x: any) => x.type === 'after');
    return findIndex == -1 ? 0 : this.item.additionals[findIndex].quantity;
  }
  

  get additionalDaysAmount(){
    return this.item?.additionals
    .map((row) => row.quantity * row.price)
    .reduce((a, b) => a + b, 0);
  }

  get subTotal(){
    const price = this.item ?.price || 0;
    return price + this.additionalDaysAmount;
  }

  onDaysBefore(params: any){
    const {quantity, data} = params;
    // console.log('onDaysBefore', {params});

    const additionals = this.item.additionals;
    let findIndex = additionals.findIndex((x: any) => x.type === 'before');

    if(findIndex == -1){ 
      additionals.push({type: 'before', quantity, price: data.price, fullPrice: data.fullPrice});
    }else{
      additionals[findIndex].quantity = quantity;
      additionals[findIndex].price = data.price;
      additionals[findIndex].fullPrice = data.fullPrice;
    }
    this.item.additionals = additionals;
    this.onUpdateRoom.next({index: this.index, data: {additionals}});
  }

  onDaysAfter(params: any){
    const {quantity, data} = params;
    // console.log('onDaysAfter', {params});

    const additionals = this.item.additionals;
    let findIndex = additionals.findIndex((x: any) => x.type === 'after');

    if(findIndex == -1){ 
      additionals.push({type: 'after', quantity, price: data.price, fullPrice: data.fullPrice});
    }else{
      additionals[findIndex].quantity = quantity;
      additionals[findIndex].price = data.price;
      additionals[findIndex].fullPrice = data.fullPrice;
    }

    this.item.additionals = additionals;
    this.onUpdateRoom.next({index: this.index, data: {additionals}});
  }

  async onUpdateRoomDoc(data: any){
    const ask = await this.sweetAler2tSrv.askConfirm('¿Estas seguro de actualizar la habitación?');

    if(!ask){ return; };

    data = Object.assign({additionals: []}, this.hotelSrv.parseRoomDefaultByCapacityDocument(data));
    // console.log('data', data);
    this.onUpdateRoom.next({index: this.index, data});
    this.closeModal();
  }

  closeModal(){
    this.mi.hide();
  }

  ngOnDestroy(): void {
    this.sub$.unsubscribe();
  }

}