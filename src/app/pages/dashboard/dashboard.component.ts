import { Component, OnInit } from '@angular/core';
import { AuthenticationService } from 'src/app/services/authentication.service';
import { Subscription } from 'rxjs';
import { PurchaseService } from 'src/app/services/purchase.service';
import { environment } from 'src/environments/environment';
import { DevisionService } from 'src/app/services/devision.service';

@Component({
  selector: 'app-dashboard',
  templateUrl: './dashboard.component.html',
  styleUrls: ['./dashboard.component.css'],
})
export class DashboardComponent implements OnInit {
  private sub$!: Subscription;
  public uid: any;
  public claimCategory: any[] = [];
  public registeredCategory: any = false;

  constructor(
    private authSrv: AuthenticationService,
    private purchaseSrv: PurchaseService,
    private devisionService: DevisionService
  ) {}

  ngOnInit(): void {
    this.sub$ = this.authSrv.uid$.subscribe((uid) => {
      if (!uid) {
        return;
      }
      this.uid = uid;
      this.combineQueries(uid);
    });
  }

  /** verificar si el usuario tiene categorias compradas */
  combineQueries(uid: string) {
    this.purchaseSrv
      .combineQueries(environment.dataEvent.keyDb, uid)
      .subscribe((x: any) => {
        this.claimCategory = x;
        // console.log(this.claimCategory);
      });
  }

  /** verificar si el usuario tiene categorias registradas */
  async getMyRegisteredDivisionsToPromise() {
    try {
      const uid = await this.authSrv.getByIdUIDPromise();
      console.log('uid', uid);
      const obj = {
        uid: uid,
        key_db: environment.dataEvent.keyDb,
      };
      console.log('obj', obj);
      const result: any =
        await this.devisionService.getMyRegisteredDivisionsToPromise(obj);
      if (!result.status) {
        return;
      }
      this.registeredCategory = result.divisions;
      console.log('res', result);
    } catch (err) {
      console.log('err', err);
    }
  }
}
