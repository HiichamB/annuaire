import { Component, HostListener, OnInit, ViewChild } from '@angular/core'
import { FormBuilder, FormControl, FormGroup, Validators } from '@angular/forms'

import { NgbModal } from '@ng-bootstrap/ng-bootstrap'
import { ToastrService } from 'ngx-toastr'
import { CalendarView, DateAdapter } from 'angular-calendar'
import {
  CalendarSchedulerEvent,
  DAYS_IN_WEEK,
  SchedulerEventTimesChangedEvent,
  SchedulerViewHour,
  SchedulerViewHourSegment,
  subPeriod,
  startOfPeriod,
  addPeriod,
  endOfPeriod,
  CalendarSchedulerViewComponent,
} from 'angular-calendar-scheduler'
import {
  endOfDay,
  addMonths,
  addDays,
  addHours,
  addMinutes,
  setHours,
  startOfHour,
  subHours,
  subMinutes,
  formatDistance,
  subDays,
} from 'date-fns'
import { max, Subject } from 'rxjs'
import { CalendarSchedulerService } from 'src/app/shared/services/calendar-scheduler.service'
import { fi } from 'date-fns/locale'

@Component({
  selector: 'app-reservation-materiel',
  templateUrl: './reservation-materiel.component.html',
  styleUrls: ['./reservation-materiel.component.scss'],
})
export class ReservationMaterielComponent implements OnInit {
  locationForm: any
  rangeTimeChoosed: any = false
  public reviewForm: FormGroup

  constructor(
    private fb: FormBuilder,
    public modalService: NgbModal,
    private toastr: ToastrService,
    private dateAdapter: DateAdapter,
    public calendarService: CalendarSchedulerService,
  ) {
    this.segmentModifier = ((segment: SchedulerViewHourSegment): void => {
      segment.isDisabled = !this.isDateValid(segment.date)
    }).bind(this)

    this.eventModifier = ((event: CalendarSchedulerEvent): void => {
      event.isDisabled = !this.isDateValid(event.start)
    }).bind(this)

    this.locationForm = this.fb.group({
      name: new FormControl('', [
        Validators.required,
        Validators.minLength(3),
        Validators.maxLength(30),
        Validators.pattern('^[a-zA-Z \u0600-\u06FF]+$'),
      ]),
      prenom: new FormControl('', [
        Validators.required,
        Validators.minLength(3),
        Validators.maxLength(30),
        Validators.pattern('^[a-zA-Z \u0600-\u06FF]+$'),
      ]),
      email: new FormControl('', [Validators.required, Validators.email]),
      dateDebut: new FormControl('', [Validators.required]),
      heureDebut: new FormControl({ value: '', disabled: true }, [
        Validators.required,
      ]),
      dateFin: new FormControl({ value: '', disabled: true }, [
        Validators.required,
      ]),
      heureFin: new FormControl({ value: '', disabled: true }, [
        Validators.required,
      ]),
      quantite: new FormControl({ value: '' }, [Validators.required]),
      telephone: new FormControl('', [
        Validators.required,
        Validators.pattern('^((\\+212-?)|0)?[0-9]{10}$'),
        Validators.minLength(10),
      ]),
      titre: new FormControl('', [
        Validators.required,
        Validators.minLength(3),
        Validators.maxLength(30),
      ]),
      content: new FormControl('', [
        Validators.required,
        Validators.minLength(3),
      ]),
    })
    this.reviewForm = this.fb.group({
      name: new FormControl('', [
        Validators.required,
        Validators.minLength(3),
        Validators.maxLength(30),
        Validators.pattern('^[a-zA-Z \u0600-\u06FF]+$'),
      ]),
      object: new FormControl('', [
        Validators.required,
        Validators.minLength(3),
        Validators.maxLength(30),
        Validators.pattern('^[a-zA-Z \u0600-\u06FF]+$'),
      ]),
      reference: new FormControl('', [
        Validators.required,
        Validators.minLength(3),
        Validators.maxLength(30),
      ]),
      telephone: new FormControl('', [
        Validators.required,
        Validators.pattern('^((\\+212-?)|0)?[0-9]{10}$'),
        Validators.minLength(10),
      ]),
      email: new FormControl('', [Validators.required, Validators.email]),
      message: new FormControl('', [
        Validators.required,
        Validators.minLength(10),
      ]),
    })
    this.reviews = [
      {
        name: 'Hicham',
        commentaire:
          "Montre très joli certe. En revanche montre idéale pour être en retard. Montre qui s'arrête très souvent. Je regrette mon achat Montre très joli certe. En revanche montre idéale pour être en retard. Montre qui s'arrête très souvent. Je regrette mon achat",
        images: [
          'https://www.primefaces.org/primeng/assets/showcase/images/galleria/galleria11.jpg',
          'https://img01.ztat.net/article/spp-media-p1/90716e68903b4883929ce31929d95e84/c40ad291ced84ee3b350a3868093f8c3.jpg?imwidth=156',
          'https://img01.ztat.net/article/spp-media-p1/5107121c27e8457d8628e6fc4646c70f/a94ad48b9f85429caeb1277e36e69772.jpg?imwidth=156',
        ],
        date: '2016-05-18T16:00:00Z',
      },
      {
        name: 'Hicham',
        commentaire:
          "Montre très joli certe. En revanche montre idéale pour être en retard. Montre qui s'arrête très souvent. Je regrette mon achat Montre très joli certe. En revanche montre idéale pour être en retard. Montre qui s'arrête très souvent. Je regrette mon achat",
        images: [
          'https://www.primefaces.org/primeng/assets/showcase/images/galleria/galleria11.jpg',
          'https://img01.ztat.net/article/spp-media-p1/90716e68903b4883929ce31929d95e84/c40ad291ced84ee3b350a3868093f8c3.jpg?imwidth=156',
          'https://img01.ztat.net/article/spp-media-p1/5107121c27e8457d8628e6fc4646c70f/a94ad48b9f85429caeb1277e36e69772.jpg?imwidth=156',
        ],
        date: '2016-05-18T16:00:00Z',
      },
      {
        name: 'Hicham',
        commentaire:
          "Montre très joli certe. En revanche montre idéale pour être en retard. Montre qui s'arrête très souvent. Je regrette mon achat Montre très joli certe. En revanche montre idéale pour être en retard. Montre qui s'arrête très souvent. Je regrette mon achat",
        images: [
          'https://www.primefaces.org/primeng/assets/showcase/images/galleria/galleria11.jpg',
          'https://img01.ztat.net/article/spp-media-p1/90716e68903b4883929ce31929d95e84/c40ad291ced84ee3b350a3868093f8c3.jpg?imwidth=156',
          'https://img01.ztat.net/article/spp-media-p1/5107121c27e8457d8628e6fc4646c70f/a94ad48b9f85429caeb1277e36e69772.jpg?imwidth=156',
        ],
        date: '2016-05-18T16:00:00Z',
      },
      {
        name: 'Hicham',
        commentaire:
          "Montre très joli certe. En revanche montre idéale pour être en retard. Montre qui s'arrête très souvent. Je regrette mon achat Montre très joli certe. En revanche montre idéale pour être en retard. Montre qui s'arrête très souvent. Je regrette mon achat",
        images: [
          'https://www.primefaces.org/primeng/assets/showcase/images/galleria/galleria11.jpg',
          'https://img01.ztat.net/article/spp-media-p1/90716e68903b4883929ce31929d95e84/c40ad291ced84ee3b350a3868093f8c3.jpg?imwidth=156',
          'https://img01.ztat.net/article/spp-media-p1/5107121c27e8457d8628e6fc4646c70f/a94ad48b9f85429caeb1277e36e69772.jpg?imwidth=156',
        ],
        date: '2016-05-18T16:00:00Z',
      },
    ]
    this.cashBack = [
      {
        value: '-35%',
        tag: 'Bon Plan',
        title: "Changez de fournisseur d'énergie en quelques clics !",
        date: '2022-12-18T16:00:00Z',
      },
      {
        value: '-10%',
        tag: 'Bon Plan',
        title: "Déménagement | Souscription à l'offre électricité/ gaz",
        date: '2022-12-18T16:00:00Z',
      },
      {
        value: '-5%',
        tag: 'Bon Plan',
        title: "Changez de fournisseur d'énergie en quelques clics !",
        date: '2022-12-18T16:00:00Z',
      },
    ]
  }
  expandedRowKeys: any = {}

