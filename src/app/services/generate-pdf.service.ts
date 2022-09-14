import { Injectable } from '@angular/core';

import jsPDF from 'jspdf';
import html2canvas from 'html2canvas';

@Injectable({
  providedIn: 'root'
})
export class GeneratePdfService {

  constructor() { }



  public generatePdf(DATA: any): void {
    // let DATA: any = document.getElementById('htmlData');
    html2canvas(DATA, { scrollY: -window.scrollY, scale: 1 }).then((canvas) => {
      let fileWidth = 208;
      let fileHeight = (canvas.height * fileWidth) / canvas.width;
      const FILEURI = canvas.toDataURL('image/png');
      let PDF = new jsPDF('p', 'mm', 'a4');
      let position = 0;



      PDF.addImage(FILEURI, 'PNG', 0, position, fileWidth, fileHeight);


      PDF.save(`summary-${Date.now()}.pdf`);
    });
  }


  async downloadPdf(data: any, alldata: any) {
    // var data = document.getElementById("pdfDownload");
    // $("pdfOpenHide").attr("hidden", true);
    // To disable the scroll
    alldata.style.overflow = "inherit";
    alldata.style.maxHeight = "inherit";

    await html2canvas(data, { scrollY: -window.scrollY, scale: 1 }).then(
      canvas => {
        const contentDataURL = canvas.toDataURL("image/png", 1.0);
        // enabling the scroll
        alldata.style.overflow = "scroll";
        alldata.style.maxHeight = "3000px";

        let pdf = new jsPDF("l", "mm", "a4"); // A4 size page of PDF

        let imgWidth = 300;
        let pageHeight = pdf.internal.pageSize.height;
        let imgHeight = (canvas.height * imgWidth) / canvas.width;
        let heightLeft = imgHeight;
        let position = 0;

        pdf.addImage(contentDataURL, "PNG", 0, position, imgWidth, imgHeight);
        heightLeft -= pageHeight;

        while (heightLeft >= 0) {
          position = heightLeft - imgHeight;
          pdf.addPage();
          pdf.addImage(contentDataURL, "PNG", 0, position, imgWidth, imgHeight);
          heightLeft -= pageHeight;
        }
       
        // window.open(
        //   pdf.output("bloburl", { filename: "new-file.pdf" }),
        //   "_blank"
        // );


        pdf.save(`summary-${Date.now()}.pdf`);
      }
    );
  }


  // async downloadPdf(data: any) {
  //   // var data = document.getElementById('pdfDownload');
  //   // disable the scroll
  //   data.style.overflow = 'inherit';
  //   data.style.maxHeight = 'inherit';

  //   await html2canvas(data, {
  //     scrollY: -window.scrollY,
  //     scale: 1
  //   }).then(canvas => {
  //     // Few necessary setting options
  //     var imgWidth = 150;
  //     var imgHeight = canvas.height * imgWidth / canvas.width;
  //     const contentDataURL = canvas.toDataURL('image/png', 1.0)

  //     // enabling the scroll 
  //     data.style.overflow = 'scroll';
  //     data.style.maxHeight = '3000px';

  //     let pdf = new jsPDF('l', 'mm', 'a4'); // A4 size page of PDF
  //     var position = 0;
  //     // add tghis width height according to your requirement
  //     const divHeight = data.clientHeight
  //     const divWidth = data.clientWidth
  //     const ratio = divHeight / divWidth;

  //     const width = pdf.internal.pageSize.getWidth();
  //     let height = pdf.internal.pageSize.getHeight();
  //     height = ratio * width;
  //     pdf.addImage(contentDataURL, 'PNG', 0, position, width, height);

  //     pdf.save(`summary-${Date.now()}.pdf`);

  //     // window.open(pdf.output('bloburl', { filename: 'new-file.pdf' }), '_blank');
  //   });
  // }
}
