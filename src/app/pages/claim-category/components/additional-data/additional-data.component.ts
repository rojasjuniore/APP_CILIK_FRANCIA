import {
  AfterViewInit,
  Component,
  Input,
  OnChanges,
  OnDestroy,
  OnInit,
  Output,
  SimpleChanges,
} from '@angular/core';
import { FormGroup, FormBuilder, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { NgxSpinnerService } from 'ngx-spinner';
import {
  Observable,
  Subject,
  Subscription,
  catchError,
  debounceTime,
  distinctUntilChanged,
  from,
  map,
  of,
  switchMap,
  tap,
} from 'rxjs';
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
  styleUrls: ['./additional-data.component.css'],
})
export class AdditionalDataComponent
  implements OnInit, OnChanges, AfterViewInit, OnDestroy
{
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
  public submit = false;

  /** Glosario de categorias */
  private GLOSARY_CATEGORIES = {
    couples: 'pareja',
    soloist: 'solista',
    groups: 'grupo',
  };

  /** Subscripción de eventos */
  private sub$!: Subscription;

  /**validaciones */
  public vm = {
    block: [{ type: 'required', message: 'formValidations.required' }],
    division: [{ type: 'required', message: 'formValidations.required' }],
    country: [{ type: 'required', message: 'formValidations.required' }],
    state: [{ type: 'required', message: 'formValidations.required' }],
    city: [{ type: 'required', message: 'formValidations.required' }],
  };

  constructor(
    private spinner: NgxSpinnerService,
    private blockSrv: BlockService,
    private devisionSrv: DevisionService,
    private dataSrv: DataService,
    private bsModalSrv: BsModalService,
    private fb: FormBuilder,
    private userSrv: UserService,
    private schoolSrv: SchoolService,
    private router: Router
  ) {
    this.buildForm();
    this.loadSchoolRecord();
    this.loadCountryAndCity();
  }

  ngOnInit(): void {}

  ngOnChanges(changes: SimpleChanges): void {
    const { ownerType } = changes;

    if (ownerType && ownerType.currentValue) {
      this.ownerType = ownerType.currentValue;
    }
  }

  ngAfterViewInit(): void {
    this.buildModal();
  }

  buildModal() {
    this.mi = this.bsModalSrv.buildModal(this._id);

    this.sub$ = this.router.events.subscribe((event) => {
      /** Si la modal esta desplegada al cambiar de ruta */
      if (this.mi._isShown) {
        this.closeModal();
      }
    });
  }

  async showModal(item: any) {
    this.item = item;
    console.log('item', this.item);

    /** Cargar información de los bloques */
    this.loadBlock();

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
      country: ['', Validators.required],
      state: ['', Validators.required],
      city: [''],
      // choreographyCreator: [''],
      // nameCoach: [''],
      // nameGroup: ['', Validators.required],
      // school: ['', Validators.required],
      // instagram: [''],
      // facebook: [''],
      // tiktok: [''],
    });
  }

  get f() {
    return this.form.controls;
  }

  /**
   * @dev Cargar información de los bloques
   */
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
  async searchCategory(block: any) {
    /** No se recibe valor del bloque actual */
    if (!block) {
      return;
    }

    await this.spinner.show();

    const categoryParsed = this.GLOSARY_CATEGORIES[this.item.categoryType];
    // console.log('categoryParsed', categoryParsed);

    // console.log('searchCategory', environment.dataEvent.keyDb, block);

    /** Crear observable para cargar divisiones */
    console.log(
      'searchCategory',
      environment.dataEvent.keyDb,
      block,
      categoryParsed
    );
    this.division$ = this.devisionSrv
      .searchCategory(environment.dataEvent.keyDb, block)
      .pipe(
        /** Filtrar divisiones segun el tipo de categoria que recibe la modal */
        map((data: any[]) =>
          data.filter(
            (item: any) => item.id_tipo_sub_categoria == categoryParsed
          )
        ),
        tap((res: any) => {
          console.log('searchCategory', res);
          this.spinner.hide();
        })
      );
  }

  loadCountryAndCity() {
    this.countries = this.dataSrv.getCountry();
    this.allStates = this.dataSrv.getState();
    this.AllCity = this.dataSrv.getCity();

    this.form.get('country')?.valueChanges.subscribe((selectedCountry) => {
      console.log('selectedCountryId', selectedCountry);
      this.filteredStates = this.allStates.filter(
        (state) => state.country_id === selectedCountry.id
      );
    });

    this.form.get('state')?.valueChanges.subscribe((selectedState) => {
      console.log('state', selectedState);
      this.filteredCity = this.AllCity.filter(
        (city) => city.state_id === selectedState.id
      );
    });
  }

  loadSchoolRecord() {
    this.schoolRecord$ = this.schoolSrv.getSchoolRecord().pipe(
      // tap((res: any) => console.log('getSchoolRecord', res)),
      map((res: any[]) => {
        return (
          res
            .filter((item: any) => item.public)
            .filter((item: any) => item.status == 'approved')
            // .filter((item: any) => item.keyDb == this._cf.getKeyDb())
            .filter((item: any) => item.name_institution)
            .map((item) => ({
              ...item,
              name_institution: `${item.name_institution}`.trim().toUpperCase(),
            }))
            .sort((a: any, b: any) => {
              if (a.name_institution < b.name_institution) {
                return -1;
              }
              if (a.name_institution > b.name_institution) {
                return 1;
              }
              return 0;
            })
        );
      }),
      // tap((res: any) => console.log('getSchoolRecord', res)),
      catchError((err) => {
        console.log('Error al obtener listado de escuelas', err);
        return of([]);
      })
    );
  }

  onSubmit() {
    this.submit = true;
    if (this.form.invalid) {
      console.log('invalid', this.form);
      this.form.markAllAsTouched();
      return;
    }

    this.closeModal({ status: true, data: this.form.value });

    // this.form.reset();
  }

  ngOnDestroy(): void {
    this.sub$.unsubscribe();
  }
}
