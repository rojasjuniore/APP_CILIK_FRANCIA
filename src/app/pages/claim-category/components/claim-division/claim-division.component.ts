import { Component, Input, OnInit, ViewChild } from '@angular/core';
import { ClaimSearchUserComponent } from '../claim-search-user/claim-search-user.component';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { Sweetalert2Service } from 'src/app/services/sweetalert2.service';
import { NgxSpinnerService } from 'ngx-spinner';
import { AdditionalDataComponent } from '../additional-data/additional-data.component';
import { PurchaseService } from 'src/app/services/purchase.service';
import { UploadFileService } from 'src/app/services/dedicates/upload-file.service';
import { AuthenticationService } from 'src/app/services/authentication.service';
import { environment } from 'src/environments/environment';
import { CustomTranslateService } from 'src/app/services/custom-translate.service';

@Component({
  selector: 'app-claim-division',
  templateUrl: './claim-division.component.html',
  styleUrls: ['./claim-division.component.css'],
})
export class ClaimDivisionComponent implements OnInit {
  @ViewChild('modalFindUser') modalFindUser!: ClaimSearchUserComponent;
  @ViewChild('modalFindAditionalData')
  modalFindAditionalData!: AdditionalDataComponent;

  @Input() division: any;

  public buildData: any = {};

  public form!: FormGroup;

  /** Estado de botón para añadir competidores */
  public addCompetitoresButton = false;

  /** para guardar la categoria */
  public divisionCategory: any;

  /**validaciones */
  public vm = {
    division: [{ type: 'required', message: 'formValidations.required' }],
    users: [{ type: 'required', message: 'formValidations.required' }],
    city: [{ type: 'required', message: 'formValidations.required' }],
    music: [{ type: 'required', message: 'formValidations.required' }],
    block: [{ type: 'required', message: 'formValidations.required' }],
  };

  public submit = false;

  constructor(
    private auth: AuthenticationService,
    private uploadFileSrv: UploadFileService,
    private purchaseSrv: PurchaseService,
    private spinner: NgxSpinnerService,
    private sweetAlert2Srv: Sweetalert2Service,
    private translateSrv: CustomTranslateService
  ) {
    this.buildForm();
  }

  ngOnInit(): void {
    console.log('this.division', this.division);

    this.divisionCategory = this.division.categoryType;
    console.log(this.divisionCategory);
  }

  buildForm() {
    this.form = new FormGroup({
      division: new FormControl('', [Validators.required]),
      users: new FormControl('', [Validators.required]),
      city: new FormControl('', [Validators.required]),
      music: new FormControl('', [Validators.required]),
      block: new FormControl('', [Validators.required]),
      country: new FormControl('', []),
      school: new FormControl('', []),
      state: new FormControl('', []),
      instagram: new FormControl('', []),
      facebook: new FormControl('', []),
      tiktok: new FormControl('', []),
      choreographyCreator: new FormControl('', []),
      nameCoach: new FormControl('', []),
      photo: new FormControl('', []),
    });
  }

  get f() {
    return this.form.controls;
  }

  /**
   * @dev Al seleccionar datos adicionales
   * @param res
   */
  async onSelectAdditionalData(res: any) {
    try {
      if (!res.status) {
        return;
      }

      console.log('res', res.data);

      /**
       * - Cargar información de la categoría
       * - Remover usuarios
       */
      this.form.patchValue({ ...res.data, users: [] });

      let message = await this.translateSrv.translate(
        'alert.additionalDataCorrectlySelected'
      );
      this.sweetAlert2Srv.showSuccess(message);

      /** Habilitar botón para añadir usuarios */
      this.addCompetitoresButton = true;
      return;
    } catch (err) {
      console.log('err', err);
      return;
    }
  }

  /**
   * @dev Al seleccionar los competidores
   * @param res
   */
  async onSelectUser(res: any) {
    try {
      if (!res.status) {
        return;
      }
      this.form.patchValue({ users: res.data });
      let message = await this.translateSrv.translate(
        'alert.userSelectedCorrectly'
      );
      this.sweetAlert2Srv.showSuccess(message);
      return;
    } catch (err) {
      console.log('err', err);
      return;
    }
  }

