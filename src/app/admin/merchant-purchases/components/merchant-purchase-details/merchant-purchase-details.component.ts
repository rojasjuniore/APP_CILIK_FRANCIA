import { Component, OnInit, ViewChild } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { NgxSpinnerService } from 'ngx-spinner';
import { Subscription, catchError, map, of, switchMap } from 'rxjs';
import { AuthenticationService } from 'src/app/services/authentication.service';
import { PurchaseService } from 'src/app/services/purchase.service';
import { Sweetalert2Service } from 'src/app/services/sweetalert2.service';
import { environment } from 'src/environments/environment';
import { MerchantModalEditAmountComponent } from '../merchant-modal-edit-amount/merchant-modal-edit-amount.component';
import { ModalCouponFindOwnerComponent } from 'src/app/admin/coupons/components/modal-coupon-find-owner/modal-coupon-find-owner.component';
import { ModalMerchantAddUserComponent } from '../../../../shared/modal-merchant-add-user/modal-merchant-add-user.component';
import { ModalUpdateVoucherStatusFormComponent } from 'src/app/shared/modal-update-voucher-status-form/modal-update-voucher-status-form.component';
import moment from 'moment';
import { PermissionService } from 'src/app/services/permission.service';

@Component({
  selector: 'app-merchant-purchase-details',
  templateUrl: './merchant-purchase-details.component.html',
  styleUrls: ['./merchant-purchase-details.component.css']
})
export class MerchantPurchaseDetailsComponent implements OnInit {
  @ViewChild('modalAmountEditOwner') modalAmountEditOwner!: MerchantModalEditAmountComponent;
  @ViewChild('modalFindOwner') modalFindOwner!: ModalCouponFindOwnerComponent;
  @ViewChild('modalOnSelectedAddUser') modalOnSelectedAddUser!: ModalMerchantAddUserComponent;
  @ViewChild('modalUpdateVoucherStatus') modalUpdateVoucherStatus!: ModalUpdateVoucherStatusFormComponent;

  public orderId!: string;
  public orderDoc: any;
  public showUpdateVoucherForm = false;
  private sub$!: Subscription;
  public submitted = false;
  public ownerTypes = [
    // { label: 'Academy', value: 'academy' },
    { label: 'Ambassador', value: 'ambassador' },
  ];
  newOwner: any;
  textNewOwner: any;
  itemData: any;
  isAdmin: any;

  constructor(
    private spinner: NgxSpinnerService,
    private router: ActivatedRoute,
    private authSrv: AuthenticationService,
    private purchaseSrv: PurchaseService,
    private sweetAlert2Srv: Sweetalert2Service,
    private permissionSrv: PermissionService,
  ) {
    const orderId = this.router.snapshot.paramMap.get('orderId');
    console.log('app-merchant-purchase-details', orderId);
    this.orderId = orderId || '';
  }

  ngOnInit(): void {
    this.sub$ = this.authSrv.uid$
      .pipe(
        switchMap((uid) => this.purchaseSrv.getByEventAndId(environment.dataEvent.keyDb, this.orderId)),
        map((order) => {
          return (order) ? { exist: true, ...order } : { exist: false };
        }),
        catchError((err) => of({ exist: false }))
      )
      .subscribe(async (order: any) => {
        this.orderDoc = order;
        console.log('order', this.orderDoc);
        return
      });

    this.getAuthUser();
  }

  getAuthUser() {
    const uid: any = this.authSrv.getLocalUID();
    this.permissionSrv
      .getUserEventFullRolesObservable(environment.dataEvent.keyDb, uid)
      .subscribe((res: any) => {
        this.isAdmin = res.roles.includes('merchant-purchasesn-admin-aproved') ? true : false
          || res.superAdmin
        console.log('this.isAdmin', this.isAdmin);
      });
  }


  launchFindOwnerModal() {
    this.modalFindOwner.showModal({});
  }




  onSelectOwner(res: any) {
    try {
      console.log('res', res);
      const { status, data } = res;
      this.newOwner = data;
      this.textNewOwner = `${data.name} | ${data.email}`;
    } catch (err) {
      console.log('err', err);
    }
  }



  openModalUpdateVoucherStatus() {
    this.modalUpdateVoucherStatus.showModal();
  }




  onRenderUpdateVoucher(event: any) {
    this.showUpdateVoucherForm = true;
  }

  async senfPurchaseToPreApproved() {
    try {

      if (!this.newOwner) {
        return this.sweetAlert2Srv.showError('Please select a new owner');
      }

      const ask = await this.sweetAlert2Srv.askConfirm('Are you sure to send this purchase to pre-approved?');
      if (!ask) { return; }


      await this.spinner.show();

      console.log('senfPurchaseToPreApproved', this.orderDoc);
      console.log('senfPurchaseToPreApproved', this.newOwner);

      await this.purchaseSrv.migrateDataPurchase(environment.dataEvent.keyDb, this.orderId, this.newOwner.uid, this.orderDoc.uid)


      this.newOwner = null;

      return this.sweetAlert2Srv.showBasicAlert('Success', 'The purchase has been sent to pre-approved successfully');

    } catch (err) {
      console.log('err', err);
      return this.sweetAlert2Srv.showBasicAlert('Error', 'Error');
    } finally {
      this.spinner.hide();
    }

  }


