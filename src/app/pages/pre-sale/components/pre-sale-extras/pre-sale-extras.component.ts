import { Component, OnInit, ViewChild } from '@angular/core';
import { Router } from '@angular/router';
import { TranslatePipe } from '@ngx-translate/core';
import { from, Observable } from 'rxjs';
import { PreSaleModalOnlyCategoriesTermsComponent } from 'src/app/components/pre-sale-modal-only-categories-terms/pre-sale-modal-only-categories-terms.component';
import { HotelService } from 'src/app/services/hotel.service';
import { PreSaleService } from 'src/app/services/pre-sale.service';
import { Sweetalert2Service } from 'src/app/services/sweetalert2.service';
import { pick } from 'underscore';

@Component({
  selector: 'app-pre-sale-extras',
  templateUrl: './pre-sale-extras.component.html',
  styleUrls: ['./pre-sale-extras.component.css']
})
export class PreSaleExtrasComponent implements OnInit {

  @ViewChild(PreSaleModalOnlyCategoriesTermsComponent) modalCategoriesTerms!: PreSaleModalOnlyCategoriesTermsComponent;

  public package: any;
  public extras: any;
  public preSaleDocument: any;

  public additionalCategoryPasses: any[] = [];
  public orderType = "fullPass"

  constructor(
    public preSaleSrv: PreSaleService,
    private router: Router,
    private sweetAlert2Srv: Sweetalert2Service,
    private translatePipe: TranslatePipe,
  ) {
    const { additionalCategoryPasses, orderType } = this.preSaleSrv.checkAndLoadDocumentLocalStorage();
    // console.log('additionalCategoryPasses', additionalCategoryPasses);
    console.log({additionalCategoryPasses, orderType});
    this.additionalCategoryPasses = additionalCategoryPasses;
    this.orderType = orderType;
  }

  ngOnInit(): void {
    // this.test();
    // from(this.hotelSrv.getCategoriesPasses()).subscribe(async(data) => {
    //   this.categories = data;
    //   await this.loadData();
    // })
    this.confirCategorieExtra()
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

  onModalCategoriesTermsClose(status: any){
    if(status){
      this.onNext();
    }
  }

  onBack(){
    this.preSaleSrv.updateDocumentLocalStorage({step: '/pre-sale/step1'});
    this.router.navigate(['/pre-sale', 'step1']);
  }

  async showCategoriesTerms(){
    this.modalCategoriesTerms.showModal();
  }

  onNext(){
    this.preSaleSrv.updateDocumentLocalStorage({step: '/pre-sale/step3'});
    this.router.navigate(['/pre-sale', 'step3']);
  }


  async confirCategorieExtra(){
    const ask = await this.sweetAlert2Srv.askConfirmCategorieExtra(this.translatePipe.transform('formValidations.ConfirmCategorieExtra'));
    if(!ask) { return this.onNext(); }

    

   
  }

}