  productTable: any = []
  cashBack: any = []
  ngOnInit(): void {
    this.produit = {
      idP: 1,
      titre: 'Product 1',
      categorie: 'Computer',
      description:
        "As fellow graduate students at MIT in 2004, Brian and Dharmesh noticed a shift in the way people shop and buy. Consumers were no longer tolerating interruptive bids for their attention — in fact, they'd gotten really, really good at ignoring them. \n From this shift, a company was born: HubSpot. It was founded on inbound, the notion that people don't want to be interrupted by marketers or harassed by salespeople — they want to be helped.\n Today, the inbound movement continues to empower businesses around the world to stop interrupting, start helping, and return their focus to the customer.",
      imageProduct:
        'https://img01.ztat.net/article/spp-media-p1/7df9956ac3954b4d8e752bc3279c4896/50fbeeb7fcb44452a3113fa26fa5836d.jpg?imwidth=156&filter=packshot',

      otherImages: [
        'https://img01.ztat.net/article/spp-media-p1/2cbb3a5e22d2446db19c7246a672e4ce/433a6ed78fef4d05af7df2edae0a1a63.jpg?imwidth=156',
        'https://img01.ztat.net/article/spp-media-p1/90716e68903b4883929ce31929d95e84/c40ad291ced84ee3b350a3868093f8c3.jpg?imwidth=156',
        'https://img01.ztat.net/article/spp-media-p1/5107121c27e8457d8628e6fc4646c70f/a94ad48b9f85429caeb1277e36e69772.jpg?imwidth=156',
        'https://img01.ztat.net/article/spp-media-p1/bd3eb118f64d4ed5855cc7c0a2af9be5/209f506613a44d7884b3f34a9c08d8d5.jpg?imwidth=1800',
      ],
      price: 200,
      rating: 5,

      livraison: 'gratuite',
      shipping: [
        {
          id: 3,
          prix: 0,
          duree: 25,
          company: 'Africa',
        },
        {
          id: 1,
          prix: 15,
          duree: 3,
          company: 'DHL',
        },
        {
          id: 2,
          prix: 25,
          duree: 1,
          company: 'Amana',
        },
      ],
      variant: ['39', '40', '41', '42', '43', '44', '45'],
      others: [
        {
          idP: 10,

          imageProduct:
            'https://img01.ztat.net/article/spp-media-p1/55ff900fe1543129b3bcc0ca77f66ca5/acb30105ddc24015aea25b911dbf61d4.jpg?imwidth=1800',
          name: '',
          description:
            "Un tee-shirt, ou teeshirta,1, aussi orthographié T-shirt ou t-shirt2 (/ti.ʃœʁt/b),rarement appelé paletot, parfois appelé gilet à manches courtes au Canada francophone et tricot en Afrique francophone, plus rarement gaminet, est un maillot de corps qui doit son nom à sa forme en « T », sans col et initialement à manches courtes3 mais éventuellement à manches longues, à capuche ou à col roulé. Il est fabriqué en tissu maillé (extensible), en général en coton ou en fibres polyester. Le T-shirt était originellement porté comme sous-vêtement, mais est désormais employé comme un vêtement à part entière, marquant la décontraction de son porteur, particulièrement l'été.",
          titre: 'Product 1',
          categorie: 'Computer',

          otherImages: [
            'https://img01.ztat.net/article/spp-media-p1/91dbdde970e23b7ebf20f4cf702f8da5/e30279e1a2c747689c431c1193f44328.jpg?imwidth=762&filter=packshot',
            'https://img01.ztat.net/article/spp-media-p1/0fabc7489db33c7380f8a285607bbb89/3edadf493aa546a784f94edd73faf51d.jpg?imwidth=1800',
            'https://img01.ztat.net/article/spp-media-p1/770f4a492d3635af81d9ea2d609bbdcd/6917c1ffa5344db7af6487eb12dcb17c.jpg?imwidth=1800',
          ],
          price: 350,
          rating: 3.5,
          promo: {
            taux: '-40%',
            promoPrice: 289,
          },
          livraison: 'gratuite',
          variant: ['Red', 'Blue', 'Black', 'White', 'Gray'],
        },
        {
          idP: 11,

          imageProduct:
            'https://img01.ztat.net/article/spp-media-p1/b84642a1c2ac3c57832d6b53e9b4b246/8ab325f57e4d49dab2083269afe51392.jpg?imwidth=762&filter=packshot',
          titre: 'Product 44',
          description:
            "Art silk is manufactured by synthetic fibres like rayon. It's light in weight and is soft on the skin for comfort in summers.Art silk is manufactured by synthetic fibres like rayon. It's light in weight and is soft on the skin for comfort in summers.",

          price: 159,
          rating: 2,
        },
        {
          idP: 12,

          imageProduct:
            'https://img01.ztat.net/article/spp-media-p1/b84642a1c2ac3c57832d6b53e9b4b246/8ab325f57e4d49dab2083269afe51392.jpg?imwidth=50&filter=packshot',
          titre: 'Product 55',
          price: 740,
          rating: 3.5,
        },
      ],
      aboutProduct: [
        {
          question: 'Est-ce si compliqué de créer son entreprise ?',
          reponse:
            ' On considère généralement que la création d’entreprise est compliquée, mais le raisonnement se limite – et c’est une erreur – aux formalités de création de l’entreprise c’est-à-dire aux démarches à accomplir pour lui donner naissance et l’immatriculer. Ce formalisme est, en effet, parfois complexe.',
        },
        {
          question: "Quelle est l'adresse de Patek Philippe France ?",
          reponse:
            ' Patek Philippe France est situé au 10 pl Vendôme, 75001 Paris',
        },
        {
          question:
            'Quelles sont les prestations et services que propose SOS Médecins Paris19 Visites, Consultations et Téléconsultations ? ',
          reponse:
            '  SOS Médecins Paris19 Visites, Consultations et Téléconsultations propose les prestations et services suivants: 24h/24, 7j/7 / Visites à domicile / Soins techniques',
        },
      ],
      timer: true,
    }
    this.selectedItem = this.product
    console.log('selecteditem', this.selectedItem)
    this.productTable.push(this.selectedItem)
    this.productTable.forEach((data: any) => {
      this.expandedRowKeys[data.id] = true
    })
    this.responsiveOptions = [
      {
        breakpoint: '1024px',
        numVisible: 3,
        numScroll: 3,
      },
      {
        breakpoint: '768px',
        numVisible: 2,
        numScroll: 2,
      },
      {
        breakpoint: '560px',
        numVisible: 1,
        numScroll: 1,
      },
    ]
  }
  @ViewChild(CalendarSchedulerViewComponent)
  calendarScheduler!: CalendarSchedulerViewComponent
  view: CalendarView = CalendarView.Week
  viewDate: Date = new Date()
  viewDays: number = DAYS_IN_WEEK
  refresh: Subject<any> = new Subject()
  locale: string = 'fr-CA'
  hourSegments: any = 1
  weekStartsOn: number = 1
  startsWithToday: boolean = true
  activeDayIsOpen: boolean = true
  excludeDays: number[] = [] // [0];
  weekendDays: number[] = [0, 6]
  dayStartHour: number = 8
  dayStartMinute: number = 0
  dayEndHour: number = 18
  dayEndMinute: number = 0
  dayModifier: any
  hourModifier: any
  maxDate: Date = endOfDay(addMonths(new Date(), 1))
  product: any = {
    idP: 'car1',
    titre: 'Car 1',
    categorie: 'Car',
    description:
      "As fellow graduate students at MIT in 2004, Brian and Dharmesh noticed a shift in the way people shop and buy. Consumers were no longer tolerating interruptive bids for their attention — in fact, they'd gotten really, really good at ignoring them. \n From this shift, a company was born: HubSpot. It was founded on inbound, the notion that people don't want to be interrupted by marketers or harassed by salespeople — they want to be helped.\n Today, the inbound movement continues to empower businesses around the world to stop interrupting, start helping, and return their focus to the customer.",
    imageProduct:
      'https://w7.pngwing.com/pngs/591/74/png-transparent-cars-towmater-art-cars-mater-national-championship-lightning-mcqueen-pixar-cars-vintage-car-car-vehicle.png',

    otherImages: [
      'https://w7.pngwing.com/pngs/662/535/png-transparent-disney-pixar-cars-tow-mater-mater-lightning-mcqueen-cars-cartoon-lightning-mcqueen-vintage-car-car-pixar-thumbnail.png',
      'https://w7.pngwing.com/pngs/893/1009/png-transparent-mater-from-cars-illustration-mater-lightning-mcqueen-cars-2-sally-carrera-cars-vintage-car-car-pixar.png',
    ],
    price: 200,
    rating: 5,
    quantite: 5,
    livraison: 'gratuite',
    shipping: [
      {
        id: 3,
        prix: 0,
        duree: 25,
        company: 'Africa',
      },
      {
        id: 1,
        prix: 15,
        duree: 3,
        company: 'DHL',
      },
      {
        id: 2,
        prix: 25,
        duree: 1,
        company: 'Amana',
      },
    ],
    variant: ['39', '40', '41', '42', '43', '44', '45'],
    disponibility: [
      {
        dateDebut: '2022-06-12',
        dateFin: '2022-06-16',
        heureStart: '16:00',
        heureEnd: '17:00',
        title: 'Meeting 444',
        content: 'lorem ipsum dolor sit amet ',
        etat: 'en cours de publication',
        quantite: 1,
      },
      {
        dateDebut: '2022-06-15',
        dateFin: '2022-06-15',
        heureStart: '08:00',
        heureEnd: '17:00',
        title: 'En Location',
        content: 'lorem ipsum dolor sit amet ',
        etat: 'en cours de publication',
        quantite: 1,
      },

      {
        dateDebut: '2022-06-15',
        dateFin: '2022-06-17',
        heureStart: '12:00',
        heureEnd: '13:00',
        title: 'Meeting 1',
        content: 'lorem ipsum dolor sit amet ',
        etat: 'en cours de publication',
        quantite: 1,
      },
      {
        dateDebut: '2022-06-13',
        dateFin: '2022-06-13',
        heureStart: '15:00',
        heureEnd: '16:00',
        title: 'Meeting 2',
        content: 'lorem ipsum dolor sit amet ',
        etat: 'en cours de publication',
        quantite: 1,
      },
      {
        dateDebut: '2022-06-17',
        dateFin: '2022-06-18',
        heureStart: '10:00',
        heureEnd: '12:00',
        title: 'Meeting 5',
        content: 'lorem ipsum dolor sit amet ',
        etat: 'en cours de publication',
        quantite: 2,
      },
    ],
    options: [
      {
        idP: 1,
        titre: 'Option 1 ',
        categorie: 'Accessoire',

        description:
          "As fellow graduate students at MIT in 2004, Brian and Dharmesh noticed a shift in the way people shop and buy. Consumers were no longer tolerating interruptive bids for their attention — in fact, they'd gotten really, really good at ignoring them. \n From this shift, a company was born: HubSpot. It was founded on inbound, the notion that people don't want to be interrupted by marketers or harassed by salespeople — they want to be helped.\n Today, the inbound movement continues to empower businesses around the world to stop interrupting, start helping, and return their focus to the customer.",
        imageProduct:
          'https://img01.ztat.net/article/spp-media-p1/7df9956ac3954b4d8e752bc3279c4896/50fbeeb7fcb44452a3113fa26fa5836d.jpg?imwidth=156&filter=packshot',
        type: 'vente',
        price: 100,
        quantite: 10,
        disponibility: [
          {
            dateDebut: '2022-06-12',
            dateFin: '2022-06-16',
            heureStart: '16:00',
            heureEnd: '17:00',
            title: 'Meeting 444',
            content: 'lorem ipsum dolor sit amet ',
            etat: 'en cours de publication',
            quantite: 1,
          },
          {
            dateDebut: '2022-06-15',
            dateFin: '2022-06-15',
            heureStart: '08:00',
            heureEnd: '17:00',
            title: 'En Location',
            content: 'lorem ipsum dolor sit amet ',
            etat: 'en cours de publication',
            quantite: 1,
          },
        ],
        taux: [
          {
            dateDebut: '15',
            dateFin: '30',
            unite: 'jours',
            tarif: '13',
          },
          {
            dateDebut: '7',
            dateFin: '15',
            unite: 'jours',
            tarif: '15',
          },
          {
            dateDebut: '15',
            dateFin: '60',
            unite: 'min',
            tarif: '5',
          },

          {
            dateDebut: '1',
            dateFin: '7',
            unite: 'jours',
            tarif: '20',
          },

          ,
          {
            dateDebut: '1',
            dateFin: '24',
            unite: 'heures',
            tarif: '10',
          },
        ],
      },
      {
        idP: 2,
        titre: 'Option 2 ',
        categorie: 'Accessoire',

        description:
          "As fellow graduate students at MIT in 2004, Brian and Dharmesh noticed a shift in the way people shop and buy. Consumers were no longer tolerating interruptive bids for their attention — in fact, they'd gotten really, really good at ignoring them. \n From this shift, a company was born: HubSpot. It was founded on inbound, the notion that people don't want to be interrupted by marketers or harassed by salespeople — they want to be helped.\n Today, the inbound movement continues to empower businesses around the world to stop interrupting, start helping, and return their focus to the customer.",
        imageProduct:
          'https://img01.ztat.net/article/spp-media-p1/7df9956ac3954b4d8e752bc3279c4896/50fbeeb7fcb44452a3113fa26fa5836d.jpg?imwidth=156&filter=packshot',
        type: 'vente',
        price: 100,
        quantite: 10,
        disponibility: [
          {
            dateDebut: '2022-06-12',
            dateFin: '2022-06-16',
            heureStart: '16:00',
            heureEnd: '17:00',
            title: 'Meeting 444',
            content: 'lorem ipsum dolor sit amet ',
            etat: 'en cours de publication',
            quantite: 1,
          },
          {
            dateDebut: '2022-06-15',
            dateFin: '2022-06-15',
            heureStart: '08:00',
            heureEnd: '17:00',
            title: 'En Location',
            content: 'lorem ipsum dolor sit amet ',
            etat: 'en cours de publication',
            quantite: 1,
          },
        ],
        taux: [
          {
            dateDebut: '15',
            dateFin: '30',
            unite: 'jours',
            tarif: '10',
          },
          {
            dateDebut: '7',
            dateFin: '15',
            unite: 'jours',
            tarif: '13',
          },
          {
            dateDebut: '15',
            dateFin: '60',
            unite: 'min',
            tarif: '0.5',
          },

          {
            dateDebut: '1',
            dateFin: '7',
            unite: 'jours',
            tarif: '10',
          },

          ,
          {
            dateDebut: '1',
            dateFin: '24',
            unite: 'heures',
            tarif: '8',
          },
        ],
      },
      {
        idP: 3,
        titre: 'Option 3 ',
        categorie: 'Accesoire',

        description:
          "As fellow graduate students at MIT in 2004, Brian and Dharmesh noticed a shift in the way people shop and buy. Consumers were no longer tolerating interruptive bids for their attention — in fact, they'd gotten really, really good at ignoring them. \n From this shift, a company was born: HubSpot. It was founded on inbound, the notion that people don't want to be interrupted by marketers or harassed by salespeople — they want to be helped.\n Today, the inbound movement continues to empower businesses around the world to stop interrupting, start helping, and return their focus to the customer.",
        imageProduct:
          'https://img01.ztat.net/article/spp-media-p1/7df9956ac3954b4d8e752bc3279c4896/50fbeeb7fcb44452a3113fa26fa5836d.jpg?imwidth=156&filter=packshot',
        type: 'vente',
        price: 55,
        quantite: 3,
        disponibility: [
          {
            dateDebut: '2022-06-12',
            dateFin: '2022-06-16',
            heureStart: '16:00',
            heureEnd: '17:00',
            title: 'Meeting 444',
            content: 'lorem ipsum dolor sit amet ',
            etat: 'en cours de publication',
            quantite: 1,
          },
          {
            dateDebut: '2022-06-15',
            dateFin: '2022-06-15',
            heureStart: '08:00',
            heureEnd: '17:00',
            title: 'En Location',
            content: 'lorem ipsum dolor sit amet ',
            etat: 'en cours de publication',
            quantite: 1,
          },
        ],
      },
    ],
    taux: [
      {
        dateDebut: '15',
        dateFin: '30',
        unite: 'jours',
        tarif: '130',
      },
      {
        dateDebut: '7',
        dateFin: '15',
        unite: 'jours',
        tarif: '150',
      },
      {
        dateDebut: '15',
        dateFin: '60',
        unite: 'min',
        tarif: '0.5',
      },

      {
        dateDebut: '1',
        dateFin: '7',
        unite: 'jours',
        tarif: '200',
      },

      ,
      {
        dateDebut: '1',
        dateFin: '24',
        unite: 'heures',
        tarif: '10',
      },
    ],
  }
  produit: any = {}
  selectedImage: any = ''
  selectedItem: any = {}
  clientX: any = 0
  clientY: any = 0
  scaleValue: any = 1
  totalReviews: any = 125

