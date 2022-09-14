import { Injectable } from '@angular/core';
import { environment } from 'src/environments/environment';
import Swal from 'sweetalert2';
import { fromWei } from '../helpers/utils';

@Injectable({
  providedIn: 'root'
})
export class Sweetalert2stepsService {

  public title = 'Modal Title';

  constructor(
  ) { }


  /**
   * Ejecutar llamado al SC a través del servicio de contrato
   * @param method              Método a ejecutar
   * @param params              Parametros del método
   * @returns 
   */
  // async call(method: string, params: any[] | null) {
  //   return (!params)
  //     ? await this.contractSrv[method]()
  //     : await this.contractSrv[method](...params);
  // }


  /**
   * Mostrar alerta basica
   * @param message
   * @param type 
   * @returns 
   */
  async showBasicAlert(message: string, type: any = 'success') {
    return await Swal.fire(this.title, message, type);
  }


  /**
   * Mostrar alerta con hash de la transacción
   * @param opts 
   * @returns 
   */
  // async showAlertWithTxHash(opts: any) {
  //   const { transactionHash, icon = 'success' } = opts;

  //   return await Swal.fire({
  //     title: this.title,
  //     icon,
  //     html: "<a style='color: #e5e61d !important;' href='" + environment.chain.blockExplorerUrls + 'tx/' + transactionHash + "' target='_blank'>Ver Transacción</a>",
  //     confirmButtonText: 'OK',
  //     allowEscapeKey: false,
  //     allowOutsideClick: false,
  //   });
  // }


  /**
   * Seguir transacción con token externo
   * @param params
   * @param params.actionMessage
   * @param params.checkBalanceParams
   * @param params.checkBalanceParams.contract
   * @param params.checkBalanceParams.decimals
   * @param params.checkBalanceParams.amount
   * @param params.approvedParams
   * @param params.contractParams
   * @param params.contractParams.method
   * @param params.contractParams.params
   * @returns 
   */
  // async showStepsWithApproved(params: any) {
  //   const { actionMessage = 'Confirm', checkBalanceParams, approvedParams, contractParams } = params;
  //   const steps = ['1', '2', '3', '4'];

  //   /**
  //    * Construir modal base
  //    */
  //   const Queue = Swal.mixin({
  //     progressSteps: steps,
  //     confirmButtonText: 'Yes',
  //     showCancelButton: true,
  //     cancelButtonText: 'No',
  //     // optional classes to avoid backdrop blinking between steps
  //     showClass: { backdrop: 'swal2-noanimation' },
  //     hideClass: { backdrop: 'swal2-noanimation' }
  //   });


  //   /**
  //    * Confirmar peticion de ejecutar transacción
  //    */
  //   const { isConfirmed: ask } = await Queue.fire({
  //     title: this.title,
  //     text: actionMessage,
  //     currentProgressStep: 0,
  //   });

  //   // console.log({ask});

  //   if (!ask) {
  //     // console.log('transaction cancelled');
  //     return { step: 0, data: { message: 'transaction cancelled' }, status: false };
  //   }


  //   /**
  //    * Validar balance del usuario
  //    */
  //   const [account] = this.contractSrv.accounts;
  //   const { value: checkUserBalance } = await Queue.fire({
  //     title: this.title,
  //     text: 'Check user balance',
  //     currentProgressStep: 1,
  //     showCancelButton: false,
  //     allowOutsideClick: false,
  //     allowEscapeKey: false,
  //     showConfirmButton: false,
  //     didOpen: async () => {
  //       try {
  //         Queue.showLoading();
  //         Queue.enableInput();

  //         const balance = await this.contractSrv.calculateAndCallCustomABI({
  //           contractAddress: checkBalanceParams.contract,
  //           method: 'balanceOf',
  //           params: [account],
  //           callType: 'call',
  //           urlABI: this.contractSrv.erc20ABI
  //         })
  //         const parseBalance = balance;

  //         console.log({ userBalance: parseBalance, amount: checkBalanceParams.amount });

  //         if (checkBalanceParams.amount <= parseBalance) {
  //           return Queue.clickConfirm();
  //         }

  //         return Queue.clickCancel();

  //       } catch (err) {
  //         console.log('Error on Sweetalert2stepsService@showStepsWithApproved#checkUserBalance', { err });
  //         return Queue.clickCancel();
  //       }
  //     },
  //   });

