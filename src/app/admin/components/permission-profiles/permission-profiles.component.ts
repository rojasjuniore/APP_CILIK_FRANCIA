import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup } from '@angular/forms';
import { debounceTime, distinctUntilChanged, map, Observable, of, takeWhile } from 'rxjs';
import { AuthenticationService } from 'src/app/services/authentication.service';

@Component({
  selector: 'app-permission-profiles',
  templateUrl: './permission-profiles.component.html',
  styleUrls: ['./permission-profiles.component.css']
})
export class PermissionProfilesComponent implements OnInit {

  public form!: FormGroup;
  public profiles$!: Observable<any[]>;


  constructor(
    private fb: FormBuilder,
    private authSrv: AuthenticationService,
  ) {
    this.form = this.fb.group({
      profile: ['']
    });
  }

  ngOnInit(): void {

    this.profiles$ = of([]);

    this.form.get('profile')?.valueChanges
    .pipe(
      debounceTime(500),
      distinctUntilChanged(),
      map((value: string) => value.trim().toLowerCase()),
      // takeWhile((value) => value.length > 0)
    )
    .subscribe((value) => {

      if(value.length == 0){ 
        this.profiles$ = of([]);
        return;
      }

      this.profiles$ = this.authSrv.getDynamic(this.authSrv.collection, [],
        {
          idField: 'uid', 
          startAt: value,
          endAt: value + '\uf8ff',
          orderBy: [{ field: 'email', order: 'asc' }] 
        }
      );

    });

  }

  async updateProfile(profile: any){
    console.log(profile);
  }

}
