import { Component, OnInit } from '@angular/core';
import { NgxSpinnerService } from 'ngx-spinner';
import { ExcelService } from 'src/app/services/excel.service';
import { StatisticsService } from 'src/app/services/statistics.service';
import { Sweetalert2Service } from 'src/app/services/sweetalert2.service';
import { environment } from 'src/environments/environment';

@Component({
  selector: 'app-statistics',
  templateUrl: './statistics.component.html',
  styleUrls: ['./statistics.component.css']
})
export class StatisticsComponent implements OnInit {

  constructor(
    private excelSrv: ExcelService,
    private sweetAlert2Srv: Sweetalert2Service,
    private spinner: NgxSpinnerService,
    private statisticsSrv: StatisticsService) { }

  ngOnInit(): void {
  }


  async downloadEventCategoriesExcelReport() {
    try {
      await this.spinner.show();
      // console.log("downloadExcelReport");

      const snapshot: any = await this.statisticsSrv.getEventCartegoryReport(environment.dataEvent.keyDb);
      const { ok, data } = snapshot;

      if (!ok) {
        this.sweetAlert2Srv.showError("Error al obtener la información");
        return;
      }

      const dataParsed = data.data.map((item: any) => {
        const { participants = [] } = item;

        return participants.map((participant: any) => ({
          record_id: participant.record_id,
          name: participant.name,
          surnames: participant.surnames,
          prefijo: participant.prefijo,
          phone: participant.phone,
          email: participant.email,
          gender: participant.gender,
          birthdate: participant.birthdate,
          nameGroup: participant.nameGroup,
          country: participant.country,
          school: participant.school,
          city: participant.city,
          id_sub_categoria: item.id_sub_categoria,
          id_categoria: item.id_categoria,
          id_tipo_sub_categoria: item.id_tipo_sub_categoria,
          socialSecurity: participant.socialSecurity,
          otherSocialSecurity: participant.otherSocialSecurity,
          participantLocationType: participant.participantLocationType,
          comunas: participant.comunas,
          tac: participant.tac,
          isYounger: participant.isYounger,
          event_id: data.key_db,
          accredited: participant.accredited,
          identificationNumber: participant.identificationNumber,
          uid: participant.uid,


        }));
      })
        .flat()
        .map((item: any, index: number) => ({ idx: index + 1, ...item }))

      this.excelSrv.exportAsExcelFile(dataParsed, `${data.key_db}_reporte_categories_full`);
      return;

    } catch (err) {
      console.log("Error on InforinformationComponent -> downloadExcelReport", err);
      this.sweetAlert2Srv.showError("Error al obtener la información");
      return;
    } finally {
      this.spinner.hide();
    }
  }
}
