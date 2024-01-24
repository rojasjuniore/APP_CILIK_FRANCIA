import { Component, OnInit, ViewChild } from '@angular/core';
import { FormGroup, FormBuilder } from '@angular/forms';
import { Router } from '@angular/router';
import { NgxSpinnerService } from 'ngx-spinner';
import { Observable, debounceTime, distinctUntilChanged, map, of } from 'rxjs';
import { PurchaseService } from 'src/app/services/purchase.service';
import { UserService } from 'src/app/services/user/user.service';
import { environment } from 'src/environments/environment';
import { ModalAccreditationUsersProductComponent } from '../modal-accreditation-users-product/modal-accreditation-users-product.component';

@Component({
  selector: 'app-accreditation-users',
  templateUrl: './accreditation-users.component.html',
  styleUrls: ['./accreditation-users.component.css']
})
export class AccreditationUsersComponent implements OnInit {
  @ViewChild('modalAccreditedProductUsers') modalAccreditedProductUsers!: ModalAccreditationUsersProductComponent;

  public accreditations$!: Observable<any[]>;
  public users$: Observable<any[]> = of([]);


  public form: FormGroup;
  public filters = {
    // academy: {
    //   email: 'email_institution',
    //   name: 'name_institution',
    //   collection: 'schoolRecord',
    // },
    ambassador: {
      email: 'email',
      name: 'name',
      collection: 'users',
    }
  };

  constructor(
    private fb: FormBuilder,
    private router: Router,
    private purchaseSrv: PurchaseService,
    private userSrv: UserService,
    private spinner: NgxSpinnerService
  ) {
    this.form = this.fb.group({
      filterField: 'email',
      query: ['']
    });
  }

  ngOnInit(): void {
    this.form.get('query')
      ?.valueChanges
      .pipe(
        debounceTime(500),
        /// only email format with regex
        map((value: string) => (value.length > 0) ? value.trim().toLocaleLowerCase() : ''),
        map((value: string) => value.replace(/[^a-zA-Z0-9@.]/g, '')),
        distinctUntilChanged(),
      )
      .subscribe((value: string) => {
        console.log('value', value);

        if (value.length === 0) {
          this.users$ = of([]);
          return;
        }

        const cf = this.form.get('filterField')?.value
        this.users$ = this.userSrv.getDynamic([
          { field: cf, condition: '>=', value: value },
          { field: cf, condition: '<=', value: value + '\uf8ff' },
        ], {
          idField: '_id',
          orderBy: [{ field: cf, order: 'asc' }],
        });
        return;


      });
  }

  launchAccreditedUsersrModal(user) {
    console.log(user);
    this.modalAccreditedProductUsers.showModal({
      user,
    });
  }




  onItemDetails(item: any): void {
    this.router.navigate([`/admin/merchant-purchases/${item._id}/details`]);

    console.log('onItemDetails', item);
  }


}