  onMouseout() {
    this.scaleValue = 1
    this.clientX = 0
    this.clientY = 0
  }
  //function Mousse Zoom
  map(
    n: any,
    start1: any,
    stop1: any,
    start2: any,
    stop2: any,
    withinBounds: any,
  ) {
    function constrain(n: any, low: any, high: any) {
      return Math.max(Math.min(n, high), low)
    }
    const newval = ((n - start1) / (stop1 - start1)) * (stop2 - start2) + start2
    if (!withinBounds) {
      return newval
    }
    if (start2 < stop2) {
      return constrain(newval, start2, stop2)
    } else {
      return constrain(newval, stop2, start2)
    }
  }
  onMousemove(event: any): void {
    // console.log('event', event)

    //console.log(event.srcElement.height)
    // console.log(event.offsetY)

    this.scaleValue = 2

    this.clientX = this.map(
      event.offsetX,
      0,
      event.srcElement.width,
      0,
      -event.srcElement.width * 0.5,
      true,
    )
    this.clientY = this.map(
      event.offsetY,
      0,
      event.srcElement.height,
      0,
      -event.srcElement.height * 0.5,
      true,
    )
    // this.clientX=(window.pageX - event.pageX * position) / 90
    // this.clientY=(eventt.page - event.pageX * position) / 90
  }
  changeParentImage(item: any) {
    this.selectedImage = item
  }
  changeSelectedItem(item: any) {
    this.selectedImage = item.imageProduct
    this.selectedItem = item
    //  console.log('🚀 ~ selectedItem ~ 🚀 ', this.selectedItem)
  }
  durationTimeSelect(event: any) {
    this.rangeTimeChoosed = true
  }
  segmentModifier: Function
  eventModifier: Function
  openModalDiponibilite(template: any) {
    this.modalService.open(template, {
      ariaLabelledBy: 'modal-basic-title',
      size: 'xl',
      centered: true,
    })
  }
  quantiteDispo: any = 0
  dateMin: any = new Date()
  prevBtnDisabled: boolean = false
  nextBtnDisabled: boolean = false
  dateOrViewChanged(): void {
    if (this.startsWithToday) {
      this.prevBtnDisabled = !this.isDateValid(
        subPeriod(
          this.dateAdapter,
          CalendarView.Day /*this.view*/,
          this.viewDate,
          1,
        ),
      )
      this.nextBtnDisabled = !this.isDateValid(
        addPeriod(
          this.dateAdapter,
          CalendarView.Day /*this.view*/,
          this.viewDate,
          1,
        ),
      )
    } else {
      this.prevBtnDisabled = !this.isDateValid(
        endOfPeriod(
          this.dateAdapter,
          CalendarView.Day /*this.view*/,
          subPeriod(
            this.dateAdapter,
            CalendarView.Day /*this.view*/,
            this.viewDate,
            1,
          ),
        ),
      )
      this.nextBtnDisabled = !this.isDateValid(
        startOfPeriod(
          this.dateAdapter,
          CalendarView.Day /*this.view*/,
          addPeriod(
            this.dateAdapter,
            CalendarView.Day /*this.view*/,
            this.viewDate,
            1,
          ),
        ),
      )
    }

    if (this.viewDate < this.minDate) {
      this.changeDate(this.minDate)
    } else if (this.viewDate > this.maxDate) {
      this.changeDate(this.maxDate)
    }
  }
  minDate: any = new Date()

