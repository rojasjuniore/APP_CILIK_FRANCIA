import { Component, OnInit, QueryList, ViewChildren, TemplateRef, ViewChild } from '@angular/core';
import { PreSaleService } from 'src/app/services/pre-sale.service';
import { Sweetalert2stepsService } from 'src/app/services/sweetalert2steps.service';
import { FormBuilder, FormGroup, Validators, FormControl, FormArray, } from '@angular/forms';
import { BsModalRef, BsModalService } from 'ngx-bootstrap/modal';
import { PreSaleModalNroParticipantsComponent } from '../pre-sale-modal-nro-participants/pre-sale-modal-nro-participants.component';

@Component({
  selector: 'app-pre-sale-assign-rooms',
  templateUrl: './pre-sale-assign-rooms.component.html',
  styleUrls: ['./pre-sale-assign-rooms.component.css']
})
export class PreSaleAssignRoomsComponent implements OnInit {

  @ViewChildren('inputQuantity') inputQuantity!: QueryList<HTMLInputElement>;
  @ViewChild(PreSaleModalNroParticipantsComponent) modalNroParticipants!: PreSaleModalNroParticipantsComponent;

  public package: any;
  public summary: any;
  public form!: FormGroup;
  public usuario: any;
  public nroHabitaciones: any;
  public nroMax:any;
  public cont1:any;
  public cont2:any;
  public cont3:any;
  public indice:any;
  public camas:any;
  /* variables input habitaciones */
  public habitacion1:number=0;
  public habitacion2:number=0;
  public habitacion3:number=0;
  /* variable bandera para controlar que tipo de cama pertenece en el modal */ 
  public bandHabitacion1:boolean=false;
  public bandHabitacion2:boolean=false;
  public bandHabitacion3:boolean=false;
  public bandDefault:boolean=false;
  public miarray: any[]=[];

  /* local storage */ 
  public packag;
  public local;

   /* contorlar input habitacion cuando legan numero maximo persnas */ 
   public bandMax:boolean=false;


  /* variable bandera para registrar habitaciones por numero personas */
  public bandRegistro:number=0;

  /* arbol */

  public packageHabitaciones = {
    una_persona :{
      habitaciones:0,
      camas:[]
    },
    dos_personas:{
      habitaciones:0,
      camas:[]
    },
    tres_personas:{
      habitaciones:0,
      camas:[]
    }
  };

  public heroes!: string[];

  public form2!: FormGroup;
  modalRef?: BsModalRef;
  constructor(
    public preSaleSrv: PreSaleService,
    private stepAlertSrv: Sweetalert2stepsService,
    private modalService: BsModalService,
    private fb: FormBuilder
  ) {
    this.form = this.fb.group({
      checkArray: this.fb.array([], [Validators.required]),
    });
   }

  onCheckboxChange(e: any) {
    const camas: FormArray = this.form.get('checkArray') as FormArray;
    if (e.target.checked) {
      camas.push(new FormControl(e.target.value));
    } else {
      let i: number = 0;
      camas.controls.forEach((item: any) => {
        if (item.value == e.target.value) {
          camas.removeAt(i);
          return;
        }
        i++;
      });
    }
  }

  /** Seleccionar paquete */
  async selectPackage(item: any) { 
    /*this.package = Object.assign({
      nroGuests: 0,
      extras: {
        nro: 0,
        items: [],
        summary: [],
        total: 0,
      }
    }, item); */

    // this.step = 2;
    this.modalNroParticipants.showModal(this.package);
  }

  submitForm() {

    if(this.bandRegistro==1){console.log(this.form.value.checkArray)

      /*let aux = this.form.value.checkArray.filter(element => element == "cama sencilla").length;
      let aux2 = this.form.value.checkArray.filter(element => element == "cama matrimonial").length;
      this.heroes.push(`(${aux}) cama sencilla`)
      this.heroes.push(`(${aux2}) cama matrimonial`)*/
      this.packag.una_persona.camas=this.form.value.checkArray;
      this.packag.una_persona.habitaciones=this.habitacion1;
    }else if(this.bandRegistro==2){
      this.packag.dos_personas.camas=this.form.value.checkArray;
      this.packag.dos_personas.habitaciones=this.habitacion2;
    }else if(this.bandRegistro==3){
      this.packag.tres_personas.camas=this.form.value.checkArray;
      this.packag.tres_personas.habitaciones=this.habitacion3;
    }
    this.bandRegistro=0;
    this.form.value.checkArray=[];
    console.log(this.packag)
    localStorage.setItem('package', JSON.stringify(this.packag));
    this.modalRef?.hide();
  }

  modelChangeFn(value) {
    this.habitacion2=value;

    /*if(abc.target.name=='habitacion_una_persona') {

    }else if(){

    }*/
  }

  counter(i: number) {
    return new Array(i);
  }



