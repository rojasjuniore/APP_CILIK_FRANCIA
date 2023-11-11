import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Sweetalert2Service } from '../../services/sweetalert2.service';
import { Router } from '@angular/router';
import { AuthenticationService } from 'src/app/services/authentication.service';
import { pick } from 'underscore';
import { TranslatePipe } from '@ngx-translate/core';
import { CustomTranslateService } from 'src/app/services/custom-translate.service';
import { CommonService } from 'src/app/services/common.service';


@Component({
  selector: 'app-sign-in',
  templateUrl: './sign-in.component.html',
  styleUrls: ['./sign-in.component.css']
})
export class SignInComponent implements OnInit {

  public form!: FormGroup;
  public vm = {
    email: [
      { type: 'required', message: 'formValidations.required' },
      { type: 'pattern', message: 'formValidations.email' }
    ],
    password: [
      { type: 'required', message: 'formValidations.required' },
      { type: 'minlength', message: 'formValidations.minlength6' },
      { type: 'maxlength', message: 'formValidations.maxlength12' }
    ]
  };
  public submit = false;
  public loading = false;
  public typeInput = 'password';

  constructor(
    private commonService: CommonService,
    private fb: FormBuilder,
    private router: Router,
    private sweetAlert2Srv: Sweetalert2Service,
    private authSrv: AuthenticationService,
    private translatePipe: TranslatePipe,
    public translateSrv: CustomTranslateService,
  ) {
    this.buildForm();
  }

  ngOnInit(): void {
  }

  /**
   * Show or hide password
   */
  changeTypeInput() {
    this.typeInput = this.typeInput === 'password' ? 'text' : 'password';
  }

  buildForm() {
    this.form = this.fb.group({
      email: ['',
        [
          Validators.required,
          Validators.pattern(/^(([^<>()\[\]\\.,;:\s@"]+(\.[^<>()\[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/)
        ]
      ],
      password: ['',
        [
          Validators.required,
          Validators.minLength(6),
          Validators.maxLength(12)
        ]
      ]
    });
  }
  get f() { return this.form.controls; }



  async onSubmit() {
    try {

      this.submit = true;
      this.loading = true;

      if (this.form.invalid) {
        this.form.markAllAsTouched();
        return;
      }

      this.form.disable();

      const formData = this.form.value;
      const data = {
        email: `${formData.email}`.trim().toLowerCase(),
        password: `${formData.password}`.trim()
      }


      const currentUser: any = await this.authSrv.afAuth.currentUser;
      const isAnonymous: any = currentUser?.isAnonymous;


      // console.log('try to submit', data);

      const result: any = await this.authSrv.signInWithEmail(data);

      console.log('isAnonymous', isAnonymous);
      console.log('currentUser', currentUser.uid);
      console.log('result', result.user.uid);

      // Si el usuario actual es anónimo, migra los datos al nuevo UID
      if (isAnonymous && currentUser) {
        await this.authSrv.migrateData(currentUser.uid, result.user.uid);
      }


      /** Guardar identificador del usuario en el localStorage */
      const uid = result.user.uid;

      /**
       * Guardar identificador del usuario en el localStorage
       */
      this.authSrv.setLocalUID(uid);

      let userDoc = await this.authSrv.getByUIDPromise(uid);
      if (!userDoc) {
        userDoc = await this.authSrv.getByUIDPromiseDb(uid);
        userDoc.language = 'en';

        const data = {
          name: this.commonService.noSpecialCharacters(userDoc.profile.name),
          surnames: this.commonService.noSpecialCharacters(userDoc.profile.surnames),
          identificationType: 'cedula',
          identification: userDoc.identification,
          prefijo: "+57",
          phone: userDoc.profile.phone,
          email: `${userDoc.profile.email}`.trim().toLowerCase(),
        };

        await this.authSrv.setUser(uid, data);

      }


      console.log('userDoc', userDoc);

      const toParse = pick(
        userDoc,
        [
          'email',
          'name',
          'avatar',
          'prefix',
          'phoneNumber'
        ]
      );

      console.log('toParse', toParse);

      const userLanguage = userDoc.language || 'en';

      localStorage.setItem("profile", JSON.stringify(toParse));
      localStorage.setItem('email', data.email)
      localStorage.setItem('auth', 'user')
      localStorage.setItem('lang', userLanguage)

      this.translateSrv.changeLanguage(userLanguage);

      /** Redirect To */

      const returnUrl = localStorage.getItem('returnUrl') || '/pages/dashboard';
      localStorage.removeItem('returnUrl'); // Limpia la URL de retorno una vez que se usa
      this.router.navigateByUrl(returnUrl);
      return;
    } catch (err: any) {
      console.log('Error on SignInComponent.onSubmit', err.message);

      if (err.code === "auth/wrong-password") {
        const message = this.translatePipe.transform('formValidations.invalidLogIn');
        return await this.sweetAlert2Srv.showError(message);
      }

      if (err.code === "auth/user-not-found") {
        const message = this.translatePipe.transform('formValidations.userDoesNotExist');
        return await this.sweetAlert2Srv.showError(message);
      }



      await this.authSrv.logoutSingin();

      return await this.sweetAlert2Srv.showError("Ocurrió un error inesperado, por favor intenta nuevamente.");

    } finally {
      this.form.enable();
      // this.submit = false;
      this.loading = false;
    }
  }

}