  launchModalEditAmount(item: any, index: any) {
    console.log(index, item);
    this.modalAmountEditOwner.showModal({
      ...item,
      index: index,
    });
  }

  launchFindUserAddModal(item: any, index: any) {
    this.modalOnSelectedAddUser.showModal({
      ...item,
      index: index,
    });
  }


  async onSelectedAddUser(response: any) {
    try {
      const { status, data } = response;
      const { index } = data;

      if (!status) {
        return this.sweetAlert2Srv.showError('No user selected');
      }
      if (!this.orderDoc?.product?.[index]) {
        console.error('Error: Invalid product index');
        return;
      }

      this.spinner.show();

      const uid = this.authSrv.getLocalUID();
      // console.log('index', index);
      // console.log('uid', uid);
      // console.log('data', data);

      this.orderDoc.adminUsersAsig = uid;
      this.orderDoc.product[index] = data;

      console.log('this.orderDoc', this.orderDoc);


      await this.purchaseSrv.storePurchase(environment.dataEvent.keyDb, this.orderId, this.orderDoc)

      return this.sweetAlert2Srv.showBasicAlert('Success', 'The user has been added successfully');
    } catch (err) {
      console.log('err', err);
      return this.sweetAlert2Srv.showBasicAlert('Error', 'Error');
    } finally {
      this.spinner.hide();
    }
  }

  /// Actualizar el monto de un producto
  async onEditAmount(response) {
    try {
      const { status, data } = response;
      if (!status) {
        console.error('Error: No status in response');
        return;
      }
      const { index, newTotal, oldTotal, description } = data;

      if (!this.orderDoc?.product?.[index]) {
        console.error('Error: Invalid product index');
        return;
      }

      this.spinner.show();

      const uid = this.authSrv.getLocalUID();
      const productToUpdate = this.orderDoc.product[index];
      const price = productToUpdate.price || 0;

      // Actualizar detalles del producto
      Object.assign(productToUpdate, {
        totales: newTotal,
        oldTotal: oldTotal,
        price: newTotal,
        oldPrice: price,
        description: description,
        updatedBy: Date.now(),
        updatedByUid: uid
      });

      console.log('productToUpdate', productToUpdate);

      // Actualizar el resumen total del pedido
      const totalResumen = this.orderDoc.totalResumen;


      //Codigo viejo => totalResumen.globalTotalToPayOld = totalResumen.globalTotalToPay;
      //Se remplazo con un if para que valide ya que como se actualiza constantemente el precio suele variar por eso se le agrego un if para que valide si el objeto tiene algun valor de no tenerlo ahi se sumara
      if(!totalResumen.globalTotalToPayOld) totalResumen.globalTotalToPayOld = totalResumen.globalTotalToPay;

      totalResumen.globalTotalToPay += newTotal - oldTotal;
      totalResumen.paidForPayment = 0;


      this.orderDoc.totales += newTotal - oldTotal;
      this.orderDoc.status = 'preApproved';
      this.orderDoc.updatedBy = Date.now();
      this.orderDoc.updatedByUid = uid;
      this.orderDoc.adviserPaymentList = [];

      console.log('this.orderDoc', this.orderDoc);


      // console.log('this.orderDoc', this.orderId, this.orderDoc);
      await this.purchaseSrv.storePurchase(environment.dataEvent.keyDb, this.orderId, this.orderDoc)

      return this.sweetAlert2Srv.showBasicAlert('Success', 'The amount has been updated successfully');
    } catch (err) {
      console.log('err', err);
      return
    } finally {
      this.spinner.hide();
    }
  }


  async onCloseModalUpdateVoucherStatus(event: any) {
    const { status, data } = event;
    console.log('onCloseModalUpdateVoucherStatus', event);
    if (!status) { return; }

    const ask = await this.sweetAlert2Srv.askConfirm(`¿Estás seguro de actualizar el estado del comprobante a "${data.status}"?`);
    if (!ask) { return; }

    try {

      await this.spinner.show();
      const uid = await this.authSrv.getUIDPromise();

      /** Actualizar estado de la orden de compra */
      await this.purchaseSrv.updatePurchase(
        environment.dataEvent.keyDb,
        this.orderId,
        {
          admin: uid,
          status: data.status,
          payedAt: moment().valueOf()
        }
      );

      this.sweetAlert2Srv.showSuccess('Comprobante actualizado correctamente');
      return;

    } catch (err) {
      console.log('Error on onCloseModalUpdateVoucherStatus', err);
      return;
    } finally {
      this.spinner.hide();
    }

  }



  async savePayment() {
    const ask = await this.sweetAlert2Srv.askConfirm(`Are you sure to save this payment?`);
    if (!ask) { return; }

    console.log('savePayment', this.orderDoc)
    return this.sweetAlert2Srv.showBasicAlert('Success', 'The amount has been updated successfully');
  }



  ngOnDestroy(): void {
    this.sub$.unsubscribe();
  }

}
