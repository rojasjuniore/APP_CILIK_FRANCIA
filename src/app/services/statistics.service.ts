import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { environment } from 'src/environments/environment';
import { saveAs } from "file-saver";

@Injectable({
  providedIn: 'root'
})
export class StatisticsService {

  constructor(
    private http: HttpClient
  ) { }

  /**
   * Obtener informacion de la division
   * @param key_db      Identificador del Evento
   * @param pdf         Si es true, se genera un JSON
   * @returns 
   */
  async getDivisionInfo(key_db: string, pdf = false) {
    if (!key_db) throw new Error('No se ha proporcionado el identificador del evento');

    return new Promise((resolve, reject) => {
      try {
        const url = `${environment.urlrootFunctions}/v3/reports/division`;
        this.http.post(url, { key_db, pdf })
          .subscribe((res: any) => {
            return resolve(res.results);
          }, (err) => reject(err))
      } catch (err) {
        console.log('Error on ReportsV3Service.getDivisionInfo', err);
        return reject(err)
      }
    });
  }

  async getEventUserByFilter(key_db: string, filter: string, query: string) {
    if (!key_db) throw new Error('No se ha proporcionado el identificador del evento');

    return new Promise((resolve, reject) => {
      try {
        const url = `${environment.urlrootFunctions}/v3/reports/find-competitor`;
        this.http.post(url, { key_db, filter, query })
          .subscribe((res: any) => {
            return resolve(res.results);
          }, (err) => reject(err))
      } catch (err) {
        console.log('Error on ReportsV3Service.getDivisionInfo', err);
        return reject(err)
      }
    });
  }

  async getPlanBPDFReport(key_db: string) {
    if (!key_db) throw new Error('No se ha proporcionado el identificador del evento');
    return new Promise((resolve, reject) => {
      try {
        const url = `${environment.urlrootFunctions}/v3/reports/plan-b`;
        this.http.post(
          url,
          { key_db },
          {
            // responseType: 'arraybuffer'
            responseType: "blob",
          }
        )
          .subscribe((res: any) => {
            return resolve(res);
          }, (err) => reject(err))
      } catch (err) {
        console.log('Error on ReportsV3Service.getDivisionInfo', err);
        return reject(err)
      }
    });
  }

  async getEventCartegoryReport(key_db: string) {
    if (!key_db) {
      // throw new Error('No se ha proporcionado el identificador del evento');
      console.log('No se ha proporcionado el identificador del evento');
      return { ok: false, data: null };
    }

    try {
      const url = `${environment.urlrootFunctions}/v3/reports/all-participants`;
      // console.log('url', url);
      const snapshot = await this.http.post(url, { key_db }).toPromise();
      // console.log('snapshot', snapshot);
      return snapshot;

    } catch (err) {
      console.log('Error on ReportsV3Service.getEventCartegoryReport', err);
      return { ok: false, data: null };
    }
  }

  async getEventCartegoryReportFMSCali2023(key_db: string) {
    if (!key_db) {
      // throw new Error('No se ha proporcionado el identificador del evento');
      console.log('No se ha proporcionado el identificador del evento');
      return { ok: false, data: null };
    }

    try {
      const url = `${environment.urlrootFunctions}/2023/fms-cali/reports/all-participants`;
      // console.log('url', url);
      const snapshot = await this.http.post(url, { key_db }).toPromise();
      // console.log('snapshot', snapshot);
      return snapshot;

    } catch (err) {
      console.log('Error on ReportsV3Service.getEventCartegoryReportFMSCali2023', err);
      return { ok: false, data: null };
    }
  }

  async getEventFullpassReport(key_db: string) {
    if (!key_db) {
      // throw new Error('No se ha proporcionado el identificador del evento');
      console.log('No se ha proporcionado el identificador del evento');
      return { ok: false, data: null };
    }

    try {
      const url = `${environment.urlrootFunctions}/v3/reports/all-fullpass-participants`;
      // console.log('url', url);
      const snapshot = await this.http.post(url, { key_db }).toPromise();
      // console.log('snapshot', snapshot);
      return snapshot;

    } catch (err) {
      console.log('Error on ReportsV3Service.getEventFullpassReport', err);
      return { ok: false, data: null };
    }
  }

  /**
   * Descargar archivo
   * @param param0 
   * @returns 
   */
  getDownload({ response, fileName, MIME_types, ext }) {
    let blob: any = new Blob([response], {
      type: MIME_types,
    });
    return saveAs.saveAs(blob, `${fileName}.${ext}`);
  }

  /**
   * Abrir en nueva pestaña
   * @param param0 
   */
  openObjectNewTab({ response, MIME_types }) {
    const blob: any = new Blob([response], {
      type: MIME_types,
    });
    const url = window.URL.createObjectURL(blob);
    window.open(url);
  }
}
