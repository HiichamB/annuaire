import { Component, OnInit } from '@angular/core'
import {
  FormArray,
  FormBuilder,
  FormControl,
  FormGroup,
  Validators,
} from '@angular/forms'
import { NgbCarouselConfig, NgbModal } from '@ng-bootstrap/ng-bootstrap'
import { addDays } from 'date-fns'

@Component({
  selector: 'app-reservation-hotels',
  templateUrl: './reservation-hotels.component.html',
  styleUrls: ['./reservation-hotels.component.scss'],
})
export class ReservationHotelsComponent implements OnInit {
  constructor(
    config: NgbCarouselConfig,
    public modalService: NgbModal,
    public fb: FormBuilder,
  ) {
    config.interval = 200000
    config.wrap = true
    config.showNavigationIndicators = false
    config.keyboard = false
    config.pauseOnHover = true

    this.searchHotelForm = this.fb.group({
      dateIntervale: new FormControl('', [Validators.required]),

      chambres: this.fb.array([
        this.fb.group({
          nbPersonnes: [1, [Validators.required, Validators.min(1)]],
          nbChildrens: [0, [Validators.required, Validators.min(0)]],
        }),
      ]),
    })
    this.getCHambres()
    this.getnbPersonnes()
    this.getnbChildrens()
  }
  minDate: any = new Date()
  public slideStyle(image: string) {
    return {
      backgroundImage: `url(${image})`,
    }
  }
  searchHotelForm: any
  currentIndex: any = 0
  ngOnInit(): void {
    this.chambres = this.hotel.chambres
    this.chambres.map((chambre: any) => {
      chambre.selectedExtra = chambre.extras.items[0]
      chambre.selectedPolitique = chambre.politiques.items[0]
    })
  }

