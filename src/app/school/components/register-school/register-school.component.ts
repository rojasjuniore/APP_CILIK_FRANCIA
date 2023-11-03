import { approve } from '../../../helpers/abi';
import { Component, OnInit } from '@angular/core';
import { FormGroup, FormBuilder, Validators, FormArray } from '@angular/forms';
import { Router } from '@angular/router';
import moment from 'moment';
import { NgxSpinnerService } from 'ngx-spinner';
import { CommonService } from 'src/app/services/common.service';
import { CustomizationfileService } from 'src/app/services/customizationfile/customizationfile.service';
import { DataService } from 'src/app/services/data.service';
import { UploadFileService } from 'src/app/services/dedicates/upload-file.service';
import { QuickNotificationService } from 'src/app/services/quick-notification/quick-notification.service';
import { SchoolService } from 'src/app/services/school.service';
import { Sweetalert2Service } from 'src/app/services/sweetalert2.service';
import { environment } from 'src/environments/environment';

@Component({
  selector: 'app-register-school',
  templateUrl: './register-school.component.html',
  styleUrls: ['./register-school.component.css']
})
export class RegisterSchoolComponent implements OnInit {

  public registerForm!: FormGroup;
  public submitted = false;
  public country: any;
  public comunasList: any
  public locationType: any
  public cities: { id: string; name: string; country_id: string; }[];
  public uploadedFiles: any[] = [];


  constructor(
    private schoolSrv: SchoolService,
    private sweetalert2Srv: Sweetalert2Service,
    private formBuilder: FormBuilder,
    private router: Router,
    public _data: DataService,
    public _cf: CustomizationfileService,
    private spinner: NgxSpinnerService,
    private dataSrv: DataService,
    public uploadFileSrv: UploadFileService,
    private quickNotificationSrv: QuickNotificationService,
  ) {
    this.getCountry();
    this.buildForm()

    this.cities = this.dataSrv.state;
  }


  ngOnInit() { }


  /**
   * 
   */
  buildForm() {
    this.registerForm = this.formBuilder.group({

      SchoolInformation: this.formBuilder.group({
        schoolName: ['', Validators.required],
        schoolId: [''],
        schoolAddress: ['', Validators.required],
        schoolNeighborhood: ['', Validators.required],
        schoolCity: ['', Validators.required],
        schoolCountry: ['', Validators.required],

      }),


      SchoolContacts: this.formBuilder.group({
        schoolEmail: ['', [Validators.required, Validators.email]],
        schoolFacebook: [''],
        schoolInstagram: [''],
        schoolTikTok: [''],
        schoolTwitter: [''],
        schoolPhone: ['', Validators.required],
        schoolReview: [''],
      }),


      docs: this.formBuilder.group({
        schoolPhotos: ['', Validators.required],
        legalDocs: ['', Validators.required],
        certificates: ['', Validators.required],
        schoolReview: [''],
      }),

      legalRepresentatives: this.formBuilder.array([
        this.createLegalRepresentativeFormGroup()  // Agrega un representante legal por defecto
      ])
    });
  }


  createLegalRepresentativeFormGroup(): FormGroup {
    return this.formBuilder.group({
      representativeName: ['', Validators.required],
      representativeId: ['', Validators.required],
      representativePhone: ['', [Validators.required, Validators.pattern("^((\\+91-?)|0)?[0-9]{10}$")]]
    });
  }

  get legalRepresentatives() {
    return this.registerForm.get('legalRepresentatives') as FormArray;
  }

  removeLegalRepresentative(index: number) {
    this.legalRepresentatives.removeAt(index);
  }

  addLegalRepresentative() {
    this.legalRepresentatives.push(this.createLegalRepresentativeFormGroup());
  }


  /**
   * @dev   
   * @param event 
   * @param field 
   */
  onFileChange(event, field) {
    const files = event.target.files;
    if (files == 0) { return }

    // This will upload multiple files, but you can adjust it as needed
    for (let file of files) {
      this.uploadedFiles.push(file);
    }

    const file = event.target.files[0];
    this.registerForm.patchValue({ 'docs': { [field]: file } });

  }



  // convenience getter for easy access to form fields
  get f() {
    return this.registerForm.controls;
  }



