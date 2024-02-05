import { Component, Input, OnInit, ViewChild } from '@angular/core';
import { ClaimSearchUserComponent } from '../../claim/claim-search-user/claim-search-user.component';
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
  @ViewChild('modalFindAditionalData') modalFindAditionalData!: AdditionalDataComponent;

  @Input() division: any;
  @Input() orderDocId: any;
  @Input() index: any;


  public buildData: any = {};

  public form!: FormGroup;

  /** Estado de botón para añadir competidores */
  public addCompetitoresButton = false;


  /** Reglas de validación */
  public rules = {
    soloist: {
      block: {
        rules: [Validators.required],
        disabled: false
      },
      division: {
        rules: [Validators.required],
        disabled: false
      },
      users: {
        rules: [Validators.required],
        disabled: false
      },
      groupName: {
        rules: [],
        disabled: true
      },
      groupDirector: {
        rules: [],
        disabled: true
      },
      country: {
        rules: [Validators.required],
        disabled: false
      },
      state: {
        rules: [Validators.required],
        disabled: false
      },
      city: {
        rules: [],
        disabled: false
      },
      school: {
        rules: [],
        disabled: true
      },
      choreographyCreator: {
        rules: [],
        disabled: false
      },
      nameCoach: {
        rules: [],
        disabled: false
      },
      music: {
        rules: [Validators.required],
        disabled: false
      },
      photo: {
        rules: [],
        disabled: false
      },
      instagram: {
        rules: [],
        disabled: false
      },
      facebook: {
        rules: [],
        disabled: false
      },
      tiktok: {
        rules: [],
        disabled: false
      },

      officialQualifiers: {
        rules: [],
        disabled: false
      },
      achievedPosition: {
        rules: [],
        disabled: false
      },
      firstPlaceWon: {
        rules: [],
        disabled: false
      }
    },
    couples: {
      block: {
        rules: [Validators.required],
        disabled: false
      },
      division: {
        rules: [Validators.required],
        disabled: false
      },
      users: {
        rules: [Validators.required],
        disabled: false
      },
      groupName: {
        rules: [],
        disabled: true
      },
      groupDirector: {
        rules: [],
        disabled: true
      },
      country: {
        rules: [Validators.required],
        disabled: false
      },
      state: {
        rules: [Validators.required],
        disabled: false
      },
      city: {
        rules: [],
        disabled: false
      },
      school: {
        rules: [],
        disabled: true
      },
      choreographyCreator: {
        rules: [],
        disabled: false
      },
      nameCoach: {
        rules: [],
        disabled: false
      },
      music: {
        rules: [Validators.required],
        disabled: false
      },
      photo: {
        rules: [],
        disabled: false
      },
      instagram: {
        rules: [],
        disabled: false
      },
      facebook: {
        rules: [],
        disabled: false
      },
      tiktok: {
        rules: [],
        disabled: false
      },
      officialQualifiers: {
        rules: [],
        disabled: false
      },
      achievedPosition: {
        rules: [],
        disabled: false
      },
      firstPlaceWon: {
        rules: [],
        disabled: false
      }
    },
    groups: {
      block: {
        rules: [Validators.required],
        disabled: false
      },
      division: {
        rules: [Validators.required],
        disabled: false
      },
      users: {
        rules: [Validators.required],
        disabled: false
      },
      groupName: {
        rules: [Validators.required],
        disabled: false
      },
      groupDirector: {
        rules: [Validators.required],
        disabled: false
      },
      country: {
        rules: [Validators.required],
        disabled: false
      },
      state: {
        rules: [Validators.required],
        disabled: false
      },
      city: {
        rules: [],
        disabled: false
      },
      school: {
        rules: [],
        disabled: true
      },
      choreographyCreator: {
        rules: [],
        disabled: true
      },
      nameCoach: {
        rules: [],
        disabled: true
      },
      music: {
        rules: [],
        disabled: false
      },
      photo: {
        rules: [],
        disabled: false
      },
      instagram: {
        rules: [],
        disabled: false
      },
      facebook: {
        rules: [],
        disabled: false
      },
      tiktok: {
        rules: [],
        disabled: false
      },
      officialQualifiers: {
        rules: [],
        disabled: false
      },
      achievedPosition: {
        rules: [],
        disabled: false
      },
      firstPlaceWon: {
        rules: [],
        disabled: false
      }
    }
  };

  /** Regla de validación actual */
  public currentRules = this.rules.soloist;

  constructor(
    private auth: AuthenticationService,
    private uploadFileSrv: UploadFileService,
    private purchaseSrv: PurchaseService,
    private spinner: NgxSpinnerService,
    private sweetAlert2Srv: Sweetalert2Service,
    private translateSrv: CustomTranslateService
  ) { }

  ngOnInit(): void {
    console.log('this.division', this.division);
    console.log('this.orderDocId', this.orderDocId);
    console.log('this.index', this.index);

    /** Construir Formulario */
    this.buildForm();
  }

  buildForm() {
    this.form = new FormGroup({
      block: new FormControl('', [Validators.required]),      // Bloque
      division: new FormControl('', [Validators.required]),   // División
      users: new FormControl('', [Validators.required]),      // Usuarios
      groupName: new FormControl(''),                         // Nombre del grupo
      groupDirector: new FormControl('', []),                 // Director del grupo
      country: new FormControl('', []),                       // País
      city: new FormControl(''),                              // Ciudad
      school: new FormControl('', []),                        // Escuela
      choreographyCreator: new FormControl('', []),           // Coreógrafo
      nameCoach: new FormControl('', []),                     // Nombre del entrenador
      music: new FormControl(''),                             // Música
      photo: new FormControl('', []),                         // Foto
      instagram: new FormControl('', []),                     // Instagram
      facebook: new FormControl('', []),                      // Facebook
      tiktok: new FormControl('', []),                        // Tiktok
      state: new FormControl('', []),
      officialQualifiers: new FormControl('', []),            // Clasificados oficiales
      achievedPosition: new FormControl('', []),              // Posición alcanzada
      firstPlaceWon: new FormControl('', []),                 // Primer lugar ganado
    });

    /** Cargar reglas de validación */
    this.currentRules = this.rules[this.division.categoryType];
    // console.log('rules', rules);

    /** Aplicar reglas de validación */
    for (const [key, raw] of Object.entries<any>(this.currentRules)) {
      /** Obtener control */
      const control = this.form.get(key);
      if (control) {
        control.setValidators(raw.rules);
        if (raw.disabled) { control.disable(); } else { control.enable(); }
        control.updateValueAndValidity();
      }
    }

  }

  get f() { return this.form.controls; }

  /**
   * @dev Al seleccionar datos adicionales
   * @param res 
   */
  async onSelectAdditionalData(res: any) {
    try {
      if (!res.status) { return; }

      console.log('res', res.data);

      /**
       * - Cargar información de la categoría
       * - Remover usuarios
       */
      this.form.patchValue({ ...res.data, users: [] });

      let message = await this.translateSrv.translate('alert.additionalDataCorrectlySelected');
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
  onSelectUser(res: any) {
    console.log('onSelectUser', res);
    try {
      if (!res.status) {
        return this.sweetAlert2Srv.showError('Usuario no seleccionado correctamente 001');
      }

      const userAttributes = res.data
        .map(({ identification, email, name, uid }) => {
          if (
            identification === undefined ||
            email === undefined ||
            name === undefined ||
            uid === undefined
          ) {
            return this.sweetAlert2Srv.showError('Usuario no seleccionado correctamente 002');
          }

          return {
            identification: identification,
            email: email,
            name: name,
            uid: uid,
          };
        });

      console.warn('userAttributes', userAttributes);

      this.form.patchValue({ users: userAttributes });
      this.sweetAlert2Srv.showSuccess('Usuario seleccionado correctamente');
      return;
    } catch (err) {
      console.log('err', err);
      return this.sweetAlert2Srv.showError('Usuario no seleccionado correctamente');
    }
  }

  async onSelectMusicFile(event: any) {
    try {
      console.log('onSelectMusicFile', event);
      if (!event) { return; }
      const file = event ? event : '';
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
    this.modalFindAditionalData.showModal({
      item: this.division,
      rules: this.currentRules
    });
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
    console.log('save');
    try {
      this.spinner.show();
      console.log('this.form', this.form);
      if (this.form.invalid) {
        return this.sweetAlert2Srv.showError('Formulario inválido');
      }

      await this.spinner.show();

      const formData = this.form.value;
      const accreditationID = `${this.orderDocId}-${this.index}`;
      const url = `division/${accreditationID}/purchase`;


      /// @dev Subir música
      const fileRefmusic = await this.uploadFileSrv.uploadFileDocumentIntoRoute(
        `${url}/music/${this.orderDocId}-${Date.now()}.mp3`,
        formData.music
      );

      /// @dev Subir foto 
      const fileRefphoto = await this.uploadFileSrv.uploadFileDocumentIntoRoute(
        `${url}/imagen/${this.orderDocId}-${Date.now()}.png`,
        formData.photo
      );

      formData.music = fileRefmusic;
      formData.photo = fileRefphoto;

      console.log('formData', formData);
      console.log('division', this.division);

      const uid = await this.auth.getByIdUIDPromise();
      // console.log('uid', uid);

      const profile = await this.auth.getProfile(uid);
      // console.log('profile', profile);

      // console.log('objData', objData);
      /// const uidList = formData.users.map(({ uid }) => uid)

      // Realiza una copia profunda de formData
      const formDataCopy = JSON.parse(JSON.stringify(formData));

      // Ahora puedes trabajar con formDataCopy sin afectar a formData original
      const uidList = Array.isArray(formDataCopy.users) ? formDataCopy.users.map(user => user.uid) : [];
      if (uidList.length === 0) {
        return this.sweetAlert2Srv.showError('No se ha seleccionado ningun usuario');
      }


      const accreditationObj = {
        uidList: uidList,
        ordeID: this.orderDocId,
        index: this.index,
        block: formData.block,
        uid_add: uid,
        key: this.division.key,
        division: formData.division.id_sub_categoria,
        accreditationID: accreditationID,
      }



      /**
       * @TODO; NO TOCAR
       * PROBLEMA DE LA DIVISIÓN
       */
      const objData = {
        uid: uid,
        profile: profile,
        ...this.division,
        ...formData,
        participants: formData.users
      };

      console.log('objData', objData);
      console.log('accreditationObj', accreditationObj);



      /// @update purchase
      await this.purchaseSrv.getServer()
      await this.purchaseSrv.storePurchasePending(environment.dataEvent.keyDb, accreditationID, objData);
      await this.purchaseSrv.storePurchaseClaim(environment.dataEvent.keyDb, accreditationID, accreditationObj)
      await this.purchaseSrv.reclaimedPurchase({
        docId: accreditationID,
        eventId: environment.dataEvent.keyDb,
      });


      /// @update purchase
      await this.purchaseSrv.updatePurchaseStore(
        environment.dataEvent.keyDb,
        this.orderDocId,
        this.index,
        accreditationObj,
        true,
        false
      );

      /// actualizar el product con el id del purchase
      return this.sweetAlert2Srv.showSuccess('Datos guardados correctamente');
    } catch (err) {
      console.log('err', err);
      return this.sweetAlert2Srv.showError(JSON.stringify(err));
    } finally {
      console.log('finally');
      this.spinner.hide();
    }
  }

}