  hotel = {
    chambres: [
      {
        price: 292,
        title: 'Chambre Familiale, 1 grand lit',
        quantite: 5,
        personne: 3,
        children: 1,
        images: [
          'https://www.infragistics.com/angular-demos-lob/assets/images/carousel/WonderfulCoast.png',
          'https://www.infragistics.com/angular-demos-lob/assets/images/carousel/CulturalDip.png',
          'https://www.infragistics.com/angular-demos-lob/assets/images/carousel/GoldenBeaches.png',
          'https://www.infragistics.com/angular-demos-lob/assets/images/carousel/IslandOfHistory.png',
          'https://www.infragistics.com/angular-demos-lob/assets/images/carousel/AmazingBridge.png',
        ],
        caracteres: [
          {
            icon: 'assets/images/metrage-hotel.png',
            title: '28 m²',
          },
          {
            icon: 'assets/images/ville-hotel.png',
            title: 'Vue sur la ville   ',
          },
          {
            icon: 'assets/images/person-hotel.png',
            title: '3 personnes',
          },
          {
            icon: 'assets/images/lit-hotel.png',
            title: '1 grand lit',
          },
          {
            icon: 'assets/images/wifi-hotel.png',
            title: 'Accès Wi-Fi gratuit',
          },
          {
            icon: 'assets/images/car-hotel.png',
            title: 'Parking sans voiturier gratuit',
          },
          {
            icon:
              'https://a.travel-assets.com/egds/marks/loyalty_hotels__rewards.svg',
            title: 'Loyality',
          },
        ],
        politiques: {
          title: 'Politique d’annulation',
          items: [
            {
              title: 'Non remboursable',
              price: '0',
            },
            {
              title: 'Entièrement remboursable avant le 28 juil.',
              price: '10',
            },
            {
              title: 'Entièrement remboursable avant le 31 juil.',
              price: '21',
            },
          ],
        },
        extras: {
          title: 'Options',
          items: [
            {
              title: "Pas d'extra",
              price: '0',
            },
            {
              title: 'Petit-déjeuner buffet',
              price: '10',
            },
            {
              title: 'Petit-déjeuner + Dîner',
              price: '18',
            },
          ],
        },
        details: [
          {
            title: 'Accessibilité',
            icon: '',
            items: [
              'Meuble lavabo accessible aux personnes à mobilité réduite',
            ],
          },
          {
            title: 'Salle de bain',
            icon: '',
            items: [
              'Peignoirs',
              'Articles de toilette gratuits',
              'Sèche-cheveux',
              'Salle de bain privée',
              'Pomme de douche à effet pluie',
              'Douche',
            ],
          },
          {
            title: 'Chambre',
            icon: '',
            items: [
              'Climatisation',
              'Draps',
              'Rideaux occultants',
              'Aucun lit bébé fourni',
              'Literie hypoallergénique',
              "Aucun lit d'appoint/supplémentaire fourni",
              'Canapé-lit une place',
              'Chambre séparée',
            ],
          },
          {
            title: 'Nourriture et boissons',
            icon: '',
            items: [
              'Service en chambre 24 h/24',
              'Bouilloire électrique',
              'Machine à espresso',
              'Minibar',
            ],
          },
        ],
        disponibility: [
          {
            dateDebut: '2022-07-06',
            dateFin: '2022-07-10',
            quantite: 2,
          },
          {
            dateDebut: '2022-07-08',
            dateFin: '2022-07-15',

            quantite: 2,
          },

          {
            dateDebut: '2022-07-10',
            dateFin: '2022-07-11',

            quantite: 1,
          },
          {
            dateDebut: '2022-07-05',
            dateFin: '2022-07-06',

            quantite: 1,
          },
        ],
      },
      {
        price: 250,

        title: 'Chambre Familiale, 1 grand lit',
        quantite: 5,
        children: 3,
        personne: 2,
        images: [
          'https://www.infragistics.com/angular-demos-lob/assets/images/carousel/WonderfulCoast.png',
          'https://www.infragistics.com/angular-demos-lob/assets/images/carousel/CulturalDip.png',
          'https://www.infragistics.com/angular-demos-lob/assets/images/carousel/GoldenBeaches.png',
          'https://www.infragistics.com/angular-demos-lob/assets/images/carousel/IslandOfHistory.png',
          'https://www.infragistics.com/angular-demos-lob/assets/images/carousel/AmazingBridge.png',
        ],
        disponibility: [
          {
            dateDebut: '2022-07-12',
            dateFin: '2022-07-13',
            quantite: 2,
          },
          {
            dateDebut: '2022-07-15',
            dateFin: '2022-07-16',

            quantite: 2,
          },

          {
            dateDebut: '2022-07-11',
            dateFin: '2022-07-12',

            quantite: 1,
          },
          {
            dateDebut: '2022-07-10',
            dateFin: '2022-07-10',

            quantite: 1,
          },
        ],
        caracteres: [
          {
            icon: 'assets/images/metrage-hotel.png',
            title: '28 m²',
          },
          {
            icon: 'assets/images/ville-hotel.png',
            title: 'Vue sur la ville   ',
          },
          {
            icon: 'assets/images/person-hotel.png',
            title: '3 personnes',
          },
          {
            icon: 'assets/images/lit-hotel.png',
            title: '1 grand lit',
          },
          {
            icon: 'assets/images/wifi-hotel.png',
            title: 'Accès Wi-Fi gratuit',
          },
          {
            icon: 'assets/images/car-hotel.png',
            title: 'Parking sans voiturier gratuit',
          },
          {
            icon:
              'https://a.travel-assets.com/egds/marks/loyalty_hotels__rewards.svg',
            title: 'Loyality',
          },
        ],
        politiques: {
          title: 'Politique d’annulation',
          items: [
            {
              title: 'Non remboursable',
              price: '0',
            },
            {
              title: 'Entièrement remboursable avant le 28 juil.',
              price: '10',
            },
            {
              title: 'Entièrement remboursable avant le 31 juil.',
              price: '21',
            },
          ],
        },
        extras: {
          title: 'Options',
          items: [
            {
              title: "Pas d'extra",
              price: '0',
            },
            {
              title: 'Petit-déjeuner buffet',
              price: '10',
            },
            {
              title: 'Petit-déjeuner + Dîner',
              price: '18',
            },
          ],
        },
        details: [
          {
            title: 'Accessibilité',
            icon: '',
            items: [
              'Meuble lavabo accessible aux personnes à mobilité réduite',
            ],
          },
          {
            title: 'Salle de bain',
            icon: '',
            items: [
              'Peignoirs',
              'Articles de toilette gratuits',
              'Sèche-cheveux',
              'Salle de bain privée',
              'Pomme de douche à effet pluie',
              'Douche',
            ],
          },
          {
            title: 'Chambre',
            icon: '',
            items: [
              'Climatisation',
              'Draps',
              'Rideaux occultants',
              'Aucun lit bébé fourni',
              'Literie hypoallergénique',
              "Aucun lit d'appoint/supplémentaire fourni",
              'Canapé-lit une place',
              'Chambre séparée',
            ],
          },
          {
            title: 'Nourriture et boissons',
            icon: '',
            items: [
              'Service en chambre 24 h/24',
              'Bouilloire électrique',
              'Machine à espresso',
              'Minibar',
            ],
          },
        ],
      },
      {
        price: 374,

        title: 'Chambre Familiale, 1 grand lit',
        quantite: 6,
        personne: 1,
        children: 0,
        images: [
          'https://www.infragistics.com/angular-demos-lob/assets/images/carousel/WonderfulCoast.png',
          'https://www.infragistics.com/angular-demos-lob/assets/images/carousel/CulturalDip.png',
          'https://www.infragistics.com/angular-demos-lob/assets/images/carousel/GoldenBeaches.png',
          'https://www.infragistics.com/angular-demos-lob/assets/images/carousel/IslandOfHistory.png',
          'https://www.infragistics.com/angular-demos-lob/assets/images/carousel/AmazingBridge.png',
        ],
        caracteres: [
          {
            icon: 'assets/images/metrage-hotel.png',
            title: '28 m²',
          },
          {
            icon: 'assets/images/ville-hotel.png',
            title: 'Vue sur la ville   ',
          },
          {
            icon: 'assets/images/person-hotel.png',
            title: '3 personnes',
          },
          {
            icon: 'assets/images/lit-hotel.png',
            title: '1 grand lit',
          },
          {
            icon: 'assets/images/wifi-hotel.png',
            title: 'Accès Wi-Fi gratuit',
          },
          {
            icon: 'assets/images/car-hotel.png',
            title: 'Parking sans voiturier gratuit',
          },
          {
            icon:
              'https://a.travel-assets.com/egds/marks/loyalty_hotels__rewards.svg',
            title: 'Loyality',
          },
        ],
        politiques: {
          title: 'Politique d’annulation',
          items: [
            {
              title: 'Non remboursable',
              price: '0',
            },
            {
              title: 'Entièrement remboursable avant le 28 juil.',
              price: '10',
            },
            {
              title: 'Entièrement remboursable avant le 31 juil.',
              price: '21',
            },
          ],
        },
        extras: {
          title: 'Options',
          items: [
            {
              title: "Pas d'extra",
              price: '0',
            },
            {
              title: 'Petit-déjeuner buffet',
              price: '10',
            },
            {
              title: 'Petit-déjeuner + Dîner',
              price: '18',
            },
          ],
        },
        details: [
          {
            title: 'Accessibilité',
            icon: '',
            items: [
              'Meuble lavabo accessible aux personnes à mobilité réduite',
            ],
          },
          {
            title: 'Salle de bain',
            icon: '',
            items: [
              'Peignoirs',
              'Articles de toilette gratuits',
              'Sèche-cheveux',
              'Salle de bain privée',
              'Pomme de douche à effet pluie',
              'Douche',
            ],
          },
          {
            title: 'Chambre',
            icon: '',
            items: [
              'Climatisation',
              'Draps',
              'Rideaux occultants',
              'Aucun lit bébé fourni',
              'Literie hypoallergénique',
              "Aucun lit d'appoint/supplémentaire fourni",
              'Canapé-lit une place',
              'Chambre séparée',
            ],
          },
          {
            title: 'Nourriture et boissons',
            icon: '',
            items: [
              'Service en chambre 24 h/24',
              'Bouilloire électrique',
              'Machine à espresso',
              'Minibar',
            ],
          },
        ],
      },
      {
        price: 473,

        title: 'Chambre Familiale, 1 grand lit',
        quantite: 5,
        personne: 2,
        children: 2,
        images: [
          'https://www.infragistics.com/angular-demos-lob/assets/images/carousel/WonderfulCoast.png',
          'https://www.infragistics.com/angular-demos-lob/assets/images/carousel/CulturalDip.png',
          'https://www.infragistics.com/angular-demos-lob/assets/images/carousel/GoldenBeaches.png',
          'https://www.infragistics.com/angular-demos-lob/assets/images/carousel/IslandOfHistory.png',
          'https://www.infragistics.com/angular-demos-lob/assets/images/carousel/AmazingBridge.png',
        ],
        caracteres: [
          {
            icon: 'assets/images/metrage-hotel.png',
            title: '28 m²',
          },
          {
            icon: 'assets/images/ville-hotel.png',
            title: 'Vue sur la ville   ',
          },
          {
            icon: 'assets/images/person-hotel.png',
            title: '3 personnes',
          },
          {
            icon: 'assets/images/lit-hotel.png',
            title: '1 grand lit',
          },
          {
            icon: 'assets/images/wifi-hotel.png',
            title: 'Accès Wi-Fi gratuit',
          },
          {
            icon: 'assets/images/car-hotel.png',
            title: 'Parking sans voiturier gratuit',
          },
          {
            icon:
              'https://a.travel-assets.com/egds/marks/loyalty_hotels__rewards.svg',
            title: 'Loyality',
          },
        ],
        politiques: {
          title: 'Politique d’annulation',
          items: [
            {
              title: 'Non remboursable',
              price: '0',
            },
            {
              title: 'Entièrement remboursable avant le 28 juil.',
              price: '10',
            },
            {
              title: 'Entièrement remboursable avant le 31 juil.',
              price: '21',
            },
          ],
        },
        extras: {
          title: 'Options',
          items: [
            {
              title: "Pas d'extra",
              price: '0',
            },
            {
              title: 'Petit-déjeuner buffet',
              price: '10',
            },
            {
              title: 'Petit-déjeuner + Dîner',
              price: '18',
            },
          ],
        },
        details: [
          {
            title: 'Accessibilité',
            icon: '',
            items: [
              'Meuble lavabo accessible aux personnes à mobilité réduite',
            ],
          },
          {
            title: 'Salle de bain',
            icon: '',
            items: [
              'Peignoirs',
              'Articles de toilette gratuits',
              'Sèche-cheveux',
              'Salle de bain privée',
              'Pomme de douche à effet pluie',
              'Douche',
            ],
          },
          {
            title: 'Chambre',
            icon: '',
            items: [
              'Climatisation',
              'Draps',
              'Rideaux occultants',
              'Aucun lit bébé fourni',
              'Literie hypoallergénique',
              "Aucun lit d'appoint/supplémentaire fourni",
              'Canapé-lit une place',
              'Chambre séparée',
            ],
          },
          {
            title: 'Nourriture et boissons',
            icon: '',
            items: [
              'Service en chambre 24 h/24',
              'Bouilloire électrique',
              'Machine à espresso',
              'Minibar',
            ],
          },
        ],
      },
      {
        price: 325,

        title: 'Chambre Familiale, 1 grand lit',
        quantite: 5,
        personne: 4,
        children: 3,

        images: [
          'https://www.infragistics.com/angular-demos-lob/assets/images/carousel/WonderfulCoast.png',
          'https://www.infragistics.com/angular-demos-lob/assets/images/carousel/CulturalDip.png',
          'https://www.infragistics.com/angular-demos-lob/assets/images/carousel/GoldenBeaches.png',
          'https://www.infragistics.com/angular-demos-lob/assets/images/carousel/IslandOfHistory.png',
          'https://www.infragistics.com/angular-demos-lob/assets/images/carousel/AmazingBridge.png',
        ],
        caracteres: [
          {
            icon: 'assets/images/metrage-hotel.png',
            title: '28 m²',
          },
          {
            icon: 'assets/images/ville-hotel.png',
            title: 'Vue sur la ville   ',
          },
          {
            icon: 'assets/images/person-hotel.png',
            title: '3 personnes',
          },
          {
            icon: 'assets/images/lit-hotel.png',
            title: '1 grand lit',
          },
          {
            icon: 'assets/images/wifi-hotel.png',
            title: 'Accès Wi-Fi gratuit',
          },
          {
            icon: 'assets/images/car-hotel.png',
            title: 'Parking sans voiturier gratuit',
          },
          {
            icon:
              'https://a.travel-assets.com/egds/marks/loyalty_hotels__rewards.svg',
            title: 'Loyality',
          },
        ],
        politiques: {
          title: 'Politique d’annulation',
          items: [
            {
              title: 'Non remboursable',
              price: '0',
            },
            {
              title: 'Entièrement remboursable avant le 28 juil.',
              price: '10',
            },
            {
              title: 'Entièrement remboursable avant le 31 juil.',
              price: '21',
            },
          ],
        },
        extras: {
          title: 'Options',
          items: [
            {
              title: "Pas d'extra",
              price: '0',
            },
            {
              title: 'Petit-déjeuner buffet',
              price: '10',
            },
            {
              title: 'Petit-déjeuner + Dîner',
              price: '18',
            },
          ],
        },
        details: [
          {
            title: 'Accessibilité',
            icon: '',
            items: [
              'Meuble lavabo accessible aux personnes à mobilité réduite',
            ],
          },
          {
            title: 'Salle de bain',
            icon: '',
            items: [
              'Peignoirs',
              'Articles de toilette gratuits',
              'Sèche-cheveux',
              'Salle de bain privée',
              'Pomme de douche à effet pluie',
              'Douche',
            ],
          },
          {
            title: 'Chambre',
            icon: '',
            items: [
              'Climatisation',
              'Draps',
              'Rideaux occultants',
              'Aucun lit bébé fourni',
              'Literie hypoallergénique',
              "Aucun lit d'appoint/supplémentaire fourni",
              'Canapé-lit une place',
              'Chambre séparée',
            ],
          },
          {
            title: 'Nourriture et boissons',
            icon: '',
            items: [
              'Service en chambre 24 h/24',
              'Bouilloire électrique',
              'Machine à espresso',
              'Minibar',
            ],
          },
        ],
      },
      {
        price: 125,

        title: 'Chambre Familiale, 1 grand lit',
        quantite: 5,
        personne: 7,
        children: 1,

        images: [
          'https://www.infragistics.com/angular-demos-lob/assets/images/carousel/WonderfulCoast.png',
          'https://www.infragistics.com/angular-demos-lob/assets/images/carousel/CulturalDip.png',
          'https://www.infragistics.com/angular-demos-lob/assets/images/carousel/GoldenBeaches.png',
          'https://www.infragistics.com/angular-demos-lob/assets/images/carousel/IslandOfHistory.png',
          'https://www.infragistics.com/angular-demos-lob/assets/images/carousel/AmazingBridge.png',
        ],
        caracteres: [
          {
            icon: 'assets/images/metrage-hotel.png',
            title: '28 m²',
          },
          {
            icon: 'assets/images/ville-hotel.png',
            title: 'Vue sur la ville   ',
          },
          {
            icon: 'assets/images/person-hotel.png',
            title: '3 personnes',
          },
          {
            icon: 'assets/images/lit-hotel.png',
            title: '1 grand lit',
          },
          {
            icon: 'assets/images/wifi-hotel.png',
            title: 'Accès Wi-Fi gratuit',
          },
          {
            icon: 'assets/images/car-hotel.png',
            title: 'Parking sans voiturier gratuit',
          },
          {
            icon:
              'https://a.travel-assets.com/egds/marks/loyalty_hotels__rewards.svg',
            title: 'Loyality',
          },
        ],
        politiques: {
          title: 'Politique d’annulation',
          items: [
            {
              title: 'Non remboursable',
              price: '0',
            },
            {
              title: 'Entièrement remboursable avant le 28 juil.',
              price: '10',
            },
            {
              title: 'Entièrement remboursable avant le 31 juil.',
              price: '21',
            },
          ],
        },
        extras: {
          title: 'Options',
          items: [
            {
              title: "Pas d'extra",
              price: '0',
            },
            {
              title: 'Petit-déjeuner buffet',
              price: '10',
            },
            {
              title: 'Petit-déjeuner + Dîner',
              price: '18',
            },
          ],
        },
        details: [
          {
            title: 'Accessibilité',
            icon: '',
            items: [
              'Meuble lavabo accessible aux personnes à mobilité réduite',
            ],
          },
          {
            title: 'Salle de bain',
            icon: '',
            items: [
              'Peignoirs',
              'Articles de toilette gratuits',
              'Sèche-cheveux',
              'Salle de bain privée',
              'Pomme de douche à effet pluie',
              'Douche',
            ],
          },
          {
            title: 'Chambre',
            icon: '',
            items: [
              'Climatisation',
              'Draps',
              'Rideaux occultants',
              'Aucun lit bébé fourni',
              'Literie hypoallergénique',
              "Aucun lit d'appoint/supplémentaire fourni",
              'Canapé-lit une place',
              'Chambre séparée',
            ],
          },
          {
            title: 'Nourriture et boissons',
            icon: '',
            items: [
              'Service en chambre 24 h/24',
              'Bouilloire électrique',
              'Machine à espresso',
              'Minibar',
            ],
          },
        ],
      },
      {
        price: 100,

        title: 'Chambre Familiale, 1 grand lit',
        quantite: 5,
        personne: 2,
        children: 2,

        images: [
          'https://www.infragistics.com/angular-demos-lob/assets/images/carousel/WonderfulCoast.png',
          'https://www.infragistics.com/angular-demos-lob/assets/images/carousel/CulturalDip.png',
          'https://www.infragistics.com/angular-demos-lob/assets/images/carousel/GoldenBeaches.png',
          'https://www.infragistics.com/angular-demos-lob/assets/images/carousel/IslandOfHistory.png',
          'https://www.infragistics.com/angular-demos-lob/assets/images/carousel/AmazingBridge.png',
        ],
        caracteres: [
          {
            icon: 'assets/images/metrage-hotel.png',
            title: '28 m²',
          },
          {
            icon: 'assets/images/ville-hotel.png',
            title: 'Vue sur la ville   ',
          },
          {
            icon: 'assets/images/person-hotel.png',
            title: '3 personnes',
          },
          {
            icon: 'assets/images/lit-hotel.png',
            title: '1 grand lit',
          },
          {
            icon: 'assets/images/wifi-hotel.png',
            title: 'Accès Wi-Fi gratuit',
          },
          {
            icon: 'assets/images/car-hotel.png',
            title: 'Parking sans voiturier gratuit',
          },
          {
            icon:
              'https://a.travel-assets.com/egds/marks/loyalty_hotels__rewards.svg',
            title: 'Loyality',
          },
        ],
        politiques: {
          title: 'Politique d’annulation',
          items: [
            {
              title: 'Non remboursable',
              price: '0',
            },
            {
              title: 'Entièrement remboursable avant le 28 juil.',
              price: '10',
            },
            {
              title: 'Entièrement remboursable avant le 31 juil.',
              price: '21',
            },
          ],
        },
        extras: {
          title: 'Options',
          items: [
            {
              title: "Pas d'extra",
              price: '0',
            },
            {
              title: 'Petit-déjeuner buffet',
              price: '10',
            },
            {
              title: 'Petit-déjeuner + Dîner',
              price: '18',
            },
          ],
        },
        details: [
          {
            title: 'Accessibilité',
            icon: '',
            items: [
              'Meuble lavabo accessible aux personnes à mobilité réduite',
            ],
          },
          {
            title: 'Salle de bain',
            icon: '',
            items: [
              'Peignoirs',
              'Articles de toilette gratuits',
              'Sèche-cheveux',
              'Salle de bain privée',
              'Pomme de douche à effet pluie',
              'Douche',
            ],
          },
          {
            title: 'Chambre',
            icon: '',
            items: [
              'Climatisation',
              'Draps',
              'Rideaux occultants',
              'Aucun lit bébé fourni',
              'Literie hypoallergénique',
              "Aucun lit d'appoint/supplémentaire fourni",
              'Canapé-lit une place',
              'Chambre séparée',
            ],
          },
          {
            title: 'Nourriture et boissons',
            icon: '',
            items: [
              'Service en chambre 24 h/24',
              'Bouilloire électrique',
              'Machine à espresso',
              'Minibar',
            ],
          },
        ],
      },
    ],
  }
  hotelModal: any = {}
  chambres: any
  openModal(template: any, id: any) {
    this.hotelModal = this.chambres[id]
    this.modalService.open(template, { size: 'xl', centered: true })
  }