  Habitacion1(event) {
    this.habitacion1=event;
    this.packag.habitacion1=event;

    if((this.habitacion1+this.habitacion2+this.habitacion3)>this.packag.numero_personas) {
      this.habitacion1=0;
      this.packag.habitacion1=0;
    }
    localStorage.setItem('package', JSON.stringify(this.packag));

    /*if(index==0 && this.habitacion1 != 0) {
      return false;
    }else if(index==1 && this.habitacion2 != 0){
      return false;
    }else if(index==2 && this.habitacion3 != 0){
      return false;
    }else {
      return true;
    }*/
  }

  Habitacion3(event) {
    this.habitacion3=event;
    this.packag.habitacion3=event;
    if((this.habitacion1+this.habitacion2+this.habitacion3)>this.packag.numero_personas) {
      this.habitacion3=0;
      this.packag.habitacion3=0;
    }
    
    localStorage.setItem('package', JSON.stringify(this.packag));
    /*if(index==0 && this.habitacion1 != 0) {
      return false;
    }else if(index==1 && this.habitacion2 != 0){
      return false;
    }else if(index==2 && this.habitacion3 != 0){
      return false;
    }else {
      return true;
    }*/
  }

  Habitacion2(event) {
    console.log(event)
    this.habitacion2=event;
    this.packag.habitacion2=event;

    if((this.habitacion1+this.habitacion2+this.habitacion3)>this.packag.numero_personas) {
      this.habitacion2=0;
      this.packag.habitacion2=0;
    }
    console.log(this.habitacion2)
    console.log(this.packag)
    localStorage.setItem('package', JSON.stringify(this.packag));
    /*if(index==0 && this.habitacion1 != 0) {
      return false;
    }else if(index==1 && this.habitacion2 != 0){
      return false;
    }else if(index==2 && this.habitacion3 != 0){
      return false;
    }else {
      return true;
    }*/
  }

  cerrarModal(){
    this.modalRef?.hide();
    this.bandHabitacion1=false;
    this.bandHabitacion2=false;
    this.bandHabitacion3=false;
    this.bandDefault=false;
  }

  openModal(template: TemplateRef<any>, index: number) {
    this.bandHabitacion1=false;
    this.bandHabitacion2=false;
    this.bandHabitacion3=false;
    this.bandDefault=false;


    this.modalRef = this.modalService.show(template);
    this.bandRegistro=index+1;
    if(index==0 && this.habitacion1>0){
      console.log(index)
      console.log(`habitacion: ${this.habitacion1}`)
      this.miarray=this.counter(this.habitacion1);
      this.bandHabitacion1=true;
    }else if(index==1 && this.habitacion2>0){
      console.log(index)
      console.log(`habitacion: ${this.habitacion1}`)
      this.miarray=this.counter(this.habitacion2);
      this.bandHabitacion2=true;

    }else if(index==2 && this.habitacion3>0){
      console.log(index)
      console.log(`habitacion: ${this.habitacion1}`)
      this.miarray=this.counter(this.habitacion3);
      this.bandHabitacion3=true;
    }else {
      this.bandDefault=true;
    }
    /*let numero = this.nroHabitaciones.filter(element => element.quantity = index+1);
    this.indice=index+1;
    if(index==0){
      this.nroMax=numero.length;
    }else if (index==1){
      this.nroMax=numero.length*2;
    }else if(index==2){
      this.nroMax=numero.length*3;
    }
    console.log(this.nroMax)
    this.cont1=0;
    this.cont2=0;
    this.cont3=0;*/
  }

  aceptarCamas(){
    if(this.indice==1){
      //this.band1=false;
      this.camas.una_persona={individual:this.cont1,duplex:this.cont2,matrimonial:this.cont3};
    }else if(this.indice==2){
      //this.band2=false;
      this.camas.dos_personas={individual:this.cont1,duplex:this.cont2,matrimonial:this.cont3};
    }else if(this.indice==3){
      //this.band3=false;
      this.camas.tres_personas={individual:this.cont1,duplex:this.cont2,matrimonial:this.cont3};
    }
    console.log(this.camas)
    this.modalRef?.hide();
  }

  camaIndividual(type:any){
   let contotal= this.cont1+this.cont2+this.cont3;
    if(type){
      if(contotal<this.nroMax) {
        this.cont1++;
      }
    }else{
      this.cont1--;
    }
  }

 camaDuplex(type:any){
  let contotal= this.cont1+this.cont2+this.cont3;
    if(type){
      if(contotal<this.nroMax) {
        this.cont2++;
      }
    }else{
      this.cont2--;
    }

 }

 camaMatrimonial(type:any){
  let contotal= this.cont1+this.cont2+this.cont3;
    if(type){
      if(contotal<this.nroMax) {
        this.cont3++;
      }
    }else{ 
      this.cont3--;
    }
  
 }

