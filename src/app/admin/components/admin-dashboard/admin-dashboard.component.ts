import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { Observable, map, of, switchMap, tap } from 'rxjs';
import { AuthenticationService } from 'src/app/services/authentication.service';
import { CustomizationfileService } from 'src/app/services/customizationfile/customizationfile.service';
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
      label: 'Merchant Purchases',
      icon: 'fa fa-money',
      description: 'MerchantPurchases',
      type: 'navigation',
      url: '/admin/merchant-purchases/dashboard/',
      profiles: ['merchant-purchasesn-admin'],
      available: true
    },
    {
      label: 'Report',
      icon: 'fa fa-money',
      description: 'Report',
      type: 'navigation',
      url: '/admin/report-admin/dashboard/',
      profiles: ['report-admin'],
      available: true
    },
    {
      label: 'Statistics Admin',
      icon: 'fa fa-money',
      description: 'Statistics Admin',
      type: 'navigation',
      url: '/admin/statistics-admin/dashboard/',
      profiles: ['statistics-admin'],
      available: true
    },
    {
      label: 'accreditations Admin',
      icon: 'fa fa-money',
      description: 'accreditations Admin',
      type: 'navigation',
      url: '/admin/accreditations-admin/dashboard/',
      profiles: ['accreditations-admin'],
      available: true
    },
    {
      label: 'Manager Purchase Orders',
      icon: 'fa fa-money',
      description: 'Manager Purchase Orders',
      type: 'navigation',
      url: '/admin/purchases-admin/dashboard/',
      profiles: ['manager-purchases-admin'],
      available: true
    },
    {
      label: 'Manager  installments',
      icon: 'fa fa-tome',
      description: 'Manager installments',
      type: 'navigation',
      url: '/admin/installments-admin/dashboard',
      profiles: ['manager-installments-admin'],
      available: true
    },
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
    {
      label: 'Manager Admin Coupon',
      icon: 'fa fa-money',
      description: 'Manager Admin Coupons',
      type: 'navigation',
      url: '/admin/coupons-admin',
      profiles: ['manager-coupons-admin'],
      available: true
    },
    {
      label: 'Manager My Sales',
      icon: 'fa fa-money',
      description: 'Manager My Sales',
      type: 'uid',
      url: '/admin/my-sales/dashboard/',
      profiles: ['manager-my-sales'],
      available: true
    },
    {
      label: 'Manager  Merchant',
      icon: 'fa fa-money',
      description: 'Manager Merchant',
      type: 'uid',
      url: '/admin/merchant-admin/dashboard/',
      profiles: ['manager-merchant-admin'],
      available: true
    },

  ];

  public userRoles$!: Observable<any>;

  constructor(
    private customizationfileSrv: CustomizationfileService,
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
        : of({ superAdmin: false, roles: [] })
      ),
      // tap((user) => console.log({ user })),
      map((user: any) => {
        return this.adminOptions.filter((item) => item.available)
          .filter((item) => {
            if (user.superAdmin) { return true; }
            if (user.roles.length > 0) {
              if (user.roles.some((role: any) => item.profiles.includes(role))) {
                return true;
              }
            }

            return false;
          })
      }),
    );
  }

  launch(item: any) {
    console.log('launch', item);
    switch (item.type) {
      case 'navigation':
        this.router.navigate([item.url]);
        break;
      case 'uid':
        const uid = this.customizationfileSrv.getUid();
        this.router.navigate([item.url, uid]);
        break;

      default:
        console.log('default', item);
        break;
    }
  }

}