  //   if (!checkUserBalance) {
  //     // console.log('fail user balance');
  //     return { step: 1, data: { message: 'fail user balance' }, status: false };
  //   }


  //   /**
  //    * Aprovar manipulación de fondos del usuario hacia el SC
  //    */
  //   const { value: approved } = await Queue.fire({
  //     title: this.title,
  //     text: 'Please confirm the approval',
  //     currentProgressStep: 2,
  //     allowOutsideClick: false,
  //     allowEscapeKey: false,
  //     showCancelButton: false,
  //     showConfirmButton: false,
  //     didOpen: async () => {
  //       Queue.showLoading();

  //       const approve = await this.call('approve', approvedParams);
  //       console.log({ approve });

  //       if (!approve) {
  //         return Queue.clickCancel();
  //       }

  //       return Queue.clickConfirm();
  //     },
  //   });

  //   if (!approved) {
  //     // console.log('approved cancelled');
  //     return { step: 2, data: { message: 'approved cancelled' }, status: false };
  //   }



  //   /**
  //    * Solicitar firma en la transacción
  //    */
  //   let transactionRecord: any;
  //   const { value: transactionStatus } = await Queue.fire({
  //     title: this.title,
  //     text: 'Please sign the transaction',
  //     currentProgressStep: 3,
  //     // backdrop: false,
  //     allowOutsideClick: false,
  //     allowEscapeKey: false,
  //     showCancelButton: false,
  //     showConfirmButton: false,
  //     didOpen: async () => {
  //       try {
  //         Queue.showLoading();
  //         Queue.enableInput();
  //         // Queue.clickConfirm();

  //         const transaction = await this.call(contractParams.method, contractParams.params);
  //         transactionRecord = transaction;

  //         console.log({ transaction });
  //         return Queue.clickConfirm();

  //       } catch (err) {
  //         console.log('Error on Sweetalert2stepsService@showStepsWithApproved#transaction', { err });
  //         return Queue.clickCancel();
  //       }
  //     },
  //   });
  //   // console.log({transactionRecord, transactionStatus});

  //   if (!transactionStatus) {
  //     // console.log('transaction canceled');
  //     return { step: 3, data: { message: 'transaction canceled' }, status: false };
  //   }


  //   /**
  //    * Retornar resultado de la transacción
  //    */
  //   return { step: 3, data: transactionRecord, status: true };
  // }


  /**
   * Seguir transacción con token nativo
   * @param params
   * @param params.actionMessage
   * @param params.checkBalanceParams
   * @param params.checkBalanceParams.amount
   * @param params.checkBalanceParams.token
   * @param params.checkBalanceParams.token.decimal
   * @param params.contractParams
   * @param params.contractParams.method
   * @param params.contractParams.params
   * @returns 
   */
  // async showStepsNative(params: any) {
  //   const { actionMessage = 'Confirm', checkBalanceParams, contractParams } = params;
  //   const steps = ['1', '2', '3'];

  //   const Queue = Swal.mixin({
  //     progressSteps: steps,
  //     confirmButtonText: 'Yes',
  //     showCancelButton: true,
  //     cancelButtonText: 'No',
  //     // optional classes to avoid backdrop blinking between steps
  //     showClass: { backdrop: 'swal2-noanimation' },
  //     hideClass: { backdrop: 'swal2-noanimation' }
  //   });


  //   /**
  //    * Confirmar peticion de ejecutar transacción
  //    */
  //   const { isConfirmed: ask } = await Queue.fire({
  //     title: this.title,
  //     html: actionMessage,
  //     currentProgressStep: 0,
  //   });

  //   // console.log({ask});

  //   if (!ask) {
  //     // console.log('transaction cancelled');
  //     return { step: 0, data: { message: 'transaction cancelled' }, status: false };
  //   }


  //   /**
  //    * Validar balance del usuario
  //    */
  //   const [account] = this.contractSrv.accounts;
  //   const { value: checkUserBalance } = await Queue.fire({
  //     title: this.title,
  //     text: 'Check user balance',
  //     currentProgressStep: 1,
  //     showCancelButton: false,
  //     allowOutsideClick: false,
  //     allowEscapeKey: false,
  //     showConfirmButton: false,
  //     didOpen: async () => {
  //       try {
  //         Queue.showLoading();
  //         Queue.enableInput();

  //         const balance: any = await this.contractSrv.getBalanceEth(account);
  //         // console.log('balance', balance);

