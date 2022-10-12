import { Component, Input, OnInit, Output } from '@angular/core';
import { from, Observable, Subject } from 'rxjs';
import { HotelService } from 'src/app/services/hotel.service';

@Component({
  selector: 'app-pre-sale-extra-solo-group-item',
  templateUrl: './pre-sale-extra-solo-group-item.component.html',
  styleUrls: ['./pre-sale-extra-solo-group-item.component.css']
})
export class PreSaleExtraSoloGroupItemComponent implements OnInit {

  @Input() price = 35;
  @Input() min = 0;
  @Input() max = 99;
  @Input() public groups: any[] = [];

  @Output() onUpdateQuantity = new Subject();

  public document$!: Observable<any>;

  constructor(
    private hotelSrv: HotelService,
  ) { }

  ngOnInit(): void {
    this.document$ = from(this.hotelSrv.getCategoryPassesByCode('group'));
  }

  /**
   * Agregar nuevo item de grupo
   * @param data 
   */
  addGroup(data: any){
    // console.log('data', data);
    this.groups.push({
      label: data.label,
      fullPrice: data.fullPrice,
      price: data.price,
      pricePerPeople: data.pricePerPeople,
      discount: data.discount,
      discountPerPeople: data.discountPerPeople,
      quantity: 0,
      type: 'group',
    });

    // console.log('groups', this.groups);
    this.onUpdateQuantity.next({type: 'group', label: data.label, data: this.groups, order: 2});
  }

  /**
   * Remover item de grupo
   * @param index 
   */
  removeItem(index: any){
    // console.log('remove', index);
    const data = this.groups.filter((item: any, i: any) => i !== index);
    this.groups = data;
    this.onUpdateQuantity.next({type: 'group', data: this.groups});
  }

  /**
   * Incrementar valor en item de grupo
   * @param params 
   */
  updateQuantity(params: any) {
    const { index, quantity, data } = params;
    // console.log('params', params);
    this.groups[index].quantity = quantity;
    this.onUpdateQuantity.next({type: 'group', label: data.label, data: this.groups, order: 2});
  }

}
