import { Component, OnInit } from '@angular/core';
import { Observable } from 'rxjs';
import { AuthenticationService } from 'src/app/services/authentication.service';
import { Sweetalert2Service } from 'src/app/services/sweetalert2.service';

@Component({
  selector: 'app-header-cilik',
  templateUrl: './header-cilik.component.html',
  styleUrls: ['./header-cilik.component.css']
})
export class HeaderCilikComponent implements OnInit {

  public profile$!: Observable<any>;

  constructor(
    private sweetAlert2Srv: Sweetalert2Service,
    private authSrv: AuthenticationService,
  ) { }

  ngOnInit(): void {
    this.profile$ = this.authSrv.userDoc$;
  }

  
  public async logout() {
    const ask = await this.sweetAlert2Srv.askConfirm('¿Desea salir del WLDC 2023?');
    if (!ask) { return ;}
    this.authSrv.logout();
  }

}