  changeDate(date: Date): void {
    console.log('changeDate', date)
    this.viewDate = date
    this.dateOrViewChanged()
  }
  viewDaysOptionChanged(viewDays: any): void {
    console.log('viewDaysOptionChanged', viewDays)
    this.calendarScheduler.setViewDays(viewDays)
  }
  private isDateValid(date: Date): boolean {
    return /*isToday(date) ||*/ date >= this.minDate && date <= this.maxDate
  }

  eventTimesChanged({
    event,
    newStart,
    newEnd,
    type,
  }: SchedulerEventTimesChangedEvent): void {
    console.log('eventTimesChanged Type', type)
    console.log('eventTimesChanged Event', event)
    console.log('eventTimesChanged New Times', newStart, newEnd)
    const ev: any = this.events.find((e: any) => e.id === event.id)
    ev!.start = newStart
    ev!.end = newEnd
    this.refresh.next(ev)
  }
  events: any = []

  bgColor: string = '#f3c8cb !important'
  secondColor: string = '#ea7077'
  heureDebutLocation: any = new Date()
  heureFinLocation: any = new Date()
  heureFinMin: any = 0
  heureDebutChange(event: any) {
    this.heureDebutLocation = event.target.value
    console.log('heureDebutLocation', this.heureDebutLocation)

    this.heureFinMin = addDays(new Date(Date.parse(this.heureDebutLocation)), 1)
    //console.log('Before heureFinMin', this.heureFinMin)

    this.heureFinMin =
      this.heureFinMin.getFullYear() +
      '-' +
      this.heureFinMin.getMonth() +
      '-' +
      this.heureFinMin.getDate() +
      'T' +
      this.heureFinMin.getHours() +
      ':' +
      this.heureFinMin.getMinutes() +
      ':00'
    // this.heureFinMin = '2022-07-07T14:47:57'
    console.log('After heureFinMin', this.heureFinMin)

    this.locationForm.controls['heureFin'].enable()
    this.isValideToCalcule = false

    //this.locationForm.controls['heureFin'].setValue(addDays(this.heureDebutLocation, 1))
  }
  heureFinChange(event: any) {
    this.heureFinLocation = event.target.value
    this.locationForm.controls['quantite'].enable()

    this.quantiteDispo = this.calendarService.getQuantiteRestante(
      this.locationForm.value.heureDebut,
      this.locationForm.value.heureFin,
      this.product,
    )
    if (this.quantiteDispo <= 0) {
      this.toastr.error(
        '',
        'Indisponible pour le moment veuillez changer la Date',
        {
          timeOut: 2000,
          progressBar: true,
          progressAnimation: 'increasing',
          positionClass: 'toast-top-right',
        },
      )
    } else {
      this.toastr.info(
        '',
        'Disponible pour la location : ' + this.quantiteDispo,
        {
          timeOut: 2000,
          progressBar: true,
          progressAnimation: 'increasing',
          positionClass: 'toast-top-right',
        },
      )
    }
  }
  public sendLocation() {
    if (this.locationForm.valid) {
      this.locationForm.reset()
    } else {
      this.locationForm.markAllAsTouched()
    }
  }
  responsiveOptions: any = []

