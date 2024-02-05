import { AfterViewInit, Component, Input, OnChanges, OnDestroy, OnInit, Output, SimpleChanges, ViewChild } from '@angular/core';
import { FormGroup, FormBuilder, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { Observable, Subject, Subscription, catchError, debounceTime, distinctUntilChanged, from, map, of, switchMap, tap } from 'rxjs';
import { BlockService } from 'src/app/services/block.service';
import { BsModalService } from 'src/app/services/bs-modal.service';
import { DataService } from 'src/app/services/data.service';
import { DevisionService } from 'src/app/services/devision.service';
import { SchoolService } from 'src/app/services/school.service';
import { Sweetalert2Service } from 'src/app/services/sweetalert2.service';
import { environment } from 'src/environments/environment';
import { ClaimSearchUserComponent } from '../../claim/claim-search-user/claim-search-user.component';

@Component({
  selector: 'app-additional-data',
  templateUrl: './additional-data.component.html',
  styleUrls: ['./additional-data.component.css']
})
export class AdditionalDataComponent implements OnInit, OnChanges, AfterViewInit, OnDestroy {

  @ViewChild('modalOnSelectedAddUser') modalOnSelectedAddUser!: ClaimSearchUserComponent;

  /** Identificador de la modal */
  @Input() _id: string = 'modalAdditionalDataFindOwner';

  @Input() ownerType!: string;

  @Output() onCloseModal = new Subject<any>();

  /** Instancia de la modal */
  public mi: any;

  /** Instancia del formulario */
  public form!: FormGroup;

  /** Documento de la categoria */
  public item: any;

  /** Reglas del formulario */
  public formRules: any;

  public schoolRecord$!: Observable<any[]>;
  public dataBlock$!: Observable<any[]>;
  public division$!: Observable<any[]>;
  public results$: Observable<any[]> = of([]);

  countries: any;
  allStates: any;
  filteredStates: any;
  filteredCity: any;
  AllCity: any;

  /** Subscripción de eventos */
  private sub$!: Subscription;

  public competitionData = {
    officialQualifiers: [
      { id: "no", name: "No Aplica" },
      { id: "Peru-Latin-Dance-Cup", name: "Peru Latin Dance Cup" },
      { id: "Los-Angeles-Latin-Dance-Cup", name: "Los Angeles Latin Dance Cup" },
      { id: "Venezuela-Latin-Dance-Cup", name: "Venezuela Latin Dance Cup" },
      { id: "Argentina-Latin-Dance-Cup", name: "Argentina Latin Dance Cup" }
    ],
    achievedPosition: [
      { id: "no", name: "No Aplica" },
      { id: "First-Place", name: "First Place" },
      { id: "Second-Place", name: "Second Place" },
      { id: "Third-Place", name: "Third Place" },
      { id: "Other-Position", name: "Other Position" }
    ],
    firstPlaceWon: [
      { id: "no", name: "No Aplica" },
      { id: "WLDC-2019", name: "WLDC 2019" },
      { id: "WLDC-Online-2021", name: "WLDC Online 2021" },
      { id: "Festival-de-Tango-Medellin-2023", name: "Festival de Tango Medellín 2023" },
      { id: "Mundial-de-Salsa-Cali-2023", name: "Mundial de Salsa Cali 2023" },
      { id: "Puntal-Pie", name: "Puntal Pie" },
      { id: "Dunkan", name: "Dunkan" }
    ]
  };

  /** Reglas por defecto del formulario */
  private defaultRules = {
    block: ['', Validators.required],
    division: ['', Validators.required],
    school: [''],
    country: [''],
    state: [''],
    city: [''],
    choreographyCreator: [''],
    nameCoach: [''],
    instagram: [''],
    facebook: [''],
    tiktok: [''],
    groupName: [''],
    groupDirector: [''],
    officialQualifiers: [''],
    achievedPosition: [''],
    firstPlaceWon: [''],
  };


  /** Glosario de categorias */
  private GLOSARY_CATEGORIES = {
    couples: 'pareja',
    soloist: 'solista',
    groups: 'grupo',
  };

  constructor(
    private sweetAlert2Srv: Sweetalert2Service,
    private blockSrv: BlockService,
    private devisionSrv: DevisionService,
    private dataSrv: DataService,
    private bsModalSrv: BsModalService,
    private schoolSrv: SchoolService,
    private router: Router,
    private fb: FormBuilder,

  ) {
    this.buildForm();
    this.loadSchoolRecord();
    this.loadCountryAndCity();


  }

  buildForm() {
    this.form = this.fb.group(this.defaultRules);
  }

  get f() { return this.form.controls; }

  ngOnInit(): void { }

  ngOnChanges(changes: SimpleChanges): void {
    const { ownerType } = changes;

    if (ownerType && ownerType.currentValue) {
      this.ownerType = ownerType.currentValue;
    }
  }


  ngAfterViewInit(): void {
    this.buildModal();
  }


  launchFindOwnerModal(item: any, index: any) {
    this.modalOnSelectedAddUser.showModal({
      ...item,
      index: index,
      capacity: 1,
    });
  }

  async onSelectedAddUser(response: any) {
    try {
      const { status, data } = response;
      const { index } = data;

      if (!status) {
        return this.sweetAlert2Srv.showError('No user selected');
      }

      console.log('index', index);
      console.log('data', data);

      this.form.patchValue({ [data.index]: data.users[0] });


      return
    } catch (err) {
      return this.sweetAlert2Srv.showError(err);
    }
  }

  buildModal() {

    this.mi = this.bsModalSrv.buildModal(this._id);

    this.sub$ = this.router.events.subscribe((event) => {

      /** Si la modal esta desplegada al cambiar de ruta */
      if (this.mi._isShown) { this.closeModal(); }

    });
  }

  async showModal(params: any) {
    const { item, rules } = params;
    console.log('showModal', item, rules);

    // Cargar información de la categoria
    this.item = item;
    console.log('item', this.item);

    // Cargar reglas del formulario
    this.formRules = rules;
    console.log('rules', this.formRules);

    // Cargar reglas del formulario
    for (const key of Object.keys(this.defaultRules)) {
      const rules = this.formRules[key].rules || [];
      this.form.get(key)?.setValidators(rules);
    }

    /** Cargar información de los bloques */
    this.loadBlock();

    // Mostrar modal
    this.mi.show();
  }

  async closeModal(params: any = {}) {
    const { status = false, data = null } = params;

    console.log('closeModal', status, data);

    this.onCloseModal.next({ status, data });

    this.item = null;
    this.formRules = null;

    for (const [key, raw] of Object.entries(this.defaultRules)) {
      const rules: any = raw.length > 0 ? raw[1] : null;
      this.form.get(key)?.setValidators(rules);
    }

    this.mi.hide();
  }

  loadBlock() {
    // console.log('loadBlock', this.item);
    const categoryParsed = this.GLOSARY_CATEGORIES[this.item.categoryType];

    // this.dataBlock$ = from(this.blockSrv.getBlock(environment.dataEvent.keyDb))
    this.dataBlock$ = from(
      this.blockSrv.getBlockByType(environment.dataEvent.keyDb, categoryParsed)
    ).pipe(
      // tap((res: any) => console.log('getBlock', res)),
      /** TODO: Deshabilitar cambio temporalmente */
      // switchMap(async (res: any) => {
      //   try {
      //     return res

      //   } catch (err) {
      //     console.log('Error on DivisionPurchasePage.ngOnInit', err);
      //     return res;
      //   }
      // }),
      map((res: any) => res.records.sort()),
      // tap((res: any) => console.log('getBlock', res)),
      catchError((err) => {
        console.log('Error al obtener los bloques', err);
        return of([]);
      })
    );

    /** Al seleccionar bloque */
    this.form
      .get('block')
      ?.valueChanges.pipe(
        debounceTime(500),
        /// only email format with regex
        // map((value: string) => (value.length > 0) ? value.trim().toLocaleLowerCase() : ''),
        // map((value: string) => value.replace(/[^a-zA-Z0-9@.]/g, '')),
        distinctUntilChanged()
        // tap((value: any) => console.log('block value', value)),
      )
      .subscribe((value: string) => {
        if (value.length === 0) {
          this.results$ = of([]);
          return;
        }

        /** Al cambiar el bloque - Reiniciar la categoria */
        this.form.patchValue({ division: '' });

        /** Cargar listado de categorias */
        this.searchCategory(value);
      });
  }



  /**
   * @dev Buscar información de las categorias
   * @param block                   Bloque seleccionado
   */
  searchCategory(block: any) {
    /** No se recibe valor del bloque actual */
    if (!block) { return; }

    /** Glosario de categorias */
    const glosaryCategories = {
      couples: 'pareja',
      soloist: 'solista',
      groups: 'grupo'
    };

    const categoryParsed = glosaryCategories[this.item.categoryType];
    // console.log('categoryParsed', categoryParsed);

    // console.log('searchCategory', environment.dataEvent.keyDb, block);

    /** Crear observable para cargar divisiones */
    console.log('searchCategory', environment.dataEvent.keyDb, block, categoryParsed);
    this.division$ = this.devisionSrv.searchCategory(environment.dataEvent.keyDb, block)
      .pipe(
        /** Filtrar divisiones segun el tipo de categoria que recibe la modal */
        map((data: any[]) => data.filter((item: any) => item.id_tipo_sub_categoria == categoryParsed)),
        // tap((res: any) => console.log('searchCategory', res)),
      )
  }

  loadCountryAndCity() {
    this.countries = this.dataSrv.getCountry()
    this.allStates = this.dataSrv.getState();
    this.AllCity = this.dataSrv.getCity();

    this.form.get('country')?.valueChanges.subscribe(selectedCountry => {
      console.log('selectedCountryId', selectedCountry);
      this.filteredStates = this.allStates.filter(state => state.country_id === selectedCountry.id);
    });

    this.form.get('state')?.valueChanges.subscribe(selectedState => {
      console.log('state', selectedState);
      this.filteredCity = this.AllCity.filter(city => city.state_id === selectedState.id);
    });
  }

  loadSchoolRecord() {
    this.schoolRecord$ = this.schoolSrv.getSchoolRecord()
      .pipe(
        // tap((res: any) => console.log('getSchoolRecord', res)),
        map((res: any[]) => {
          return res
            .filter((item: any) => item.public)
            .filter((item: any) => item.status == 'approved')
            // .filter((item: any) => item.keyDb == this._cf.getKeyDb())
            .filter((item: any) => item.name_institution)
            .map((item) => ({ ...item, name_institution: `${item.name_institution}`.trim().toUpperCase() }))
            .sort((a: any, b: any) => {
              if (a.name_institution < b.name_institution) {
                return -1;
              }
              if (a.name_institution > b.name_institution) {
                return 1;
              }
              return 0;
            })
        }),
        // tap((res: any) => console.log('getSchoolRecord', res)),
        catchError((err) => {
          console.log("Error al obtener listado de escuelas", err);
          return of([]);
        })
      );
  }

  /**
   * @dev Enviar formulario
   */
  onSubmit() {
    if (this.form.invalid) {
      this.form.markAllAsTouched();
      console.log('invalid', this.form);
      return alert('invalid');
    }

    console.log('this.form.value', this.form.value);
    this.closeModal({ status: true, data: this.form.value });
  }

  ngOnDestroy(): void { this.sub$.unsubscribe(); }

}
