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
  selector: 'app-claim-hotel',
  templateUrl: './claim-hotel.component.html',
  styleUrls: ['./claim-hotel.component.css']
})
export class ClaimHotelComponent implements OnInit {
  @ViewChild('modalFindUser') modalFindUser!: ClaimSearchUserComponent;

  @Input() division: any;
  @Input() orderDocId: any;
  @Input() index: any;
  @Input() type: any;

  constructor(
    private auth: AuthenticationService,
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
      console.log('userAttributes', userAttributes);

      const ask: any = await this.sweetAlert2Srv.askConfirm(`¿Está seguro de seleccionar ${userAttributes}?`);
      if (!ask) return

      await this.spinner.show();

      const accreditationID = `${this.orderDocId}-${this.index}`;
      const uid = await this.auth.getByIdUIDPromise();
      console.log('uid', uid);


      const uidList = res.data.map(({ uid }) => uid)

      const accreditationObj = {
        uidList: uidList,
        ordeID: this.orderDocId,
        index: this.index,
        accreditationID,
        uid_add: uid,
        type: this.type,
        users: res.data,
        key: this.division.key,
        room: this.division.room
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



      this.sweetAlert2Srv.showSuccess('Hotel booking successfully');
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
    // const formData = this.form.value;
    this.division.capacity = this.division.room.capacity;
    this.modalFindUser.showModal({
      division: this.division,
      divisionSetting: 'fullPass',
    });
    // this.modalFindUser.showModal(this.division); 
  }


}
