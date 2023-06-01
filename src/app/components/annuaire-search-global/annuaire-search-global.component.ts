import { Component, OnInit } from '@angular/core'

@Component({
  selector: 'app-annuaire-search-global',
  templateUrl: './annuaire-search-global.component.html',
  styleUrls: ['./annuaire-search-global.component.scss'],
})
export class AnnuaireSearchGlobalComponent implements OnInit {
  searchBarItems: any = []
  searchElements: any = []
  constructor() {}
  listBasicCard: any = []
  openMenu: any = false
  ngOnInit(): void {
    this.listBasicCard = [
      {
        nomCategories: 'Hotellerie',
        sousTitre: 'Cum doctus civibus efficiantur in imperdiet deterruisset.',
        submenu: [
          {
            name: 'Hotels',
            children: [
              {
                link: 'details',
                image: 'http://www.ansonika.com/sparker/img/shop_2.jpg',
                name: 'Louis Vittont',
              },
              {
                link: 'details',
                image: 'http://www.ansonika.com/sparker/img/shop_1.jpg',
                name: 'Victoria Secret',
              },
              {
                link: 'details',
                image: 'http://www.ansonika.com/sparker/img/shop_3.jpg',
                name: 'Bureberry',
              },
              {
                link: 'details',
                image: 'http://www.ansonika.com/sparker/img/shop_4.jpg',
                name: 'Pinko',
              },
            ],
          },
          {
            name: 'Restaurant',
            children: [
              {
                link: 'details',
                image: 'http://www.ansonika.com/sparker/img/hotel_2.jpg',
                name: 'Hotem Mariott',
              },
              {
                link: 'details',
                image: 'http://www.ansonika.com/sparker/img/hotel_1.jpg',
                name: 'Hotel Concorde',
              },
              {
                link: 'details',
                image: 'http://www.ansonika.com/sparker/img/hotel_3.jpg',
                name: 'Hotel La Defance',
              },
              {
                link: 'details',
                image: 'http://www.ansonika.com/sparker/img/hotel_4.jpg',
                name: 'Hotel Carlton',
              },
            ],
          },
          {
            name: 'snack',
            children: [
              {
                link: 'details',
                image: 'http://www.ansonika.com/sparker/img/restaurant_2.jpg',
                name: 'Da Alfredo',
              },
              {
                link: 'details',
                image: 'http://www.ansonika.com/sparker/img/restaurant_1.jpg',
                name: 'Bistrot',
              },
              {
                link: 'details',
                image: 'http://www.ansonika.com/sparker/img/restaurant_3.jpg',
                name: 'Marco King',
              },
              {
                link: 'details',
                image: 'http://www.ansonika.com/sparker/img/restaurant_4.jpg',
                name: 'Tacos',
              },
            ],
          },
        ],
      },
      {
        nomCategories: 'Mode De vie',
        sousTitre: 'Cum doctus civibus efficiantur in imperdiet deterruisset.',
        submenu: [
          {
            name: 'vetement',
            children: [
              {
                link: 'details',
                image: 'http://www.ansonika.com/sparker/img/shop_2.jpg',
                name: 'Louis Vittont',
              },
              {
                link: 'details',
                image: 'http://www.ansonika.com/sparker/img/shop_1.jpg',
                name: 'Victoria Secret',
              },
              {
                link: 'details',
                image: 'http://www.ansonika.com/sparker/img/shop_3.jpg',
                name: 'Bureberry',
              },
              {
                link: 'details',
                image: 'http://www.ansonika.com/sparker/img/shop_4.jpg',
                name: 'Pinko',
              },
            ],
          },
          {
            name: 'Chaussures',
            children: [
              {
                link: 'details',
                image: 'http://www.ansonika.com/sparker/img/hotel_2.jpg',
                name: 'Hotem Mariott',
              },
              {
                link: 'details',
                image: 'http://www.ansonika.com/sparker/img/hotel_1.jpg',
                name: 'Hotel Concorde',
              },
              {
                link: 'details',
                image: 'http://www.ansonika.com/sparker/img/hotel_3.jpg',
                name: 'Hotel La Defance',
              },
              {
                link: 'details',
                image: 'http://www.ansonika.com/sparker/img/hotel_4.jpg',
                name: 'Hotel Carlton',
              },
            ],
          },
          {
            name: 'Jeans',
            children: [
              {
                link: 'details',
                image: 'http://www.ansonika.com/sparker/img/restaurant_2.jpg',
                name: 'Da Alfredo',
              },
              {
                link: 'details',
                image: 'http://www.ansonika.com/sparker/img/restaurant_1.jpg',
                name: 'Bistrot',
              },
              {
                link: 'details',
                image: 'http://www.ansonika.com/sparker/img/restaurant_3.jpg',
                name: 'Marco King',
              },
              {
                link: 'details',
                image: 'http://www.ansonika.com/sparker/img/restaurant_4.jpg',
                name: 'Tacos',
              },
            ],
          },
        ],
      },
      {
        nomCategories: 'Famous Shops',
        sousTitre: 'Cum doctus civibus efficiantur in imperdiet deterruisset.',
        submenu: [
          {
            name: 'Hotels',
            children: [
              {
                link: 'details',
                image: 'http://www.ansonika.com/sparker/img/shop_2.jpg',
                name: 'Louis Vittont',
              },
              {
                link: 'details',
                image: 'http://www.ansonika.com/sparker/img/shop_1.jpg',
                name: 'Victoria Secret',
              },
              {
                link: 'details',
                image: 'http://www.ansonika.com/sparker/img/shop_3.jpg',
                name: 'Bureberry',
              },
              {
                link: 'details',
                image: 'http://www.ansonika.com/sparker/img/shop_4.jpg',
                name: 'Pinko',
              },
            ],
          },
          {
            name: 'Restaurant',
            children: [
              {
                link: 'details',
                image: 'http://www.ansonika.com/sparker/img/hotel_2.jpg',
                name: 'Hotem Mariott',
              },
              {
                link: 'details',
                image: 'http://www.ansonika.com/sparker/img/hotel_1.jpg',
                name: 'Hotel Concorde',
              },
              {
                link: 'details',
                image: 'http://www.ansonika.com/sparker/img/hotel_3.jpg',
                name: 'Hotel La Defance',
              },
              {
                link: 'details',
                image: 'http://www.ansonika.com/sparker/img/hotel_4.jpg',
                name: 'Hotel Carlton',
              },
            ],
          },
          {
            name: 'snack',
            children: [
              {
                link: 'details',
                image: 'http://www.ansonika.com/sparker/img/restaurant_2.jpg',
                name: 'Da Alfredo',
              },
              {
                link: 'details',
                image: 'http://www.ansonika.com/sparker/img/restaurant_1.jpg',
                name: 'Bistrot',
              },
              {
                link: 'details',
                image: 'http://www.ansonika.com/sparker/img/restaurant_3.jpg',
                name: 'Marco King',
              },
              {
                link: 'details',
                image: 'http://www.ansonika.com/sparker/img/restaurant_4.jpg',
                name: 'Tacos',
              },
            ],
          },
        ],
      },
    ]

    this.searchBarItems = [
      {
        _id: 'reset',
        active: false,
        _active: false,
        title: 'All Categories',
        type: 'sub',
        path: null,
        children: [],
        img: 'assets/images/car.png',
      },
      {
        _id: '6218fcf75200e515144f8155',
        active: false,
        _active: false,
        title: 'A la une',
        type: 'sub',
        path: null,
        megaMenu: true,
        img: 'assets/images/antique.png',

        children: [
          {
            title: 'Antiques',
            type: 'link',
            path: '92',
            img: 'assets/images/antique.png',
          },
          {
            title: 'Books',
            type: 'link',
            path: '91',
            img: 'assets/images/book.png',
          },
          {
            title: 'Cars Motocycle',
            type: 'link',
            path: '90',
            img: 'assets/images/car.png',
          },
          ,
          {
            title: 'Cars Motocycle',
            type: 'link',
            path: '10',
            img: 'assets/images/car.png',
          },
          ,
          {
            title: 'Cars Motocycle',
            type: 'link',
            path: '69',
            img: 'assets/images/car.png',
          },
          ,
          {
            title: 'Cars Motocycle',
            type: 'link',
            path: '58',
            img: 'assets/images/car.png',
          },
          ,
          {
            title: 'Cars Motocycle',
            type: 'link',
            path: '6',
            img: 'assets/images/car.png',
          },
          ,
          {
            title: 'Cars Motocycle',
            type: 'link',
            path: '52',
            img: 'assets/images/car.png',
          },
          ,
          {
            title: 'Cars Motocycle',
            type: 'link',
            path: '74',
            img: 'assets/images/car.png',
          },
        ],
      },
      {
        _id: '6218febd5200e515144f815d',
        active: false,
        _active: false,
        title: 'Publications',
        type: 'sub',
        path: null,
        megaMenu: true,
        img: 'assets/images/book.png',

        children: [
          {
            title: 'Computer',
            type: 'link',
            path: '99',
            img: 'assets/images/computer.png',
          },
          {
            title: 'Creativity',
            type: 'link',
            path: '88',
            img: 'assets/images/creativity.png',
          },
          {
            title: 'Books',
            type: 'link',
            path: '77',
            img: 'assets/images/book.png',
          },
        ],
      },
      {
        _id: '6219011f5200e515144f8173',
        active: false,
        _active: false,
        title: 'Evénements ',
        type: 'sub',
        path: null,
        megaMenu: true,
        img: 'assets/images/computer.png',

        children: [
          {
            title: 'Cars Motocycle',
            type: 'link',
            path: '55',
            img: 'assets/images/car.png',
          },
          {
            title: 'Computer',
            type: 'link',
            path: '00',
            img: 'assets/images/computer.png',
          },
          {
            title: 'Creativity',
            type: 'link',
            path: '0',
            img: 'assets/images/creativity.png',
          },
          {
            title: 'Books',
            type: '1link',
            path: '',
            img: 'assets/images/book.png',
          },
          {
            title: 'Computer',
            type: 'link',
            path: '2',
            img: 'assets/images/computer.png',
          },
          {
            title: 'Books',
            type: 'link',
            path: '3',
            img: 'assets/images/book.png',
          },
        ],
      },
      {
        _id: '6219011f5200e515144f8173',
        active: false,
        _active: false,
        title: 'Menu Item 2 ',
        type: 'sub',
        path: null,
        megaMenu: true,
        img: 'assets/images/creativity.png',

        children: [
          {
            title: 'Cars Motocycle',
            type: 'link',
            path: '55',
            img: 'assets/images/car.png',
          },
          {
            title: 'Computer',
            type: 'link',
            path: '00',
            img: 'assets/images/computer.png',
          },
          {
            title: 'Creativity',
            type: 'link',
            path: '0',
            img: 'assets/images/creativity.png',
          },
          {
            title: 'Test3',
            type: '1link',
            path: '',
            img: 'assets/images/book.png',
          },
          {
            title: 'Tes2',
            type: 'link',
            path: '2',
            img: 'assets/images/computer.png',
          },
          {
            title: 'Test1',
            type: 'link',
            path: '3',
            img: 'assets/images/book.png',
          },
        ],
      },
      {
        _id: '6218fcf75200e515144f8155',
        active: false,
        _active: false,
        title: 'Menu Item 3',
        type: 'sub',
        path: null,
        megaMenu: true,
        img: 'assets/images/antique.png',

        children: [
          {
            title: 'Cars Motocycle',
            type: 'link',
            path: '',
            img: 'assets/images/car.png',
          },

          {
            title: 'Cars Motocycle',
            type: 'link',
            path: '',
            img: 'assets/images/car.png',
          },
          {
            title: 'Antiques',
            type: 'link',
            path: '',
            img: 'assets/images/antique.png',
          },
          {
            title: 'Books',
            type: 'link',
            path: '',
            img: 'assets/images/book.png',
          },
          {
            title: 'Cars Motocycle',
            type: 'link',
            path: '',
            img: 'assets/images/car.png',
          },

          {
            title: 'Cars Motocycle',
            type: 'link',
            path: '',
            img: 'assets/images/car.png',
          },

          {
            title: 'Cars Motocycle',
            type: 'link',
            path: '',
            img: 'assets/images/car.png',
          },

          {
            title: 'Cars Motocycle',
            type: 'link',
            path: '',
            img: 'assets/images/car.png',
          },
          {
            title: 'Cars Motocycle',
            type: 'link',
            path: '',
            img: 'assets/images/car.png',
          },
        ],
      },
      {
        _id: '6218fcf75200e515144f8155',
        active: false,
        _active: false,
        title: 'Menu Item 4',
        type: 'sub',
        path: null,
        megaMenu: true,
        img: 'assets/images/car.png',

        children: [
          {
            title: 'Antiques',
            type: 'link',
            path: '',
            img: 'assets/images/antique.png',
          },
          {
            title: 'Books',
            type: 'link',
            path: '',
            img: 'assets/images/book.png',
          },
          {
            title: 'Cars Motocycle',
            type: 'link',
            path: '',
            img: 'assets/images/car.png',
          },

          {
            title: 'Cars Motocycle',
            type: 'link',
            path: '',
            img: 'assets/images/car.png',
          },

          {
            title: 'Cars Motocycle',
            type: 'link',
            path: '',
            img: 'assets/images/car.png',
          },

          {
            title: 'Cars Motocycle',
            type: 'link',
            path: '',
            img: 'assets/images/car.png',
          },

          {
            title: 'Cars Motocycle',
            type: 'link',
            path: '',
            img: 'assets/images/car.png',
          },

          {
            title: 'Cars Motocycle',
            type: 'link',
            path: '',
            img: 'assets/images/car.png',
          },

          {
            title: 'Cars Motocycle',
            type: 'link',
            path: '',
            img: 'assets/images/car.png',
          },
        ],
      },
    ]
    this.mergeElements()
  }

