import { Component, OnInit } from '@angular/core';
import { NgxSpinnerService } from 'ngx-spinner';
import { CartService } from 'src/app/services/cart.service';
import { CustomizationfileService } from 'src/app/services/customizationfile/customizationfile.service';

@Component({
  selector: 'app-store',
  templateUrl: './store.component.html',
  styleUrls: ['./store.component.css']
})
export class StoreComponent implements OnInit {

  public storeOptions: any[] = [
    {
      isRecommended: true,
      img: 'assets/images/icons/plan-icon-1.png',
      title: 'Hotel y Evento',
      slug: 'hotel-event',
      include: 'incluye texto',
      noInclude: null,
      headerColor: 'red',
    },
    {
      isRecommended: false,
      img: 'assets/images/icons/plan-icon-2.png',
      title: 'Full Pass',
      slug: 'full-pass',
      include: 'incluye texto',
      noInclude: null,
      headerColor: 'red',
    },
    {
      isRecommended: false,
      img: 'assets/images/icons/plan-icon-2.png',
      title: 'Pase por día',
      slug: 'day-pass',
      include: 'incluye texto',
      noInclude: null,
      headerColor: 'red',
    },
    {
      isRecommended: false,
      img: 'assets/images/icons/plan-icon-2.png',
      title: 'Pase de fin de semana',
      slug: 'weekend-pass',
      include: 'incluye texto',
      noInclude: null,
      headerColor: 'red',
    },
    {
      isRecommended: false,
      img: 'assets/images/icons/plan-icon-2.png',
      title: 'Pases de Categoria',
      slug: 'category-pass',
      include: 'incluye texto',
      noInclude: null,
      headerColor: 'red',
    },
  ];

  constructor(
    private spinner: NgxSpinnerService,
    private cartSrv: CartService,
    private _cf: CustomizationfileService
  ) { }

  ngOnInit(): void {
  }

  async onSelectItem(item: any){
    console.log(item);
  }

}
