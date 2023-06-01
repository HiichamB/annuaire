import { Component, OnInit, ViewChild } from '@angular/core'

import { TabView } from 'primeng/tabview'
import { SelectItem, TreeNode } from 'primeng/api'
import { FormBuilder, FormControl, FormGroup, Validators } from '@angular/forms'
import { CalendarEvent } from 'angular-calendar'
import {
  startOfDay,
  endOfDay,
  subDays,
  addDays,
  endOfMonth,
  isSameDay,
  isSameMonth,
  addHours,
} from 'date-fns'
import { Router } from '@angular/router'
import { NavService } from 'src/app/shared/services/nav.service'
declare var google: any
@Component({
  selector: 'app-annuaire-details-page',
  templateUrl: './annuaire-details-page.component.html',
  styleUrls: ['./annuaire-details-page.component.scss'],
})
export class AnnuaireDetailsPageComponent implements OnInit {
  @ViewChild(TabView)
  tabView!: TabView
  @ViewChild('gmap') mapModule: any
  mainMenuToggle(): void {
    this.navServices.mainMenuToggle = !this.navServices.mainMenuToggle
  }

  filter_value: any = ''
  constructor(
    public navServices: NavService,
    private fb: FormBuilder,
    private router: Router,
  ) {
    this.idSociete = localStorage.getItem('vendeurId')
    this.idSociete = JSON.parse(this.idSociete)
    this.SavForm = this.fb.group({
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
    this.DevisForm = this.fb.group({
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
    this.RDVForm = this.fb.group({
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
      date: new FormControl('', [Validators.required]),
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
    this.date = new Date().toISOString().slice(0, 10)
  }
  date: any = ''
  commentaires: any = []
  items: any[] = []

  scrollableItems: any[] = []

  activeItem: any

  sortOptions: SelectItem[] = []

  sortOrder: number = 0

  sortField: string = ''

  data1: TreeNode[] = []
  menuViewChange(event: any) {
    //  console.log('selected item', event)

    this.selectedItem = event.title
    console.log(this.selectedItem)
  }

  selectedItem: any = 'Presentation'
  onChange($event: any) {
    this.activeItem = $event.index
  }
  onSortChange(event: any) {
    let value = event
    console.log(
      '🚀 ~ file: annuaire-details-page.component.ts ~ line 41 ~ AnnuaireDetailsPageComponent ~ onSortChange ~ value',
      value,
    )

    if (value == 'price') {
      this.items.map((element) => {
        if (element.label == 'Produits') {
          console.log('🚀 ~ elementItems', element.children)
          element.children[0].Produits.sort(
            (a: any, b: any) => a.price <= b.price,
          )
        }
      })
    } else {
    }
  }
  societeData: any = {
    Presentation: [
      {
        titre: 'Resume',
        texte:
          "Pour ce faire, une entreprise fait appel, mobilise et consomme desressources (matérielles, humaines, financières, immatérielles et informationnelles) ce qui la conduit à devoir coordonner des fonctions (fonction d'achat, fonction commerciale, fonction informatique, etc.). Elle exerce son activité dans le cadre d'un contexte précis auquel elle doit s'adapter : un environnement plus ou moins concurrentiel, une filière technico-économique caractérisée par un état de l'art, un cadre socio-culturel et réglementaire spécifique. Elle peut se donner comme objectif de dégager un certain niveau de rentabilité.",
      },
      {
        titre: 'Our Mission',
        texte:
          "There's this notion that to grow a business, you have to be ruthless. But we know there's a better way to grow. One where what's good for the bottom line is also good for customers. We believe businesses can grow with a conscience, and succeed with a soul — and that they can do it with inbound. That's why we've created an ecosystem uniting software, education, and community to help businesses grow better every day.",
      },

      {
        titre: 'Our Story',
        texte:
          "As fellow graduate students at MIT in 2004, Brian and Dharmesh noticed a shift in the way people shop and buy. Consumers were no longer tolerating interruptive bids for their attention — in fact, they'd gotten really, really good at ignoring them. \n From this shift, a company was born: HubSpot. It was founded on inbound, the notion that people don't want to be interrupted by marketers or harassed by salespeople — they want to be helped.\n Today, the inbound movement continues to empower businesses around the world to stop interrupting, start helping, and return their focus to the customer.",
      },
    ],
    Fiche: [
      {
        titre: 'Resume',
        texte:
          "Pour ce faire, une entreprise fait appel, mobilise et consomme desressources (matérielles, humaines, financières, immatérielles et informationnelles) ce qui la conduit à devoir coordonner des fonctions (fonction d'achat, fonction commerciale, fonction informatique, etc.). Elle exerce son activité dans le cadre d'un contexte précis auquel elle doit s'adapter : un environnement plus ou moins concurrentiel, une filière technico-économique caractérisée par un état de l'art, un cadre socio-culturel et réglementaire spécifique. Elle peut se donner comme objectif de dégager un certain niveau de rentabilité.",
      },
      {
        titre: 'Our Mission',
        texte:
          "There's this notion that to grow a business, you have to be ruthless. But we know there's a better way to grow. One where what's good for the bottom line is also good for customers. We believe businesses can grow with a conscience, and succeed with a soul — and that they can do it with inbound. That's why we've created an ecosystem uniting software, education, and community to help businesses grow better every day.",
      },

      {
        titre: 'Our Story',
        texte:
          "As fellow graduate students at MIT in 2004, Brian and Dharmesh noticed a shift in the way people shop and buy. Consumers were no longer tolerating interruptive bids for their attention — in fact, they'd gotten really, really good at ignoring them. \n From this shift, a company was born: HubSpot. It was founded on inbound, the notion that people don't want to be interrupted by marketers or harassed by salespeople — they want to be helped.\n Today, the inbound movement continues to empower businesses around the world to stop interrupting, start helping, and return their focus to the customer.",
      },
    ],
    histoire: [
      {
        titre: 'Notre Histoire',
        texte:
          "Dell Technologies, Inc est une entreprise américaine troisième plus grand constructeur d'ordinateurs au monde en 2012 derrière Hewlett-Packard et Lenovo2. Son siège est basé à Round Rock dans l'État du Texas.\n Même si Dell Computer est surtout connu pour les PC qu'il conçoit, fabrique et vend aux particuliers et aux professionnels, il est également présent sur les marchés de serveurs d'entreprise, de systèmes de sauvegarde et stockage de données et du matériel spécifique aux réseaux informatiques.\n Dell propose également des logiciels et des périphériques comme des imprimantes, appareils photos numériques, et beaucoup d'autres encore. Dell était coté au Nasdaq à New York sous le symbole DELL jusqu'en 2013, sorti de la bourse en 2013 et réintroduit en 2018.",
      },

      {
        titre: 'Our Story',
        texte:
          "As fellow graduate students at MIT in 2004, Brian and Dharmesh noticed a shift in the way people shop and buy. Consumers were no longer tolerating interruptive bids for their attention — in fact, they'd gotten really, really good at ignoring them. \n From this shift, a company was born: HubSpot. It was founded on inbound, the notion that people don't want to be interrupted by marketers or harassed by salespeople — they want to be helped.\n Today, the inbound movement continues to empower businesses around the world to stop interrupting, start helping, and return their focus to the customer.",
      },
    ],
    gallerie: [
      {
        previewImageSrc:
          'https://mdbcdn.b-cdn.net/img/Photos/Slides/img%20(23).webp',
        thumbnailImageSrc:
          'https://mdbcdn.b-cdn.net/img/Photos/Slides/img%20(23).webp',
        alt: 'Description for Image 1',
        title: 'Title 1',
        type: 'image',
      },
      {
        previewImageSrc:
          'https://mdbcdn.b-cdn.net/img/Photos/Slides/img%20(15).webp',
        thumbnailImageSrc:
          'https://mdbcdn.b-cdn.net/img/Photos/Slides/img%20(15).webp',
        alt: 'Description for Image 2',
        title: 'Title 2',
        type: 'image',
      },
      {
        previewImageSrc: 'https://mdbcdn.b-cdn.net/img/new/slides/041.webp',
        thumbnailImageSrc: 'https://mdbcdn.b-cdn.net/img/new/slides/041.webp',
        alt: 'Description for Image 3',
        title: 'Title 3',
        type: 'image',
      },
      {
        previewImageSrc: 'assets/videos/ash-mosaique.mp4',
        thumbnailImageSrc: 'assets/images/video-img.jpg',
        alt: 'Description for Image 4',
        title: 'Title 4',
        type: 'video',
      },
    ],
    Produits: [
      {
        id: 1,
        titre: 'Product 1',
        categorie: 'Sandales',
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
            id: 110,

            image:
              'https://img01.ztat.net/article/spp-media-p1/23eb89e71fb93c4ca34003cacbf087ab/06d493e4fcbf46e8bc68d36f118240f5.jpg?imwidth=300&filter=packshot',
            name: 'Product 1235',
            categorie: 'Sandales',
            price: '189Dh',
            rating: 5,
            promo: {
              taux: '-40%',
              promoPrice: '100DH',
            },
          },
          {
            id: 120,

            categorie: 'Sandales',
            image:
              'https://img01.ztat.net/article/spp-media-p1/b84642a1c2ac3c57832d6b53e9b4b246/8ab325f57e4d49dab2083269afe51392.jpg?imwidth=762&filter=packshot',
            name: 'Product 56874',
            price: 350,
            rating: 1,
          },
          {
            categorie: 'Sandales',
            image:
              'https://img01.ztat.net/article/spp-media-p1/b84642a1c2ac3c57832d6b53e9b4b246/8ab325f57e4d49dab2083269afe51392.jpg?imwidth=50&filter=packshot',
            name: 'Product dd45',
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
            id: 210,

            image:
              'https://themes.pixelstrap.com/multikart/assets/images/pro3/34.jpg',
            name: 'name prod',
            price: '98.5Dh',
            rating: 4.5,
          },
        ],
      },
      {
        id: 3654,

        titre: 'Product 3',
        categorie: 'Accessoires',
        description:
          "As fellow graduate students at MIT in 2004, Brian and Dharmesh noticed a shift in the way people shop and buy. Consumers were no longer tolerating interruptive bids for their attention — in fact, they'd gotten really, really good at ignoring them. \n From this shift, a company was born: HubSpot. It was founded on inbound, the notion that people don't want to be interrupted by marketers or harassed by salespeople — they want to be helped.\n Today, the inbound movement continues to empower businesses around the world to stop interrupting, start helping, and return their focus to the customer.",
        image: 'assets/images/antique.png',
        price: '400Dh',
        rating: 1,
      },
      {
        id: 48787,

        titre: 'Product 4',
        categorie: 'Sport',
        description:
          "As fellow graduate students at MIT in 2004, Brian and Dharmesh noticed a shift in the way people shop and buy. Consumers were no longer tolerating interruptive bids for their attention — in fact, they'd gotten really, really good at ignoring them. \n From this shift, a company was born: HubSpot. It was founded on inbound, the notion that people don't want to be interrupted by marketers or harassed by salespeople — they want to be helped.\n Today, the inbound movement continues to empower businesses around the world to stop interrupting, start helping, and return their focus to the customer.",
        image: 'assets/images/book.png',
        price: '500Dh',
        rating: 2,
      },
      {
        id: 5545,
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
            id: 7875,

            image:
              'https://img01.ztat.net/article/spp-media-p1/23eb89e71fb93c4ca34003cacbf087ab/06d493e4fcbf46e8bc68d36f118240f5.jpg?imwidth=300&filter=packshot',
            name: '',
            price: '189Dh',
            rating: 5,
            promo: {
              taux: '-40%',
              promoPrice: '100DH',
            },
          },
          {
            id: 56864,

            image:
              'https://img01.ztat.net/article/spp-media-p1/b84642a1c2ac3c57832d6b53e9b4b246/8ab325f57e4d49dab2083269afe51392.jpg?imwidth=762&filter=packshot',
            name: '',
            price: 350,
            rating: 1,
          },
          {
            image:
              'https://img01.ztat.net/article/spp-media-p1/b84642a1c2ac3c57832d6b53e9b4b246/8ab325f57e4d49dab2083269afe51392.jpg?imwidth=50&filter=packshot',
            name: '',
            price: '75Dh',
            rating: 3.5,
          },
        ],
      },
      {
        id: 62,

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
            id: 5642145,

            image:
              'https://themes.pixelstrap.com/multikart/assets/images/pro3/34.jpg',
            name: '',
            price: '98.5Dh',
            rating: 4.5,
          },
        ],
      },
      {
        id: 114548745,
        titre: 'Product Test',
        categorie: 'Sandales',
        description:
          "As fellow graduate students at MIT in 2004, Brian and Dharmesh noticed a shift in the way people shop and buy. Consumers were no longer tolerating interruptive bids for their attention — in fact, they'd gotten really, really good at ignoring them. \n From this shift, a company was born: HubSpot. It was founded on inbound, the notion that people don't want to be interrupted by marketers or harassed by salespeople — they want to be helped.\n Today, the inbound movement continues to empower businesses around the world to stop interrupting, start helping, and return their focus to the customer.",
        image:
          'https://img01.ztat.net/article/spp-media-p1/b84642a1c2ac3c57832d6b53e9b4b246/8ab325f57e4d49dab2083269afe51392.jpg?imwidth=762&filter=packshot',

        price: '45800Dh',
        rating: 5,
        promo: {
          taux: '-40%',
          promoPrice: '100DH',
        },
        livraison: 'gratuite',
        others: [],
      },
    ],
    Promo: [
      {
        titre: 'Product 1',
        description:
          "As fellow graduate students at MIT in 2004, Brian and Dharmesh noticed a shift in the way people shop and buy. Consumers were no longer tolerating interruptive bids for their attention — in fact, they'd gotten really, really good at ignoring them. \n From this shift, a company was born: HubSpot. It was founded on inbound, the notion that people don't want to be interrupted by marketers or harassed by salespeople — they want to be helped.\n Today, the inbound movement continues to empower businesses around the world to stop interrupting, start helping, and return their focus to the customer.",
        image: 'assets/images/book.png',
        price: '200Dh',
      },
      {
        titre: 'Product 2',
        description:
          "As fellow graduate students at MIT in 2004, Brian and Dharmesh noticed a shift in the way people shop and buy. Consumers were no longer tolerating interruptive bids for their attention — in fact, they'd gotten really, really good at ignoring them. \n From this shift, a company was born: HubSpot. It was founded on inbound, the notion that people don't want to be interrupted by marketers or harassed by salespeople — they want to be helped.\n Today, the inbound movement continues to empower businesses around the world to stop interrupting, start helping, and return their focus to the customer.",
        image: 'assets/images/car.png',
        price: '300Dh',
      },
      {
        titre: 'Product 3',
        description:
          "As fellow graduate students at MIT in 2004, Brian and Dharmesh noticed a shift in the way people shop and buy. Consumers were no longer tolerating interruptive bids for their attention — in fact, they'd gotten really, really good at ignoring them. \n From this shift, a company was born: HubSpot. It was founded on inbound, the notion that people don't want to be interrupted by marketers or harassed by salespeople — they want to be helped.\n Today, the inbound movement continues to empower businesses around the world to stop interrupting, start helping, and return their focus to the customer.",
        image: 'assets/images/antique.png',
        price: '400Dh',
      },
      {
        titre: 'Product 4',
        description:
          "As fellow graduate students at MIT in 2004, Brian and Dharmesh noticed a shift in the way people shop and buy. Consumers were no longer tolerating interruptive bids for their attention — in fact, they'd gotten really, really good at ignoring them. \n From this shift, a company was born: HubSpot. It was founded on inbound, the notion that people don't want to be interrupted by marketers or harassed by salespeople — they want to be helped.\n Today, the inbound movement continues to empower businesses around the world to stop interrupting, start helping, and return their focus to the customer.",
        image: 'assets/images/book.png',
        price: '500Dh',
      },
    ],
    Documents: [
      {
        titre: 'Document 1',
        description:
          "As fellow graduate students at MIT in 2004, Brian and Dharmesh noticed a shift in the way people shop and buy. Consumers were no longer tolerating interruptive bids for their attention — in fact, they'd gotten really, really good at ignoring them. \n From this shift, a company was born: HubSpot. It was founded on inbound, the notion that people don't want to be interrupted by marketers or harassed by salespeople — they want to be helped.\n Today, the inbound movement continues to empower businesses around the world to stop interrupting, start helping, and return their focus to the customer.",
        image: 'assets/images/book.png',
        dateEdition: '2016-05-18T16:00:00Z',
      },
      {
        titre: 'Document 2',
        description:
          "As fellow graduate students at MIT in 2004, Brian and Dharmesh noticed a shift in the way people shop and buy. Consumers were no longer tolerating interruptive bids for their attention — in fact, they'd gotten really, really good at ignoring them. \n From this shift, a company was born: HubSpot. It was founded on inbound, the notion that people don't want to be interrupted by marketers or harassed by salespeople — they want to be helped.\n Today, the inbound movement continues to empower businesses around the world to stop interrupting, start helping, and return their focus to the customer.",
        image: 'assets/images/car.png',
        dateEdition: '2016-05-18T16:00:00Z',
      },
      {
        titre: 'Document 3',
        description:
          "As fellow graduate students at MIT in 2004, Brian and Dharmesh noticed a shift in the way people shop and buy. Consumers were no longer tolerating interruptive bids for their attention — in fact, they'd gotten really, really good at ignoring them. \n From this shift, a company was born: HubSpot. It was founded on inbound, the notion that people don't want to be interrupted by marketers or harassed by salespeople — they want to be helped.\n Today, the inbound movement continues to empower businesses around the world to stop interrupting, start helping, and return their focus to the customer.",
        image: 'assets/images/antique.png',
        dateEdition: '2016-05-18T16:00:00Z',
      },
      {
        titre: 'Document 4',
        description:
          "As fellow graduate students at MIT in 2004, Brian and Dharmesh noticed a shift in the way people shop and buy. Consumers were no longer tolerating interruptive bids for their attention — in fact, they'd gotten really, really good at ignoring them. \n From this shift, a company was born: HubSpot. It was founded on inbound, the notion that people don't want to be interrupted by marketers or harassed by salespeople — they want to be helped.\n Today, the inbound movement continues to empower businesses around the world to stop interrupting, start helping, and return their focus to the customer.",
        image: 'assets/images/book.png',
        dateEdition: '2016-05-18T16:00:00Z',
      },
    ],
    QuestionReponse: [
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
    evenement: [
      {
        date_debut: '2022-05-15',
        date_fin: ' 2022-07-26',
        titre: 'Titre Evenet 1',
        description: 'Description Accusantium sint del',
        img: 'assets/images/event.jpg',
        localisation: '120, BD La Resistance',
      },
      {
        date_debut: '2022-04-15',
        date_fin: ' 2022-09-01',
        titre: 'Titre Evenet 2',
        description: 'Description Accusantium sint del',
        img: 'assets/images/event.jpg',
        localisation: '200, BD La Mohammed 5',
      },
      {
        date_debut: '2022-01-01',
        date_fin: ' 2022-12-26',
        titre: 'Titre Evenet 3',
        description: 'Description Accusantium sint del',
        img: 'assets/images/event.jpg',
        localisation: '120, BD La Rencontre',
      },
    ],
    equipe: [
      {
        name: 'Hicham',
        prenom: 'Berdouki',
        fonction: 'MEAN Stack Developper',
      },
      {
        name: 'Soufiane',
        prenom: 'Soufiane',
        fonction: 'MEAN Stack Developper',
      },
      {
        name: 'Samira',
        prenom: 'Samira',
        fonction: 'MEAN Stack Developper',
      },
      {
        name: 'Jouhaina',
        prenom: 'Jouhaina',
        fonction: 'Data Analyst',
      },
    ],
    Filiale: [
      {
        image: 'assets/images/organisation.jpg',
        name: 'Societe Filiale',
        resume:
          "Au plan juridique, une société est une fiction légale conférant la personnalité juridique à une entité économique formée de plusieurs personnes qui mettent en commun des biens, des droits, des capitaux ou des services en vue d'un objet que leurs conventions déterminent.",
        secteur: 'Digital Marketing',
        email: 'testEmail1@gmail.com',
        telephone: '+212 5 20 36 98 74',
        localisation: '120, Bd La Resistance Tanger',
      },
      {
        image: 'assets/images/organisation.jpg',
        name: 'Societe Filiale 2',
        resume:
          "Au plan juridique, une société est une fiction légale conférant la personnalité juridique à une entité économique formée de plusieurs personnes qui mettent en commun des biens, des droits, des capitaux ou des services en vue d'un objet que leurs conventions déterminent.",
        secteur: 'Digital Marketing',
        email: 'testEmail1@gmail.com',
        telephone: '+212 5 20 36 98 74',
        localisation: '120, Bd La Resistance Tanger',
      },
      {
        image: 'assets/images/societe.jpg',
        name: 'Societe Filiale 3',
        resume:
          "Au plan juridique, une société est une fiction légale conférant la personnalité juridique à une entité économique formée de plusieurs personnes qui mettent en commun des biens, des droits, des capitaux ou des services en vue d'un objet que leurs conventions déterminent.",
        secteur: 'Digital Marketing',
        email: 'testEmail1@gmail.com',
        telephone: '+212 5 20 36 98 74',
        localisation: '120, Bd La Resistance Tanger',
      },
    ],
    Partenaire: [
      {
        image: 'assets/images/organisation.jpg',
        name: 'Societe Partenaire',
        resume:
          "Au plan juridique, une société est une fiction légale conférant la personnalité juridique à une entité économique formée de plusieurs personnes qui mettent en commun des biens, des droits, des capitaux ou des services en vue d'un objet que leurs conventions déterminent.",
        secteur: 'Digital Marketing',
        email: 'testEmail1@gmail.com',
        telephone: '+212 5 20 36 98 74',
        localisation: '120, Bd La Resistance Tanger',
      },
      {
        image: 'assets/images/societe.jpg',
        name: 'Societe Partenaire 2',
        resume:
          "Au plan juridique, une société est une fiction légale conférant la personnalité juridique à une entité économique formée de plusieurs personnes qui mettent en commun des biens, des droits, des capitaux ou des services en vue d'un objet que leurs conventions déterminent.",
        secteur: 'Digital Marketing',
        email: 'testEmail1@gmail.com',
        telephone: '+212 5 20 36 98 74',
        localisation: '120, Bd La Resistance Tanger',
      },
      {
        image: 'assets/images/societe.jpg',
        name: 'Societe Partenaire 3',
        resume:
          "Au plan juridique, une société est une fiction légale conférant la personnalité juridique à une entité économique formée de plusieurs personnes qui mettent en commun des biens, des droits, des capitaux ou des services en vue d'un objet que leurs conventions déterminent.",
        secteur: 'Digital Marketing',
        email: 'testEmail1@gmail.com',
        telephone: '+212 5 20 36 98 74',
        localisation: '120, Bd La Resistance Tanger',
      },
    ],
    Distinction: [
      {
        image: 'assets/images/logo-lux.webp.jpg',
        titre: 'Trophé De Qualité',
        resume:
          'EDITEO vous propose différentes techniques et matériaux, pour réaliser vos trophées d’entreprise. es en bois…les possibilités sont nombreuses.Nos trophées d’entreprise sont le fruit d’un travail créatif sur un objet hautement porteur de sens.',
        date: '2022-05-01',
      },
      {
        image: 'assets/images/organisation.jpg',
        titre: 'Trophé De Service 2',
        resume:
          "Au plan juridique, une société est une fiction légale conférant la personnalité juridique à une entité économique formée de plusieurs personnes qui mettent en commun des biens, des droits, des capitaux ou des services en vue d'un objet que leurs conventions déterminent.",
        date: '2022-05-25',
      },
    ],
    Presse: [
      {
        titre: 'Passage à la télévision TV5',
        resume:
          'Le développement de l’offre est également de mise. La note d’orientations trace également les grandes lignes du déploiement de la 5G. La note prévoit dans ce sens l’élaboration d’une étude pour proposer ',
        link:
          'https://themeforest.net/item/globo-directory-psd-template/screenshots/8887389?index=1',
      },
      {
        titre: 'Passage à la Radio AbC',
        resume:
          'La Caisse de compensation remplit toutes ses fonctions et continue à subventionner les prix des produits de base de grande consommation, a relevé Lekjaa, qui répondait à des questions orales à la Chambre des représentants',

        link:
          'https://preview.themeforest.net/item/globo-directory-listings-html-template/full_screen_preview/9321666?_ga=2.163585023.1176889460.1652183399-114440090.1652183399',
      },
    ],
    ActionSociale: [
      {
        titre: 'Titre Article 1',
        resume:
          "As fellow graduate students at MIT in 2004, Brian and Dharmesh noticed a shift in the way people shop and buy. Consumers were no longer tolerating interruptive bids for their attention — in fact, they'd gotten really, really good at ignoring them. \n From this shift, a company was born: HubSpot. It was founded on inbound, the notion that people don't want to be interrupted by marketers or harassed by salespeople — they want to be helped.\n Today, the inbound movement continues to empower businesses around the world to stop interrupting, start helping, and return their focus to the customer.",
        image: 'assets/images/book.png',
        date: '2016-05-18T16:00:00Z',
      },
      {
        titre: 'Titre Article 2',
        resume:
          "As fellow graduate students at MIT in 2004, Brian and Dharmesh noticed a shift in the way people shop and buy. Consumers were no longer tolerating interruptive bids for their attention — in fact, they'd gotten really, really good at ignoring them. \n From this shift, a company was born: HubSpot. It was founded on inbound, the notion that people don't want to be interrupted by marketers or harassed by salespeople — they want to be helped.\n Today, the inbound movement continues to empower businesses around the world to stop interrupting, start helping, and return their focus to the customer.",
        image: 'assets/images/car.png',
        date: '2016-05-18T16:00:00Z',
      },
      {
        titre: 'Titre Article 3',
        resume:
          "As fellow graduate students at MIT in 2004, Brian and Dharmesh noticed a shift in the way people shop and buy. Consumers were no longer tolerating interruptive bids for their attention — in fact, they'd gotten really, really good at ignoring them. \n From this shift, a company was born: HubSpot. It was founded on inbound, the notion that people don't want to be interrupted by marketers or harassed by salespeople — they want to be helped.\n Today, the inbound movement continues to empower businesses around the world to stop interrupting, start helping, and return their focus to the customer.",
        image: 'assets/images/antique.png',
        date: '2016-05-18T16:00:00Z',
      },
      {
        titre: 'Titre Article 4',
        resume:
          "As fellow graduate students at MIT in 2004, Brian and Dharmesh noticed a shift in the way people shop and buy. Consumers were no longer tolerating interruptive bids for their attention — in fact, they'd gotten really, really good at ignoring them. \n From this shift, a company was born: HubSpot. It was founded on inbound, the notion that people don't want to be interrupted by marketers or harassed by salespeople — they want to be helped.\n Today, the inbound movement continues to empower businesses around the world to stop interrupting, start helping, and return their focus to the customer.",
        image: 'assets/images/book.png',
        date: '2016-05-18T16:00:00Z',
      },
    ],
  }
  viewDate: Date = new Date()
  menuItems2: any = []
  ngOnInit(): void {
    this.sortOptions = [
      { label: 'Price High to Low', value: '!price' },
      { label: 'Price Low to High', value: 'price' },
    ]
    this.societeData
    this.items = [
      {
        label: 'A Propos',
        icon: 'pi pi-fw pi-home',
        children: {
          Apropos: [
            {
              titre: 'Resume',

              texte:
                "Pour ce faire, une entreprise fait appel, mobilise et consomme desressources (matérielles, humaines, financières, immatérielles et informationnelles) ce qui la conduit à devoir coordonner des fonctions (fonction d'achat, fonction commerciale, fonction informatique, etc.). Elle exerce son activité dans le cadre d'un contexte précis auquel elle doit s'adapter : un environnement plus ou moins concurrentiel, une filière technico-économique caractérisée par un état de l'art, un cadre socio-culturel et réglementaire spécifique. Elle peut se donner comme objectif de dégager un certain niveau de rentabilité.",
            },
            {
              titre: 'Our Mission',
              texte:
                "There's this notion that to grow a business, you have to be ruthless. But we know there's a better way to grow. One where what's good for the bottom line is also good for customers. We believe businesses can grow with a conscience, and succeed with a soul — and that they can do it with inbound. That's why we've created an ecosystem uniting software, education, and community to help businesses grow better every day.",
            },

            {
              titre: 'Our Story',
              texte:
                "As fellow graduate students at MIT in 2004, Brian and Dharmesh noticed a shift in the way people shop and buy. Consumers were no longer tolerating interruptive bids for their attention — in fact, they'd gotten really, really good at ignoring them. \n From this shift, a company was born: HubSpot. It was founded on inbound, the notion that people don't want to be interrupted by marketers or harassed by salespeople — they want to be helped.\n Today, the inbound movement continues to empower businesses around the world to stop interrupting, start helping, and return their focus to the customer.",
            },
          ],
        },
      },
      {
        label: 'Histoire',
        icon: 'pi pi-fw pi-calendar',
        children: [
          {
            histoire: [
              {
                titre: 'Notre Histoire',
                texte:
                  "Dell Technologies, Inc est une entreprise américaine troisième plus grand constructeur d'ordinateurs au monde en 2012 derrière Hewlett-Packard et Lenovo2. Son siège est basé à Round Rock dans l'État du Texas.\n Même si Dell Computer est surtout connu pour les PC qu'il conçoit, fabrique et vend aux particuliers et aux professionnels, il est également présent sur les marchés de serveurs d'entreprise, de systèmes de sauvegarde et stockage de données et du matériel spécifique aux réseaux informatiques.\n Dell propose également des logiciels et des périphériques comme des imprimantes, appareils photos numériques, et beaucoup d'autres encore. Dell était coté au Nasdaq à New York sous le symbole DELL jusqu'en 2013, sorti de la bourse en 2013 et réintroduit en 2018.",
              },

              {
                titre: 'Our Story',
                texte:
                  "As fellow graduate students at MIT in 2004, Brian and Dharmesh noticed a shift in the way people shop and buy. Consumers were no longer tolerating interruptive bids for their attention — in fact, they'd gotten really, really good at ignoring them. \n From this shift, a company was born: HubSpot. It was founded on inbound, the notion that people don't want to be interrupted by marketers or harassed by salespeople — they want to be helped.\n Today, the inbound movement continues to empower businesses around the world to stop interrupting, start helping, and return their focus to the customer.",
              },
            ],
          },
        ],
      },
      {
        label: 'Show Room',
        icon: 'pi pi-fw pi-pencil',
        children: [
          {
            gallerie: [
              {
                previewImageSrc:
                  'https://mdbcdn.b-cdn.net/img/Photos/Slides/img%20(23).webp',
                thumbnailImageSrc:
                  'https://mdbcdn.b-cdn.net/img/Photos/Slides/img%20(23).webp',
                alt: 'Description for Image 1',
                title: 'Title 1',
                type: 'image',
              },
              {
                previewImageSrc:
                  'https://mdbcdn.b-cdn.net/img/Photos/Slides/img%20(15).webp',
                thumbnailImageSrc:
                  'https://mdbcdn.b-cdn.net/img/Photos/Slides/img%20(15).webp',
                alt: 'Description for Image 2',
                title: 'Title 2',
                type: 'image',
              },
              {
                previewImageSrc:
                  'https://mdbcdn.b-cdn.net/img/new/slides/041.webp',
                thumbnailImageSrc:
                  'https://mdbcdn.b-cdn.net/img/new/slides/041.webp',
                alt: 'Description for Image 3',
                title: 'Title 3',
                type: 'image',
              },
              {
                previewImageSrc: 'assets/videos/ash-mosaique.mp4',
                thumbnailImageSrc: 'assets/images/video-img.jpg',
                alt: 'Description for Image 4',
                title: 'Title 4',
                type: 'video',
              },
            ],
          },
        ],
      },
      { label: 'Fiche', icon: 'pi pi-fw pi-file', children: [] },
      {
        label: 'Produits',
        icon: 'pi pi-fw pi-cog',
        children: [
          {
            type: 'Computer',
            Produits: [
              {
                titre: 'Product 1',
                description:
                  "As fellow graduate students at MIT in 2004, Brian and Dharmesh noticed a shift in the way people shop and buy. Consumers were no longer tolerating interruptive bids for their attention — in fact, they'd gotten really, really good at ignoring them. \n From this shift, a company was born: HubSpot. It was founded on inbound, the notion that people don't want to be interrupted by marketers or harassed by salespeople — they want to be helped.\n Today, the inbound movement continues to empower businesses around the world to stop interrupting, start helping, and return their focus to the customer.",
                image: 'assets/images/book.png',
                price: '200Dh',
              },
              {
                titre: 'Product 2',
                description:
                  "As fellow graduate students at MIT in 2004, Brian and Dharmesh noticed a shift in the way people shop and buy. Consumers were no longer tolerating interruptive bids for their attention — in fact, they'd gotten really, really good at ignoring them. \n From this shift, a company was born: HubSpot. It was founded on inbound, the notion that people don't want to be interrupted by marketers or harassed by salespeople — they want to be helped.\n Today, the inbound movement continues to empower businesses around the world to stop interrupting, start helping, and return their focus to the customer.",
                image: 'assets/images/car.png',
                price: '300Dh',
              },
              {
                titre: 'Product 3',
                description:
                  "As fellow graduate students at MIT in 2004, Brian and Dharmesh noticed a shift in the way people shop and buy. Consumers were no longer tolerating interruptive bids for their attention — in fact, they'd gotten really, really good at ignoring them. \n From this shift, a company was born: HubSpot. It was founded on inbound, the notion that people don't want to be interrupted by marketers or harassed by salespeople — they want to be helped.\n Today, the inbound movement continues to empower businesses around the world to stop interrupting, start helping, and return their focus to the customer.",
                image: 'assets/images/antique.png',
                price: '400Dh',
              },
              {
                titre: 'Product 4',
                description:
                  "As fellow graduate students at MIT in 2004, Brian and Dharmesh noticed a shift in the way people shop and buy. Consumers were no longer tolerating interruptive bids for their attention — in fact, they'd gotten really, really good at ignoring them. \n From this shift, a company was born: HubSpot. It was founded on inbound, the notion that people don't want to be interrupted by marketers or harassed by salespeople — they want to be helped.\n Today, the inbound movement continues to empower businesses around the world to stop interrupting, start helping, and return their focus to the customer.",
                image: 'assets/images/book.png',
                price: '500Dh',
              },
            ],
          },
        ],
      },
      {
        label: 'Documents',
        icon: 'pi pi-fw pi-cog',
        children: [
          {
            type: 'Computer',
            Documents: [
              {
                titre: 'Document 1',
                description:
                  "As fellow graduate students at MIT in 2004, Brian and Dharmesh noticed a shift in the way people shop and buy. Consumers were no longer tolerating interruptive bids for their attention — in fact, they'd gotten really, really good at ignoring them. \n From this shift, a company was born: HubSpot. It was founded on inbound, the notion that people don't want to be interrupted by marketers or harassed by salespeople — they want to be helped.\n Today, the inbound movement continues to empower businesses around the world to stop interrupting, start helping, and return their focus to the customer.",
                image: 'assets/images/book.png',
                dateEdition: '2016-05-18T16:00:00Z',
              },
              {
                titre: 'Document 2',
                description:
                  "As fellow graduate students at MIT in 2004, Brian and Dharmesh noticed a shift in the way people shop and buy. Consumers were no longer tolerating interruptive bids for their attention — in fact, they'd gotten really, really good at ignoring them. \n From this shift, a company was born: HubSpot. It was founded on inbound, the notion that people don't want to be interrupted by marketers or harassed by salespeople — they want to be helped.\n Today, the inbound movement continues to empower businesses around the world to stop interrupting, start helping, and return their focus to the customer.",
                image: 'assets/images/car.png',
                dateEdition: '2016-05-18T16:00:00Z',
              },
              {
                titre: 'Document 3',
                description:
                  "As fellow graduate students at MIT in 2004, Brian and Dharmesh noticed a shift in the way people shop and buy. Consumers were no longer tolerating interruptive bids for their attention — in fact, they'd gotten really, really good at ignoring them. \n From this shift, a company was born: HubSpot. It was founded on inbound, the notion that people don't want to be interrupted by marketers or harassed by salespeople — they want to be helped.\n Today, the inbound movement continues to empower businesses around the world to stop interrupting, start helping, and return their focus to the customer.",
                image: 'assets/images/antique.png',
                dateEdition: '2016-05-18T16:00:00Z',
              },
              {
                titre: 'Document 4',
                description:
                  "As fellow graduate students at MIT in 2004, Brian and Dharmesh noticed a shift in the way people shop and buy. Consumers were no longer tolerating interruptive bids for their attention — in fact, they'd gotten really, really good at ignoring them. \n From this shift, a company was born: HubSpot. It was founded on inbound, the notion that people don't want to be interrupted by marketers or harassed by salespeople — they want to be helped.\n Today, the inbound movement continues to empower businesses around the world to stop interrupting, start helping, and return their focus to the customer.",
                image: 'assets/images/book.png',
                dateEdition: '2016-05-18T16:00:00Z',
              },
            ],
          },
        ],
      },
      {
        label: 'FAQ',
        icon: 'pi pi-fw pi-cog',
        children: [
          {
            type: 'Computer',
            QuestionReponse: [
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
          },
        ],
      },
      {
        label: 'Evenement',
        icon: 'pi pi-fw pi-cog',
        children: [
          {
            evenement: [
              {
                date_debut: '2022-05-15',
                date_fin: ' 2022-07-26',
                titre: 'Titre Evenet 1',
                description: 'Description Accusantium sint del',
                img: 'assets/images/event.jpg',
                localisation: '120, BD La Resistance',
              },
              {
                date_debut: '2022-04-15',
                date_fin: ' 2022-09-01',
                titre: 'Titre Evenet 2',
                description: 'Description Accusantium sint del',
                img: 'assets/images/event.jpg',
                localisation: '200, BD La Mohammed 5',
              },
              {
                date_debut: '2022-01-01',
                date_fin: ' 2022-12-26',
                titre: 'Titre Evenet 3',
                description: 'Description Accusantium sint del',
                img: 'assets/images/event.jpg',
                localisation: '120, BD La Rencontre',
              },
            ],
          },
        ],
      },
    ]
    this.commentaires = [
      {
        fonction: 'Testeur',
        commentaire_intervenent:
          'Sed eget turpis a pede tempor malesuada. Vivamus quis mi at leo pulvinar hendrerit. Cum sociis natoque penatibus et magnis dis ed eget turpis a pede tempor malesuada. Vivamus quis mi at leo pulvinar hendrerit. Cum sociis natoque penatibus et magnis dis',
        date: 'April 03, 2022',
        nom_ou_pseudo: 'Admin 1',
        img: 'http://localhost:4200/assets/images/user.png',
      },
      {
        fonction: 'Devlopper',

        commentaire_intervenent:
          'Sed eget turpis a pede tempor malesuada. Vivamus quis mi at leo pulvinar hendrerit. Cum sociis natoque penatibus et magnis dis',
        date: 'April 03, 2022',
        nom_ou_pseudo: 'Admin 1',
      },
      {
        fonction: 'Artisant',

        commentaire_intervenent:
          'Sed eget turpis a pede tempor malesuada. Vivamus quis mi at leo pulvinar hendrerit. Cum sociis natoque penatibus et magnis dis',
        date: 'April 03, 2022',
        nom_ou_pseudo: 'Admin 1',
      },
      {
        fonction: 'Livreur',

        commentaire_intervenent:
          'Sed eget turpis a pede tempor malesuada. Vivamus quis mi at leo pulvinar hendrerit. Cum sociis natoque penatibus et magnis dis',
        date: 'April 03, 2022',
        nom_ou_pseudo: 'Admin 1',
      },
      {
        fonction: 'Vendeur',

        commentaire_intervenent:
          'Sed eget turpis a pede tempor malesuada. Vivamus quis mi at leo pulvinar hendrerit. Cum sociis natoque penatibus et magnis dis',
        date: 'April 03, 2022',
        nom_ou_pseudo: 'Admin 1',
      },
    ]

    this.options = {
      center: { lat: 36.890257, lng: 30.707417 },
      zoom: 12,
    }
    this.menuItems = [
      {
        megaMenu: true,
        path: null,
        taxonomie2: undefined,
        title: 'A Propos',
        type: 'sub',
        _active: false,
        _id: '6218fcf75200e515144f8155',
        active: false,
        children: [
          {
            active: false,
            children: [],
            path: 'presentation',
            taxonomie2: undefined,
            title: 'Presentation',
            type: 'link',
            _active: false,
            _id: '6218fe205200e515144f815bwww',
          },
          {
            active: false,
            children: [],
            path: 'histoire',
            taxonomie2: undefined,
            title: 'Histoire',
            type: 'link',
            _active: false,
            _id: '6218fe205200e515144f815b',
          },
          {
            active: false,
            children: [],
            path: 'fiche',
            taxonomie2: undefined,
            title: 'Fiche',
            type: 'link',
            _active: false,
            _id: '6218fe205200e515144f815b11',
          },
          {
            active: false,
            children: [],
            path: 'equipe',
            taxonomie2: undefined,
            title: 'Equipe',
            type: 'link',
            _active: false,
            _id: '6218fd5e5200e515144f8157',
          },
          {
            active: false,
            children: [],
            path: 'organigramme',
            taxonomie2: undefined,
            title: 'Organigramme',
            type: 'link',
            _active: false,
            _id: '6218fd5dsd200e515144f8157',
          },
          {
            active: false,
            children: [],
            path: 'show-room',
            taxonomie2: undefined,
            title: 'Show Room',
            type: 'link',
            _active: false,
            _id: '6218fd5e5200e515144f815745',
          },
          {
            active: false,
            children: [],
            path: 'distinction',
            taxonomie2: undefined,
            title: 'Distinction',
            type: 'link',
            _active: false,
            _id: '6218fd5e5200e515144f81575',
          },
          {
            active: false,
            children: [],
            path: 'action-sociale',
            taxonomie2: undefined,
            title: 'Action Sociale',
            type: 'link',
            _active: false,
            _id: '6218fd5e5200e515144f8157ss5',
          },
          {
            active: false,
            children: [],
            path: 'temoignage',
            taxonomie2: undefined,
            title: 'Temoignage',
            type: 'link',
            _active: false,
            _id: '6218fd5e5200e515144f8157de5',
          },
        ],
      },
      {
        megaMenu: true,

        taxonomie2: undefined,
        title: 'Filiale/Partenaire',
        type: 'link',
        path: 'filiale-partenaire',

        _active: false,
        _id: '6218fcf75200e515144f815501',
        active: false,
        children: [],
      },
      {
        megaMenu: true,
        path: null,
        taxonomie2: undefined,
        title: 'Offre',
        type: 'sub',
        _active: false,
        _id: '6218fcf75200e515144f815505',
        active: false,
        children: [
          {
            active: false,
            children: [],
            path: 'produits',
            taxonomie2: undefined,
            title: 'Produits',
            type: 'link',
            _active: false,
            _id: '6218fe205200e515144f815b06',
          },
          {
            active: false,
            children: [],
            path: 'sav',
            taxonomie2: undefined,
            title: 'SAV',
            type: 'link',
            _active: false,
            _id: '6218fe205200e515144f815sb07',
          },

          {
            active: false,
            children: [],
            path: 'promo',
            taxonomie2: undefined,
            title: 'Promo',
            type: 'link',
            _active: false,
            _id: '6218fe205200e515144f815b07',
          },
        ],
      },
      {
        megaMenu: true,
        path: null,
        taxonomie2: undefined,
        title: 'Events',
        type: 'sub',
        _active: false,
        _id: '6218fcf75200e515144f815505010',
        active: false,
        children: [
          {
            active: false,
            children: [],
            path: 'evenement',
            taxonomie2: undefined,
            title: 'Evenement',
            type: 'link',
            _active: false,
            _id: '6218fe205200e515144f815b08',
          },
          {
            active: false,
            children: [],
            path: 'parus-dans-la-presse',
            taxonomie2: undefined,
            title: 'Parus Dans La Presse',
            type: 'link',
            _active: false,
            _id: '6218fd5e5200e515144f815125',
          },
        ],
      },
      {
        megaMenu: true,
        path: null,
        taxonomie2: undefined,
        title: 'E-Service',
        type: 'sub',
        _active: false,
        _id: '6218fcf75200e515144f815505010',
        active: false,
        children: [
          {
            active: false,
            children: [],
            path: 'question-reponse',
            taxonomie2: undefined,
            title: 'FAQ',
            type: 'link',
            _active: false,
            _id: '6218fe205200e515144f815b011',
          },
          {
            active: false,
            children: [],
            path: 'documents',
            taxonomie2: undefined,
            title: 'Documents',
            type: 'link',
            _active: false,
            _id: '6218fe205200e515144f815b012',
          },
          {
            active: false,
            children: [],
            path: 'devis',
            taxonomie2: undefined,
            title: 'Devis',
            type: 'link',
            _active: false,
            _id: '6218fe205200e515144fd815sb07',
          },
          {
            active: false,
            children: [],
            path: 'rdv',
            taxonomie2: undefined,
            title: 'RDV',
            type: 'link',
            _active: false,
            _id: '6218fe205200e515144fd815sb07',
          },
          {
            active: false,
            children: [],
            path: 'reclamation',
            taxonomie2: undefined,
            title: 'Reclamation',
            type: 'link',
            _active: false,
            _id: '6218fe205200e515144fd815sb07',
          },
          {
            active: false,
            children: [],
            path: 'reservation',
            taxonomie2: undefined,
            title: 'Reservation',
            type: 'link',
            _active: false,
            _id: '6218fe205200e515144fd815sb07',
          },
          {
            active: false,
            children: [],
            path: 'reservation-activite',
            taxonomie2: undefined,
            title: 'Reservation Activité',
            type: 'link',
            _active: false,
            _id: '6218fe205200e515144fd815sb07',
          },
          {
            active: false,
            children: [],
            path: 'reservation-service',
            taxonomie2: undefined,
            title: 'Reservation Service',
            type: 'link',
            _active: false,
            _id: '6218fe205200e515144fd815sb07',
          },
          {
            active: false,
            children: [],
            path: 'reservation-materiel',
            taxonomie2: undefined,
            title: 'Reservation Materiel',
            type: 'link',
            _active: false,
            _id: '6218fe205200e515144fd815sb07',
          },
          {
            active: false,
            children: [],
            path: 'reservation-restaurant',
            taxonomie2: undefined,
            title: 'Reservation Restaurant',
            type: 'link',
            _active: false,
            _id: '6218fe205200e515144fd815ab12',
          },
          {
            active: false,
            children: [],
            path: 'reservation-hotel',
            taxonomie2: undefined,
            title: 'Reservation Hotel',
            type: 'link',
            _active: false,
            _id: '454845415615151cx1xc16c16',
          },
          {
            active: false,
            children: [],
            path: 'reservation-auto-ecole',
            taxonomie2: undefined,
            title: 'Reservation Auto Ecole',
            type: 'link',
            _active: false,
            _id: '454845415615151fzf24sdf4s456',
          },
          {
            active: false,
            children: [],
            path: 'reservation-devis-en-ligne',
            taxonomie2: undefined,
            title: 'Devis En Ligne',
            type: 'link',
            _active: false,
            _id: '454845415615151fzf2ds45d4541',
          },
        ],
      },
    ]
    this.menuItems2 = [
      {
        megaMenu: true,
        path: null,
        taxonomie2: undefined,
        title: 'A Propos',
        type: 'sub',
        _active: false,
        _id: '6218fcf75200e515144f8155',
        active: false,
        children: [
          [
            {
              title: 'Categorie 1',
              items: [
                {
                  active: false,
                  children: [],
                  path: 'presentation',
                  taxonomie2: undefined,
                  title: 'Presentation',
                  type: 'link',
                  _active: false,
                  _id: '6218fe205200e515144f815bwww',
                },
                {
                  active: false,
                  children: [],
                  path: 'histoire',
                  taxonomie2: undefined,
                  title: 'Histoire',
                  type: 'link',
                  _active: false,
                  _id: '6218fe205200e515144f815b',
                },
                {
                  active: false,
                  children: [],
                  path: 'fiche',
                  taxonomie2: undefined,
                  title: 'Fiche',
                  type: 'link',
                  _active: false,
                  _id: '6218fe205200e515144f815b11',
                },
              ],
            },
          ],
          [
            {
              title: 'Categorie 2',
              items: [
                {
                  active: false,
                  children: [],
                  path: 'equipe',
                  taxonomie2: undefined,
                  title: 'Equipe',
                  type: 'link',
                  _active: false,
                  _id: '6218fd5e5200e515144f8157',
                },
                {
                  active: false,
                  children: [],
                  path: 'organigramme',
                  taxonomie2: undefined,
                  title: 'Organigramme',
                  type: 'link',
                  _active: false,
                  _id: '6218fd5dsd200e515144f8157',
                },
                {
                  active: false,
                  children: [],
                  path: 'show-room',
                  taxonomie2: undefined,
                  title: 'Show Room',
                  type: 'link',
                  _active: false,
                  _id: '6218fd5e5200e515144f815745',
                },
                {
                  active: false,
                  children: [],
                  path: 'distinction',
                  taxonomie2: undefined,
                  title: 'Distinction',
                  type: 'link',
                  _active: false,
                  _id: '6218fd5e5200e515144f81575',
                },
                {
                  active: false,
                  children: [],
                  path: 'action-sociale',
                  taxonomie2: undefined,
                  title: 'Action Sociale',
                  type: 'link',
                  _active: false,
                  _id: '6218fd5e5200e515144f8157ss5',
                },
                {
                  active: false,
                  children: [],
                  path: 'temoignage',
                  taxonomie2: undefined,
                  title: 'Temoignage',
                  type: 'link',
                  _active: false,
                  _id: '6218fd5e5200e515144f8157de5',
                },
              ],
            },
          ],
          [
            {
              title: 'Categorie 2',
              items: [
                {
                  active: false,
                  children: [],
                  path: 'equipe',
                  taxonomie2: undefined,
                  title: 'Equipe',
                  type: 'link',
                  _active: false,
                  _id: '6218fd5e5200e515144f8157',
                },
                {
                  active: false,
                  children: [],
                  path: 'organigramme',
                  taxonomie2: undefined,
                  title: 'Organigramme',
                  type: 'link',
                  _active: false,
                  _id: '6218fd5dsd200e515144f8157',
                },
                {
                  active: false,
                  children: [],
                  path: 'show-room',
                  taxonomie2: undefined,
                  title: 'Show Room',
                  type: 'link',
                  _active: false,
                  _id: '6218fd5e5200e515144f815745',
                },
                {
                  active: false,
                  children: [],
                  path: 'distinction',
                  taxonomie2: undefined,
                  title: 'Distinction',
                  type: 'link',
                  _active: false,
                  _id: '6218fd5e5200e515144f81575',
                },
                {
                  active: false,
                  children: [],
                  path: 'action-sociale',
                  taxonomie2: undefined,
                  title: 'Action Sociale',
                  type: 'link',
                  _active: false,
                  _id: '6218fd5e5200e515144f8157ss5',
                },
                {
                  active: false,
                  children: [],
                  path: 'temoignage',
                  taxonomie2: undefined,
                  title: 'Temoignage',
                  type: 'link',
                  _active: false,
                  _id: '6218fd5e5200e515144f8157de5',
                },
              ],
            },
          ],
          [
            {
              title: 'Categorie 2',
              items: [
                {
                  active: false,
                  children: [],
                  path: 'equipe',
                  taxonomie2: undefined,
                  title: 'Equipe',
                  type: 'link',
                  _active: false,
                  _id: '6218fd5e5200e515144f8157',
                },
                {
                  active: false,
                  children: [],
                  path: 'organigramme',
                  taxonomie2: undefined,
                  title: 'Organigramme',
                  type: 'link',
                  _active: false,
                  _id: '6218fd5dsd200e515144f8157',
                },
                {
                  active: false,
                  children: [],
                  path: 'show-room',
                  taxonomie2: undefined,
                  title: 'Show Room',
                  type: 'link',
                  _active: false,
                  _id: '6218fd5e5200e515144f815745',
                },
                {
                  active: false,
                  children: [],
                  path: 'distinction',
                  taxonomie2: undefined,
                  title: 'Distinction',
                  type: 'link',
                  _active: false,
                  _id: '6218fd5e5200e515144f81575',
                },
                {
                  active: false,
                  children: [],
                  path: 'action-sociale',
                  taxonomie2: undefined,
                  title: 'Action Sociale',
                  type: 'link',
                  _active: false,
                  _id: '6218fd5e5200e515144f8157ss5',
                },
                {
                  active: false,
                  children: [],
                  path: 'temoignage',
                  taxonomie2: undefined,
                  title: 'Temoignage',
                  type: 'link',
                  _active: false,
                  _id: '6218fd5e5200e515144f8157de5',
                },
              ],
            },
          ],
          [
            {
              title: 'Categorie 2',
              items: [
                {
                  active: false,
                  children: [],
                  path: 'equipe',
                  taxonomie2: undefined,
                  title: 'Equipe',
                  type: 'link',
                  _active: false,
                  _id: '6218fd5e5200e515144f8157',
                },
                {
                  active: false,
                  children: [],
                  path: 'organigramme',
                  taxonomie2: undefined,
                  title: 'Organigramme',
                  type: 'link',
                  _active: false,
                  _id: '6218fd5dsd200e515144f8157',
                },
                {
                  active: false,
                  children: [],
                  path: 'show-room',
                  taxonomie2: undefined,
                  title: 'Show Room',
                  type: 'link',
                  _active: false,
                  _id: '6218fd5e5200e515144f815745',
                },
                {
                  active: false,
                  children: [],
                  path: 'distinction',
                  taxonomie2: undefined,
                  title: 'Distinction',
                  type: 'link',
                  _active: false,
                  _id: '6218fd5e5200e515144f81575',
                },
                {
                  active: false,
                  children: [],
                  path: 'action-sociale',
                  taxonomie2: undefined,
                  title: 'Action Sociale',
                  type: 'link',
                  _active: false,
                  _id: '6218fd5e5200e515144f8157ss5',
                },
                {
                  active: false,
                  children: [],
                  path: 'temoignage',
                  taxonomie2: undefined,
                  title: 'Temoignage',
                  type: 'link',
                  _active: false,
                  _id: '6218fd5e5200e515144f8157de5',
                },
              ],
            },
          ],
        ],
      },
      {
        megaMenu: true,

        taxonomie2: undefined,
        title: 'Filiale/Partenaire',
        type: 'link',
        path: 'filiale-partenaire',

        _active: false,
        _id: '6218fcf75200e515144f815501',
        active: false,
        children: [],
      },
      {
        megaMenu: true,
        path: null,
        taxonomie2: undefined,
        title: 'Offre',
        type: 'sub',
        _active: false,
        _id: '6218fcf75200e515144f815505',
        active: false,
        children: [
          {
            active: false,
            children: [],
            path: 'produits',
            taxonomie2: undefined,
            title: 'Produits',
            type: 'link',
            _active: false,
            _id: '6218fe205200e515144f815b06',
          },
          {
            active: false,
            children: [],
            path: 'sav',
            taxonomie2: undefined,
            title: 'SAV',
            type: 'link',
            _active: false,
            _id: '6218fe205200e515144f815sb07',
          },

          {
            active: false,
            children: [],
            path: 'promo',
            taxonomie2: undefined,
            title: 'Promo',
            type: 'link',
            _active: false,
            _id: '6218fe205200e515144f815b07',
          },
        ],
      },
      {
        megaMenu: true,
        path: null,
        taxonomie2: undefined,
        title: 'Events',
        type: 'sub',
        _active: false,
        _id: '6218fcf75200e515144f815505010',
        active: false,
        children: [
          {
            active: false,
            children: [],
            path: 'evenement',
            taxonomie2: undefined,
            title: 'Evenement',
            type: 'link',
            _active: false,
            _id: '6218fe205200e515144f815b08',
          },
          {
            active: false,
            children: [],
            path: 'parus-dans-la-presse',
            taxonomie2: undefined,
            title: 'Parus Dans La Presse',
            type: 'link',
            _active: false,
            _id: '6218fd5e5200e515144f815125',
          },
        ],
      },
      {
        megaMenu: true,
        path: null,
        taxonomie2: undefined,
        title: 'E-Service',
        type: 'sub',
        _active: false,
        _id: '6218fcf75200e515144f815505010',
        active: false,
        children: [
          {
            active: false,
            children: [],
            path: 'question-reponse',
            taxonomie2: undefined,
            title: 'FAQ',
            type: 'link',
            _active: false,
            _id: '6218fe205200e515144f815b011',
          },
          {
            active: false,
            children: [],
            path: 'documents',
            taxonomie2: undefined,
            title: 'Documents',
            type: 'link',
            _active: false,
            _id: '6218fe205200e515144f815b012',
          },
          {
            active: false,
            children: [],
            path: 'devis',
            taxonomie2: undefined,
            title: 'Devis',
            type: 'link',
            _active: false,
            _id: '6218fe205200e515144fd815sb07',
          },
          {
            active: false,
            children: [],
            path: 'rdv',
            taxonomie2: undefined,
            title: 'RDV',
            type: 'link',
            _active: false,
            _id: '6218fe205200e515144fd815sb07',
          },
          {
            active: false,
            children: [],
            path: 'reclamation',
            taxonomie2: undefined,
            title: 'Reclamation',
            type: 'link',
            _active: false,
            _id: '6218fe205200e515144fd815sb07',
          },
          {
            active: false,
            children: [],
            path: 'reservation',
            taxonomie2: undefined,
            title: 'Reservation',
            type: 'link',
            _active: false,
            _id: '6218fe205200e515144fd815sb07',
          },
          {
            active: false,
            children: [],
            path: 'reservation-activite',
            taxonomie2: undefined,
            title: 'Reservation Activité',
            type: 'link',
            _active: false,
            _id: '6218fe205200e515144fd815sb07',
          },
          {
            active: false,
            children: [],
            path: 'reservation-service',
            taxonomie2: undefined,
            title: 'Reservation Service',
            type: 'link',
            _active: false,
            _id: '6218fe205200e515144fd815sb07',
          },
          {
            active: false,
            children: [],
            path: 'reservation-materiel',
            taxonomie2: undefined,
            title: 'Reservation Materiel',
            type: 'link',
            _active: false,
            _id: '6218fe205200e515144fd815sb07',
          },
        ],
      },
    ]
    this.options = {
      center: { lat: 33.181311, lng: -3.910225 },
      zoom: 10,
    }
    this.data1 = [
      {
        label: 'CEO',
        type: 'person',
        styleClass: 'p-person',
        expanded: true,
        data: { name: 'Walter White', avatar: 'walter.jpg' },
        children: [
          {
            label: 'CFO',
            type: 'person',
            styleClass: 'p-person',
            expanded: true,
            data: { name: 'Saul Goodman', avatar: 'saul.jpg' },
            children: [
              {
                label: 'Tax',
                styleClass: 'department-cfo',
              },
              {
                label: 'Legal',
                styleClass: 'department-cfo',
              },
            ],
          },
          {
            label: 'COO',
            type: 'person',
            styleClass: 'p-person',
            expanded: true,
            data: { name: 'Mike E.', avatar: 'mike.jpg' },
            children: [
              {
                label: 'Operations',
                styleClass: 'department-coo',
              },
            ],
          },
          {
            label: 'CTO',
            type: 'person',
            styleClass: 'p-person',
            expanded: true,
            data: { name: 'Jesse Pinkman', avatar: 'jesse.jpg' },
            children: [
              {
                label: 'Development',
                styleClass: 'department-cto',
                expanded: true,
                children: [
                  {
                    label: 'Analysis',
                    styleClass: 'department-cto',
                  },
                  {
                    label: 'Front End',
                    styleClass: 'department-cto',
                  },
                  {
                    label: 'Back End',
                    styleClass: 'department-cto',
                  },
                ],
              },
              {
                label: 'QA',
                styleClass: 'department-cto',
              },
              {
                label: 'R&D',
                styleClass: 'department-cto',
              },
            ],
          },
        ],
      },
    ]
    this.events = [
      {
        start: subDays(startOfDay(new Date()), 0),
        end: addDays(new Date(), 1),
        title: 'Aucun Rendez-vous pour ce jour',
        color: this.colors.red,
      },
    ]
    this.initOverlays()
    this.infoWindow = new google.maps.InfoWindow('hello')
  }
  menuItems: any = []
  options: any

  responsiveOptions: any[] = [
    {
      breakpoint: '1024px',
      numVisible: 5,
    },
    {
      breakpoint: '768px',
      numVisible: 3,
    },
    {
      breakpoint: '560px',
      numVisible: 1,
    },
  ]
  toggletNavActive(item: any) {
    if (this.prev && item != this.prev) {
      this.prev.active = false
    }

    item.active = !item.active
    this.prev = item
  }
  prev: any = {}

  overlays: any[] = []

  dialogVisible: boolean = false

  markerTitle?: string | null

  selectedPosition: any

  infoWindow: any

  draggable: boolean = false

  handleMapClick(event: any) {
    this.dialogVisible = true
    this.selectedPosition = event.latLng
  }

  handleOverlayClick(event: any) {
    console.log('event', event.overlay.position.lat())
    let isMarker = event.overlay.getTitle != undefined

    if (isMarker) {
      var content =
        '<div class="infoWindow"><strong>' +
        event.overlay.getTitle() +
        '</strong><br>' +
        `<a href="https://www.google.com/maps/place/${event.overlay.position.lat()},${event.overlay.position.lng()}/@${event.overlay.position.lat()},${event.overlay.position.lng()},12z" target="_blank">` +
        'Open In Google Map' +
        '</a>' +
        '</div>'

      this.infoWindow.setContent(content)

      this.infoWindow.open(event.map, event.overlay)
      event.map.setCenter(event.overlay.getPosition())
    }
  }
  initOverlays() {
    if (!this.overlays || !this.overlays.length) {
      this.overlays = [
        new google.maps.Marker({
          position: { lat: 33.181311, lng: -3.910225 },
          title: 'Konyaalti',
        }),
        new google.maps.Marker({
          position: { lat: 33.191311, lng: -3.810225 },
          title: 'Ataturk Park',
        }),
        new google.maps.Marker({
          position: { lat: 33.281311, lng: -3.910225 },
          title: 'Oldtown',
        }),
      ]
    }
  }
  handleDragEnd(event: any) {}
  zoomIn(map: any) {
    map.setZoom(map.getZoom() + 1)
  }

  zoomOut(map: any) {
    map.setZoom(map.getZoom() - 1)
  }

  clear() {
    this.overlays = []
  }
  public SavForm: FormGroup
  public DevisForm: FormGroup
  public RDVForm: FormGroup

  public sendSAV() {
    if (this.SavForm.valid) {
      console.log(this.SavForm.value)

      this.SavForm.reset()
    } else {
      this.SavForm.markAllAsTouched()
    }
  }
  public sendDevis() {
    if (this.DevisForm.valid) {
      this.DevisForm.reset()
    } else {
      this.DevisForm.markAllAsTouched()
    }
  }
  public sendRDV() {
    if (this.RDVForm.valid) {
      this.RDVForm.reset()
    } else {
      this.RDVForm.markAllAsTouched()
    }
  }
  activeDayIsOpen: boolean = true

  dayClicked({ date, events }: { date: Date; events: CalendarEvent[] }) {
    if (isSameMonth(date, this.viewDate)) {
      if (
        (isSameDay(this.viewDate, date) && this.activeDayIsOpen === true) ||
        events.length === 0
      ) {
        this.activeDayIsOpen = false
      } else {
        this.activeDayIsOpen = true
      }
      this.viewDate = date
    }
  }
  events: any = []

  colors: any = {
    red: {
      primary: '#ad2121',
      secondary: '#FAE3E3',
    },
    blue: {
      primary: '#1e90ff',
      secondary: '#D1E8FF',
    },
    yellow: {
      primary: '#e3bc08',
      secondary: '#FDF1BA',
    },
  }
  openMap: any = false
  idSociete: any = 1
  toggleMap() {
    this.openMap = !this.openMap
  }
  goToPanierLocale() {
    localStorage.setItem('vendeurId', this.idSociete)
    localStorage.setItem('fromMenu', JSON.stringify(false))

    this.router.navigate(['/details/details/panier'])
  }
  goToWishListLocale() {
    localStorage.setItem('vendeurId', this.idSociete)

    this.router.navigate(['/details/details/wishList'])
  }
}
