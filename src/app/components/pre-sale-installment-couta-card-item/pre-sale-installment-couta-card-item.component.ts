import { Component, Input, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { environment } from 'src/environments/environment';

@Component({
  selector: 'app-pre-sale-installment-couta-card-item',
  templateUrl: './pre-sale-installment-couta-card-item.component.html',
  styleUrls: ['./pre-sale-installment-couta-card-item.component.css']
})
export class PreSaleInstallmentCoutaCardItemComponent implements OnInit {

  @Input() index: number = 0;
  @Input() item: any;
  @Input() showButton = false;

  constructor(
    private router: Router
  ) { }

  ngOnInit(): void {
  }

  async goToPayCuota(){
    const { url } = this.item;

    /** Eliminar de la cadena baseURL */
    const newUrl = url.replace(environment.urlWeb,'');
    // console.log(newUrl);

    return this.router.navigate([ '/' + newUrl]);
  }

}