  /**
   * 
   * @returns 
   */
  async request() {

    try {
      this.submitted = true;
      // stop here if form is invalid
      if (this.registerForm.invalid) {
        console.log('invalid');
        console.log('this.registerForm', this.registerForm);
        return this.sweetalert2Srv.showError("Por favor, completa los campos requeridos.");
      }


      const isValid = await this.sweetalert2Srv.askConfirm("¿Enviar petición?");
      console.log('isValid', isValid);
      if (!isValid) { return }

      await this.spinner.show();



      this.sweetalert2Srv.showLoading();

      const formData = this.registerForm.value;

      let listPromises: any = [];
      this.uploadedFiles.
        forEach((file: File) => {
          const filePath = `documents/school/${Date.now()}-${file.name}`;
          listPromises.push(this.uploadFileSrv.uploadFileDocumentIntoRoute(filePath, file))
        });

      const resultDocs = await Promise.all(listPromises);
      console.log('resultDocs', resultDocs);


      const dataDb = {
        ...formData,
        docs: resultDocs,
        status: 'pending',
        create_at: moment().format("DD/MM/YYYY HH:mm:ss"),
        update_at: null,
        uid: localStorage.getItem('uid'),
        keyDb: environment.dataEvent.keyDb,
      }



      await this.schoolSrv.store(environment.dataEvent.keyDb, dataDb);

      await this.sendNotification(dataDb.SchoolContacts.schoolEmail);

      this.sweetalert2Srv
        .showBasicAlert("Registro exitoso", "Tu solicitud de pre inscripción de escuela ha sido enviada con éxito. Te estaremos contactando en los próximos días para continuar con el proceso de inscripción de tus modalidades de participación.");
      console.log('dataDb', dataDb);

      this.registerForm.reset();
    } catch (error) {
      return this.sweetalert2Srv.showError("Error al enviar la solicitud de pre inscripción de escuela.");
    } finally {
      return this.spinner.hide();
    }



  }


  /**
   * 
   * @param email 
   * @returns 
   */
  async sendNotification(email: string) {

    try {
      if (email) {
        /**
         * TODO: no se si tengo que cambiar el tipo de notificación
         */
        await this.quickNotificationSrv.sendEmailNotification({
          type: "checkUserDocumentStep",
          email: email,
          subject: "Proceso de Verificación en Marcha - World Latin Dance Cup - " + moment().format("DD/MM/YYYY HH:mm:ss"),
          messageBody: [
            { type: "line", text: "Bienvenidos al proceso de pre registro del World Latin Dance Cup. ¡Tu escuela ha sido pre-registrada!" },
            { type: "line", text: "Nos complace informarle que su solicitud de registro para la World Latin Dance Cup ha sido recibida y actualmente se encuentra en proceso de verificación." },
            { type: "line", text: "Estamos dedicando el máximo cuidado y atención para revisar cada detalle y asegurarnos de que todo esté en orden para su participación en este evento tan esperado." },
            { type: "line", text: "Entendemos la emoción y la pasión que implica la preparación para una competencia de esta magnitud, y queremos asegurarnos de que todo esté listo para que su experiencia sea excepcional." },
            { type: "line", text: "Pronto, le enviaremos un mensaje de confirmación del registro una vez que la verificación de su documentación haya concluido con éxito. Este mensaje contendrá también los siguientes pasos a seguir para completar su inscripción y asegurar su lugar en la competencia." },
            { type: "line", text: "Le agradecemos su paciencia y comprensión durante este proceso y nos comprometemos a mantenerle informado en cada paso del camino." },
            { type: "line", text: "Si tiene alguna pregunta o necesita asistencia adicional mientras espera, no dude en contactarnos." },
            { type: "line", text: "Estamos deseando darle la bienvenida al escenario del World Latin Dance Cup." },
            { type: "line", text: "Saludos cordiales," },
            { type: "line", text: "El Equipo Organizador del World Latin Dance Cup" }
          ]
        });
      }
      return;

    } catch (err) {
      console.log("Error on DocumentsPage.sendNotification", err);
      return;
    }
  }


  // id: 47
  get citiesList() {
    const country = this.registerForm.get('country')?.value;
    return (country)
      ? this.dataSrv.state.filter((city) => Number(city.country_id) === Number(country.id))
      : this.dataSrv.state.filter((city) => Number(city.country_id) === 47)
  }

  getCountry() {
    this.country = this._data.getCountry();
  }


  /**
   * 
   * @param field 
   * @param value 
   */
  onSelectInputFile(field: string, value: File | null) {
    const newValue = value ? value : '';
    this.registerForm.patchValue({ [field]: newValue });
  }

  /**
   * 
   */
  clearLocationRules() {
    this.registerForm.get('comunas')?.setValidators([]);
    this.registerForm.get('comunas')?.updateValueAndValidity();

    // this.registerForm.get('school_nit')?.setValidators([]);
    // this.registerForm.get('school_nit')?.updateValueAndValidity();

    this.registerForm.get('school_rut')?.setValidators([]);
    this.registerForm.get('school_rut')?.updateValueAndValidity();

    this.registerForm.get('school_camaracomercio')?.setValidators([]);
    this.registerForm.get('school_camaracomercio')?.updateValueAndValidity();


    this.registerForm.get('school_representante')?.setValidators([]);
    this.registerForm.get('school_representante')?.updateValueAndValidity();
  }




  onReset() {
    this.submitted = false;
    this.registerForm.reset();
  }


  OnInit(): void {
  }

}
