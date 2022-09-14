import { Injectable, QueryList } from '@angular/core';
import { BehaviorSubject, Subject } from 'rxjs';
import { ReserveMemberFormComponent } from 'src/app/pages/reserve/components/reserve-member-form/reserve-member-form.component';

@Injectable({
  providedIn: 'root'
})
export class ReserveService {


  /** Valor en porcentaje del IVA */
  public IVATX = 0.19;

  /** Identificador del número de tickets a comprar  */
  public nroTickets$ = new BehaviorSubject<number>(1);

  /** Indicador de aceptar terminos y condiciones */
  public accepTerms$ = new BehaviorSubject(false);

  /** Indicador de aceptar formar parte de la comunidad */
  public acceptCommunityNetworking$ = new BehaviorSubject(false);

  /** Valor pbase para los miembros */
  public MEMBERS_BASE = [{}];

  /** Miembros registrados en la orden de compra */
  public members$ = new BehaviorSubject<any[]>(this.MEMBERS_BASE);

  public membersForms$!: QueryList<ReserveMemberFormComponent>; 

  /** Restablecer formulario de billing */
  public billingFormReset$ = new Subject();

  /** Estado de formulario de Billing */
  public billingFormStatus$ = new BehaviorSubject<boolean>(false);

  /** Datos del formulario de Billing */
  public billingFormData$ = new BehaviorSubject<null | any>(null);

  /** Método de pago FIAT seleccionado */
  public fiatPaymentType$ = new BehaviorSubject<null | any>(null);

  /** Opciones de pago FIAT disponibles */
  public fiatPaymentTypeOpts = [
    {
      label: 'visa',
      image: '#',
      value: 'visa'
    },
    {
      label: 'mastercard',
      image: '#',
      value: 'masterCard'
    },
  ];

  /** Método de pago CRYPTO seleccionado */
  public cryptoPaymentType$ = new BehaviorSubject<null | any>(null);

  /** Opciones de pago CRYPTO disponibles */
  public cryptoPaymentTypeOpts = [
    {
      label: 'BNB',
      image: '#',
      value: 'BNB',
      contractAddress: '0xa07dF101D291386453953a613ABf861F7BCB5D02',     // DEV
      // contractAddress: '#',      // PROD
      type: 'native',
      decimals: 18,
    },
    {
      label: 'BUSD',
      image: '#',
      value: 'BUSD',
      contractAddress: '0xa07dF101D291386453953a613ABf861F7BCB5D02',      // DEV
      // contractAddress: '0xe9e7CEA3DedcA5984780Bafc599bD69ADd087D56',     // PROD
      type: 'external',
      decimals: 18,
    },
    {
      label: 'ETHB',
      image: '#',
      value: 'ETHB',
      contractAddress: '0xa07dF101D291386453953a613ABf861F7BCB5D02',      // DEV
      // contractAddress: '0x250632378E573c6Be1AC2f97Fcdf00515d0Aa91B',     // PROD
      type: 'external',
      decimals: 18,
    },
    {
      label: 'USDT',
      image: '#',
      value: 'USDT',
      contractAddress: '0xa07dF101D291386453953a613ABf861F7BCB5D02',      // DEV
      // contractAddress: '0x55d398326f99059fF775485246999027B3197955',     // PROD
      type: 'external',
      decimals: 18,
    },
    {
      label: 'USDC',
      image: '#',
      value: 'USDC',
      contractAddress: '0xa07dF101D291386453953a613ABf861F7BCB5D02',      // DEV
      // contractAddress: '0x8AC76a51cc950d9822D68b83fE1Ad97B32Cd580d',     // PROD
      type: 'external',
      decimals: 18,
    },
    {
      label: 'BTCB',
      image: '#',
      value: 'BTCB',
      contractAddress: '0xa07dF101D291386453953a613ABf861F7BCB5D02',      // DEV
      // contractAddress: '0x7130d2A12B9BCbFAe4f2634d864A1Ee1Ce3Ead9c',     // PROD
      type: 'external',
      decimals: 18,
    },
  ];

  /** Restablecer formulario de billing Credit Card */
  public billingCreditCardFormReset$ = new Subject();

  /** Estado de formulario de Billing */
  public billingCreditCardFormStatus$ = new BehaviorSubject<boolean>(false);

  /** Datos del formulario de Billing */
  public billingCreditCardFormData$ = new BehaviorSubject<null | any>(null);

  /** Entrada extras compradas para eventos */
  public extraEvents$ = new BehaviorSubject<any[]>([]);

