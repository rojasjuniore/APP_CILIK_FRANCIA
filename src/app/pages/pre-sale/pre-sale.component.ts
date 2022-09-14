import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router'
import { AuthenticationService } from 'src/app/services/authentication.service';
import * as data from '../../../assets/i18n/from.json';

@Component({
  selector: 'app-pre-sale',
  templateUrl: './pre-sale.component.html',
  styleUrls: ['./pre-sale.component.css']
})
export class PreSaleComponent implements OnInit {

  public mostrar:any;

  constructor(
    public router: Router,
    private authSrv: AuthenticationService,
  ) { }

  ngOnInit(): void {
    // if(this.router.url== '/pre-sale/home') {
    //   this.mostrar=false;
    // }else{
    //   this.mostrar=true;
    // } 
    // console.log(data);
    // //console.log(data);
  }

  public firstWay():void{
    console.log(data);    
  }

  public logout(){
    this.authSrv.logout();
  }

}
