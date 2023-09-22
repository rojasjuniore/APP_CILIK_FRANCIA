import { Injectable } from '@angular/core';
import { environment } from 'src/environments/environment';

@Injectable({
  providedIn: 'root'
})
export class TucompraService {

  public tuCompraObjetProperties = {
    usuario: {
      type: 'string',
      required: true,
      public: false,
      group: 'system'
    },
    factura: {
      type: 'number',
      required: true,
      public: false,
      group: 'system'
    },
    valor: {
      type: 'number',
      required: true,
      public: false,
      group: 'system'
    },
    descripcionFactura: {
      type: 'string',
      required: true,
      public: false,
      group: 'system'
    },
    documentoComprador: {
      type: 'string',
      required: true,
      public: true,
      group: 'user'
    },
    tipoDocumento: {
      type: 'string',
      required: true,
      public: true,
      group: 'user'
    },
    nombreComprador: {
      type: 'string',
      required: true,
      public: true,
      group: 'user'
    },
    apellidoComprador: {
      type: 'string',
      required: true,
      public: true,
      group: 'user'
    },
    correoComprador: {
      type: 'string',
      required: true,
      public: true,
      group: 'user'
    },
    celularComprador: {
      type: 'string',
      required: true,
      public: true,
      group: 'user'
    },
    direccionComprador: {
      type: 'string',
      required: true,
      public: true,
      group: 'user'
    },
    tipoMoneda: {
      type: 'string',
      required: false,
      public: true,
      group: 'system'
    },
    lenguaje: {
      type: 'string',
      required: false,
      public: true,
      group: 'system'
    },
    recurrencia: {
      type: 'number',
      required: false,
      public: true,
      group: 'system'
    },
    periodo: {
      type: 'number',
      required: false,
      public: true,
      group: 'system'
    },
    cantidadCobros: {
      type: 'number',
      required: false,
      public: true,
      group: 'system'
    },
    metodoPago: {
      type: 'number',
      required: false,
      public: true,
      group: 'system'
    },
    valorBase: {
      type: 'number',
      required: false,
      public: true,
      group: 'system'
    },
    valorIva: {
      type: 'number',
      required: false,
      public: true,
      group: 'system'
    },
    tokenTarjeta: {
      type: 'string',
      required: false,
      public: true,
      group: 'system'
    },
    tokenSeguridad: {
      type: 'string',
      required: false,
      public: true,
      group: 'system'
    },
    md5ValidacionValor: {
      type: 'string',
      required: false,
      public: true,
      group: 'system'
    },
    checksum: {
      type: 'string',
      required: false,
      public: true,
      group: 'system'
    },
    telefonoComprador: {
      type: 'string',
      required: false,
      public: true,
      group: 'user'
    },
    ciudadComprador: {
      type: 'string',
      required: false,
      public: true,
      group: 'user'
    },
    paisComprador: {
      type: 'string',
      required: false,
      public: true,
      group: 'user'
    },
    twitterComprador: {
      type: 'string',
      required: false,
      public: true,
      group: 'user'
    },
    campoExtra1: {
      type: 'string',
      required: false,
      public: true,
      group: 'user'
    },
    campoExtra2: {
      type: 'string',
      required: false,
      public: true,
      group: 'user'
    },
    campoExtra3: {
      type: 'string',
      required: false,
      public: true,
      group: 'user'
    },
    campoExtra4: {
      type: 'string',
      required: false,
      public: true,
      group: 'user'
    },
    campoExtra5: {
      type: 'string',
      required: false,
      public: true,
      group: 'user'
    },
    campoExtra6: {
      type: 'string',
      required: false,
      public: true,
      group: 'user'
    }, 
    campoExtra7: {
      type: 'string',
      required: false,
      public: true,
      group: 'user'
    },
    campoExtra8: {
      type: 'string',
      required: false,
      public: true,
      group: 'user'
    },
    campoExtra9: {
      type: 'string',
      required: false,
      public: true,
      group: 'user'
    },
    descripcionCobroAdicional: {
      type: 'string',
      required: false,
      public: true,
      group: 'user'
    },
    valorAdicional: {
      type: 'number',
      required: false,
      public: true,
      group: 'user'
    }
  };

  constructor() { }