  // Click Toggle menu (Mobile)
  toggletNav() {
    this.openMenu = !this.openMenu

    window.scrollTo(0, 200)
  }
  elementsOfList: any = []
  mergeElements() {
    this.elementsOfList = []

    this.searchBarItems.map((submenu: any) => {
      submenu.children.map((item: any) => {
        this.elementsOfList.push(item)
      })
    })
  }
  mergeElementsId(id: any) {
    this.elementsOfList = []

    if (id != 'reset') {
      this.searchBarItems
        .filter((element: any) => element._id == id)
        .map((submenu: any) => {
          submenu.children.map((item: any) => {
            this.elementsOfList.push(item)
          })
        })
    } else {
      this.mergeElements()
    }
  }
}
// this.searchBarItems = [
//   {
//     _id: '6218fcf75200e515144f8155',
//     active: false,
//     _active: false,
//     title: 'A la une',
//     type: 'sub',
//     path: null,
//     megaMenu: true,
//     children: [
//       {
//         _id: '6218fe205200e515144f815b',
//         active: false,
//         _active: false,
//         title: 'Editoriaux',
//         type: 'link',
//         path: '/posts/rubriques/details-rubrique/6218b8fa5200e515144f8014',
//         children: [
//           {
//             _id: '6218fd845200e515144f8159',
//             active: false,
//             _active: false,
//             title: 'Tribunes',
//             type: 'link',
//             path:
//               '/posts/rubriques/details-rubrique/6218b9ed5200e515144f801e',
//             children: [],
//           },
//           {
//             _id: '6218fd5e5200e515144f8157',
//             active: false,
//             _active: false,
//             title: 'Parus dans la presse',
//             type: 'link',
//             path:
//               '/posts/rubriques/details-rubrique/6218bba15200e515144f8028',
//             children: [],
//           },
//         ],
//       },
//       {
//         _id: '6218fd845200e515144f8159',
//         active: false,
//         _active: false,
//         title: 'Tribunes',
//         type: 'link',
//         path: '/posts/rubriques/details-rubrique/6218b9ed5200e515144f801e',
//         children: [],
//       },
//       {
//         _id: '6218fd5e5200e515144f8157',
//         active: false,
//         _active: false,
//         title: 'Parus dans la presse',
//         type: 'link',
//         path: '/posts/rubriques/details-rubrique/6218bba15200e515144f8028',
//         children: [],
//       },
//     ],
//   },
//   {
//     _id: '6218febd5200e515144f815d',
//     active: false,
//     _active: false,
//     title: 'Publications',
//     type: 'sub',
//     path: null,
//     megaMenu: true,
//     children: [
//       {
//         _id: '6218ff945200e515144f8163',
//         active: false,
//         _active: false,
//         title: 'Droit de la femme',
//         type: 'link',
//         path: '/posts/rubriques/details-rubrique/6218bd625200e515144f8033',
//         children: [],
//       },
//       {
//         _id: '6218ff4f5200e515144f8161',
//         active: false,
//         _active: false,
//         title: 'Stop Violence',
//         type: 'link',
//         path: '/posts/rubriques/details-rubrique/6218bdf55200e515144f803d',
//         children: [],
//       },
//       {
//         _id: '6218ff145200e515144f815f',
//         active: false,
//         _active: false,
//         title: 'Code da la Famille',
//         type: 'link',
//         path: '/posts/rubriques/details-rubrique/6218bf3f5200e515144f8050',
//         children: [],
//       },
//       {
//         _id: '6218ffc75200e515144f8165',
//         active: false,
//         _active: false,
//         title: 'Santé',
//         type: 'link',
//         path: '/posts/rubriques/details-rubrique/6218bfd65200e515144f805a',
//         children: [],
//       },
//       {
//         _id: '6218ffed5200e515144f8167',
//         active: false,
//         _active: false,
//         title: 'Education',
//         type: 'link',
//         path: '/posts/rubriques/details-rubrique/6218c18a5200e515144f8065',
//         children: [],
//       },
//       {
//         _id: '6219001f5200e515144f8169',
//         active: false,
//         _active: false,
//         title: 'Economie',
//         type: 'link',
//         path: '/posts/rubriques/details-rubrique/6218c1f65200e515144f806f',
//         children: [],
//       },
//       {
//         _id: '621900475200e515144f816b',
//         active: false,
//         _active: false,
//         title: 'Société',
//         type: 'link',
//         path: '/posts/rubriques/details-rubrique/6218c2ba5200e515144f807a',
//         children: [],
//       },
//       {
//         _id: '621900905200e515144f816d',
//         active: false,
//         _active: false,
//         title: 'Politique',
//         type: 'link',
//         path: '/posts/rubriques/details-rubrique/6218c66c5200e515144f8087',
//         children: [],
//       },
//       {
//         _id: '621900c45200e515144f816f',
//         active: false,
//         _active: false,
//         title: 'Histoire',
//         type: 'link',
//         path: '/posts/rubriques/details-rubrique/6218c7265200e515144f80a3',
//         children: [],
//       },
//       {
//         _id: '621900fa5200e515144f8171',
//         active: false,
//         _active: false,
//         title: 'Art et culture',
//         type: 'link',
//         path: '/posts/rubriques/details-rubrique/6218c7615200e515144f80a4',
//         children: [],
//       },
//     ],
//   },
//   {
//     _id: '6219011f5200e515144f8173',
//     active: false,
//     _active: false,
//     title: 'Evénements et Actualités',
//     type: 'sub',
//     path: null,
//     megaMenu: true,
//     children: [
//       {
//         _id: '621901be5200e515144f8175',
//         active: false,
//         _active: false,
//         title: 'Débats',
//         type: 'link',
//         path: '/infos-pratiques/evenements-et-actualites/debats',
//         children: [],
//       },
//       {
//         _id: '621901ee5200e515144f8177',
//         active: false,
//         _active: false,
//         title: 'Séminaires',
//         type: 'link',
//         path: '/infos-pratiques/evenements-et-actualites/seminaires',
//         children: [],
//       },
//       {
//         _id: '6219020f5200e515144f8179',
//         active: false,
//         _active: false,
//         title: 'Manifestations',
//         type: 'link',
//         path: '/infos-pratiques/evenements-et-actualites/manifestations',
//         children: [],
//       },
//       {
//         _id: '6219022e5200e515144f817b',
//         active: false,
//         _active: false,
//         title: 'Entretiens',
//         type: 'link',
//         path: '/infos-pratiques/evenements-et-actualites/entretiens',
//         children: [],
//       },
//       {
//         _id: '6219024c5200e515144f817d',
//         active: false,
//         _active: false,
//         title: 'Events',
//         type: 'link',
//         path: '/infos-pratiques/evenements-et-actualites/evenements',
//         children: [],
//       },
//     ],
//   },
//   {
//     _id: '6219026f5200e515144f817f',
//     active: false,
//     _active: false,
//     title: 'Actions militantes',
//     type: 'sub',
//     path: null,
//     megaMenu: true,
//     children: [
//       {
//         _id: '621904595200e515144f818f',
//         active: false,
//         _active: false,
//         title: 'Plaidoyer',
//         type: 'link',
//         path: '/posts/rubriques/details-rubrique/6218d4e95200e515144f80bd',
//         children: [],
//       },
//       {
//         _id: '621903355200e515144f8183',
//         active: false,
//         _active: false,
//         title: 'Pétitions',
//         type: 'link',
//         path: '/action/pétitions',
//         children: [],
//       },
//       {
//         _id: '6219038c5200e515144f8185',
//         active: false,
//         _active: false,
//         title: 'Projets de développement',
//         type: 'link',
//         path: '/posts/rubriques/details-rubrique/6218d5005200e515144f80be',
//         children: [],
//       },
//       {
//         _id: '621903b25200e515144f8187',
//         active: false,
//         _active: false,
//         title: 'Soutiens des personnalités',
//         type: 'link',
//         path: '/Espace-communautaire/témoignages et soutiens',
//         children: [],
//       },
//       {
//         _id: '621903dd5200e515144f8189',
//         active: false,
//         _active: false,
//         title: 'Sorties de livres',
//         type: 'link',
//         path: '/posts/rubriques/details-rubrique/6218d5175200e515144f80bf',
//         children: [],
//       },
//     ],
//   },
//   {
//     _id: '621904015200e515144f818b',
//     active: false,
//     _active: false,
//     title: 'Données et Documents',
//     type: 'sub',
//     path: null,
//     megaMenu: true,
//     children: [
//       {
//         _id: '6219043a5200e515144f818d',
//         active: false,
//         _active: false,
//         title: 'Statistiques',
//         type: 'link',
//         path: '/posts/rubriques/details-rubrique/6218d9105200e515144f80d5',
//         children: [],
//       },
//       {
//         _id: '621904d85200e515144f8191',
//         active: false,
//         _active: false,
//         title: 'Etudes et Enquêtes',
//         type: 'link',
//         path: '/posts/rubriques/details-rubrique/6218d9265200e515144f80d6',
//         children: [],
//       },
//       {
//         _id: '621904f35200e515144f8193',
//         active: false,
//         _active: false,
//         title: 'Documents à télécharger',
//         type: 'link',
//         path: '/études et enquêtes/documents-à-telecharger',
//         children: [],
//       },
//     ],
//   },
//   {
//     _id: '621905195200e515144f8195',
//     active: false,
//     _active: false,
//     title: 'Pratiques',
//     type: 'sub',
//     path: null,
//     megaMenu: true,
//     children: [
//       {
//         _id: '621905425200e515144f8197',
//         active: false,
//         _active: false,
//         title: 'Questions / Réponses',
//         type: 'link',
//         path: '/E-Guichet/Question-Reponse',
//         children: [],
//       },
//       {
//         _id: '621905925200e515144f8199',
//         active: false,
//         _active: false,
//         title: 'Conseils Pratiques',
//         type: 'link',
//         path: '/posts/rubriques/details-rubrique/6219108c5200e515144f81cf',
//         children: [],
//       },
//       {
//         _id: '621905d15200e515144f819b',
//         active: false,
//         _active: false,
//         title: 'Adresses Utiles',
//         type: 'link',
//         path: '/Conseils-et-info-pratique/adresse-utile',
//         children: [],
//       },
//       {
//         _id: '621905f55200e515144f819d',
//         active: false,
//         _active: false,
//         title: 'Liens Utiles',
//         type: 'link',
//         path: '/Conseils-et-info-pratique/lien-utile',
//         children: [],
//       },
//       {
//         _id: '6219063b5200e515144f819f',
//         active: false,
//         _active: false,
//         title: 'Textes de lois',
//         type: 'sub',
//         path: '/posts/rubriques/details-rubrique/6218e5965200e515144f8112',
//         children: [
//           {
//             _id: '621906a25200e515144f81a1',
//             active: false,
//             _active: false,
//             title: 'Code de la famille',
//             type: 'link',
//             path:
//               '/études et enquêtes/documents-à-telecharger/622a21249ce031c2f2d0b132',
//             children: [],
//           },
//           {
//             _id: '622a31239ce031c2f2d0b139',
//             active: false,
//             _active: false,
//             title: "DROITS DE L'ENFANT",
//             type: 'link',
//             path:
//               '/études et enquêtes/documents-à-telecharger/622a21249ce031c2f2d0b133',
//             children: [],
//           },
//           {
//             _id: '622a31509ce031c2f2d0b13b',
//             active: false,
//             _active: false,
//             title: 'DROITS DE LA FEMME',
//             type: 'link',
//             path:
//               '/études et enquêtes/documents-à-telecharger/622a21249ce031c2f2d0b134',
//             children: [],
//           },
//           {
//             _id: '622a31749ce031c2f2d0b13d',
//             active: false,
//             _active: false,
//             title: "DROITS D'ADOPTATION",
//             type: 'link',
//             path:
//               '/études et enquêtes/documents-à-telecharger/622a21249ce031c2f2d0b135',
//             children: [],
//           },
//           {
//             _id: '622a31a29ce031c2f2d0b13f',
//             active: false,
//             _active: false,
//             title: 'Code de la nationalité',
//             type: 'link',
//             path:
//               '/études et enquêtes/documents-à-telecharger/622a21249ce031c2f2d0b136',
//             children: [],
//           },
//         ],
//       },
//       {
//         _id: '621907a15200e515144f81a3',
//         active: false,
//         _active: false,
//         title: 'Annuaires',
//         type: 'link',
//         path: '/Conseils-et-info-pratique/annuaires',
//         children: [],
//       },
//     ],
//   },
//   {
//     _id: '621907cf5200e515144f81a5',
//     active: false,
//     _active: false,
//     title: 'Communauté',
//     type: 'sub',
//     path: null,
//     megaMenu: true,
//     children: [
//       {
//         _id: '621908305200e515144f81a7',
//         active: false,
//         _active: false,
//         title: 'Blog',
//         type: 'link',
//         path: '/pages/404',
//         children: [],
//       },
//       {
//         _id: '621908545200e515144f81a9',
//         active: false,
//         _active: false,
//         title: 'Forum',
//         type: 'link',
//         path: '/Espace-communautaire/forums-discussion',
//         children: [],
//       },
//       {
//         _id: '6219088d5200e515144f81ab',
//         active: false,
//         _active: false,
//         title: 'Wiki',
//         type: 'link',
//         path: '/posts/rubriques/details-rubrique/621910c85200e515144f81d0',
//         children: [],
//       },
//       {
//         _id: '621908af5200e515144f81ad',
//         active: false,
//         _active: false,
//         title: 'Sondage',
//         type: 'link',
//         path: '/Espace-communautaire/sondage',
//         children: [],
//       },
//       {
//         _id: '621908ea5200e515144f81af',
//         active: false,
//         _active: false,
//         title: 'Enquêtes',
//         type: 'link',
//         path: '/posts/rubriques/details-rubrique/6218d9265200e515144f80d6',
//         children: [],
//       },
//       {
//         _id: '621909205200e515144f81b1',
//         active: false,
//         _active: false,
//         title: 'Lexique',
//         type: 'link',
//         path: '/pages/404',
//         children: [],
//       },
//       {
//         _id: '6219093c5200e515144f81b3',
//         active: false,
//         _active: false,
//         title: 'Quiz',
//         type: 'link',
//         path: '/Prise-de-conscience/testez-vous-connaissances/quiz',
//         children: [],
//       },
//     ],
//   },
// ]
