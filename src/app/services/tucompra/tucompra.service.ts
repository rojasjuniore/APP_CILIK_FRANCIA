import { Injectable } from '@angular/core';

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
      usuario: params.usuario,
      factura: params.factura || Date.now(), 
      valor: params.valor,
      descripcionFactura: params.descripcionFactura || "Compra de boletas para el evento - WLDC Cartagena 2024",
      documentoComprador: params.documentoComprador,
      tipoDocumento: params.tipoDocumento,
      nombreComprador: params.nombreComprador,
      apellidoComprador: params.apellidoComprador,
      correoComprador: params.correoComprador,
      celularComprador: params.celularComprador,
      direccionComprador: params.direccionComprador,
      tipoMoneda: params.tipoMoneda || 'USD',
      lenguaje: params.lenguaje || 'ES',
      recurrencia: params.recurrencia || null,
      periodo: params.periodo || null,
      cantidadCobros: params.cantidadCobros || 1,
      metodoPago: params.metodoPago || null,
      valorBase: params.valorBase || 0,
      valorIva: params.valorIva || 0,
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
      valorAdicional: params.valorAdicional || null,
    }
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
