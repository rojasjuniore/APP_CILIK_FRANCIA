import { map } from 'rxjs/operators';
import { Component, Input, OnChanges, OnInit, SimpleChanges } from '@angular/core';
import { ProfilePipe } from 'src/app/pipes/profile.pipe';
import { ExcelService } from 'src/app/services/excel.service';
import { PurchaseService } from 'src/app/services/purchase.service';
import { UserService } from 'src/app/services/user/user.service';

@Component({
  selector: 'app-report-totales',
  templateUrl: './report-totales.component.html',
  styleUrls: ['./report-totales.component.css']
})
export class ReportTotalesComponent implements OnChanges {
  @Input() list: any[] = [];
  @Input() namefile = '';
  totals: any;
  totalForItemList: any;

  constructor(
    private userSrv: UserService,
    private excelSrv: ExcelService,
    private purchaseSrv: PurchaseService) { }


  ngOnChanges(changes: SimpleChanges): void {
    const { list, namefile } = changes;
    if (list && list.currentValue) {
      this.list = list.currentValue;
      console.log('ngOnChanges', this.list);
      // const data = this.list.map(item => {
      //   console.log('item', item.paymentMethod);
      //   console.log('item', item.payload.id);
      //   console.log('item', item.payload.intent);
      //   console.log('item', item.payload.status);
      //   return item
      // })
      this.namefile = namefile.currentValue;

      this.buildDashboard(this.list);
    }
  }



  /**
   * @dev buildDashboard
   * @param data 
   */
  buildDashboard(data) {
    console.log('buildDashboard', data);
    if (!data) return

    /// @dev obtiene los totales
    const mapData = data.map(item => {
      return {
        discount_with_coupon: item.discount_with_coupon,
        product: item.product
      }
    });
    this.totals = this.purchaseSrv.getTotal(mapData);


    /// @dev obtiene los totales por producto
    const mapDataProduct = data.map(item => {
      return item.product
    });
    this.totalForItemList = this.purchaseSrv.totalForItem(mapDataProduct);

    console.log('buildDashboard', this.totals, this.totalForItemList);

  }


  // async downloadExcel() {

  //   console.log('downloadExcel', this.list);

  //   const dataPromises = this.list.map(item =>
  //     Promise.all([
  //       this.userSrv.getName(item.uid),
  //       this.userSrv.getName(item.merchantIdentification),
  //       this.userSrv.getName(item.referred_by),
  //       this.userSrv.getProfileAfs(item.uid) as any,
  //     ]).then(([name, merchantIdentification, referred_by, profile]) => {

  //       const date = new Date(item.createdAt);
  //       return {
  //         uid: item.uid,
  //         createdAt: date.toUTCString(),
  //         name,
  //         products: item.product.map(x => {
  //           return x.slug
  //         }).join(','),

  //         email: profile.email,
  //         phone: `${profile.prefijo}${profile.phone}`,
  //         identification: profile.identification,
  //         _language: profile._language,
  //         paymentMethod: item.paymentMethod,
  //         total: item.totalResumen.globalTotalToPay,
  //         codeCoupon: item.codeCoupon || 'no aplica',
  //         referred_by,
  //         merchantIdentification,
  //       };
  //     }).catch(error => {
  //       // Manejo de errores aquí - decide cómo quieres manejar los errores.
  //       console.error('Error fetching data', error);
  //       return null; // O podrías retornar un objeto de error específico
  //     })
  //   );

  //   // Espera a que todas las promesas se resuelvan
  //   const resolvedData = await Promise.all(dataPromises);

  //   const final = resolvedData.filter(item => item !== null);

  //   console.log('resolvedData', final);

  //   //  this.excelSrv.exportAsExcelFile(final, `${this.namefile}-reporte`);
  // }

  async downloadExcel() {
    console.log('downloadExcel', this.list);

    const fetchData = async (item: any) => {
      try {
        const [name, merchantIdentification, referredBy, profile]: any = await Promise.all([
          this.userSrv.getName(item.uid),
          this.userSrv.getName(item.merchantIdentification),
          this.userSrv.getName(item.referred_by),
          this.userSrv.getProfileAfs(item.uid)
        ]);

        const date = new Date(item.createdAt);
        const products = item.product?.length
          ? item.product.map(x => x.slug || 'slug_not_found').join(',')
          : 'no_products';



        return {
          orderId: item.orderId,
          createdAt: date,
          createdAtString: date.toUTCString(),
          hasIntent: item.payload?.intent ? true : false,
          uid: item.uid,
          name,
          products,
          email: profile?.email,
          phone: profile?.prefijo ? `${profile.prefijo}${profile.phone}` : 'no_phone',
          identification: profile?.identification,
          _language: profile?._language,
          paymentMethod: item.paymentMethod,
          PaypalId: item.payload?.id || 'no_id',
          PaypalIntent: item.payload?.intent || 'no_intent',
          PaypalPayerEmail: item.payload?.intent === 'CAPTURE' ? item.payload.payer.email_address : 'Review',
          PaypalPayerId: item.payload?.purchase_units?.[0]?.payments?.captures?.[0]?.id || 'no_payer_id',
          PaypalStatus: item.payload?.status || 'no_status',
          PaypalDate: item.payload?.create_time || 'no_date',
          total: item.totalResumen?.globalTotalToPay,
          codeCoupon: item.codeCoupon || 'no aplica',
          referredBy,
          merchantIdentification,
        };
      } catch (error) {
        console.error(`Error fetching data for item ${item.uid}`, error);
        return null;
      }
    };

    const dataPromises = this.list.map(fetchData);
    const resolvedData = await Promise.all(dataPromises);

    // Filtrar items nulos y ordenar
    const finalData = resolvedData
      .filter(item => item !== null)
      .sort((a: any, b: any) => {
        // Primero ordenar por intent (los que tienen intent van primero)
        if (a.hasIntent !== b.hasIntent) {
          return b.hasIntent ? 1 : -1;
        }
        // Luego ordenar por fecha (del más viejo al más nuevo)
        return a.createdAt.getTime() - b.createdAt.getTime();
      })
      .map((item: any) => {
        // Eliminar campos auxiliares antes de exportar
        const { createdAt, hasIntent, ...exportItem } = item;
        return exportItem;
      });

    console.log('finalData ordenada:', finalData);
   this.excelSrv.exportAsExcelFile(finalData, `${this.namefile}-reporte`);
  }


}
