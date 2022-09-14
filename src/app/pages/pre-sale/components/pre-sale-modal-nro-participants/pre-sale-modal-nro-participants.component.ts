import { Component, OnInit, Output } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Subject } from 'rxjs';
import { BsModalService } from 'src/app/services/bs-modal.service';
import { any, toArray } from 'underscore';
import { Router } from '@angular/router';

@Component({
  selector: 'app-pre-sale-modal-nro-participants',
  templateUrl: './pre-sale-modal-nro-participants.component.html',
  styleUrls: ['./pre-sale-modal-nro-participants.component.css']
})
export class PreSaleModalNroParticipantsComponent implements OnInit {

  @Output() onSetValue = new Subject();

  public mi: any;
  public package: any;
  public submit = false;
  public packag;
  public local;
  public form!: FormGroup;
  public vm = {
    nroParticipants: [
      { type: 'required', message: 'El número de participantes es requerido' },
      { type: 'pattern', message: 'El número de participantes debe ser un número' }
    ]
  };

  constructor(
    private bsModalSrv: BsModalService, 
    private router: Router,
    private fb: FormBuilder,
  ) {
    this.buildForm();
  }

  ngOnInit(): void {
    this.buildModal();
    this.local = localStorage.getItem('package');
    this.packag = JSON.parse(this.local)
  }

  async buildModal() {
    this.mi = this.bsModalSrv.buildModal('nro-participants');
  }

  buildForm() {
    this.form = this.fb.group({
      nroParticipants: ['', [Validators.required]]
    });
  }

  get f() { return this.form.controls; }

  async showModal(pack: any) {

    const rules = [Validators.required, Validators.pattern(/^\d+$/)];
    this.vm.nroParticipants = [
      { type: 'required', message: 'El número de participantes es requerido' },
      { type: 'pattern', message: 'El número de participantes debe ser un número' }
    ]

    rules.push(Validators.min(pack.minQuota));
    this.vm.nroParticipants.push({ type: 'min', message: `El número de participantes debe ser mayor o igual a ${pack.minQuota}` });

    /*if(pack.maxQuota > 0){
      rules.push( Validators.max(pack.maxQuota) );
      this.vm.nroParticipants.push({ type: 'max', message: `El número de participantes debe ser menor o igual a ${pack.maxQuota}` });
    }*/

    this.f.nroParticipants.setValidators(rules);
    this.form.patchValue({ nroParticipants: pack.minQuota });

    this.package = pack;
    this.mi.show();
  }

  handlerQuantityCounter(type = 1) {

    let currentValue = Number(this.f.nroParticipants.value) || 0;

    /** Si alcanzo el maximo */
    if (this.package.maxQuota > 0
      && type === 1
      && (currentValue + 1) > this.package.maxQuota
    ) {
      this.form.markAllAsTouched();
      this.submit = true;
      return;
    }

    switch (type) {
      case 1:
        this.form.patchValue({ nroParticipants: currentValue + 1 });
        this.packag.numero_personas = currentValue + 1;
        console.log(this.packag.numero_personas)
        localStorage.setItem('package', JSON.stringify(this.packag));
        return;

      default:
        const toParse = currentValue - 1;
        this.form.patchValue({ nroParticipants: (toParse > 0) ? toParse : 0 });
        this.packag.numero_personas = currentValue - 1;
        console.log(this.packag.numero_personas)
        localStorage.setItem('package', JSON.stringify(this.packag));
        break;
    }

  }

  async onSubmit() {
    console.log(Number(this.f.nroParticipants.value))
    if (Number(this.f.nroParticipants.value) >= 1) {
      this.packag.numero_personas = Number(this.f.nroParticipants.value);
      localStorage.setItem('package', JSON.stringify(this.packag));
    }
    this.submit = true;

    if (this.form.invalid) {
      this.form.markAllAsTouched();
      return;
    }

    const formData = this.form.value;
    console.log(this.router.url);
    if(this.router.url==='/pre-sale/step5') {
      this.mi.hide();
      window.location.href = '/pre-sale/step5';
    }else if(this.router.url==='/pre-sale/step1'){
      this.onSetValue.next(formData.nroParticipants);
      window.location.href = '/pre-sale/step2';
    }else if(this.router.url==='/pre-sale/step2'){
      this.onSetValue.next(formData.nroParticipants);
      window.location.href = '/pre-sale/step2';
    }else if(this.router.url==='/pre-sale/step3'){
      this.onSetValue.next(formData.nroParticipants);
      window.location.href = '/pre-sale/step3';
    }else if(this.router.url==='/pre-sale/camas'){
      this.onSetValue.next(formData.nroParticipants);
      window.location.href = '/pre-sale/camas';
    }else if(this.router.url==='/pre-sale/step4'){
      this.onSetValue.next(formData.nroParticipants);
      window.location.href = '/pre-sale/step4';
    }
    this.mi.hide();
  }


  close() {
    this.submit = false;
    this.form.reset();
    this.mi.hide();
  }

}
