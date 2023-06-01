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
import { CalendarSchedulerService } from '../../services/calendar-scheduler.service'
@Component({
  selector: 'app-product-page',
  templateUrl: './product-page.component.html',
  styleUrls: ['./product-page.component.scss'],
})
export class ProductPageComponent implements OnInit {
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

      heureDebut: new FormControl('', [Validators.required]),
      heureFin: new FormControl({ value: '', disabled: true }, [
        Validators.required,
      ]),
      quantite: new FormControl({ value: '', disabled: true }, [
        Validators.required,
        Validators.max(this.quantiteDispo - 2),
      ]),
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
  }

  societeData: any = {}
  cashBack: any = []
  produit: any = {}
  selectedImage: any = ''
  selectedItem: any = {}
  produitSlider: any = []
  public locationForm: FormGroup

  public reviewForm: FormGroup
  reviews: any = []
  public sendDevis() {
    if (this.reviewForm.valid) {
      this.reviewForm.reset()
    } else {
      this.reviewForm.markAllAsTouched()
    }
  }
  public sendLocation() {
    if (this.locationForm.valid) {
      this.locationForm.reset()
    } else {
      this.locationForm.markAllAsTouched()
    }
  }
  totalReviews: any = 125
  changeParentImage(item: any) {
    this.selectedImage = item
  }
  changeSelectedItem(item: any) {
    this.selectedImage = item.imageProduct
    this.selectedItem = item
    //  console.log('🚀 ~ selectedItem ~ 🚀 ', this.selectedItem)
  }
  date = new Date()
  livraisonDate(Dureedate: any) {
    return this.date.getDate() + Dureedate
  }
  dateMin: any = new Date()
  responsiveOptions: any = []
  onChangeDate(event: any) {
    console.log('🚀 ~ event ~ 🚀 ', event)
    this.minDate = new Date(event.target.value)
  }
  minDate: any = new Date()
  events: any = []
  ngOnInit(): void {
    // this.formatData(this.product.disponibility)
    this.events = this.calendarService.formatData(
      this.product.disponibility,
      [],
    )
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
    this.societeData = {
      id: localStorage.getItem('vendeurId'),
      image: 'assets/images/organisation.jpg',
      name: 'Nom De La Societe',
      resume:
        "Au plan juridique, une société est une fiction légale conférant la personnalité juridique à une entité économique formée de plusieurs personnes qui mettent en commun des biens, des droits, des capitaux ou des services en vue d'un objet que leurs conventions déterminent.",
      secteur: 'Digital Marketing',
      email: 'testEmail1@gmail.com',
      telephone: '+212 5 20 36 98 74',
      localisation: '120, Bd La Resistance Tanger',
    }
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

    this.produitSlider = [
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
    console.log('societe date', this.societeData.id)
  }

  isEmptyObject(obj: any) {
    return obj && Object.keys(obj).length === 0
  }
  increment() {
    this.nb++
  }
  decrement() {
    if (this.nb > 1) this.nb--
  }
  nb: number = 1
  clientX: any = 0
  clientY: any = 0
  scaleValue: any = 1
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
  onMouseout() {
    this.scaleValue = 1
    this.clientX = 0
    this.clientY = 0
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

  openModal(template: any, img: any) {
    this.imgModal = img

    this.modalService.open(template, {
      ariaLabelledBy: 'modal-basic-title',
      size: 'md',
    })
  }
  imgModal: any = ''

  openModal2(template: any) {
    this.modalService.open(template, {
      ariaLabelledBy: 'modal-basic-title',
      size: 'md',
      centered: true,
    })
  }
  reader: any = []
  alreadyExist: boolean = false
  alreadyExistSeller: boolean = false

  addToCart() {
    this.reader = localStorage.getItem('panier')
    this.reader = JSON.parse(this.reader)
    if (this.reader.length > 0) {
      this.reader.map((panier: any) => {
        console.log(localStorage.getItem('vendeurId'))
        this.alreadyExistSeller = false

        if (panier.vendeur.id == localStorage.getItem('vendeurId')) {
          this.alreadyExistSeller = true
          this.alreadyExist = false
          panier.products.map((panierProducts: any) => {
            if (panierProducts.idP == this.selectedItem.idP) {
              this.alreadyExist = true
            }
          })
          if (this.alreadyExist) {
            this.toastr.error('', 'Element Deja Sélectionnée', {
              timeOut: 2000,
              progressBar: true,
              progressAnimation: 'increasing',
              positionClass: 'toast-top-right',
            })
          } else {
            this.toastr.success('', 'Element Ajouter Au Panier', {
              timeOut: 2000,
              progressBar: true,
              progressAnimation: 'increasing',
              positionClass: 'toast-top-right',
            })
            panier.products.push({
              idP: this.selectedItem.idP,
              name: this.selectedItem.titre,
              image: this.selectedItem.imageProduct,
              quantite: this.nb,
              price: this.selectedItem.price,
            })
          }
        }
      })
    } else {
      console.log('entred 2 ')
      this.alreadyExistSeller = true
      this.toastr.success('', '-- Element Ajouter Au Panier --', {
        timeOut: 2000,
        progressBar: true,
        progressAnimation: 'increasing',
        positionClass: 'toast-top-right',
      })
      this.reader.push({
        vendeur: {
          id: localStorage.getItem('vendeurId'),
          name: this.societeData.name,
        },
        products: [
          {
            idP: this.selectedItem.idP,
            name: this.selectedItem.titre,
            image: this.selectedItem.imageProduct,
            quantite: this.nb,
            price: this.selectedItem.price,
          },
        ],
      })
    }
    if (!this.alreadyExistSeller) {
      this.toastr.success('', 'Element Ajouter Au Panier', {
        timeOut: 2000,
        progressBar: true,
        progressAnimation: 'increasing',
        positionClass: 'toast-top-right',
      })
      this.reader.push({
        vendeur: {
          id: localStorage.getItem('vendeurId'),
          name: this.societeData.name,
        },
        products: [
          {
            idP: this.selectedItem.idP,
            name: this.selectedItem.titre,
            image: this.selectedItem.imageProduct,
            quantite: this.nb,
            price: this.selectedItem.price,
          },
        ],
      })
    }
    localStorage.setItem('panier', JSON.stringify(this.reader))
    console.log('🚀 ~ this.reader.length ~ 🚀  ', this.reader)
  }
  wishList: any = []
  alreadyExistWish: boolean = false

  addToWishList() {
    this.alreadyExistWish = false
    this.wishList = localStorage.getItem('wishlist')
    this.wishList = JSON.parse(this.wishList)
    console.log('Whishlist Before', this.wishList)

    this.wishList.map((wishlist: any) => {
      if (wishlist.idP == this.selectedItem.idP) {
        this.alreadyExistWish = true
      }
    })
    console.log('🚀 ~this.alreadyExistWish', this.alreadyExistWish)

    if (this.alreadyExistWish) {
      console.log('🚀 ~if 1')

      this.toastr.error('', 'Element Déjà Ajouter', {
        timeOut: 2000,
        progressBar: true,
        progressAnimation: 'increasing',
        positionClass: 'toast-top-right',
      })
    } else {
      console.log('🚀 ~iElse 2 ')

      this.toastr.info('', 'Element  Ajouter', {
        timeOut: 2000,
        progressBar: true,
        progressAnimation: 'increasing',
        positionClass: 'toast-top-right',
      })

      this.wishList.push({
        idP: this.selectedItem.idP,
        name: this.selectedItem.titre,
        image: this.selectedItem.imageProduct,
        link: '/cart/details/product',
        price: this.selectedItem.price,
        rating: this.selectedItem.rating,
      })
    }
    localStorage.setItem('wishlist', JSON.stringify(this.wishList))
  }
  louer(template: any) {
    this.locationForm.reset()
    this.modalService.open(template, {
      ariaLabelledBy: 'modal-basic-title',
      size: 'xl',
      centered: true,
    })
  }
  handleChange(e: any) {
    let isChecked = e.checked
    if (isChecked) {
      this.modeNavigation = 'vente'
    } else {
      this.modeNavigation = 'location'
    }
  }

  product = {
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
        dateDebut: '2022-07-06',
        dateFin: '2022-07-13',
        heureStart: '16:00',
        heureEnd: '17:00',
        title: 'Meeting 444',
        content: 'lorem ipsum dolor sit amet ',
        etat: 'en cours de publication',
        quantite: 1,
      },
      {
        dateDebut: '2022-06-07',
        dateFin: '2022-06-07',
        heureStart: '08:00',
        heureEnd: '17:00',
        title: 'En Location',
        content: 'lorem ipsum dolor sit amet ',
        etat: 'en cours de publication',
        quantite: 1,
      },

      {
        dateDebut: '2022-06-07',
        dateFin: '2022-06-09',
        heureStart: '12:00',
        heureEnd: '13:00',
        title: 'Meeting 1',
        content: 'lorem ipsum dolor sit amet ',
        etat: 'en cours de publication',
        quantite: 1,
      },
      {
        dateDebut: '2022-06-07',
        dateFin: '2022-06-07',
        heureStart: '15:00',
        heureEnd: '16:00',
        title: 'Meeting 2',
        content: 'lorem ipsum dolor sit amet ',
        etat: 'en cours de publication',
        quantite: 1,
      },
      {
        dateDebut: '2022-06-08',
        dateFin: '2022-06-10',
        heureStart: '10:00',
        heureEnd: '12:00',
        title: 'Meeting 5',
        content: 'lorem ipsum dolor sit amet ',
        etat: 'en cours de publication',
        quantite: 2,
      },
    ],
  }
  reservation = {
    dateDebut: '2022-06-12T17:27',
    dateFin: '2022-06-16T17:27',
    duree: '',
    uniteeDure: 'jours',
    objetConcernee: [
      {
        typeObjet: 'car',
        refObjet: 'car1',
        quantite: '10',
        dateDebut: '2022-06-12T17:27',
        datefin: '2022-06-13T17:27',
        duree: '2',
        uniteDuree: 'jours',
      },
    ],
  }
  openModalDiponibilite(template: any) {
    this.modalService.open(template, {
      ariaLabelledBy: 'modal-basic-title',
      size: 'xl',
      centered: true,
    })
  }
  quantiteDispo: any = 0

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
  changeDate(date: Date): void {
    console.log('changeDate', date)
    this.viewDate = date
    this.dateOrViewChanged()
  }
  viewDaysOptionChanged(viewDays: any): void {
    console.log('viewDaysOptionChanged', viewDays)
    this.calendarScheduler.setViewDays(viewDays)
  }

  modeNavigation: any = 'reservation-vente'

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

  segmentModifier: Function
  eventModifier: Function

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
}
