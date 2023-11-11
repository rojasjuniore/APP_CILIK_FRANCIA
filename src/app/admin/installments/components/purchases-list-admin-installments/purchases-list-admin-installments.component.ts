import { Component, Input, OnInit, SimpleChanges } from '@angular/core';
import { FormBuilder, FormGroup } from '@angular/forms';
import { Router } from '@angular/router';
import { Observable, debounceTime, distinctUntilChanged, map, of } from 'rxjs';
import { PurchaseService } from 'src/app/services/purchase.service';
import { environment } from 'src/environments/environment';

@Component({
  selector: 'app-purchases-list-admin-installments',
  templateUrl: './purchases-list-admin-installments.component.html',
  styleUrls: ['./purchases-list-admin-installments.component.css']
})
export class PurchasesListAdminInstallmentsComponent implements OnInit {
  public form: FormGroup = this.fb.group({ query: '' });


  @Input() title: string = 'Title';
  @Input() query: any[] = [];
  @Input() opts: any = {};
  @Input() sort: string = '';
  @Input() redirectTo: string = `/pages/purchases/$/details`;
  @Input() fieldToRedirect: string = '_id';
  public purchases$!: Observable<any[]>;

  constructor(
    private fb: FormBuilder,
    private purchaseSrv: PurchaseService,
    private router: Router,
  ) {
    this.form.get('query')?.valueChanges
      .pipe(
        debounceTime(500),
        /// only email format with regex
        map((value: string) => (value.length > 0) ? value.trim().toLocaleLowerCase() : ''),
        map((value: string) => value.replace(/[^a-zA-Z0-9@.]/g, '')),
        distinctUntilChanged(),
      )
      .subscribe((value: string) => {
        console.log('valueChanges', value);
        this.loadData(value);
      });

  }

  ngOnInit(): void {
    this.loadData();
  }

  ngOnChanges(changes: SimpleChanges): void {
    const { query, opts } = changes;

    if (query && query.currentValue) {
      this.query = query.currentValue;
    }

    if (opts && opts.currentValue) {
      // console.log('opts', opts.currentValue);
      this.opts = opts.currentValue;
    }

    this.loadData();
  }

  loadData(query = '') {
    if (this.query.length === 0) {
      this.purchases$ = of([]);
      return;
    }

    if (query.length > 0) {
      this.purchases$ = this.purchaseSrv.getDynamic(environment.dataEvent.keyDb, [
        { field: 'orderId', condition: '==', value: query }
        // { field: 'orderId', condition: '>=', value: query },
        // { field: 'orderId', condition: '<=', value: query + '\uf8ff' },
      ]);
    }
    else {
      this.purchases$ = this.purchaseSrv.getDynamic(environment.dataEvent.keyDb, this.query, this.opts)
        .pipe(
          map((purchasesArray: any[]) => {
            if (purchasesArray.length === 0) return [];

            purchasesArray.sort((purchaseA, purchaseB) => {
              // Chequear si `installments` tiene `paymentMethod` no nulo y `status` 'pending'

              const isPendingAndHasPaymentMethodA = purchaseA.installments.some(installment =>
                installment.paymentMethod !== null && installment.status === "pending");

              const isPendingAndHasPaymentMethodB = purchaseB.installments.some(installment =>
                installment.paymentMethod !== null && installment.status === "pending");

              // Los 'pending' con `paymentMethod` no nulo van primero
              if (isPendingAndHasPaymentMethodA && !isPendingAndHasPaymentMethodB) {
                return -1;
              }
              if (!isPendingAndHasPaymentMethodA && isPendingAndHasPaymentMethodB) {
                return 1;
              }

              // Si ambos son 'pending' con `paymentMethod` no nulo o ambos no lo son,
              // entonces verifica si tienen algún `paymentMethod` no nulo
              const hasPaymentMethodA = purchaseA.installments.some(installment => installment.paymentMethod !== null);
              const hasPaymentMethodB = purchaseB.installments.some(installment => installment.paymentMethod !== null);

              if (hasPaymentMethodA && !hasPaymentMethodB) {
                return -1;
              }
              if (!hasPaymentMethodA && hasPaymentMethodB) {
                return 1;
              }

              // Si ambos tienen `paymentMethod` no nulos, entonces ordena por `payedAt` más reciente
              const latestPayedAtA = Math.max(...purchaseA.installments.map(inst => inst.payedAt || 0));
              const latestPayedAtB = Math.max(...purchaseB.installments.map(inst => inst.payedAt || 0));

              return latestPayedAtB - latestPayedAtA;
            });

            return purchasesArray;
          })
        );

    }



  }


  /**
   * 
   * @param item 
   */
  onItemDetails(item: any): void {
    this.router.navigate([`/admin/purchases-admin/${item._id}/details`]);
  }
}