  produitSlider: any = [
    {
      id: 1,
      titre: 'Product 1',
      categorie: 'Computer',
      description:
        "As fellow graduate students at MIT in 2004, Brian and Dharmesh noticed a shift in the way people shop and buy. Consumers were no longer tolerating interruptive bids for their attention — in fact, they'd gotten really, really good at ignoring them. \n From this shift, a company was born: HubSpot. It was founded on inbound, the notion that people don't want to be interrupted by marketers or harassed by salespeople — they want to be helped.\n Today, the inbound movement continues to empower businesses around the world to stop interrupting, start helping, and return their focus to the customer.",
      image:
        'https://img01.ztat.net/article/spp-media-p1/d0a87e30bd8030d690b0213d248b2378/a0e9e6e779d747688b5a832e78981c9f.jpg?imwidth=300&filter=packshot',
      price: '200Dh',
      rating: 5,
      promo: {
        taux: '-40%',
        promoPrice: '100DH',
      },
      livraison: 'gratuite',
      others: [
        {
          image:
            'https://img01.ztat.net/article/spp-media-p1/23eb89e71fb93c4ca34003cacbf087ab/06d493e4fcbf46e8bc68d36f118240f5.jpg?imwidth=300&filter=packshot',
          titre: 'Product nb 1',
          price: '189Dh',
          rating: 5,
          promo: {
            taux: '-40%',
            promoPrice: '100DH',
          },
        },
        {
          image:
            'https://img01.ztat.net/article/spp-media-p1/b84642a1c2ac3c57832d6b53e9b4b246/8ab325f57e4d49dab2083269afe51392.jpg?imwidth=762&filter=packshot',
          titre: 'Product nb 2',
          price: 350,
          rating: 1,
        },
        {
          image:
            'https://img01.ztat.net/article/spp-media-p1/b84642a1c2ac3c57832d6b53e9b4b246/8ab325f57e4d49dab2083269afe51392.jpg?imwidth=50&filter=packshot',
          titre: 'Product nb 3',
          price: '75Dh',
          rating: 3.5,
        },
      ],
    },
    {
      id: 2,

      titre: 'Product 2',
      categorie: 'Chaussures',
      description:
        "As fellow graduate students at MIT in 2004, Brian and Dharmesh noticed a shift in the way people shop and buy. Consumers were no longer tolerating interruptive bids for their attention — in fact, they'd gotten really, really good at ignoring them. \n From this shift, a company was born: HubSpot. It was founded on inbound, the notion that people don't want to be interrupted by marketers or harassed by salespeople — they want to be helped.\n Today, the inbound movement continues to empower businesses around the world to stop interrupting, start helping, and return their focus to the customer.",
      image:
        'https://themes.pixelstrap.com/multikart/assets/images/pro3/27.jpg',
      price: '300Dh',
      rating: 2,
      others: [
        {
          image:
            'https://themes.pixelstrap.com/multikart/assets/images/pro3/34.jpg',
          name: '',
          price: '98.5Dh',
          rating: 4.5,
        },
      ],
    },
    {
      id: 3,

      titre: 'Product 3',
      categorie: 'Accessoires',
      description:
        "As fellow graduate students at MIT in 2004, Brian and Dharmesh noticed a shift in the way people shop and buy. Consumers were no longer tolerating interruptive bids for their attention — in fact, they'd gotten really, really good at ignoring them. \n From this shift, a company was born: HubSpot. It was founded on inbound, the notion that people don't want to be interrupted by marketers or harassed by salespeople — they want to be helped.\n Today, the inbound movement continues to empower businesses around the world to stop interrupting, start helping, and return their focus to the customer.",
      image: 'assets/images/antique.png',
      price: '400Dh',
      rating: 1,
    },
    {
      id: 4,

      titre: 'Product 4',
      categorie: 'Sport',
      description:
        "As fellow graduate students at MIT in 2004, Brian and Dharmesh noticed a shift in the way people shop and buy. Consumers were no longer tolerating interruptive bids for their attention — in fact, they'd gotten really, really good at ignoring them. \n From this shift, a company was born: HubSpot. It was founded on inbound, the notion that people don't want to be interrupted by marketers or harassed by salespeople — they want to be helped.\n Today, the inbound movement continues to empower businesses around the world to stop interrupting, start helping, and return their focus to the customer.",
      image: 'assets/images/book.png',
      price: '500Dh',
      rating: 2,
    },
  ]
  options: any = [
    {
      idP: 1,
      titre: 'Option 1 ',
      categorie: 'Accessoire',

      description:
        "As fellow graduate students at MIT in 2004, Brian and Dharmesh noticed a shift in the way people shop and buy. Consumers were no longer tolerating interruptive bids for their attention — in fact, they'd gotten really, really good at ignoring them. \n From this shift, a company was born: HubSpot. It was founded on inbound, the notion that people don't want to be interrupted by marketers or harassed by salespeople — they want to be helped.\n Today, the inbound movement continues to empower businesses around the world to stop interrupting, start helping, and return their focus to the customer.",
      imageProduct:
        'https://img01.ztat.net/article/spp-media-p1/7df9956ac3954b4d8e752bc3279c4896/50fbeeb7fcb44452a3113fa26fa5836d.jpg?imwidth=156&filter=packshot',
      type: 'vente',
      price: 100,
      quantite: 10,
      disponibility: [
        {
          dateDebut: '2022-06-12',
          dateFin: '2022-06-16',
          heureStart: '16:00',
          heureEnd: '17:00',
          title: 'Meeting 444',
          content: 'lorem ipsum dolor sit amet ',
          etat: 'en cours de publication',
          quantite: 1,
        },
        {
          dateDebut: '2022-06-15',
          dateFin: '2022-06-15',
          heureStart: '08:00',
          heureEnd: '17:00',
          title: 'En Location',
          content: 'lorem ipsum dolor sit amet ',
          etat: 'en cours de publication',
          quantite: 1,
        },
      ],
    },
    {
      idP: 1,
      titre: 'Option 2 ',
      categorie: 'Accessoire',

      description:
        "As fellow graduate students at MIT in 2004, Brian and Dharmesh noticed a shift in the way people shop and buy. Consumers were no longer tolerating interruptive bids for their attention — in fact, they'd gotten really, really good at ignoring them. \n From this shift, a company was born: HubSpot. It was founded on inbound, the notion that people don't want to be interrupted by marketers or harassed by salespeople — they want to be helped.\n Today, the inbound movement continues to empower businesses around the world to stop interrupting, start helping, and return their focus to the customer.",
      imageProduct:
        'https://img01.ztat.net/article/spp-media-p1/7df9956ac3954b4d8e752bc3279c4896/50fbeeb7fcb44452a3113fa26fa5836d.jpg?imwidth=156&filter=packshot',
      type: 'vente',
      price: 100,
      quantite: 10,
      disponibility: [
        {
          dateDebut: '2022-06-12',
          dateFin: '2022-06-16',
          heureStart: '16:00',
          heureEnd: '17:00',
          title: 'Meeting 444',
          content: 'lorem ipsum dolor sit amet ',
          etat: 'en cours de publication',
          quantite: 1,
        },
        {
          dateDebut: '2022-06-15',
          dateFin: '2022-06-15',
          heureStart: '08:00',
          heureEnd: '17:00',
          title: 'En Location',
          content: 'lorem ipsum dolor sit amet ',
          etat: 'en cours de publication',
          quantite: 1,
        },
      ],
    },
    {
      idP: 1,
      titre: 'Option 3 ',
      categorie: 'Accesoire',

      description:
        "As fellow graduate students at MIT in 2004, Brian and Dharmesh noticed a shift in the way people shop and buy. Consumers were no longer tolerating interruptive bids for their attention — in fact, they'd gotten really, really good at ignoring them. \n From this shift, a company was born: HubSpot. It was founded on inbound, the notion that people don't want to be interrupted by marketers or harassed by salespeople — they want to be helped.\n Today, the inbound movement continues to empower businesses around the world to stop interrupting, start helping, and return their focus to the customer.",
      imageProduct:
        'https://img01.ztat.net/article/spp-media-p1/7df9956ac3954b4d8e752bc3279c4896/50fbeeb7fcb44452a3113fa26fa5836d.jpg?imwidth=156&filter=packshot',
      type: 'vente',
      price: 100,
      quantite: 2,
      disponibility: [
        {
          dateDebut: '2022-06-12',
          dateFin: '2022-06-16',
          heureStart: '16:00',
          heureEnd: '17:00',
          title: 'Meeting 444',
          content: 'lorem ipsum dolor sit amet ',
          etat: 'en cours de publication',
          quantite: 1,
        },
        {
          dateDebut: '2022-06-15',
          dateFin: '2022-06-15',
          heureStart: '08:00',
          heureEnd: '17:00',
          title: 'En Location',
          content: 'lorem ipsum dolor sit amet ',
          etat: 'en cours de publication',
          quantite: 1,
        },
      ],
    },
  ]
  public min = '09:00'
  heureFinWork: any = '18:00'

