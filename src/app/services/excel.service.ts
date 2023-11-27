import { Injectable } from '@angular/core';

import * as FileSaver from 'file-saver';
import * as XLSX from 'xlsx';
import * as moment from 'moment';

const EXCEL_TYPE = 'application/vnd.openxmlformats-officedocument.spreadsheetml.sheet;charset=UTF-8';
const EXCEL_EXTENSION = '.xlsx';

@Injectable({
  providedIn: 'root'
})
export class ExcelService {

  constructor() { }


  /**
   * Método para crear documento de exportación en excel con confiruación de pestaña
   * TODO: realizar ajustes para manejar método de forma dinamica, actualmente en BETA.
   *
   * @param json
   * @param excelFileName
   */
  public exportAsExcelFileCustom(json: any[], excelFileName: string): void {

    /* generate a worksheet */
    const ws = XLSX.utils.json_to_sheet(json);

    /* add to workbook */
    const wb = XLSX.utils.book_new();
    XLSX.utils.book_append_sheet(wb, ws, 'CustomSheetName');

    /* write workbook and force a download */
    XLSX.writeFile(wb, excelFileName + EXCEL_EXTENSION);
  }


  /**
   * Métoto para crear documentos de exportación en excel
   *
   * @param json                Datos a exportar
   * @param excelFileName       Nombre del archivo
   */
  public exportAsExcelFile(json: any[], excelFileName: string): void {

    /** Crear hoja de excel con los datos en formato JSON */
    const worksheet: XLSX.WorkSheet = XLSX.utils.json_to_sheet(json);

    console.log('worksheet',worksheet);

    /** Construir documento en excel */
    const workbook: XLSX.WorkBook = {
      Sheets: { 'data': worksheet },
      SheetNames: ['data'],
    };

    /** Convertir en archivo tipo buffer */
    const excelBuffer: any = XLSX.write(workbook, { bookType: 'xlsx', type: 'array' });

    /** Guardar archivo */
    this.saveAsExcelFile(excelBuffer, excelFileName);
  }


  /**
   * Método para guardar archivo de excel
   *
   * @param buffer
   * @param fileName
   */
  private saveAsExcelFile(buffer: any, fileName: string): void {
    const data: Blob = new Blob([buffer], {
      type: EXCEL_TYPE
    });
    FileSaver.saveAs(data, fileName + '_export_' + moment().valueOf() + EXCEL_EXTENSION);
  }
}
