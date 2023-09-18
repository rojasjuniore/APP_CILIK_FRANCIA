import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { TranslatePipe } from '@ngx-translate/core';
import { Observable, catchError, map, of, switchMap, tap } from 'rxjs';
import { AuthenticationService } from 'src/app/services/authentication.service';
import { CartService } from 'src/app/services/cart.service';
import { PreSaleService } from 'src/app/services/pre-sale.service';
import { Sweetalert2Service } from 'src/app/services/sweetalert2.service';
import { environment } from 'src/environments/environment';

@Component({
  selector: 'app-header-cilik',
  templateUrl: './header-cilik.component.html',
  styleUrls: ['./header-cilik.component.css']
})
export class HeaderCilikComponent implements OnInit {

  public profile$!: Observable<any>;
  public cart$!: Observable<any>;
  // public preSaleOrder$!: Observable<any>;

  constructor(
    private sweetAlert2Srv: Sweetalert2Service,
    private authSrv: AuthenticationService,
    private preSaleSrv: PreSaleService,
    private router: Router,
    private translatePipe: TranslatePipe,
    private cartSrv: CartService
  ) { }

  ngOnInit(): void {
    this.profile$ = this.authSrv.userDoc$;

    /** Váidar si existe carrito */
    this.cart$ = this.authSrv.uid$.pipe(
      // tap(console.log),
      switchMap((uid: any) => (uid) 
        ? this.cartSrv.getCartObservable(environment.dataEvent.keyDb, uid)
        : of(null)
      ),
      catchError((err) => of(null))
    );
    // this.preSaleOrder$ = this.preSaleSrv.getDocumentLocalStorageObservable();
  }

  public async logout() {
    const ask = await this.sweetAlert2Srv.askConfirm('¿Está seguro que desea cerrar sesión?');
    if (!ask) { return ;}
    this.authSrv.logout();
  }

}
