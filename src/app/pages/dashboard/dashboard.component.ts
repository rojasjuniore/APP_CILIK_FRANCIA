import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { AuthenticationService } from 'src/app/services/authentication.service';
import { PreSaleService } from 'src/app/services/pre-sale.service';

@Component({
  selector: 'app-dashboard',
  templateUrl: './dashboard.component.html',
  styleUrls: ['./dashboard.component.css']
})
export class DashboardComponent implements OnInit {

  constructor(
    private authSrv: AuthenticationService,
    private preSaleSrv: PreSaleService,
    private router: Router,
  ) { }

  ngOnInit(): void {
  }

  /**
   * Crear nueva orden de venta
   */
  async newOrder(){
    const uid = await this.authSrv.getUIDPromise();
    this.authSrv.saveTokenPush(uid);
    this.preSaleSrv.checkAndLoadDocumentLocalStorage();
    this.router.navigate(['/pre-sale/step1']);
  }

}
