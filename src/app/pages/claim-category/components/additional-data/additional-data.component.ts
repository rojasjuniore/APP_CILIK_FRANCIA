import { AfterViewInit, Component, Input, OnChanges, OnDestroy, OnInit, Output, SimpleChanges } from '@angular/core';
import { FormGroup, FormBuilder, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { Observable, Subject, Subscription, catchError, debounceTime, distinctUntilChanged, from, map, of, switchMap, tap } from 'rxjs';
import { BlockService } from 'src/app/services/block.service';
import { BsModalService } from 'src/app/services/bs-modal.service';
import { DataService } from 'src/app/services/data.service';
import { DevisionService } from 'src/app/services/devision.service';
import { SchoolService } from 'src/app/services/school.service';
import { UserService } from 'src/app/services/user/user.service';
import { environment } from 'src/environments/environment';

@Component({
  selector: 'app-additional-data',
  templateUrl: './additional-data.component.html',
  styleUrls: ['./additional-data.component.css']
})
export class AdditionalDataComponent implements OnInit, OnChanges, AfterViewInit, OnDestroy {

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

  constructor(
    private blockSrv: BlockService,
    private devisionSrv: DevisionService,
    private dataSrv: DataService,
    private bsModalSrv: BsModalService,
    private fb: FormBuilder,
    private userSrv: UserService,
    private schoolSrv: SchoolService,
    private router: Router,

  ) {
    this.buildForm();
    this.loadSchoolRecord();
    this.loadCountryAndCity();

    /** Cargar información de los bloques */
    this.loadBlock();
  }

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

  ngOnDestroy(): void {
    this.sub$.unsubscribe();
  }

  buildModal() {
    this.mi = this.bsModalSrv.buildModal(this._id);

    this.sub$ = this.router.events.subscribe((event) => {

      /** Si la modal esta desplegada al cambiar de ruta */
      if (this.mi._isShown) { this.closeModal(); }

    });
  }

  async showModal(item: any) {
    // console.log('showModal', this.mi);
    this.item = item;
    this.mi.show();
  }

  async closeModal(params: any = {}) {
    const { status = false, data = null } = params;
    this.onCloseModal.next({ status, data });
    this.item = null;
    this.mi.hide();
  }

  buildForm() {
    this.form = this.fb.group({
      block: ['', Validators.required],
      division: ['', Validators.required],
      choreographyCreator: [''],
      // nameGroup: ['', Validators.required],
      // school: ['', Validators.required],
      nameCoach: [''],
      instagram: [''],
      facebook: [''],
      tiktok: [''],
      country: [''],
      state: [''],
      city: ['']
    });
  }

  /**
   * @dev Cargar información de los bloques
   */
  loadBlock() {
    this.dataBlock$ = from(this.blockSrv.getBlock(environment.dataEvent.keyDb))
      .pipe(
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
        map((res: any) => res.sort()),
        // tap((res: any) => console.log('getBlock', res)),
        catchError((err) => {
          console.log("Error al obtener los bloques", err);
          return of([]);
        })
      );

    /** Al seleccionar bloque */
    this.form.get('block')?.valueChanges
      .pipe(
        debounceTime(500),
        /// only email format with regex
        // map((value: string) => (value.length > 0) ? value.trim().toLocaleLowerCase() : ''),
        // map((value: string) => value.replace(/[^a-zA-Z0-9@.]/g, '')),
        distinctUntilChanged(),
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

  onSubmit() {
    if (this.form.invalid) {
      console.log('invalid', this.form);
      return alert('invalid');
    }

    this.closeModal({ status: true, data: this.form.value });
  }

}
