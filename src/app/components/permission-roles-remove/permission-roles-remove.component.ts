import { Component, Input, OnInit } from '@angular/core';
import { PermissionService } from 'src/app/services/permission.service';
import { Sweetalert2Service } from 'src/app/services/sweetalert2.service';

@Component({
  selector: 'app-permission-roles-remove',
  templateUrl: './permission-roles-remove.component.html',
  styleUrls: ['./permission-roles-remove.component.css']
})
export class PermissionRolesRemoveComponent implements OnInit {

  @Input() role: any;

  constructor(
    private sweetAlert2Srv: Sweetalert2Service,
    private permissionSrv: PermissionService,
  ) { }

  ngOnInit(): void {
  }

  async removeRole() {
    const ask = await this.sweetAlert2Srv.askConfirm('You will not be able to recover this role!');
    if(!ask) { return; }

    await this.permissionSrv.removeRole(this.role.slug);
    this.sweetAlert2Srv.showSuccess('Role removed successfully!');
    return;
  }

}
