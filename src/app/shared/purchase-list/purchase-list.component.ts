import { Component, Input, OnChanges, OnInit, SimpleChanges } from '@angular/core';
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

  public purchases$!: Observable<any[]>;

  constructor(
    private purchaseSrv: PurchaseService,
  ) { }

  ngOnInit(): void {
    this.loadData();
  }

  ngOnChanges(changes: SimpleChanges): void {
    const { query } = changes;

    if(query && query.currentValue) {
      // console.log('query', query.currentValue);
      this.query = query.currentValue;
      this.loadData();
    }
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

}
