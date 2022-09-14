import { Injectable } from '@angular/core';
import { environment } from 'src/environments/environment';
import { BehaviorSubject, fromEventPattern, map, merge, Observable, scan, Subscription, takeUntil, tap } from 'rxjs';

import Web3 from 'web3';
import * as WalletConnectProvider from '@walletconnect/web3-provider'
import * as Web3Modal from "web3modal"
import Swal from 'sweetalert2/dist/sweetalert2.js';
import { AddTokenAMetamaskService } from '../add-metamask.service';
import { ReserveService } from './reserve.service';
import { ContractService } from '../contract.service';
import { OracleService } from '../oracle.service';
import { toWei } from 'src/app/helpers/utils';
import { AbiService } from '../abi.service';

@Injectable({
  providedIn: 'root'
})
export class CustomizedWalletConnectService {

  public _web3Modal: any
  public accounts!: any[];

  private web3js: any;
  private provider: any;


  private account$ = new BehaviorSubject<null | string>(null);

  private sub$!: Subscription;

  private mainABI = '/assets/abi/XpoCriptoPay.json';

  constructor(
    public metamaskSrv: AddTokenAMetamaskService,
    private reserveSrv: ReserveService,
    private contractSrv: ContractService,
    private oracleSrv: OracleService,
    private abiService: AbiService,
  ) {

    /** Construir modal web3 Al cargar servicio */
    this.buildWeb3Modal();
  }



  /**
   * Obtener configuración del provider
   * @returns 
   */
  getProviderConfig(){
    return {
      walletconnect: {
        package: WalletConnectProvider.default,
        chainId: environment.chain.chainId,
        options: {
          chainId: environment.chain.chainId,
          infuraId: environment.infuraId, // required,
          rpc: {
            [environment.chain.chainId]: environment.chain.rpc,
          },
        },
        display: {
          description: "Scan with a wallet to connect",
        },
      },
    };
  }


  /**
   * Construir modal web3
   */
  buildWeb3Modal(){
    this._web3Modal = new Web3Modal.default({
      network: "mainnet", // optional
      cacheProvider: true, // optional
      providerOptions: this.getProviderConfig(), // required
      theme: {
        background: "#6440e8",
        main: "#323232",
        secondary: "#ffffff",
        border: "rgba(195, 195, 195, 0.14)",
        hover: "rgb(16, 26, 32)"
      }
    });
  }


  /**
   * Establecer conexion con web3
   */
  async connectAccount(){
    try {
      const provider = await this._web3Modal.connect();
      console.log('provider', provider);
      this.provider = provider;

      this.web3js = new Web3(provider);
      // console.log('web3js', this.web3js);

      this.accounts = await this.web3js.eth.getAccounts();
      this.account$.next(this.accounts[0]);
      // console.log('accounts', this.accounts);

      /** Comprobar la red */
      this.checkNetwork();

      /** Escuchar eventos de la web3 */
      this.eventsAll();

    } catch (err) {
      console.log('Error on CustomizedWalletConnectService@connectAccount', err);
    }
  }


  async onlyCreateConnection(){
    try {
      const provider = await this._web3Modal.connect();
      console.log('provider', provider);
      this.provider = provider;

      this.web3js = new Web3(provider);
      // console.log('web3js', this.web3js);

      this.accounts = await this.web3js.eth.getAccounts();
      this.account$.next(this.accounts[0]);
      // console.log('accounts', this.accounts);
      return true;

    } catch (err: any) {
      console.log('Error on CustomizedWalletConnectService@connectAccount', err);
      throw err;
    }
  }


  /**
   * Reconectar y actualizar estado de la wallet
   */
  async reInitializating() {
    console.log('reInitializating');

    // /** spinner starts on init */

    // // --- temporarily re-initializating these for the effect file 
    // this.provider = await this._web3Modal.connect(); // set provider
    // this.web3js = new Web3(this.provider); // create web3 instance
    // this.accounts = await this.web3js.eth.getAccounts();

    // let token_abi: any = await this.abiService.getABI()

    // let token_address = environment.contractAddress;
    // // console.log("token_address", token_address)

    // this.uToken = new this.web3js.eth.Contract(token_abi, token_address);
    // // console.log("uToken", this.uToken.methods)

    // this.checkNetwork();

    // await this.getData()

    return;
  } 


