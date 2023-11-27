import { Component, OnInit } from '@angular/core';
import { Observable, finalize, tap } from 'rxjs';
import { PurchaseService } from 'src/app/services/purchase.service';
import { environment } from 'src/environments/environment';

@Component({
  selector: 'app-report',
  templateUrl: './report.component.html',
  styleUrls: ['./report.component.css']
})
export class ReportComponent implements OnInit {
  public report$!: Observable<any[]>;
  isLoading: boolean = true;
  namefile = 'reporte';
  constructor(private purchaseSrv: PurchaseService) { }

  ngOnInit(): void {
    this.loadData();
  }

  /// paymentProcess || completed  || rejected || pending
  loadData(status = "completed") {
    this.isLoading = true;
    this.namefile = status;
    console.log('loadData', status, environment.dataEvent.keyDb);
    this.report$ = this.purchaseSrv.getDynamic(environment.dataEvent.keyDb, [
      { field: 'status', condition: '==', value: status },
    ], {
      orderBy: [{ field: 'createdAt', order: 'desc' }]
    }).pipe(
      // tap((data) => console.log('loadData', data)),
      finalize(() => this.isLoading = false) // Finaliza el indicador de carga cuando los datos están listos
    );
  }

}