  //         const amountParsed = fromWei(Number(checkBalanceParams.amount), environment.chain.nativeCurrency.decimals)
  //         // console.log({ userBalance: Number(balance), amount: Number(amountParsed) });

  //         if (amountParsed <= Number(balance)) {
  //           return Queue.clickConfirm();
  //         }

  //         return Queue.clickCancel();

  //       } catch (err) {
  //         console.log('Error on Sweetalert2stepsService@showStepsWithApproved#checkUserBalance', { err });
  //         return Queue.clickCancel();
  //       }
  //     },
  //   });

  //   if (!checkUserBalance) {
  //     // console.log('fail user balance');
  //     return { step: 1, data: { message: 'fail user balance' }, status: false };
  //   }


  //   /**
  //    * Solicitar firma en la transacción
  //    */
  //   let transactionRecord: any;
  //   const { value: transactionStatus } = await Queue.fire({
  //     title: this.title,
  //     text: 'Please sign the transaction',
  //     currentProgressStep: 2,
  //     // backdrop: false,
  //     allowOutsideClick: false,
  //     allowEscapeKey: false,
  //     showCancelButton: false,
  //     showConfirmButton: false,
  //     didOpen: async () => {
  //       try {
  //         Queue.showLoading();
  //         Queue.enableInput();
  //         // Queue.clickConfirm();

  //         const transaction = await this.call(contractParams.method, contractParams.params);
  //         transactionRecord = transaction;

  //         console.log({ transaction });
  //         return Queue.clickConfirm();

  //       } catch (err) {
  //         console.log('Error on Sweetalert2stepsService@showStepsNative#transaction', { err });
  //         return Queue.clickCancel();
  //       }
  //     },
  //   });
  //   // console.log({transactionRecord, transactionStatus});

  //   if (!transactionStatus) {
  //     // console.log('transaction canceled');
  //     return { step: 2, data: { message: 'transaction canceled' }, status: false };
  //   }


  //   /**
  //    * Retornar resultado de la transacción
  //    */
  //   return { step: 2, data: transactionRecord, status: true };
  // }


  // async showStepsGeneral(params: any) {
  //   const { askMessage, contractParams } = params;
  //   const steps = ['1', '2'];

  //   console.log({ contractParams });

  //   const Queue = Swal.mixin({
  //     progressSteps: steps,
  //     confirmButtonText: 'Yes',
  //     showCancelButton: true,
  //     cancelButtonText: 'No',
  //     // optional classes to avoid backdrop blinking between steps
  //     showClass: { backdrop: 'swal2-noanimation' },
  //     hideClass: { backdrop: 'swal2-noanimation' }
  //   });

  //   /**
  //    * Confirmar peticion de ejecutar transacción
  //    */
  //   const { isConfirmed: ask } = await Queue.fire({
  //     title: this.title,
  //     text: askMessage,
  //     currentProgressStep: 0,
  //   });

  //   // console.log({ask});

  //   if (!ask) {
  //     // console.log('transaction cancelled');
  //     return { step: 0, data: { message: 'transaction cancelled' }, status: false };
  //   }

  //   /**
  //    * Solicitar firma en la transacción
  //    */
  //   let transactionRecord: any;
  //   const { value: transactionStatus } = await Queue.fire({
  //     title: this.title,
  //     text: 'Please sign the transaction',
  //     currentProgressStep: 1,
  //     // backdrop: false,
  //     allowOutsideClick: false,
  //     allowEscapeKey: false,
  //     showCancelButton: false,
  //     showConfirmButton: false,
  //     didOpen: async () => {
  //       try {
  //         Queue.showLoading();
  //         Queue.enableInput();
  //         // Queue.clickConfirm();

  //         const transaction = await this.call(contractParams.method, contractParams.params);
  //         transactionRecord = transaction;

  //         console.log({ transaction });
  //         return Queue.clickConfirm();

  //       } catch (err) {
  //         console.log('Error on Sweetalert2stepsService@showStepsGeneral#transaction', { err });
  //         return Queue.clickCancel();
  //       }
  //     },
  //   });
  //   // console.log({transactionRecord, transactionStatus});

  //   if (!transactionStatus) {
  //     // console.log('transaction canceled');
  //     return { step: 1, data: { message: 'transaction canceled' }, status: false };
  //   }

  //   /**
  //    * Retornar resultado de la transacción
  //    */
  //   return { step: 1, data: transactionRecord, status: true };

  // }
}