  checkDiponibilityChambre() {
    if (this.searchHotelForm.valid) {
      let dateDebutReservation: any =
        this.searchHotelForm.get('dateIntervale').value.start.getFullYear() +
        '-' +
        (this.searchHotelForm.get('dateIntervale').value.start.getMonth() + 1) +
        '-' +
        this.searchHotelForm.get('dateIntervale').value.start.getDate()

      let dateFinReservation: any =
        this.searchHotelForm.get('dateIntervale').value.end.getFullYear() +
        '-' +
        (this.searchHotelForm.get('dateIntervale').value.end.getMonth() + 1) +
        '-' +
        this.searchHotelForm.get('dateIntervale').value.end.getDate()
      this.chambres = this.hotel.chambres
      this.chambres.map((chambre: any) => {
        let quantiteDispo = chambre.quantite
        chambre.disponibility?.map((disponibility: any) => {
          if (
            new Date(disponibility.dateFin) >= new Date(dateDebutReservation) &&
            new Date(dateFinReservation) >= new Date(disponibility.dateDebut)
          ) {
            quantiteDispo = quantiteDispo - disponibility.quantite
          }
        })
        chambre.quantiteDispo = quantiteDispo
      })
      this.chambres = this.hotel.chambres
      this.chambres = this.chambres.filter(
        (chambre: any) => chambre.quantiteDispo > 0,
      )
      this.chambreArray.value.map((chambreArray: any) => {
        this.chambres = this.chambres.filter((chambre: any) => {
          return chambre.personne >= chambreArray.nbPersonnes
        })
        this.chambres = this.chambres.filter((chambre: any) => {
          return chambre.children >= chambreArray.nbChildrens
        })
      })
      this.chambres = this.chambres.filter((chambre: any) => {
        if (chambre.quantiteDispo >= this.chambreArray.value.length)
          return chambre
      })
    } else {
      this.searchHotelForm.markAllAsTouched()
    }
  }
  increment(i: any) {
    ;(this.chambreArray.at(i) as FormGroup)
      .get('nbPersonnes')
      ?.patchValue(+this.chambreArray.value[i].nbPersonnes + 1)
    this.getCHambres()
    this.getnbPersonnes()
    this.getnbChildrens()
  }
  incrementC(i: any) {
    ;(this.chambreArray.at(i) as FormGroup)
      .get('nbChildrens')
      ?.patchValue(+this.chambreArray.value[i].nbChildrens + 1)
    this.getCHambres()
    this.getnbPersonnes()
    this.getnbChildrens()
  }
  decrement(i: any) {
    if (this.chambreArray.value[i].nbPersonnes > 0) {
      ;(this.chambreArray.at(i) as FormGroup)
        .get('nbPersonnes')
        ?.patchValue(+this.chambreArray.value[i].nbPersonnes - 1)
    }
    this.getCHambres()
    this.getnbPersonnes()
    this.getnbChildrens()
  }
  decrementC(i: any) {
    if (this.chambreArray.value[i].nbChildrens > 0) {
      ;(this.chambreArray.at(i) as FormGroup)
        .get('nbChildrens')
        ?.patchValue(+this.chambreArray.value[i].nbChildrens - 1)
    }
    this.getCHambres()
    this.getnbPersonnes()
    this.getnbChildrens()
  }