  changeHeureFin(datePicker: any) {
    datePicker = datePicker.value

    if (datePicker != '') {
      this.locationForm
        .get('heureFin')
        .setValue(
          (datePicker.getHours() >= 10
            ? datePicker.getHours()
            : '0' + datePicker.getHours()) +
            ':' +
            (datePicker.getMinutes() == '0' ? '00' : datePicker.getMinutes()),
        )

      console.log('Value of LocationForm', this.locationForm.value)
      this.calculePrix()
    }
  }
  changeHeureDebut(datePicker: any) {
    datePicker = datePicker.value
    if (datePicker != '') {
      this.locationForm
        .get('heureDebut')
        .setValue(
          (datePicker.getHours() >= 10
            ? datePicker.getHours()
            : '0' + datePicker.getHours()) +
            ':' +
            (datePicker.getMinutes() == '0' ? '00' : datePicker.getMinutes()),
        )
    }
    this.locationForm.controls['dateFin'].enable()
    this.locationForm.controls['heureFin'].disable()
    this.locationForm.get('dateFin').setValue('')
    this.locationForm.get('heureFin').setValue('')
    this.heureFinStatus = true
    this.igxDateFin.value = ''

    console.log(this.locationForm.value)

    // this.calculePrix()
  }

  calculePrix() {
    let selectedDateDebut: any = new Date(
      this.locationForm.get('dateDebut').value,
    )
    selectedDateDebut.setHours(
      this.locationForm.get('heureDebut').value.split(':')[0],
    )
    selectedDateDebut.setMinutes(
      this.locationForm.get('heureDebut').value.split(':')[1],
    )

    // selectedDateDebut = selectedDateDebut.toString().split(' GMT')[0]

    selectedDateDebut = new Date(selectedDateDebut)

    console.log('selectedDateDebut', selectedDateDebut)

    let selectedDateFin: any = new Date(this.locationForm.get('dateFin').value)
    selectedDateFin.setHours(
      this.locationForm.get('heureFin').value.split(':')[0],
    )
    selectedDateFin.setMinutes(
      this.locationForm.get('heureFin').value.split(':')[1],
    )

    //   selectedDateFin = selectedDateFin.toString().split(' GMT')[0]
    selectedDateFin = new Date(selectedDateFin)

    console.log('selectedDateFin', selectedDateFin)

    this.sortArrayOfTaux(this.productTable[0].taux)

    let dateDiff = Date.parse(selectedDateFin) - Date.parse(selectedDateDebut)

    let index: any = ''

    index = this.getTauxIndex(this.productTable[0].taux, dateDiff)

    console.log('index', index)
    console.log(
      'this.productTable[0].taux[index]',
      this.productTable[0].taux[index],
    )
    if (index != -1) {
      if (this.productTable[0].taux[index].unite == 'min') {
        dateDiff = Math.ceil(dateDiff / 60 / 1000)
        console.log('DateDiff', +dateDiff)

        console.log(
          'Prix a payer min',
          +dateDiff * +this.productTable[0].taux[index].tarif,
        )
      } else if (this.productTable[0].taux[index].unite == 'heures') {
        dateDiff = Math.ceil(dateDiff / 60 / 1000 / 60)
        console.log(
          'Prix a payer heures',
          +dateDiff * +this.productTable[0].taux[index].tarif,
        )
      }
      if (this.productTable[0].taux[index].unite == 'jours') {
        dateDiff = Math.ceil(dateDiff / 24 / 60 / 60 / 1000)
        console.log(
          'Prix a payer jours',
          +dateDiff * +this.productTable[0].taux[index].tarif,
        )
      }
      if (this.productTable[0].taux[index].unite == 'mois') {
        dateDiff = Math.ceil(dateDiff / 2629746000)
        console.log(
          'Prix a payer mois',
          +dateDiff * +this.productTable[0].taux[index].tarif,
        )
      }
      this.productTable[0].price =
        dateDiff * +this.productTable[0].taux[index].tarif
      // console.log('date diff 2', dateDiff)
      this.isValideToCalcule = true
    } else {
      this.igxDateFin.value = ''
      this.toastr.error(
        '',
        'Durée selectionner hors nos duréé de reservation',
        {
          timeOut: 2000,
          progressBar: true,
          progressAnimation: 'increasing',
          positionClass: 'toast-top-right',
        },
      )
    }
    this.productTable[0].options?.map((opt: any) => {
      let indexOfOption: any = ''
      if (indexOfOption != -1) {
        if (opt.taux != undefined) {
          this.sortArrayOfTaux(opt.taux)
          console.log('opt.taux', opt.taux)
          dateDiff = Date.parse(selectedDateFin) - Date.parse(selectedDateDebut)
          console.log('dateDiff', dateDiff)

          indexOfOption = this.getTauxIndex(opt.taux, dateDiff)

          console.log('indexOfOption 🚀🚀🚀🚀🚀', indexOfOption)
          if (indexOfOption != -1) {
            if (opt.taux[indexOfOption].unite == 'min') {
              dateDiff = Math.ceil(dateDiff / 60 / 1000)
              console.log(
                '🚀 ~ Prix a payer min🚀 ~ 🚀 ~ ',
                +dateDiff * +opt.taux[indexOfOption].tarif,
              )
            } else if (opt.taux[indexOfOption].unite == 'heures') {
              dateDiff = Math.ceil(dateDiff / 60 / 1000 / 60)
              console.log(
                "🚀 ~ 🚀 ~ Prix a payer heures'🚀 ~ 🚀 ~ ",
                +dateDiff * +opt.taux[indexOfOption].tarif,
              )
            }
            if (opt.taux[indexOfOption].unite == 'jours') {
              dateDiff = Math.ceil(dateDiff / 24 / 60 / 60 / 1000)
              console.log(
                '🚀 ~ 🚀 ~ Prix a payer jours🚀 ~ 🚀 ~ ',
                +dateDiff * +opt.taux[indexOfOption].tarif,
              )
            }
            if (opt.taux[indexOfOption].unite == 'mois') {
              dateDiff = Math.ceil(dateDiff / 2629746000)
              console.log(
                '🚀 ~ 🚀 ~ Prix a payer mois🚀 ~ 🚀 ~ ',
                +dateDiff * +opt.taux[indexOfOption].tarif,
              )
            }

            opt.price = dateDiff * +opt.taux[indexOfOption].tarif
            console.log('---------price updated ', opt.price)
          } else {
            console.log('opt', opt)
          }
        } else {
          console.log('------------price initiale')
        }
      } else {
        this.toastr.error(
          '',
          'Durée selectionner hors nos duréé de reservation',
          {
            timeOut: 2000,
            progressBar: true,
            progressAnimation: 'increasing',
            positionClass: 'toast-top-right',
          },
        )
      }
    })

    this.calculeTotal()
  }

