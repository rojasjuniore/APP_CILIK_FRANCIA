import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { PreSaleService } from 'src/app/services/pre-sale.service';

@Component({
  selector: 'app-pre-sale-only-categories-select',
  templateUrl: './pre-sale-only-categories-select.component.html',
  styleUrls: ['./pre-sale-only-categories-select.component.css']
})
export class PreSaleOnlyCategoriesSelectComponent implements OnInit {

  public additionalCategoryPasses: any[] = [];

  constructor(
    public preSaleSrv: PreSaleService,
    private router: Router,
  ) {
    const { additionalCategoryPasses } = this.preSaleSrv.checkAndLoadDocumentLocalStorage();
    // console.log('additionalCategoryPasses', additionalCategoryPasses);
    this.additionalCategoryPasses = additionalCategoryPasses;
  }

  ngOnInit(): void {
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

  async onNext(){
    this.preSaleSrv.updateDocumentLocalStorage({step: '/pre-sale-categories/step2'});
    this.router.navigate(['/pre-sale-categories', 'step2']);
  }

}