  /** Listado de eventos a los cuales se puede comprar entrada al detal */
  public extraEventsList = [
    {
      label: 'MEET & GREET',
      description: '<p class="text-light">The first meeting of the VIP Week by XPO.CRYPTO™ in which some of the largest local and international blockchain and crypto ecosystem participants, journalists, sponsors, crypto partners, and influencers will meet and sign up to receive their wristbands and/or VIP tickets to events.</p>',
      image: 'assets/images/events/meet-and-greet.png',
      logo: 'assets/images/events/meet-and-greet-logo.png',
      value: 't1-event-1',
      nroTickets: 0,
      dates: ['2022-09-06'],
      price: 1.00,
    },
    {
      label: 'Degens and Partners DINNER PARTY',
      description: '<p class="text-light">An exclusive night of music, gourmet dishes, and cocktails for our Degens (Top VIPs) and Partners (official sponsors, speakers, and founders of XPO.CRYPTO™) where business and social relationships will be established through an entertaining encounter that will give you a warm welcome to the city.</p>',
      image: 'assets/images/events/dinner-party.png',
      logo: 'assets/images/events/dinner-party-logo.png',
      value: 't1-event2',
      nroTickets: 0,
      dates: ['2022-09-06'],
      price: 1.00,
    },
    {
      label: 'Legends BRUNCH AND FIESTA',
      description: '<p class="text-light">A celebration at the best Japanese fusion restaurant in town where the Legends will delight in delicious cocktails and Asian bites with Colombian gourmet touches. A Live DJ and a geisha show will create a unique social atmosphere.</p>',
      image: 'assets/images/events/legends.png',
      logo: 'assets/images/events/legends-logo.png',
      value: 't1-event-3',
      nroTickets: 0,
      dates: ['2022-09-07'],
      price: 1.00,
    },
    {
      label: 'SATELLITE SOCIAL BITES AND COCKTAILS',
      description: '<p class="text-light">Satellite Social is a curated VIP networking event for Builders and Investors. We host sophisticated cocktail parties to optimize communication, community and deal making.</p><p class="text-light">Join us for our first ever Sattelite Social event here in The City of the Eternal Spring.</p>',
      image: 'assets/images/events/satellite.png',
      logo: 'assets/images/events/satellite-logo.png',
      value: 't1-event-4',
      nroTickets: 0,
      dates: ['2022-09-07'],
      price: 1.00,
    },
    {
      label: 'WELCOME TO COLOMBIA OPENNING PARTY',
      description: '<p class="text-light">Colombia is in a strategic geographical position and is the image of talent, passion, and biodiversity. Its tropical environment makes it a privileged place for this world-class initiative.</p><p class="text-light"><strong>Enjoy the diversity of culture, music, and great food in one of Medellin’s most exclusive places.</strong></p>',
      image: 'assets/images/events/openning-party.png',
      logo: 'assets/images/events/openning-party-logo.png',
      value: 't1-event-5',
      nroTickets: 0,
      dates: ['2022-09-08'],
      price: 1.00,
    },
    {
      label: 'THE SECRET MEETING',
      description: '<p class="text-light">Imagine a place where nothing is off limits, where fantasy becomes reality. This is the most exclusive, exotic and secret experience of the entire VIP Week, exclusive only to Legendary Degens.</p><p class="text-light">Right of admission is reserved for open-minded VIP guests who enjoy success and want to experience a sensual journey that involves all senses.</p>',
      image: 'assets/images/events/the-secret-meeting.png',
      logo: 'assets/images/events/the-secret-meeting-logo.png',
      value: 't1-event-6',
      nroTickets: 0,
      dates: ['2022-09-08'],
      price: 1.00,
    },
    {
      label: 'XPOCRYPTO',
      description: '<p class="text-light">Local and international blockchain and crypto enthusiast, entrepreneurs, investors, start-ups, artist, and performers will converge in Medellin Colombia for XPO.CRYPTO’s inaugural event.</p><p class="text-light">More than 70 exhibitors, 4.000 visitors, international speakers and a display of technology and new trends will be the constants for an event that will mark the history of Colombia and Latin America.</p>',
      image: 'assets/images/events/xpocrypto.png',
      logo: 'assets/images/events/xpocrypto-logo.png',
      value: 't1-event-7',
      nroTickets: 0,
      dates: [
        '2022-09-09',
        '2022-09-10'
      ],
      price: 1.00,
    },
    {
      label: 'UGP ULTIMO GUERRERO EN PIE',
      description: '<p class="text-light">Medellin has become the capital of mixed martial arts in Colombia. Thanks to the success of its events, a large number of fans enjoy the fights that promote this winning sports exhibition. UGP will provide an exceptional platform for the entertainment of locals and foreigners.</p>',
      image: 'assets/images/events/upg.png',
      logo: 'assets/images/events/upg-logo.png',
      value: 't1-event-8',
      nroTickets: 0,
      dates: ['2022-09-09'],
      price: 1.00,
    },
    {
      label: 'DANCE WITH ME',
      description: '<p class="text-light">Our most fundamental human experiences have been linked to music for centuries. Dance With Me harnesses this power, celebrates the splendor of different cultures, and embraces our beautiful planet while creating unforgettable experiences around the world.</p>',
      image: 'assets/images/events/dance-with-me.png',
      logo: 'assets/images/events/dance-with-me-logo.png',
      value: 't1-event-9',
      nroTickets: 0,
      dates: ['2022-09-10'],
      price: 1.00,
    },
    {
      label: 'TELEMEDELLÍN LOCAL XPO',
      description: '<p class="text-light">A gift for the City where students, educators, businesses, entrepreneurs, Web 3.0 participants, and the Fourth Industrial Revolution can learn about Xpo.Crypto’s mission to effect change via the adoption of blockchain and crypto for the benefit of all.</p>',
      image: 'assets/images/events/telemedellin.png',
      logo: 'assets/images/events/telemedellin-logo.png',
      value: 't1-event-10',
      nroTickets: 0,
      dates: ['2022-09-11'],
      price: 1.00,
    },
  ];

  
  /** Sub Total */
  public subTotalAmount$ = new BehaviorSubject<number>(0);

  /** Monto del IVA */
  public ivaTxAmount$ = new BehaviorSubject<number>(0);

  /** Monto total a pagar */
  public totalAmount$ = new BehaviorSubject<number>(0);


  constructor() { }

  /**
   * Reiniciar estado de los observables
   */
  resetStates(){
    this.nroTickets$.next(1);
    this.accepTerms$.next(false);
    this.members$.next([]);
    this.billingFormReset$.next(true);
    this.billingFormStatus$.next(false);
    this.billingFormData$.next(null);
    this.fiatPaymentType$.next(null);
    this.cryptoPaymentType$.next(null);
    this.billingCreditCardFormReset$.next(true);
    this.billingCreditCardFormStatus$.next(false);
    this.billingCreditCardFormData$.next(null);
    this.extraEvents$.next([]);
  }

}
