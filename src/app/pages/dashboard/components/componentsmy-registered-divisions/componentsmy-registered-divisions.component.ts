import { Component, OnInit } from '@angular/core';
import { AuthenticationService } from 'src/app/services/authentication.service';
import { DevisionService } from 'src/app/services/devision.service';
import { environment } from 'src/environments/environment';

@Component({
  selector: 'app-componentsmy-registered-divisions',
  templateUrl: './componentsmy-registered-divisions.component.html',
  styleUrls: ['./componentsmy-registered-divisions.component.css']
})
export class ComponentsmyRegisteredDivisionsComponent implements OnInit {
  filteredAndSortedProducts: any
  constructor(
    private authenticationSrv: AuthenticationService,
    private devisionService: DevisionService,
  ) { }

  ngOnInit(): void {
    this.getMyRegisteredDivisionsToPromise()
  }

  async getMyRegisteredDivisionsToPromise() {
    try {
      const uid = await this.authenticationSrv.getByIdUIDPromise()
      console.log("uid", uid)
      const obj = {
        uid: uid,
        key_db: environment.dataEvent.keyDb
      }
      console.log("obj", obj)
      const result: any = await this.devisionService.getMyRegisteredDivisionsToPromise(obj)
      if (!result.status) {
        return
      }
      this.filteredAndSortedProducts = result.divisions
      console.log("res", result)
    } catch (err) {
      console.log("err", err)
    }

  }

}
