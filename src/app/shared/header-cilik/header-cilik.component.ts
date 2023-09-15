import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { TranslatePipe } from '@ngx-translate/core';
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
    private translatePipe: TranslatePipe,
  ) { }

  ngOnInit(): void {
    this.profile$ = this.authSrv.userDoc$;
    this.preSaleOrder$ = this.preSaleSrv.getDocumentLocalStorageObservable();
  }

  async removePreSaleOrder(){
    const message = this.translatePipe.transform('general.removeOrder');
    const ask = await this.sweetAlert2Srv.askConfirm(message);
    if (!ask) { return ;}

    this.preSaleSrv.removeDocumentLocalStorage();
    this.router.navigate(['/pages/dashboard']);
  }

  
  public async logout() {
    const message = this.translatePipe.transform('general.logOutMessage');
    const ask = await this.sweetAlert2Srv.askConfirm(message);
    if (!ask) { return ;}
    this.authSrv.logout();
    this.router.navigate(['/sign-in']);
  }

}
