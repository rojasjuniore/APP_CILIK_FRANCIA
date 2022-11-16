import { Component, OnInit, ViewChild } from '@angular/core';
import { NgxSpinnerService } from 'ngx-spinner';
import { Observable } from 'rxjs';
import { CouponsService } from 'src/app/services/coupons.service';
import { Sweetalert2Service } from 'src/app/services/sweetalert2.service';
import { AddCouponModalComponent } from '../add-coupon-modal/add-coupon-modal.component';
import { UpdateCouponModalComponent } from '../update-coupon-modal/update-coupon-modal.component';

@Component({
  selector: 'app-admin-coupons',
  templateUrl: './admin-coupons.component.html',
  styleUrls: ['./admin-coupons.component.css']
})
export class AdminCouponsComponent implements OnInit {

  @ViewChild(AddCouponModalComponent) modalAdd!: AddCouponModalComponent;
  @ViewChild(UpdateCouponModalComponent) modalUpdate!: UpdateCouponModalComponent;

  public couponList$!: Observable<any[]>;

  constructor(
    private couponSrv: CouponsService,
    private sweetAlert2Srv: Sweetalert2Service,
    private spinner: NgxSpinnerService,
  ) { }

  ngOnInit(): void {
    this.couponList$ = this.couponSrv.getDynamic([]);
  }

  async add(){ return this.modalAdd.show(); }

  async changeStatus(coupon: any){
    const ask = await this.sweetAlert2Srv.askConfirm("¿Estás seguro de cambiar el estado del cupón?");
    if(!ask){ return; }

    try {

      await this.spinner.show();
      await this.couponSrv.update(coupon._id, { status: !coupon.status });
      this.sweetAlert2Srv.showSuccess("Estado actualizado");
      return;
      
    } catch (err) {
      console.log("Error on AdminCouponsComponent.changeStatus", err);
      return;
    }finally{
      this.spinner.hide();
    }
  }

  async update(coupon: any){ return this.modalUpdate.show(coupon); }

  async remove(coupon: any){
    const ask = await this.sweetAlert2Srv.askConfirm("¿Estás seguro de eliminar el cupón?");
    if(!ask){ return; }

    if(coupon.nroUsed > 0){
      return this.sweetAlert2Srv.showError("No se puede eliminar un cupón que ya ha sido usado");
    }

    try {

      await this.spinner.show();
      await this.couponSrv.delete(coupon._id);
      this.sweetAlert2Srv.showSuccess("Cupón eliminado");
      return;
      
    } catch (err) {
      console.log("Error on AdminCouponsComponent.remove", err);
      return;
    }finally{
      this.spinner.hide();
    }
  }

}