  /**
   * Validar estado de la red
   */
  async checkNetwork() {
    // this.web3js.eth.net.getId().then(id => {
    //   // console.log("id", id)
    //   // console.log("environment.chain.chainId", environment.chain.chainId)
    //   if (id != environment.chain.chainId) {
    //     alert(`Please switch to the ${environment.chain.chainName}`);
    //     this.metamaskService.addEthereumChain()
    //   }
    // })

    const chainId = await this.web3js.eth.net.getId();
    if (chainId != environment.chain.chainId) {
      const modalChangeChain = await Swal.fire({
        title: 'XPOCRYPTO',
        icon: 'warning',
        text: `Please switch to ${environment.chain.chainName}`,
        allowOutsideClick: false,
        allowEnterKey: false,
        allowEscapeKey: false,
        showCancelButton: false,
        showConfirmButton: true,
        confirmButtonText: 'Change',
        showLoaderOnConfirm: true,
        preConfirm: async () => {
          try {
            const runChange = await this.metamaskSrv.changeChainIdOrAdd();
          } catch (err: any) {
            // console.log('modal error', err);
            Swal.showValidationMessage(`${err.message}`);
          }
        },
      });

      console.log({modalChangeChain});
    }
  }
  

  /**
   * @name eventsAll
   */
  eventsAll() {
    console.log('inside of eventsAll');

    // const onConnectEvent = fromEventPattern(
    //   (handler) => this.provider.on('accountsChanged', handler),
    //   (handler) => this.provider.on('disconnect', handler),
    // ).pipe(map((accounts) => ({ event: 'accountsChanged', accounts })));

    // onConnectEvent
    // .pipe(scan((prev, next) => Object.assign({}, prev, next), {}))
    // .subscribe((data) => {
    //   console.log('onConnectEvent', data);
    // })

    this.sub$ = merge(

      /** Evento al cambiar la cuenta conectada */
      fromEventPattern(
          (handler) => this.provider.on('accountsChanged', handler),
          (handler) => this.provider.on('disconnect', handler),
      ).pipe(map((accounts) => ({ event: 'accountsChanged', data: accounts }))),

      /** Evento al cambiar la red de conexión */
      fromEventPattern(
          (handler) => this.provider.on('chainChanged', handler),
          (handler) => this.provider.on('disconnect', handler),
      ).pipe(map((chainId) => ({ event: 'chainChanged', data: chainId }))),

      /** Evento al establecer conexión */
      fromEventPattern(
          (handler) => this.provider.on('connect', handler),
          (handler) => this.provider.on('disconnect', handler),
      ).pipe(map((chainId) => ({ event: 'connect', data: chainId }))),

      /** Evento al establecer conexión */
      fromEventPattern(
          (handler) => this.provider.on('disconnect', handler),
          (handler) => this.provider.on('disconnect', handler),
      ).pipe(map((error) => ({ event: 'disconnect', data: error }))),

    )
    .pipe(scan((prev, next) => Object.assign({}, prev, next), {}))
    .subscribe(async (data: any) => {
      console.log('data', data);

      if(data.event === 'disconnect'){
        return await this.logout(false);
      }
    })






    // // // Subscribe to accounts change
    // this.provider.on("accountsChanged", (accounts: string[]) => {
    //   console.warn("accountsChanged", accounts);
    //   // this.accountStatusSource.next(accounts);
    //   // window.location.reload()
    // });

    // // Subscribe to chainId change
    // this.provider.on("chainChanged", (chainId: number) => {
    //   console.log("chainChanged", chainId);
    //   // this.reInitializating()
    // });

    // // // Subscribe to provider connection
    // this.provider.on("connect", (info: { chainId: number }) => {
    //   console.log('wallet connected');
    //   // this.reInitializating()
    // });

    // // // Subscribe to provider disconnection
    // this.provider.on("disconnect", (error: { code: number; message: string }) => {
    //   console.log({error});
    //   console.log('wallet disconnected');
    //   // this.accountStatusSource.next([]);
    //   // this.dataStatusSource.next(null);
    //   // console.log("disconnect", error);
    //   // window.location.reload()
    // });
  }


  /**
   * @name logout
   * @param reload
   */
  async logout(reload = true) {

    /** Si se inicializo la subscripción */
    if (this.sub$) { this.sub$.unsubscribe(); }

    if(this._web3Modal){ await this._web3Modal.clearCachedProvider(); }
    
    if(this.provider) { this.provider = null; }

    localStorage.setItem('_data_accounts', "");
    localStorage.setItem('_data_contract', "");
    window.localStorage.clear();
    // this.accountStatusSource.next(null);
    // this.dataStatusSource.next(null);

    if(reload){ window.location.reload(); }
  }


