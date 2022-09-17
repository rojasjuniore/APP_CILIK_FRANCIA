import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { Observable } from 'rxjs';
import { AuthenticationService } from 'src/app/services/authentication.service';
import { PreSaleService } from 'src/app/services/pre-sale.service';
import { Sweetalert2Service } from 'src/app/services/sweetalert2.service';

@Component({
  selector: 'app-header-cilik',
  templateUrl: './header-cilik.component.html',
  styleUrls: ['./header-cilik.component.css']
})
export class HeaderCilikComponent implements OnInit {

  public profile$!: Observable<any>;
  public preSaleOrder$!: Observable<any>;

  constructor(
    private sweetAlert2Srv: Sweetalert2Service,
    private authSrv: AuthenticationService,
    private preSaleSrv: PreSaleService,
    private router: Router,
  ) { }

  ngOnInit(): void {
    this.profile$ = this.authSrv.userDoc$;
    this.preSaleOrder$ = this.preSaleSrv.getDocumentLocalStorageObservable();
  }

  async removePreSaleOrder(){
    const ask = await this.sweetAlert2Srv.askConfirm('¿Desea eliminar la orden de compra?');
    if (!ask) { return ;}

    this.preSaleSrv.removeDocumentLocalStorage();
    this.router.navigate(['/pages/dashboard']);
  }

  
  public async logout() {
    const ask = await this.sweetAlert2Srv.askConfirm('¿Desea salir del WLDC 2023?');
    if (!ask) { return ;}
    this.authSrv.logout();
  }

}
