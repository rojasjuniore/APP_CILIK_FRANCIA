import { Component, OnInit } from '@angular/core';
import { map, Observable, tap } from 'rxjs';
import { AuthenticationService } from 'src/app/services/authentication.service';

@Component({
  selector: 'app-header-welcome',
  templateUrl: './header-welcome.component.html',
  styleUrls: ['./header-welcome.component.css']
})
export class HeaderWelcomeComponent implements OnInit {

  public profile$!: Observable<any>;

  constructor(
    private authSrv: AuthenticationService,
  ) { }

  ngOnInit(): void {
    this.profile$ = this.authSrv.userDoc$.pipe(
      tap((data) => console.log('data', data)),
    );
  }

}
