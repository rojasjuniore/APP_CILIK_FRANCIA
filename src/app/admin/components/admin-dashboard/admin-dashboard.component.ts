import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { Observable, map, of, switchMap, tap } from 'rxjs';
import { AuthenticationService } from 'src/app/services/authentication.service';
import { PermissionService } from 'src/app/services/permission.service';
import { environment } from 'src/environments/environment';

@Component({
  selector: 'app-admin-dashboard',
  templateUrl: './admin-dashboard.component.html',
  styleUrls: ['./admin-dashboard.component.css']
})
export class AdminDashboardComponent implements OnInit {

  public adminOptions = [
    {
      label: 'Manager Transfer Payments',
      icon: 'fa fa-money',
      description: 'Manager Transfer Payments',
      type: 'navigation',
      url: '/admin/bank-transfer',
      profiles: ['manager-hotel-event-bank-transfer-payment'],
      available: true
    },
    {
      label: 'Manager Coupon',
      icon: 'fa fa-money',
      description: 'Manager Coupons',
      type: 'navigation',
      url: '/admin/coupons',
      profiles: ['manager-hotel-event-coupons'],
      available: true
    },
  ];

  public userRoles$!: Observable<any>;

  constructor(
    private router: Router,
    private authSrv: AuthenticationService,
    private permissionSrv: PermissionService,
  ) { }

  ngOnInit(): void {

    this.userRoles$ = this.authSrv.afAuth.authState.pipe(
      map(user => user ? user.uid : null),
      // tap((uid) => console.log({ uid })),
      switchMap((uid) => (uid)
        ? this.permissionSrv.getUserEventFullRolesObservable(environment.dataEvent.keyDb, uid)
        : of({superAdmin: false, roles: []})
      ),
      // tap((user) => console.log({ user })),
      map((user: any) => {
        return this.adminOptions.filter((item) => item.available)
        .filter((item) => {
          if(user.superAdmin) { return true; }
          if(user.roles.length > 0){
            if(user.roles.some((role: any) => item.profiles.includes(role))){
              return true;
            }
          }

          return false;
        })
      }),
    );
  }

  launch(item: any){
    switch (item.type) {
      case 'navigation':
        this.router.navigate([item.url]);
        break;
    
      default:
        console.log('default', item);
        break;
    }
  }

}
