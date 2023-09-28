import { Component, Input, OnChanges, OnInit, SimpleChanges } from '@angular/core';
import { Router } from '@angular/router';
import { Observable, of } from 'rxjs';
import { PurchaseService } from 'src/app/services/purchase.service';
import { environment } from 'src/environments/environment';

@Component({
  selector: 'app-purchase-list',
  templateUrl: './purchase-list.component.html',
  styleUrls: ['./purchase-list.component.css']
})
export class PurchaseListComponent implements OnInit, OnChanges {

  @Input() title: string = 'Title';
  @Input() query: any[] = [];
  @Input() opts: any = {};

  @Input() redirectTo: string = `/pages/purchases/$/details`;
  @Input() fieldToRedirect: string = '_id';

  public purchases$!: Observable<any[]>;

  constructor(
    private purchaseSrv: PurchaseService,
    private router: Router,
  ) { }

  ngOnInit(): void {
    this.loadData();
  }

  ngOnChanges(changes: SimpleChanges): void {
    const { query, opts } = changes;

    if(query && query.currentValue) {
      // console.log('query', query.currentValue);
      this.query = query.currentValue;
    }

    if(opts && opts.currentValue) {
      // console.log('opts', opts.currentValue);
      this.opts = opts.currentValue;
    }

    this.loadData();
  }

  loadData(){
    if(this.query.length === 0){ 
      this.purchases$ = of([]);
      return;
    }

    // console.log('query', this.query);
    /** Actualizar observable de listado de compras */
    this.purchases$ = this.purchaseSrv.getDynamic(environment.dataEvent.keyDb, this.query, this.opts);
    return;
  }

  onItemDetails(item: any): void{
    const id = item[this.fieldToRedirect];
    const url = this.redirectTo.replace('$', id);
    // console.log('url', url);
    this.router.navigate([url]);
    // this.router.navigate([`/pages/purchases/${this.item._id}/details`]);
  }

}
