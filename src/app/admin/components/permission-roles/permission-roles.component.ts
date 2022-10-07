import { Component, OnInit, ViewChild } from '@angular/core';
import { FormBuilder, FormGroup } from '@angular/forms';
import { debounceTime, distinctUntilChanged, map, Observable } from 'rxjs';
import { PermissionRolesAddComponent } from 'src/app/components/permission-roles-add/permission-roles-add.component';
import { PermissionService } from 'src/app/services/permission.service';

@Component({
  selector: 'app-permission-roles',
  templateUrl: './permission-roles.component.html',
  styleUrls: ['./permission-roles.component.css']
})
export class PermissionRolesComponent implements OnInit {

  @ViewChild(PermissionRolesAddComponent) modalPermissionRoleAdd!: PermissionRolesAddComponent;

  public form!: FormGroup;
  public roles$!: Observable<any[]>;

  constructor(
    private fb: FormBuilder,
    private permissionService: PermissionService,
  ) {
    this.form = this.fb.group({
      role: ['']
    });
  }

  ngOnInit(): void {

    this.form.get('role')?.valueChanges
    .pipe(
      debounceTime(500),
      distinctUntilChanged(),
      map((value: string) => value.trim().toLowerCase())
    )
    .subscribe((value) => {
      console.log('role');
    });

    this.roles$ = this.permissionService.getRolesDynamic([]);
  }

  async addRole(){
    this.modalPermissionRoleAdd.show();
  }

}