  buildDocument(params: any): TuCompraObject {
    return {
      usuario: environment.tuCompra.Idsistema,
      factura: params.factura || Date.now(), 
      valor: params.valor || 0,
      descripcionFactura: params.descripcionFactura || "Compra de boletas para el evento - WLDC Cartagena 2024",
      documentoComprador: params.documentoComprador || null,
      tipoDocumento: params.tipoDocumento  || null,
      nombreComprador: params.nombreComprador  || null,
      apellidoComprador: params.apellidoComprador || null,
      correoComprador: params.correoComprador  || null,
      celularComprador: params.celularComprador  || null,
      direccionComprador: params.direccionComprador  || null,
      tipoMoneda: params.tipoMoneda || 'USD',
      lenguaje: params.lenguaje || 'ES',
      recurrencia: params.recurrencia || null,
      periodo: params.periodo || null,
      cantidadCobros: params.cantidadCobros || 1,
      metodoPago: params.metodoPago || null,
      valorBase: params.valorBase || null,
      valorIva: params.valorIva || null,
      tokenTarjeta: params.tokenTarjeta || null,
      tokenSeguridad: params.tokenSeguridad || null,
      md5ValidacionValor: params.md5ValidacionValor || null,
      checksum: params.checksum || null,
      telefonoComprador: params.telefonoComprador || null,
      ciudadComprador: params.ciudadComprador || null,
      paisComprador: params.paisComprador || null,
      twitterComprador: params.twitterComprador || null,
      campoExtra1: params.campoExtra1 || null,
      campoExtra2: params.campoExtra2 || null,
      campoExtra3: params.campoExtra3 || null,
      campoExtra4: params.campoExtra4 || null,
      campoExtra5: params.campoExtra5 || null,
      campoExtra6: params.campoExtra6 || null,
      campoExtra7: params.campoExtra7 || null,
      campoExtra8: params.campoExtra8 || null,
      campoExtra9: params.campoExtra9 || null,
      descripcionCobroAdicional: params.descripcionCobroAdicional || null,
      valorAdicional: params.valorAdicional || null
    }
  }

  createHTMLInputTag(key: string, value: any): HTMLInputElement {
    const input = document.createElement('input');

    /** Buscar referencia en objeto */
    const ref = this.tuCompraObjetProperties[key];

    input.type = ref.type;
    input.name = key;
    input.value = value;

    return input;
  }

  launchForm(formData: any[], newTab: boolean = false){
    
    /** Construir inputs */
    const tuCompraInputs = Object.entries(formData).map(([k, v]) => this.createHTMLInputTag(k, v));
    console.log('tuCompraInputs', tuCompraInputs);

    /** Construir formulario */
    const tuCompraForm = document.createElement('form');
    tuCompraForm.action = environment.tuCompra.url;
    tuCompraForm.method = 'POST';
    tuCompraForm.id = 'tuCompraPresale';

    // open on new tab
    if(newTab) tuCompraForm.target = '_blank';

    /** Agregar inputs al formulario */
    for (const input of tuCompraInputs) {
      tuCompraForm.appendChild(input);
    }

    /** Agregar formulario al DOM */
    document.body.appendChild(tuCompraForm);

    /** Realizar Submit */
    tuCompraForm.submit();
    return;
  }
}

/**
 * https://tucompra.com.co/manuales/vpost/integracion/obligatorias
 * https://tucompra.com.co/manuales/vpost/integracion/opcionales
 * 
 */
export interface TuCompraObject {
  /** Campos obligatorios del sistema */
  usuario: string,
  factura: number,
  valor: number,
  descripcionFactura: string,

  /** Campos obligatorios del usuario */
  documentoComprador: string,
  tipoDocumento: string,
  nombreComprador: string,
  apellidoComprador: string,
  correoComprador: string,
  celularComprador: string,
  direccionComprador: string,

  /** Campos opcionales del sistema */
  tipoMoneda?: string,
  lenguaje?: string,
  recurrencia?: number,
  periodo?: number,
  cantidadCobros?: number,
  metodoPago?: number,
  valorBase?: number,
  valorIva?: number,
  tokenTarjeta?: string,
  tokenSeguridad?: string,
  md5ValidacionValor?: string,
  checksum?: string,

  /** Campos opcionales del usuario */
  telefonoComprador?: string,
  ciudadComprador?: string,
  paisComprador?: string,
  twitterComprador?: string,
  campoExtra1?: string,
  campoExtra2?: string,
  campoExtra3?: string,
  campoExtra4?: string,
  campoExtra5?: string,
  campoExtra6?: string,
  campoExtra7?: string,
  campoExtra8?: string,
  campoExtra9?: string,
  descripcionCobroAdicional?: string,
  valorAdicional?: number
}
