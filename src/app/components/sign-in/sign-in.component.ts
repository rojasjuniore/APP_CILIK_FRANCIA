import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Sweetalert2Service } from '../../services/sweetalert2.service';
import { Router } from '@angular/router';
import { AuthenticationService } from 'src/app/services/authentication.service';
import { pick } from 'underscore';


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
    private fb: FormBuilder,
    private router: Router,
    private sweetAlert2Srv: Sweetalert2Service,
    private authSrv: AuthenticationService
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
      this.form.disable();

      if (!this.form.valid) {
        this.form.markAllAsTouched();
        return;
      }

      const formData = this.form.value;
      const data = {
        email: `${formData.email}`.trim().toLowerCase(),
        password: `${formData.password}`.trim()
      }
      // console.log('try to submit', data);

      const result: any = await this.authSrv.signInWithEmail(data);

      /** Guardar identificador del usuario en el localStorage */
      const uid = result.user.uid;

      /**
       * Guardar identificador del usuario en el localStorage
       */
      this.authSrv.setLocalUID(uid);

      const userDoc = await this.authSrv.getByUID(uid);
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

      localStorage.setItem("profile", JSON.stringify(toParse));

      /** Redirect To */
      return this.router.navigate(['/pages/dashboard']);

    } catch (err: any) {
      // console.log('Error on SignInComponent.onSubmit', err.message);

      if (err.code === "auth/wrong-password") {
        await this.sweetAlert2Srv.showError('Usuario o contraseña inválidos');
      }

      if (err.code === "auth/user-not-found") {
        await this.sweetAlert2Srv.showError('El usuario no existe, por favor regístrese primero');
      }
      return;

    } finally {
      this.form.enable();
      // this.submit = false;
      this.loading = false;
    }
  }

}