  async onSelectMusicFile(event: any) {
    try {
      console.log('onSelectMusicFile', event);

      if (!event) {
        // limpiar etiqueta audio
        this.form.patchValue({ music: '' });
        return;
      }

      // console.log(this.divisionCategory);
      // console.log(event.duration);

      //validacion de la duracion de la musica

      let messageError = await this.translateSrv.translate(
        'alert.musicDurationAlert'
      );
      if (event.duration < 120) {
        return this.sweetAlert2Srv.showError(messageError);
      } else if (event.duration > 240) {
        return this.sweetAlert2Srv.showError(messageError);
      }
      const file = event ? event.audio : '';
      this.form.patchValue({ music: file });
      let message = await this.translateSrv.translate(
        'alert.correctlySelectedMusic'
      );
      this.sweetAlert2Srv.showSuccess(message);
      return;
    } catch (err) {
      console.log('err', err);
      return;
    }
  }

  async onSelectPhotoFile(event: any) {
    try {
      console.log('onSelectMusicFile', event);
      if (!event) {
        return;
      }
      const file = event ? event : '';
      this.form.patchValue({
        photo: file,
      });

      let message = await this.translateSrv.translate(
        'alert.correctlySelectedPhoto'
      );

      this.sweetAlert2Srv.showSuccess(message);
    } catch (err) {
      console.log('err', err);
    }
  }

  /**
   * @dev Disparar modal para capturar datos adicionales
   */
  launchFindAditionalDataModal() {
    this.modalFindAditionalData.showModal(this.division);
  }

  /**
   * @dev Disparar modal para buscar usuario
   */
  launchFindUserModal() {
    const formData = this.form.value;
    this.modalFindUser.showModal({
      division: this.division,
      divisionSetting: formData.division,
    });
    // this.modalFindUser.showModal(this.division);
  }

  async save() {
    try {
      this.submit = true;
      this.spinner.show();

      console.log('this.form', this.form);
      if (this.form.invalid) {
        this.form.markAllAsTouched();
        let message = await this.translateSrv.translate('alert.incompleteForm');
        return this.sweetAlert2Srv.showError(message);
      }

      await this.spinner.show();

      const formData = this.form.value;
      const { _id, _index } = this.division;

      console.log('formData', formData);
      const url = `division/${_id}/purchase`;

      const fileRefmusic = await this.uploadFileSrv.uploadFileDocumentIntoRoute(
        `${url}/music/${Date.now()}.mp3`,
        formData.music
      );
      const fileRefphoto = await this.uploadFileSrv.uploadFileDocumentIntoRoute(
        `${url}/imagen/${Date.now()}.png`,
        formData.photo
      );

      formData.music = fileRefmusic;
      formData.photo = fileRefphoto;

      console.log('formData', formData);
      console.log('division', this.division);

      const uid = await this.auth.getByIdUIDPromise();
      console.log('uid', uid);

      const profile = await this.auth.getProfile(uid);
      console.log('profile', profile);

      const objData = {
        ...formData,
        ...this.division,
        uid: uid,
        profile: profile,
      };

      const ordenId = `${_id}-${_index}`;

      /// @add purchase
      await this.purchaseSrv.storePurchasePending(
        environment.dataEvent.keyDb,
        `${_id}-${_index}`,
        objData
      );

      await this.purchaseSrv.updatePurchaseStore(
        environment.dataEvent.keyDb,
        _id,
        _index,
        true
      );

      await this.purchaseSrv.reclaimedPurchase({
        docId: ordenId,
        eventId: environment.dataEvent.keyDb,
      });

      /// actualizar el product con el id del purchase
      let message = await this.translateSrv.translate(
        'alert.dataSavedCorrectly'
      );
      return this.sweetAlert2Srv.showSuccess(message);
    } catch (err) {
      console.log('err', err);
      return this.sweetAlert2Srv.showError('Err save');
    } finally {
      console.log('finally');
      this.spinner.hide();
    }
  }
}
