import { Component, Input, OnInit, ViewChild } from '@angular/core';
import { NgxSpinnerService } from 'ngx-spinner';
import { AuthenticationService } from 'src/app/services/authentication.service';
import { CustomTranslateService } from 'src/app/services/custom-translate.service';
import { UploadFileService } from 'src/app/services/dedicates/upload-file.service';
import { PurchaseService } from 'src/app/services/purchase.service';
import { Sweetalert2Service } from 'src/app/services/sweetalert2.service';
import { environment } from 'src/environments/environment';
import { ClaimSearchUserComponent } from '../claim-search-user/claim-search-user.component';

@Component({
  selector: 'app-claim-weekend-fest',
  templateUrl: './claim-weekend-fest.component.html',
  styleUrls: ['./claim-weekend-fest.component.css']
})
export class ClaimWeekendFestComponent implements OnInit {

  @ViewChild('modalFindUser') modalFindUser!: ClaimSearchUserComponent;

  @Input() division: any;
  @Input() orderDocId: any;
  @Input() index: any;

  constructor(
    private auth: AuthenticationService,
    private uploadFileSrv: UploadFileService,
    private purchaseSrv: PurchaseService,
    private spinner: NgxSpinnerService,
    private sweetAlert2Srv: Sweetalert2Service,
    private translateSrv: CustomTranslateService
  ) { }

  ngOnInit(): void {
    console.log('this.division', this.division);
  }


  async onSelectUser(res: any) {
    console.log('res', res);
    try {
      if (!res.status) { return; }

      const userAttributes = res.data.map(({ name }) => name).join(', ');
      const ask: any = await this.sweetAlert2Srv.askConfirm(`¿Está seguro de seleccionar ${userAttributes}?`);
      if (!ask) return

      await this.spinner.show();

      const accreditationID = `${this.orderDocId}-${this.index}`;
      const uid = await this.auth.getByIdUIDPromise();
      console.log('uid', uid);
      const uidList = res.data.map(({ uid }) => uid);
      let uidIdList;
      // Check if uidList is undefined or every element in uidList is undefined
      if (!uidList || uidList.every(uid => uid === undefined)) {
        uidIdList = res.data.map(({ _id }) => _id);
      } else {
        uidIdList = uidList;
      }

      const accreditationObj = {
        uidList: uidIdList,
        ordeID: this.orderDocId,
        index: this.index,
        accreditationID,
        uid_add: uid,
        users: res.data,
        key: this.division.key,
        categoryType: this.division.key,
      }


      await this.purchaseSrv.updatePurchaseStore(
        environment.dataEvent.keyDb,
        this.orderDocId,
        this.index,
        accreditationObj,
        true,
        false
      );

      await this.purchaseSrv.storePurchaseClaim(environment.dataEvent.keyDb, accreditationID, accreditationObj)


      this.sweetAlert2Srv.showSuccess('Usuario asignado correctamente');
      return;

    } catch (err) {
      console.log('err', err);
      this.sweetAlert2Srv.showError("Error al asignar usuario");
      return;
    } finally {
      await this.spinner.hide();
    }
  }


  launchFindUserModal() {
    this.division.capacity = this.division.capacity || 1;
    this.modalFindUser.showModal({
      division: this.division,
      divisionSetting: 'fullPass',
    });
  }

}
