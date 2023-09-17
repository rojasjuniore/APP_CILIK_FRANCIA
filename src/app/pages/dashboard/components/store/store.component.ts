import { Component, OnInit, ViewChild } from '@angular/core';
import { NgxSpinnerService } from 'ngx-spinner';
import { CartService } from 'src/app/services/cart.service';
import { CustomizationfileService } from 'src/app/services/customizationfile/customizationfile.service';
import { ModalOnlyInputNumberComponent } from 'src/app/shared/modal-only-input-number/modal-only-input-number.component';
import { environment } from 'src/environments/environment';

@Component({
  selector: 'app-store',
  templateUrl: './store.component.html',
  styleUrls: ['./store.component.css']
})
export class StoreComponent implements OnInit {

  @ViewChild('modalOnlyInputNumber') modalOnlyInputNumber!: ModalOnlyInputNumberComponent;

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
    private _cf: CustomizationfileService,
  ) { }

  ngOnInit(): void {
  }

  async runShoppingCartCheck(){
    try {
      await this.spinner.show();

      /** Crear Carrito si no existe o verificar si existe antes de procesar */
      await this.cartSrv.buildAndStore(environment.dataEvent.keyDb);
      return;
      
    } catch (err) {
      console.log('Error on StoreComponent.runShoppingCartCheck', err);
      return;
    } finally {
      this.spinner.hide();
    }
  }

  async onSelectItem(item: any){
    try {
      console.log(item);

      /** Ejecutar validación de carrito de compras */
      await this.runShoppingCartCheck();

      if(['full-pass'].includes(item.slug)){
        this.modalOnlyInputNumber.showModal(item);
        return;
      }
      
      return;
      
    } catch (err) {
      console.log('Error on StoreComponent.onSelectItem', err);
      return;
    } 
  }

}
