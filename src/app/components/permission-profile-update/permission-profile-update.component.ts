import { Component, OnInit } from '@angular/core';
import { Observable } from 'rxjs';
import { BsModalService } from 'src/app/services/bs-modal.service';

@Component({
  selector: 'app-permission-profile-update',
  templateUrl: './permission-profile-update.component.html',
  styleUrls: ['./permission-profile-update.component.css']
})
export class PermissionProfileUpdateComponent implements OnInit {

  public mi: any;

  public roles$!: Observable<any[]>;
  public profile: any;

  constructor(
    private bsModalSrv: BsModalService,
  ) { }

  ngOnInit(): void {
    this.buildModal();
  }

  async buildModal(){
    this.mi = this.bsModalSrv.buildModal("modalPermissionProfileUpdate", { backdrop: 'static', keyboard: false });
  }


  async show(profile: any){
    this.profile = profile;
    this.mi.show();
  }

  async hide(){
    this.mi.hide();
  }

}
