import { Component, Input, OnChanges, OnInit, SimpleChanges } from '@angular/core';
import { Observable, of } from 'rxjs';
import { AuthenticationService } from 'src/app/services/authentication.service';
import { CartService } from 'src/app/services/cart.service';

@Component({
  selector: 'app-purchase-list',
  templateUrl: './purchase-list.component.html',
  styleUrls: ['./purchase-list.component.css']
})
export class PurchaseListComponent implements OnInit, OnChanges {

  @Input() title: string = 'Title';
  @Input() query: any[] = [];

  public purchases$!: Observable<any[]>;

  constructor(
    private authSrv: AuthenticationService,
    private cartSrv: CartService,
  ) { }

  ngOnInit(): void {
    this.loadData();
  }

  ngOnChanges(changes: SimpleChanges): void {
    const { query } = changes;

    if(query && query.currentValue) {
      this.query = query.currentValue;
    }
  }

  loadData(){
    if(this.query.length === 0){ 
      this.purchases$ = of([]);
      return;
    }

    console.log('query', this.query);
  }

}
