import { Component, OnInit } from '@angular/core';
import { NgxSpinnerService } from 'ngx-spinner';
import { Observable, of } from 'rxjs';
import { BsModalService } from 'src/app/services/bs-modal.service';
import { PermissionService } from 'src/app/services/permission.service';

@Component({
  selector: 'app-permission-profile-update',
  templateUrl: './permission-profile-update.component.html',
  styleUrls: ['./permission-profile-update.component.css']
})
export class PermissionProfileUpdateComponent implements OnInit {

  public mi: any;

  public roles$!: Observable<any[]>;
  public profile: any;
  public roleToAdd: any = null;

  constructor(
    private bsModalSrv: BsModalService,
    private permissionSrv: PermissionService,
    private spinner: NgxSpinnerService,
  ) { }

  ngOnInit(): void {
    this.buildModal();
  }

  async buildModal(){
    this.mi = this.bsModalSrv.buildModal("modalPermissionProfileUpdate", { backdrop: 'static', keyboard: false });
  }


  async show(profile: any){
    const { roles = [] } = profile;
    this.profile = Object.assign({}, profile, { roles });
    this.roles$ = this.permissionSrv.getRolesDynamic();
    this.mi.show();
  }

  async hide(){
    this.roles$ = of([]);
    this.mi.hide();
  }

  async addRole(){
    if(!this.roleToAdd) return;

    await this.spinner.show();

    const { roles = [] } = this.profile;
    roles.push(this.roleToAdd);
    await this.permissionSrv.updateUserRoles(this.profile.uid, roles);
    this.profile = Object.assign({}, this.profile, { roles });
    this.roleToAdd = null;

    this.spinner.hide();
  }

  checkUserHasRole(role: any){
    const { roles = [] } = this.profile;
    return Object.values(roles).includes(role);
  }

  async removeRole(role: any){
    await this.spinner.show();

    const { roles = [] } = this.profile;
    const index = roles.indexOf(role);
    roles.splice(index, 1);
    await this.permissionSrv.updateUserRoles(this.profile.uid, roles);
    this.profile = Object.assign({}, this.profile, { roles });

    this.spinner.hide();
  }

}
