import { Component, Input, OnInit } from '@angular/core'

@Component({
  selector: 'app-annuaire-search-details',
  templateUrl: './annuaire-search-details.component.html',
  styleUrls: ['./annuaire-search-details.component.scss'],
})
export class AnnuaireSearchDetailsComponent implements OnInit {
  constructor() {}
  elementsOfList: any = []
  direction: any = 'grid'
  openMap: any = false
  nbP: number = 1
  toggleMap() {
    this.openMap = !this.openMap
  }
  listType = 'col-md-6'
  toggleGrid3() {
    this.listType = ' col-md-6 '
  }
  toggleGrid2() {
    this.listType = ' col-md-4 '
  }
  ngOnInit(): void {
    this.searchBarItems = [
      {
        _id: 'reset',
        active: false,
        _active: false,
        title: 'All Categories',
        type: 'sub',
        path: null,
        children: [],
      },
      {
        _id: '6218fcf75200e515144f8155',
        active: false,
        _active: false,
        title: 'A la une',
        type: 'sub',
        path: null,
        megaMenu: true,
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
      {
        _id: '6218febd5200e515144f815d',
        active: false,
        _active: false,
        title: 'Publications',
        type: 'sub',
        path: null,
        megaMenu: true,
        children: [
          {
            title: 'Computer',
            type: 'link',
            path: '',
            img: 'assets/images/computer.png',
          },
          {
            title: 'Creativity',
            type: 'link',
            path: '',
            img: 'assets/images/creativity.png',
          },
          {
            title: 'Books',
            type: 'link',
            path: '',
            img: 'assets/images/book.png',
          },
        ],
      },
      {
        _id: '6219011f5200e515144f8173',
        active: false,
        _active: false,
        title: 'Evénements',
        type: 'sub',
        path: null,
        megaMenu: true,
        children: [
          {
            title: 'Cars Motocycle',
            type: 'link',
            path: '',
            img: 'assets/images/car.png',
          },
          {
            title: 'Computer',
            type: 'link',
            path: '',
            img: 'assets/images/computer.png',
          },
          {
            title: 'Creativity',
            type: 'link',
            path: '',
            img: 'assets/images/creativity.png',
          },
          {
            title: 'Books',
            type: 'link',
            path: '',
            img: 'assets/images/book.png',
          },
          {
            title: 'Computer',
            type: 'link',
            path: '',
            img: 'assets/images/computer.png',
          },
          {
            title: 'Books',
            type: 'link',
            path: '',
            img: 'assets/images/book.png',
          },
        ],
      },
      {
        _id: '6219011f5200e515144f8185',
        active: false,
        _active: false,
        title: 'Menu Item 2 ',
        type: 'sub',
        path: null,
        megaMenu: true,
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
        _id: '6218fcf75200e515144f81865',
        active: false,
        _active: false,
        title: 'Menu Item 3',
        type: 'sub',
        path: null,
        megaMenu: true,
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
      {
        _id: '6218fcf75200e515144f818564',
        active: false,
        _active: false,
        title: 'Menu Item 4',
        type: 'sub',
        path: null,
        megaMenu: true,
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

    this.elementsOfList = [
      {
        id: '1',
        title: 'Societe 1',
        location: '15, Rue Buzancy Belvedere',
        description:
          'Id placerat tacimates definitionem sea, prima quidam vim no. Duo nobis persecuti cu. Duo nobis persecuti cu.',
        link: 'details',
        image: 'http://www.ansonika.com/sparker/img/location_1.jpg',
        score: '1',
        telephone: '06 25 45 89 65',
        email: 'malinatoir@gmail.com',
      },
      {
        id: '2',

        title: 'Hotel Le Marly',
        location: '120, Bd La Resistance Marrakech',
        description:
          'Id placerat tacimates definitionem sea, prima quidam vim no. Duo nobis persecuti cu. Duo nobis persecuti cu.',
        link: 'details',
        image: 'http://www.ansonika.com/sparker/img/location_2.jpg',
        score: '2',
        telephone: '06 25 45 89 65',
        email: 'malinatoir@gmail.com',
      },

      {
        id: '3',

        title: 'Club La Reconnaisace',
        location: '40,Rue Pierre Perone',
        description:
          'Id placerat tacimates definitionem sea, prima quidam vim no. Duo nobis persecuti cu. Duo nobis persecuti cu.',
        link: 'details',
        image: 'http://www.ansonika.com/sparker/img/location_3.jpg',
        score: '10',
        telephone: '06 25 45 89 65',
        email: 'malinatoir@gmail.com',
      },
      {
        id: '4',

        title: 'Mary Boutique',
        location: '15, Rue Buzancy Belvedere',
        description:
          'Id placerat tacimates definitionem sea, prima quidam vim no. Duo nobis persecuti cu. Duo nobis persecuti cu.',
        link: 'details',
        image: 'http://www.ansonika.com/sparker/img/location_6.jpg',
        score: '6',
        telephone: '06 25 45 89 65',
        email: 'malinatoir@gmail.com',
      },
      {
        id: '5',

        title: 'Hotel Le Marly',
        location: '120, Bd La Resistance Marrakech',
        description:
          'Id placerat tacimates definitionem sea, prima quidam vim no. Duo nobis persecuti cu. Duo nobis persecuti cu.',
        link: 'details',
        image: 'http://www.ansonika.com/sparker/img/location_4.jpg',
        score: '4',
        telephone: '06 25 45 89 65',
        email: 'malinatoir@gmail.com',
      },

      {
        id: '6',

        title: 'Club La Reconnaisace',
        location: '40,Rue Pierre Perone',
        description:
          'Id placerat tacimates definitionem sea, prima quidam vim no. Duo nobis persecuti cu. Duo nobis persecuti cu.',
        link: 'details',
        image: 'http://www.ansonika.com/sparker/img/location_5.jpg',
        score: '5',
        telephone: '06 25 45 89 65',
        email: 'malinatoir@gmail.com',
      },
    ]
  }

  toggletNavActive(item: any) {
    for (let i of this.searchBarItems) {
      if (i._id != item._id) i._active = false
    }
    item._active = !item._active
  }
  searchBarItems: any = []
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
  changeLayoutGrid() {
    this.direction = 'grid'
  }
  changeLayoutList() {
    this.direction = 'list'
  }
}
