import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Sweetalert2Service } from '../../services/sweetalert2.service';
import { AuthenticationService } from 'src/app/services/authentication.service';
import { TemporalTokenService } from 'src/app/services/temporal-token.service';
import { Router } from '@angular/router';


@Component({
  selector: 'app-secure-password',
  templateUrl: './secure-password.component.html',
  styleUrls: ['./secure-password.component.css']
})
export class SecurePasswordComponent implements OnInit {

  public valid = false;
  public validRepeatPassword=false;
  public validPassword = false;
  public validPasswordEquals=false;
  public form!: FormGroup;
  public datad = {
    email:"",
    password:"",
    repeatPassword:"",
  };
  public validUser=false;
  public checkEmailStatus=0;

  constructor(public temporalTokenSrv: TemporalTokenService,private authenticationSrv: AuthenticationService,private fb: FormBuilder,private router: Router,private sweetAlert2Srv: Sweetalert2Service) { }

  ngOnInit(): void {
  }

  saverange(newValue) {
    //console.log(newValue)
    var validEmail =  /^\w+([.-_+]?\w+)*@\w+([.-]?\w+)*(\.\w{2,10})+$/;

    // Using test we can check if the text match the pattern
    if( validEmail.test(newValue) ){
      this.valid=false;
      this.checkEmailStatus = 1;
    }else{
      this.valid=true;
      this.checkEmailStatus = 0;

    }
    console.log(this.checkEmailStatus)
  } 

  async prueba(){
    console.log(this.datad.email)
    let respuesta = await this.temporalTokenSrv.runByEmail(this.datad.email);
    respuesta ? this.checkEmailStatus = 2 : this.checkEmailStatus = 1;
  }


  async openPopup() {

    if(this.datad.password==''){
      this.validPassword=true;
    }else if(this.datad.repeatPassword==''){
      this.validRepeatPassword=true;
    }else if(this.datad.password !== this.datad.repeatPassword){
      this.validPasswordEquals=true;
    }else{
      this.router.navigate(['sign-in']);
    }
    
  }

  modelChangeFn(newValue: string) {
    this.validUser=false;
    var validEmail =  /^\w+([.-_+]?\w+)*@\w+([.-]?\w+)*(\.\w{2,10})+$/;

    // Using test we can check if the text match the pattern
    if( validEmail.test(newValue) ){
      this.valid=false;

    }else{
      this.valid=true;

    }
  }

  modelChangePassword(newValue: string) {
    this.validUser=false;
    this.validPassword=false;
    this.validRepeatPassword=false;
    this.validPasswordEquals=false;
  }
}
