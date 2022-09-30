// This file can be replaced during build by using the `fileReplacements` array.
// `ng build` replaces `environment.ts` with `environment.prod.ts`.
// The list of file replacements can be found in `angular.json`.

export const environment = {
  production: false,
  // DEV
  seedKey: 'nftixProject-dev-inTECH',
  API_URL: 'https://cilik-presale.uc.r.appspot.com/',
  urlWeb: 'https://wldc.cilik.io/',
  paypal: {
    currency: 'USD',
    payPalEnvironmentProduction:
      "AUek7V91U1RKcGTgzZadqSuLIwvjuuV0Ljyqh3jh7-foQRutWkjvKLm_u30d5M8aFVFTBGEByvcbY45P",
    payPalEnvironmentSandbox:
      "ASay2oTezuJ4AhyNrm4UGcJbRE6O82APiOcx5J-l9aBT_r4TzeN0bi4acCuwmfXHWlMIfT79xu2HvdzC",
  },
  firebase: {
    apiKey: "AIzaSyAZz-h4xrLTAQfE7apAoxohGOx4hCB5KQU",
    authDomain: "dev-cilik.firebaseapp.com",
    projectId: "dev-cilik",
    storageBucket: "dev-cilik.appspot.com",
    messagingSenderId: "320718866241",
    appId: "1:320718866241:web:81fc149c6da3d3684003c0",
    measurementId: "G-VEHKCDWKTK"
  }
};

/*
 * For easier debugging in development mode, you can import the following file
 * to ignore zone related error stack frames such as `zone.run`, `zoneDelegate.invokeTask`.
 *
 * This import should be commented out in production mode because it will have a negative impact
 * on performance if an error is thrown.
 */
// import 'zone.js/plugins/zone-error';  // Included with Angular CLI.
