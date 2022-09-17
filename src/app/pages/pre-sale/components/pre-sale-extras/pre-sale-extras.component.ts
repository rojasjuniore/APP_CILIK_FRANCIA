import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { from, Observable } from 'rxjs';
import { HotelService } from 'src/app/services/hotel.service';
import { PreSaleService } from 'src/app/services/pre-sale.service';
import { pick } from 'underscore';

@Component({
  selector: 'app-pre-sale-extras',
  templateUrl: './pre-sale-extras.component.html',
  styleUrls: ['./pre-sale-extras.component.css']
})
export class PreSaleExtrasComponent implements OnInit {

  public package: any;
  public extras: any;
  public preSaleDocument: any;

  public additionalCategoryPasses: any[] = [];

  constructor(
    public preSaleSrv: PreSaleService,
    private router: Router,
    private hotelSrv: HotelService,
  ) {
    const { additionalCategoryPasses } = this.preSaleSrv.checkAndLoadDocumentLocalStorage();
    // console.log('additionalCategoryPasses', additionalCategoryPasses);
    this.additionalCategoryPasses = additionalCategoryPasses;
  }

  ngOnInit(): void {
    // this.test();
    // from(this.hotelSrv.getCategoriesPasses()).subscribe(async(data) => {
    //   this.categories = data;
    //   await this.loadData();
    // })
  }

  async loadData(){
    /** Load pre-sale document from LocalStorage */
    // const {additionalCategoryPasses = []} = this.preSaleSrv.checkAndLoadDocumentLocalStorage();
    // additionalCategoryPasses.forEach((row: any) => {
    //   const find = this.categories.findIndex((cat: any) => cat.type === row.type);
    //   if (find > -1) {
    //     this.categories[find].quantity = row.quantity;
    //   }
    // });
  }

  parseDocumentToSave(item: any){
    return Object.assign({discount: 0},
      pick(item, 'type', 'quantity', 'price', 'cu', 'label', 'fullPrice', 'order')
    )
  }

  get soloValue(){
    const find = this.additionalCategoryPasses.findIndex((row: any) => row.type === 'solo');
    return find > -1 ? this.additionalCategoryPasses[find].quantity : 0;
  }

  get coupleValue(){
    const find = this.additionalCategoryPasses.findIndex((row: any) => row.type === 'couple');
    return find > -1 ? this.additionalCategoryPasses[find].quantity : 0;
  }

  get groupValue(){
    const find = this.additionalCategoryPasses.findIndex((row: any) => row.type === 'group');
    return find > -1 ? this.additionalCategoryPasses[find].data : [];
    // return [];
  }

  /**
   * Actualizar la cantidad de boletos de cada categoria
   * @param params 
   */
  onUpdateQuantity(params: any) {
    const { type, quantity } = params;
    const find = this.additionalCategoryPasses.findIndex((row: any) => row.type === type);

    if(find > -1){

      const row =this.additionalCategoryPasses[find];

      if(row.type === 'group'){
        this.additionalCategoryPasses[find] = params;
      }else{
        this.additionalCategoryPasses[find].quantity = quantity;
      }

    }else{
      this.additionalCategoryPasses.push(params);
    }

    const data = this.additionalCategoryPasses.filter((row: any) => {
      if(row.type === 'group'){
        return row.data.length > 0;
      }else{
        return row.quantity > 0
      }
    });

    this.preSaleSrv.updateDocumentLocalStorage({additionalCategoryPasses: data});
    return;
  }

  onBack(){
    this.preSaleSrv.updateDocumentLocalStorage({step: '/pre-sale/step1'});
    this.router.navigate(['/pre-sale', 'step1']);
  }

  onNext(){
    this.preSaleSrv.updateDocumentLocalStorage({step: '/pre-sale/step3'});
    this.router.navigate(['/pre-sale', 'step3']);
  }

}