  /**
   * Mostrar alerta con hash de la transacción
   * @param opts 
   * @returns 
   */
  async showAlertWithTxHash(opts: any) {
    const { transactionHash, icon = 'success' } = opts;

    return await Swal.fire({
      title: 'XPOCRYPTO',
      icon,
      html: "<a style='color: #e5e61d !important;' href='" + environment.chain.blockExplorerUrls + 'tx/' + transactionHash + "' target='_blank'>Ver Transacción</a>",
      confirmButtonText: 'OK',
      allowEscapeKey: false,
      allowOutsideClick: false,
    });
  }


  /**
   * Mostrar alerta basica
   * @param message
   * @param type 
   * @returns 
   */
  async showBasicAlert(message: string, type: any = 'success') {
    return await Swal.fire('XPOCRYPTO', message, type);
  }


  async payWithWEB3(params: any = {}) {
    const {
      amountInCurrency,
    } = params;
    const steps = ['1', '2', '3', '4', '5', '6'];

    /**
     * Construir modal base
     */
    const Queue = Swal.mixin({
      progressSteps: steps,
      confirmButtonText: 'Yes',
      showCancelButton: true,
      cancelButtonText: 'No',
      allowEnterKey: false,
      allowEscapeKey: false,
      allowOutsideClick: false,
      // optional classes to avoid backdrop blinking between steps
      showClass: { backdrop: 'swal2-noanimation' },
      hideClass: { backdrop: 'swal2-noanimation' }
    });



    /**
     * Confirmar peticion de ejecutar transacción
     */
    const { isConfirmed: ask } = await Queue.fire({
      title: 'XPOCRYPTO',
      text: 'Pay with WEB3?',
      progressSteps: ['1/7'],
      currentProgressStep: 0,
    });

    // console.log({ask});

    if (!ask) {
      // console.log('transaction cancelled');
      return { step: 1, data: { message: 'transaction cancelled' }, status: false };
    }


    /**
     * Conectar Wallet de usuario en la WEB3
     */
    const { isConfirmed: isConnected } = await Queue.fire({
      title: 'XPOCRYPTO',
      text: 'Connect with your wallet of BSC Network',
      progressSteps: ['2/7'],
      currentProgressStep: 0,
      showCancelButton: true,
      showConfirmButton: true,
      confirmButtonText: 'Connect',
      cancelButtonText: 'Cancel',
      showLoaderOnConfirm: true,
      customClass:{
        container: 'fix-alert-steps',
      },
      preConfirm: async() => {
        try {
          await this.onlyCreateConnection();

        } catch (err: any) {
          console.log('Error on CuztomizedWalletConnect@payWithWEB3.isConnected -- ', err);

          const message = (!err) 
            ? 'Please, select one of the following methods to connect with your wallet'
            : err;

          Swal.showValidationMessage(`${message}`);
        }
      }
    });

    console.log('isConnected', isConnected);
    if (!isConnected) {
      await this.logout(false);
      return { step: 2, data: { message: 'transaction cancelled' }, status: false };
    }


    /**
     * Validar la red de conexión
     */
    const { isConfirmed: CheckNetwork } = await Queue.fire({
      title: 'XPOCRYPTO',
      text: 'Check your network',
      progressSteps: ['3/7'],
      currentProgressStep: 0,
      showCancelButton: true,
      cancelButtonText: 'Cancel',
      showConfirmButton: true,
      confirmButtonText: 'Connect',
      showLoaderOnConfirm: true,
      didOpen: () => {
        Queue.clickConfirm();
      },
      preConfirm: async() => {
        try {

          const chainId = await this.web3js.eth.net.getId();
          if (chainId != environment.chain.chainId) {
            await this.metamaskSrv.changeChainIdOrAdd();
          }

        } catch (err: any) {
          console.log('Error on CuztomizedWalletConnect@payWithWEB3.CheckNetwork', err);

          const message = (!err) 
            ? 'Please, switch the network to the correct one'
            : err.message;

          Swal.showValidationMessage(`${message}`);
        }
      }
    });

    console.log('CheckNetwork', CheckNetwork);
    if (!CheckNetwork) {
      await this.logout(false);
      return { step: 3, data: { message: 'transaction cancelled' }, status: false };
    }


    /**
     * Seleccionar token a utilizar como medio de pago
     */
    const payOpts = {};
    this.reserveSrv.cryptoPaymentTypeOpts.forEach((value) => {
      payOpts[value.value] = value.label;
    });

    const { value: cryptoPaymentType } = await Queue.fire({
      title: 'XPOCRYPTO',
      text: 'Select token to pay',
      progressSteps: ['4/7'],
      currentProgressStep: 0,
      showCancelButton: true,
      cancelButtonText: 'Cancel',
      showConfirmButton: true,
      confirmButtonText: 'Select',
      input: 'select',
      inputOptions: payOpts,
    });
  
    console.log('cryptoPaymentType', cryptoPaymentType);
    if (!cryptoPaymentType) {
      await this.logout(false);
      return { step: 4, data: { message: 'transaction cancelled' }, status: false };
    }

    const payOpt = this.reserveSrv.cryptoPaymentTypeOpts.filter((row) => row.value == cryptoPaymentType)
      .pop();
    console.log('payOpt', payOpt);


    /**
     * Disparar ventana de APPROVE
     */
    let amountToPayOnTokens = 0;
    const { isConfirmed: confirmAmountToPay} = await Queue.fire({
      title: 'XPOCRYPTO',
      text: 'Calculing amount to pay',
      progressSteps: ['5/7'],
      currentProgressStep: 0,
      showCancelButton: false,
      cancelButtonText: 'Decline',
      showConfirmButton: false,
      confirmButtonText: 'Accept',
      showLoaderOnConfirm: false,
      didOpen: async () => {
        try {
          Queue.showLoading();
          const oracleData: any = await this.oracleSrv.pricePair(`${payOpt?.value}`);
          console.log('oralceData', oracleData);

          console.log('amountInCurrency', amountInCurrency);

          amountToPayOnTokens = Number(this.calculateAmountToPayOnTokens(amountInCurrency, oracleData?.amount));
          console.log('amountToPayOnTokens', amountToPayOnTokens);

          Queue.update({
            text: `You will pay ${amountToPayOnTokens} ${payOpt?.value}, are you sure?`,
            showConfirmButton: true,
            showCancelButton: true,
          })

          Queue.hideLoading();
          // Queue.clickConfirm();

        } catch (err: any) {
          console.log('Error on CuztomizedWalletConnect@payWithWEB3.confirmAmountToPay', err);
        }
      },
    });

    console.log('confirmAmountToPay', confirmAmountToPay);
    if (!confirmAmountToPay) {
      await this.logout(false);
      return { step: 5, data: { message: 'transaction cancelled' }, status: false };
    }

    /**
     * Disparar ventana de APPROVE
     */
    const [ account ] = this.accounts;
    const { isConfirmed: isApproved} = await Queue.fire({
      title: 'XPOCRYPTO',
      text: 'Please confirm the approve transaction',
      progressSteps: ['6/7'],
      currentProgressStep: 0,
      showCancelButton: true,
      cancelButtonText: 'Cancel',
      showConfirmButton: true,
      confirmButtonText: 'Launch',
      showLoaderOnConfirm: true,
      didOpen: () => {
        Queue.clickConfirm();
      },
      preConfirm: async() => {
        try {

          if(payOpt?.type === 'external'){
            const approve = await this.approve(
              `${payOpt?.contractAddress}`,
              amountToPayOnTokens.toString(),
              environment.contractAddress,
              Number(payOpt?.decimals)
            );
  
            console.log('approve', approve);
          }

        } catch (err: any) {
          console.log('Error on CuztomizedWalletConnect@payWithWEB3.isApproved', err);
          Swal.showValidationMessage(`${err.message}`);
        }
      }
    });

    console.log('isApproved', isApproved);
    if (!isApproved) {
      await this.logout(false);
      return { step: 5, data: { message: 'transaction cancelled' }, status: false };
    }


    /**
     * Solicitar firma en la transacción
     */
    let transactionRecord: any;
    const { value: transactionStatus } = await Queue.fire({
      title: 'XPOCRYPTO',
      text: 'Please sign the transaction',
      progressSteps: ['7/7'],
      currentProgressStep: 0,
      showCancelButton: true,
      cancelButtonText: 'Cancel',
      showConfirmButton: true,
      confirmButtonText: 'Launch',
      showLoaderOnConfirm: true,
      didOpen: () => {
        Queue.clickConfirm();
      },
      preConfirm: async () => {
        try {
          const params = { method: 'buyWitkCustomToken', params: [] , optionals: {}};

          const transaction = await this.calculateAndCallCustomABI({
            contractAddress: environment.contractAddress,
            method: params.method,
            callType: 'send',
            params: [ toWei(amountToPayOnTokens.toString(), Number(payOpt?.decimals)) ],
            // optionals: null,
            urlABI: this.mainABI
          });

          // params.method = (payOpt?.type === 'external') ? 'BuyTokensFor' : 'buyTokenNative';
          // params.params = (payOpt?.type === 'external') ? []: [];


          // const transaction = await this.call(contractMethod, contractParams);
          transactionRecord = transaction;

          console.log({ transaction });
          // return Queue.clickConfirm();

        } catch (err: any) {
          console.log('Error on CuztomizedWalletConnect@payWithWEB3.transactionStatus', err);
          Swal.showValidationMessage(`${err.message}`);
        }
      },
    });

    console.log({transactionRecord, transactionStatus});

    if (!transactionStatus) {
      // console.log('transaction canceled');
      return { step: 3, data: { message: 'transaction canceled' }, status: false };
    }
    

    await this.logout(false);
    /**
     * Retornar resultado de la transacción
     */
    return { step: 7, data: transactionRecord, status: true };
  }


