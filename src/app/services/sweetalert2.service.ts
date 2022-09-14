import { Injectable } from '@angular/core';
import Swal from 'sweetalert2';

@Injectable({
  providedIn: 'root'
})
export class Sweetalert2Service {

  public title = 'CILIK';

  constructor() { }

  showError(err: any, type = 0) {
    try {
      let mess
      if (err.message) {
        mess = err.message
      } else {
        mess = type == 1 ? JSON.parse(err.substring(err.search("{"), err.length)).message : err
      }
      // return Swal.fire(this.title, mess, 'error');
      return Swal.fire({
        title: this.title,
        text: mess,
        icon: 'error',
        customClass: {
          htmlContainer: 'applef sw2FixHtmlContainer',
          icon: 'sw2FixIcon',
        }
      });
    } catch (error) {
      console.log("error", error)
      return Swal.fire(this.title, 'error', 'error');
    }
  }

  showInfo(err: any, type = 0) {
    try {
      let mess
      if (err.message) {
        mess = err.message
      } else {
        mess = type == 1 ? JSON.parse(err.substring(err.search("{"), err.length)).message : err
      }
      // return Swal.fire(this.title, mess, 'error');
      return Swal.fire({
        title: this.title,
        text: mess,
        icon: 'info',
        customClass: {
          htmlContainer: 'applef sw2FixHtmlContainer',
          icon: 'sw2FixIcon',
        }
      });
    } catch (error) {
      console.log("error", error)
      return Swal.fire(this.title, 'error', 'error');
    }
  }

  showQuestion(err: any, type = 0) {
    try {
      let mess
      if (err.message) {
        mess = err.message
      } else {
        mess = type == 1 ? JSON.parse(err.substring(err.search("{"), err.length)).message : err
      }
      //return Swal.fire(this.title, mess, 'error');
      Swal.fire({
        title: this.title,
        text: mess,
        icon: 'question',
        customClass: {
          htmlContainer: 'applef sw2FixHtmlContainer',
          icon: 'sw2FixIcon',
        }
      });
      return;
    } catch (error) {
      console.log("error", error)
      Swal.fire(this.title, 'error', 'error');
    }



  }

  showWarning(message, type = 0) {
    try {
      console.log("showWarning", message)
      // return Swal.fire(this.title, message, 'warning');
      Swal.fire({
        title: this.title,
        text: message,
        icon: 'warning',
        customClass: {
          htmlContainer: 'applef sw2FixHtmlContainer',
          icon: 'sw2FixIcon',
        }
      });
      return;
    } catch (error) {
      console.log("error", error)
      Swal.fire(this.title, 'error', 'error');
    }
  }

  showSuccess(message, type = 0, transactionHash?) {
    try {
      let mess;

      if (type == 1) {
        mess = JSON.parse(message.substring(message.search("{"), message.length)).message
      } else if (type == 2) {
        mess = message
      } else if (type == 3) {
        Swal.fire({
          title: 'Transacción Exitosa.',
          icon: 'success',
          html: "<a style='color: #e5e61d !important;' href='https://polygonscan.com/tx/" + transactionHash + "' target='_blank'>Ver Transacción</a>",
          confirmButtonText: '<i class="fa fa-thumbs-up"></i> OK.'
        })
        //  html:  '<a style='color: #e5e61d !important;' href='//sweetalert2.github.io'>Ver Transacción</a> ',
        // https://polygonscan.com/tx/0x95a28b72079bcd4780eaae8630b9eca5ccb8c02c4008fec1956c8d85a1f46414
        return;

      }
      Swal.fire(this.title, mess, 'success');
      return
    } catch (error) {
      console.log("error", error)
      Swal.fire(this.title, 'error', 'error');
    }
  }

  public showToast(message: string, type: any = 'success'){
    const Toast = Swal.mixin({
      toast: true,
      position: 'top-end',
      showConfirmButton: false,
      timer: 3000,
      timerProgressBar: true,
      didOpen: (toast) => {
        toast.addEventListener('mouseenter', Swal.stopTimer)
        toast.addEventListener('mouseleave', Swal.resumeTimer)
      },
      customClass: {
        htmlContainer: 'applef sw2FixHtmlContainer',
        icon: 'sw2FixIcon',
      }
    });
    
    return Toast.fire({ icon: 'success', title: message })
  }

  async askConfirm(message: string){
    const { isConfirmed } = await Swal.fire({
      icon: 'info',
      title: this.title,
      html: message,
      // text: message,
      showCancelButton: true,
      showConfirmButton: true,
      confirmButtonText: 'Si',
      cancelButtonText: 'No',
      customClass: {
        htmlContainer: 'applef sw2FixHtmlContainer',
        icon: 'sw2FixIcon',
      }
    });

    return isConfirmed;
  }

  async askEdit(message: string){
    const { isConfirmed } = await Swal.fire({
      icon: 'info',
      title: 'Editar',
      html: message,
      // text: message,
      showCancelButton: true,
      showConfirmButton: true,
      confirmButtonText: 'Si',
      cancelButtonText: 'No',
      customClass: {
        htmlContainer: 'applef sw2FixHtmlContainer',
        icon: 'sw2FixIcon',
      }
    });

    return isConfirmed;
  }

  async askRegistroExitoso(message: string){
    const { isConfirmed } = await Swal.fire({
      icon: 'success',
      title: 'Registro Exitoso',
      html: 'ya puedes continuar con tu proceso de reservacion',
      // text: message,
      showCancelButton: false,
      showConfirmButton: true,
      confirmButtonText: 'Continuar',
      customClass: {
        htmlContainer: 'applef sw2FixHtmlContainer',
        icon: 'sw2FixIcon',
      }
    });

    return isConfirmed;
  }

  async askLoginExitoso(message: string){
    const { isConfirmed } = await Swal.fire({
      icon: 'success',
      title: 'Login Exitoso',
      html: '',
      // text: message,
      showCancelButton: false,
      showConfirmButton: true,
      confirmButtonText: 'Continuar',
      customClass: {
        htmlContainer: 'applef sw2FixHtmlContainer',
        icon: 'sw2FixIcon',
      }
    });

    return isConfirmed;
  }

  /**
   * Mostrar alerta basica
   * @param message
   * @param type 
   * @returns 
   */
   async showBasicAlert(title: string, message: string, type: any = 'success') {
    return await Swal.fire(title, message, type);
  }

}
