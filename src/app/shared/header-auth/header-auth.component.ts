import { Component, OnInit } from '@angular/core';
import { Router, NavigationEnd } from '@angular/router';
import { Observable, switchMap, of, catchError, filter } from 'rxjs';
import { AuthenticationService } from 'src/app/services/authentication.service';
import { CartService } from 'src/app/services/cart.service';
import { Sweetalert2Service } from 'src/app/services/sweetalert2.service';
import { environment } from 'src/environments/environment';
import { CustomTranslateService } from 'src/app/services/custom-translate.service';

@Component({
  selector: 'app-header-auth',
  templateUrl: './header-auth.component.html',
  styleUrls: ['./header-auth.component.css'],
})
export class HeaderAuthComponent implements OnInit {
  public profile$!: Observable<any>;
  public cart$!: Observable<any>;
  public isAnonymous$!: Observable<boolean>;
  public isAuth = false;

  constructor(
    private sweetAlert2Srv: Sweetalert2Service,
    private authSrv: AuthenticationService,
    private authService: AuthenticationService,
    private cartSrv: CartService,
    private router: Router,
    private translateSrv: CustomTranslateService
  ) {}

  ngOnInit(): void {
    this.profile$ = this.authSrv.userDoc$;

    /** Váidar si existe carrito */
    this.cart$ = this.authSrv.uid$.pipe(
      // tap(console.log),
      switchMap((uid: any) =>
        uid
          ? this.cartSrv.getCartObservable(environment.dataEvent.keyDb, uid)
          : of(null)
      ),
      catchError((err) => of(null))
    );
    // this.preSaleOrder$ = this.preSaleSrv.getDocumentLocalStorageObservable();

    this.isAnonymous$ = this.authService.isAnonymous$;

    this.router.events
      .pipe(filter((event) => event instanceof NavigationEnd))
      .subscribe((event: any) => {
        console.log('event.url', event.url);
        if (event.url == '/auth/sign-in') {
          this.isAuth = true;
        } else {
          this.isAuth = false;
        }
      });
  }

  public async logout() {
    let message = await this.translateSrv.translate(
      'general.areYouSureYouWantToLogOut'
    );
    const ask = await this.sweetAlert2Srv.askConfirm(message);
    if (!ask) {
      return;
    }
    this.authSrv.logout();
  }
}