  /**
   * Calcular monto a cancelar
   * @param amount 
   * @param oraclePrice 
   * @param toFixed 
   * @returns 
   */
  calculateAmountToPayOnTokens(amount: any, oraclePrice, toFixed: number = 4) {
    const parseAmount = Number(amount);
    const parseOraclePrice = Number(oraclePrice);

    return (parseAmount / parseOraclePrice).toFixed(toFixed);
  }



  /**
   * @name approve
   * @description                   Tokens
   * @param addresstoken 
   * @param amount 
   * @param contractAddress 
   * @param decimals 
   * @returns 
   */
  async approve(addresstoken: string, amount: string, contractAddress: string, decimals: number) {
    return new Promise(async (resolve, reject) => {
      try {

        const contract: any = await this.abiService.getABIByUrl(this.contractSrv.erc20ABI)
        let accounts = this.accounts[0]
        //@dev cargamos la abi de contracto secundarios con el metodo approve
        let utoken: any = this.getAbiContract([contract.approve], addresstoken)
        //@dev ejecutamos la llamada a la funcion en el contract
        let result = await utoken.methods.approve(contractAddress, toWei(amount, decimals)).send({ from: accounts })
        resolve(result)
      } catch (err) {
        console.log("error", err)
        reject(err)
      }
    })
  }


