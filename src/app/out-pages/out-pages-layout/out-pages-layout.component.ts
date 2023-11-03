import { Component, OnInit } from '@angular/core';
import { Observable } from 'rxjs';
import { AuthenticationService } from 'src/app/services/authentication.service';

@Component({
  selector: 'app-out-pages-layout',
  templateUrl: './out-pages-layout.component.html',
  styleUrls: ['./out-pages-layout.component.css']
})
export class OutPagesLayoutComponent implements OnInit {
  public isAnonymous$!: Observable<boolean>;

  constructor(private authSrv: AuthenticationService,) { }

  ngOnInit(): void {

    this.isAnonymous$ = this.authSrv.isAnonymous$;
  }

}