  reviews: any = []

  public sendReview() {
    if (this.reviewForm.valid) {
      this.reviewForm.reset()
    } else {
      this.reviewForm.markAllAsTouched()
    }
  }
  openModal(template: any, img: any) {
    this.imgModal = img

    this.modalService.open(template, {
      ariaLabelledBy: 'modal-basic-title',
      size: 'md',
    })
  }
  imgModal: any = ''
  livraisonDate(Dureedate: any) {
    return this.date.getDate() + Dureedate
  }
  date = new Date()
  heureDebutStatus: boolean = true
  heureFinStatus: boolean = true
  changeDateDebut(event: any) {
    this.isValideToCalcule = false

    this.locationForm.controls['heureDebut'].enable()
    this.locationForm.controls['dateFin'].disable()
    this.locationForm.controls['heureFin'].disable()
    this.locationForm.get('heureDebut').setValue('')
    this.heureDebutStatus = false
    this.heureFinStatus = true
    this.locationForm.get('dateFin').setValue('')
    this.locationForm.get('heureFin').setValue('')
    this.igxDateFin.value = ''
    this.igxDateDebut.value = ''
  }
  changeDateFin(event: any) {
    this.isValideToCalcule = false

    this.locationForm.get('heureFin').setValue('')
    this.heureFinStatus = false
    this.locationForm.controls['heureFin'].enable()
    this.igxDateFin.value = ''
  }
  onQuantiteChangeOptions(event: any, option: any, product: any) {
    option.quantiteSelected = +event.value
    option.totalPrix = +event.value * +option.price
    // console.log(option.totalPrix)

    product.totalPrix =
      +product.price * +(product.quantiteSelected || 1) +
      +(
        product.selectedOptions?.reduce((prev: any, next: any) => {
          return +prev + +next.totalPrix
        }, 0) || 0
      )
    this.calculeTotal()
  }
  onQuantiteChangeProduct(event: any, option: any, product: any) {
    option.quantiteSelected = +event.value
    option.totalPrix = +event.value * +option.price
    // console.log(option.totalPrix)

    product.totalPrix =
      +product.price * +(product.quantiteSelected || 1) +
      +(
        product.selectedOptions?.reduce((prev: any, next: any) => {
          return +prev + +next.totalPrix
        }, 0) || 0
      )
    this.calculeTotal()
  }
  tva: any = 0
  totalAPayer: any = ''
  calculeTotal() {
    this.productTable[0].options.map((option: any) => {
      option.totalPrix = option.price * (option.quantiteSelected || 1)
    })
    this.productTable[0].totalPrix =
      +this.productTable[0].price *
        +(this.productTable[0].quantiteSelected || 1) +
      +(
        this.productTable[0].selectedOptions?.reduce((prev: any, next: any) => {
          return +prev + +next.totalPrix
        }, 0) || 0
      )

    this.totalAPayer =
      this.productTable.reduce((prev: any, next: any) => {
        return +prev + +next.totalPrix
      }, 0) || this.productTable[0].price

    this.tva = 20

    console.log('selecetedProductDevis', this.productTable[0])
  }
  addOptionsCheckBox(event: any, option: any, product: any) {
    if (event.checked) {
      if (!product.selectedOptions) product.selectedOptions = [option]
      else product.selectedOptions.push(option)
      // if (!option.totalPrix) option.totalPrix = +option.price
      // else option.totalPrix += +option.price
      option.totalPrix = +option.price * (option.quantiteSelected || 1)
    } else {
      product.selectedOptions = product.selectedOptions.filter((p: any) => {
        return p.idP != option.idP
      })
    }
    console.log('selectedOptions', this.product)
    console.log('product', product)
    if (!product.totalPrix)
      product.totalPrix =
        +(
          product.selectedOptions?.reduce((prev: any, next: any) => {
            return +prev + +next.totalPrix
          }, 0) || 0
        ) + +product.price
    else
      product.totalPrix =
        +product.price * +(product.quantiteSelected || 1) +
        +(
          product.selectedOptions?.reduce((prev: any, next: any) => {
            return +prev + +next.totalPrix
          }, 0) || 0
        )
    this.productTable.map((item: any) => {
      this.totalSelectedElementPrix += +item.totalPrix
      this.totalSelectedElementQuantite += +item.quantiteSelected
    })
    this.calculeTotal()

    console.log(this.totalSelectedElementPrix)
  }
  totalSelectedElementPrix: any = 0
  totalSelectedElementQuantite: any = 0
  sortArrayOfTaux(taux: any) {
    taux.sort((a: any, b: any) => {
      // console.log(a.unite)
      if (a.unite == 'min' && b.unite != 'min') {
        return -1
      } else if (b.unite == 'min' && a.unite != 'min') {
        return 1
      }
      if (a.unite == 'heures' && b.unite != 'heures') {
        return -1
      } else if (b.unite == 'heures' && a.unite != 'heures') {
        return 1
      }
      if (a.unite == 'jours' && b.unite != 'jours') {
        return -1
      } else if (b.unite == 'jours' && a.unite != 'jours') {
        return 1
      }
      if (a.unite == 'annee' && b.unite != 'annee') {
        return -1
      } else if (b.unite == 'annee' && a.unite != 'annee') {
        return 1
      }

      return a.heureDebut >= b.heureDebut ? 1 : -1
    })
  }
  getTauxIndex(taux: any, dateDiff: any) {
    let index: any = -1
    taux.map((t: any, i: any) => {
      if (
        t.unite == 'min' &&
        t.dateDebut * 60 * 1000 <= dateDiff &&
        t.dateFin * 60 * 1000 > dateDiff
      ) {
        index = i
      } else if (
        t.unite == 'heures' &&
        t.dateDebut * 60 * 60 * 1000 <= dateDiff &&
        t.dateFin * 60 * 60 * 1000 > dateDiff
      ) {
        index = i
      } else if (
        t.unite == 'jours' &&
        t.dateDebut * 24 * 60 * 60 * 1000 <= dateDiff &&
        t.dateFin * 24 * 60 * 60 * 1000 > dateDiff
      ) {
        index = i
      } else if (
        (t.unite == 'mois' && t.dateDebut * 2,
        629746000 <= dateDiff && t.dateFin * 2629746000 > dateDiff)
      ) {
        index = i
      }
    })
    console.log('index return', index)

    return index
  }
  @ViewChild('datePickerFin') igxDateFin: any
  @ViewChild('datePickerDebut') igxDateDebut: any

  isValideToCalcule: boolean = false
}