  get chambreArray(): FormArray {
    return this.searchHotelForm.get('chambres') as FormArray
  }

  newChambre() {
    console.log(this.chambreArray.valid)
    if (this.chambreArray.valid) {
      this.chambreArray.push(
        this.fb.group({
          nbPersonnes: new FormControl(1, [
            Validators.required,
            Validators.min(1),
          ]),
          nbChildrens: new FormControl(0, [
            Validators.required,
            Validators.min(0),
          ]),
        }),
      )
    } else {
      this.chambreArray.markAllAsTouched()
    }
    this.getCHambres()
    this.getnbPersonnes()
    this.getnbChildrens()
    this.getChambreTotal()

    //  console.log(this.questions)
  }

  openModal2(template: any) {
    this.modalService.open(template, { size: 'md', centered: true })
  }

  deleteChambre(i: any) {
    this.chambreArray.removeAt(i)

    this.getCHambres()
    this.getnbPersonnes()
    this.getnbChildrens()
    this.getChambreTotal()
  }
  nbChildrens: any = 0
  nbChambres: any = 0
  nbPersonnes: any = 0

  getCHambres() {
    this.nbChambres = 0

    this.nbChambres = this.chambreArray.length
  }
  getnbChildrens() {
    this.nbChildrens = 0
    this.chambreArray.controls.map((control: any) => {
      this.nbChildrens += +control.value.nbChildrens
    })
  }
  getnbPersonnes() {
    this.nbPersonnes = 0

    this.chambreArray.controls.map((control: any) => {
      this.nbPersonnes += +control.value.nbPersonnes
    })
  }
  range: any
  setDateEndRange(calendar: any) {
    if (!calendar._calendar.selectedDates[1]) {
      calendar._calendar.selectedDates.push(
        addDays(calendar._calendar.selectedDates[0], 1),
      )
      this.searchHotelForm.get('dateIntervale').value.end = addDays(
        calendar._calendar.selectedDates[0],
        1,
      )
    }
  }
  addExtra(chambre: any, extra: any) {
    chambre.selectedExtra = extra
    this.getChambreTotal()
  }
  addPolitique(chambre: any, politique: any) {
    chambre.selectedPolitique = politique
    this.getChambreTotal()
  }
  getChambreTotal() {
    this.chambres.map((chambre: any) => {
      chambre.totalPrice =
        (+chambre.price +
          (+chambre?.selectedExtra?.price ? +chambre.selectedExtra.price : 0) +
          (+chambre?.selectedPolitique?.price
            ? +chambre.selectedPolitique.price
            : 0)) *
        +this.nbChambres
    })
  }
}