  /** ===============================================================
   *       Méthodo genérico para llamadas al SC personalizado
   * ================================================================
   * @param data 
   * @param data.contractAddress 
   * @param data.method 
   * @param data.params 
   * @param data.callType           'call' / 'send'
   * @param data.optionals 
   * @param data.urlABI 
   */
   async calculateAndCallCustomABI(data: any) {
    const {
      contractAddress,
      method,
      params = null,
      callType = 'send',
      optionals = {},
      urlABI = this.contractSrv.erc20ABI
    } = data;

    try {

      console.log('DATA == ', data);
      // throw new Error('Not implemented');

      // Cargar ABI del contrato
      const contractABI: any = await this.abiService.getABIByUrl(urlABI);
      console.log('contractABI[method]', contractABI);

      const contractMethodIndex = contractABI.findIndex((item: any) => item.name === method);
      console.log('contractMethodIndex', contractMethodIndex);

      // cargamos la abi de contracto secundarios con el metodo que necesitamos
      const uToken = this.getAbiContract([contractABI[contractMethodIndex]], contractAddress);
      console.log('uToken', uToken);

      const contractMethod = (!params)
        ? uToken.methods[method]()
        : uToken.methods[method](...params);

      if (callType === 'send') {

        const [account] = this.accounts;
        optionals.from = account;

        const gasFee = await contractMethod.estimateGas(optionals);
        // console.log("gas", gasFee);

        optionals.gas = gasFee;
      }

      const result = await contractMethod[callType](optionals);
      // console.log("result", result);

      return result;

    } catch (err: any) {
      console.log('Error on CuztomizedWalletConnect@calculateAndCallCustomABI', err);
      const parseErr = new Error();
      parseErr.message = err.message;
      parseErr.name = err.code;
      throw parseErr;
    }
  }

  /**
   * Obteber nueva instancia WEB3 de un SC a través del ABI ingresado
   * @param token_abi             ABI Cargado
   * @param token_address         Dirección del SC
   * @returns 
   */
  getAbiContract(token_abi, token_address) {
    let uToken: any = new this.web3js.eth.Contract(token_abi, token_address);
    return uToken;
  }

}