  ngOnInit(): void {
    const packageDoc = window.localStorage.getItem('preSaleDoc');
    this.package = JSON.parse(packageDoc || '{}');
    this.summary = this.package.summary;
    this.usuario=localStorage.getItem('usuario')
    this.local = localStorage.getItem('package');
    this.packag = JSON.parse(this.local)
    console.log(this.packag)
    if(this.usuario == 1){
      this.package.options=this.package.options.filter((item) => item.quantity == 1);
    }
    /*this.band1=true;
    this.band2=true;
    this.band3=true;*/
    this.camas={una_persona:{individual:0,duplex:0,matrimonial:0},dos_personas:{individual:0,duplex:0,matrimonial:0},tres_personas:{individual:0,duplex:0,matrimonial:0}}
  }


  /**
   * Administrar contadores de habitaciones
   * @param element 
   * @param type 
   * @returns 
   */
   async handlerQuantityCounter(element, type = 1){

    const id = element.getAttribute('data-id');
    const quantity = element.getAttribute('data-quantity');
    const roomType = element.getAttribute('data-roomType');
    const currentValue = element.getAttribute('value');

    const currentCoupons = this.summary.members || 0;

    /** Validar máximo de cupos disponibles */
    if(type == 1
      && (currentCoupons + parseInt(quantity)) > this.package.nroGuests 
    ){
      await this.stepAlertSrv.showBasicAlert('Ha alcanzado el máximo de cupos disponibles', 'error');
      // this.message$.next('No hay cupos disponibles para este paquete');
      return;
    }




    /** Opciones de habitaciones seleccionadas */
    const packageRooms: any[] = this.summary.rooms || [];
    
    /** Opciones de habitaciones disponibles en el paquete */
    const roomsOpts = this.package.options;

    /** Opcion de habitación seleccionada */
    const roomOpt = roomsOpts[id];

    console.log({packageRooms, roomsOpts, roomOpt});

    let newValue = 0;

    /** Si el valor ya es cero */
    if(type === 0 && currentValue == '0'){ return; }

    switch (type) {
      case 1:
        newValue = parseInt(currentValue, 10) + 1;
        this.summary.members = currentCoupons + Number(quantity);
        packageRooms.push( roomOpt );
        break;

      default:
        let toPrase = parseInt(currentValue, 10) - 1;
        newValue = (toPrase >= 0) ? toPrase : 0;

        const find = packageRooms.findIndex(item => item.roomType === roomType);
        packageRooms.splice(find, 1);

        this.summary.members = currentCoupons - Number(quantity);
        break;
    }

    this.summary.nrRooms = packageRooms.length;
    this.summary.rooms = packageRooms;
    console.log(currentValue)
    this.nroHabitaciones = packageRooms;
    element.setAttribute('value', newValue.toString());
  }


  /**
   * Construir documento de orden de compra
   */
  buildOrderDoc(){
    console.log('package', this.package);
    const packageRooms = this.summary.rooms;


    /** Arreglo de habitaciones general */
    const roomsSummary: any[] = [];
    

    for (const room of packageRooms) {

      /** Buscar si ya se proceso un registor igual */
      const find = roomsSummary.findIndex((row: any) => row.roomType == room.roomType);

      if(find !== -1){
        const { quantity, price } = roomsSummary[find];
        const upQuantity = quantity + 1;

        roomsSummary[find].quantity = upQuantity
        roomsSummary[find].total = price * upQuantity;

      }else{
        roomsSummary.push({
          roomType: room.roomType,
          label: room.label,
          quantity: 1,
          price: room.price,
          total: room.price,
        });
      }
    
    }

    const subTotal = roomsSummary.reduce((a, b) => (Number(a.total) || 0)+ Number(b.total), 0);
    const tax = subTotal * 0.16;
    const discount = (this.package.discount > 0) 
      ? subTotal * (this.package.discount / 100)
      : 0;
    const total = (subTotal + tax) - discount;

    const data = {
        roomsSummary,
        subTotal,
        tax,
        discount,
        total,
    };

    // console.log('data', data);
    // console.log('summary', this.summary);

    this.summary = Object.assign({}, this.summary, data);
    return;
  }


  nextStep(){
    this.buildOrderDoc();

    this.package = Object.assign({}, this.package, { summary: this.summary});
    // console.log('package', this.package);

    window.localStorage.setItem('preSaleDoc', JSON.stringify(this.package));
    window.location.href = '/pre-sale/camas';
    //this.preSaleSrv.nextStep('camas');
  }

  async onSetNroParticipants(nro: any) {
    console.log('onSetNroParticipants', nro);
    localStorage.setItem('usuario',JSON.stringify(nro) );
    this.package.nroGuests = nro;

    window.localStorage.setItem('preSaleDoc', JSON.stringify(this.package));
    this.preSaleSrv.nextStep('step3')
  }

}
