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
      "AY3m2F6IWR-K9LDNuEYM8hBqt15yARFfiRVItDuvZyEcmLpHGBdKS9otkHiH_pb_qJB7TN8rh9mV6wtW",
    payPalEnvironmentSandbox:
      "ASay2oTezuJ4AhyNrm4UGcJbRE6O82APiOcx5J-l9aBT_r4TzeN0bi4acCuwmfXHWlMIfT79xu2HvdzC",
  },
  firebase: {
    apiKey: "AIzaSyD2rH0VMiThVa1amThTDS8EgHLGHy5jHFc",
    authDomain: "cilik-presale.firebaseapp.com",
    projectId: "cilik-presale",
    storageBucket: "cilik-presale.appspot.com",
    messagingSenderId: "609693079729",
    appId: "1:609693079729:web:2a97e3f9242fa5486b6a90",
    measurementId: "G-626T0C3HZN"
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
