import { Component, Input, OnDestroy, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { map, Observable, Subscription, tap } from 'rxjs';
import { AuthenticationService } from 'src/app/services/authentication.service';
import { PermissionService } from 'src/app/services/permission.service';
import { environment } from 'src/environments/environment';

@Component({
  selector: 'app-header-welcome',
  templateUrl: './header-welcome.component.html',
  styleUrls: ['./header-welcome.component.css']
})
export class HeaderWelcomeComponent implements OnInit, OnDestroy {

  @Input() backTo = '/pages/dashboard';

  public profile$!: Observable<any>;
  public showDashboardBtn = false;

  private sub$!: Subscription;
  _isAdmin = false;
  constructor(
    private permissionSrv: PermissionService,
    private authSrv: AuthenticationService,
    private router: Router,
  ) { }

  ngOnInit(): void {


    this.profile$ = this.authSrv.userDoc$.pipe(
      // tap((data) => console.log('data', data)),
    );

    this.sub$ = this.router.events.subscribe((event: any) => {
      const { type } = event;

      /** Si termina de cargar la ruta */
      if (type === 1) {
        const { url } = event;

        this.showDashboardBtn = !['/pages/dashboard', '/admin/dashboard'].includes(url);
        // console.log('url', url);
        // console.log('this.showDashboardBtn', this.showDashboardBtn);
        // console.log('event', event);
      }
    });

    this.isAdmin()
  }

  /**
   * @dev Verificar si el usuario es administrador
   */
  isAdmin() {
    const uid: any = localStorage.getItem('uid');
    this.permissionSrv.getUserEventFullRolesObservable(environment.dataEvent.keyDb, uid)
      .subscribe((data: any) => {
        // console.log('data', data);
        if (!data) return
        if (data.superAdmin) {
          this._isAdmin = true;
        } else {
          this._isAdmin = data.roles.length > 0 ? true : false;
          // console.log('this._isAdmin', this._isAdmin);
        }
      });
  }




  ngOnDestroy(): void {
    this.sub$.unsubscribe();
  }

}
