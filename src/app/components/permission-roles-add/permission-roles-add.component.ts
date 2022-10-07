import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { slugify } from 'src/app/helpers/slugify';
import { BsModalService } from 'src/app/services/bs-modal.service';
import { PermissionService } from 'src/app/services/permission.service';

@Component({
  selector: 'app-permission-roles-add',
  templateUrl: './permission-roles-add.component.html',
  styleUrls: ['./permission-roles-add.component.css']
})
export class PermissionRolesAddComponent implements OnInit {

  public mi: any;
  public form!: FormGroup;

  constructor(
    private bsModalSrv: BsModalService,
    private fb: FormBuilder,
    private permissionSrv: PermissionService,
  ) {
   this.buildForm();
  }

  ngOnInit(): void {
    this.buildModal();
  }

  buildForm(){
    this.form = this.fb.group({
      name: ['', [Validators.required]],
      slug: ['', [Validators.required]],
      description: [''],
    });

    // this.form.get('name')?.valueChanges.subscribe((value) => {
    //   this.form.patchValue({slug: slugify(value.trim().toLowerCase()) });
    // });
  }

  async buildModal(){
    this.mi = this.bsModalSrv.buildModal("modalPermissionRoleAdd", { backdrop: 'static', keyboard: false });
  }

  async onSubmit(){
    try {

      if(this.form.invalid){
        this.form.markAllAsTouched();
        return;
      }

      const formData = this.form.value;
      this.form.disable();

      const data = {
        name: formData.name.trim().toLowerCase(),
        slug: slugify(formData.slug.trim().toLowerCase()),
        description: formData.description.trim().toLowerCase(),
      }

      await this.permissionSrv.addRole(data.slug, data);
      this.hide();
      return;
    } catch (err) {
      console.log('Error on PermissionRolesAddComponent.onSubmit()', err);
      return;
    }finally{
      this.form.enable();
    }
  }


  async show(){
    this.mi.show();
  }

  async hide(){
    this.mi.hide();
    this.form.reset();
  }

}
