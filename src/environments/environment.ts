// This file can be replaced during build by using the `fileReplacements` array.
// `ng build` replaces `environment.ts` with `environment.prod.ts`.
// The list of file replacements can be found in `angular.json`.

export const environment = {
  production: false,
  version: '0.0.47',
  dataEvent: {
    keyDb: "nMdPSXuptQjlcoAg5PJY",
    appURL: "https://grecia-dev.web.app/",
    name: "WORLD LATIN DANCE CUP Cartagena 2024",
    termsAndConditions: "",
    subject: "WORLD LATIN DANCE CUP Cartagena 2024",
    description: "",
  },
  localStorage: {
    SECRET_KEY: "wldc2024",
  },
  // DEV
  seedKey: 'nftixProject-dev-inTECH',
  API_URL: 'http://localhost:4300',
  urlrootFunctions: "http://localhost:4300",
  // urlrootFunctions: "https://2-dot-wldc-app.uc.r.appspot.com",
  urlWeb: 'https://grecia-dev.web.app/',
  paypal: {
    currency: 'USD',
    clientId: "ASay2oTezuJ4AhyNrm4UGcJbRE6O82APiOcx5J-l9aBT_r4TzeN0bi4acCuwmfXHWlMIfT79xu2HvdzC",
  },
  tuCompra: {
    url: "https://demover3-1.tucompra.net/tc3/app/inputs/compra.jsp",
    Nombre: "FUNDACION BALLET NACIONAL EL FIRULETE",
    Idsistema: "qo4xdqn7cx0lv5t6",
    descripcionFactura: "DEV - CARTAGENA LATIN DANCE CUP 2024"
  },
  firebaseConfig: {
    apiKey: "AIzaSyC1MxrCfXicJ8gxAOMJut2fGouYH0QjMao",
    authDomain: "wldc-app.firebaseapp.com",
    databaseURL: "https://wldc-app.firebaseio.com",
    projectId: "wldc-app",
    storageBucket: "wldc-app.appspot.com",
    messagingSenderId: "1046500872667",
    appId: "1:1046500872667:web:39c435daa2f776166f17fe",
    measurementId: "G-8YQ92LN4ZK"
  },
};

/*
 * For easier debugging in development mode, you can import the following file
 * to ignore zone related error stack frames such as `zone.run`, `zoneDelegate.invokeTask`.
 *
 * This import should be commented out in production mode because it will have a negative impact
 * on performance if an error is thrown.
 */
// import 'zone.js/plugins/zone-error';  // Included with Angular CLI.
