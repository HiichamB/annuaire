import { Component, OnInit } from '@angular/core'
import { NgbModal } from '@ng-bootstrap/ng-bootstrap'

@Component({
  selector: 'app-all-compare-page',
  templateUrl: './all-compare-page.component.html',
  styleUrls: ['./all-compare-page.component.scss'],
})
export class AllComparePageComponent implements OnInit {
  constructor(public modalService: NgbModal) {}
  typeSelected: any = ''
  selected: any = ''
  listCompare: any = []

  productsDataAll: any = [
    {
      type: 'Sandales',
      products: [
        {
          id: 1,
          name: 'Product 1',
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
        },
        {
          id: 12,

          image:
            'https://img01.ztat.net/article/spp-media-p1/23eb89e71fb93c4ca34003cacbf087ab/06d493e4fcbf46e8bc68d36f118240f5.jpg?imwidth=300&filter=packshot',
          name: 'Product 8877',
          price: '189Dh',
          rating: 5,
          description:
            "As fellow graduate students at MIT in 2004, Brian and Dharmesh noticed a shift in the way people shop and buy. Consumers were no longer tolerating interruptive bids for their attention — in fact, they'd gotten really, really good at ignoring them. \n From this shift, a company was born: HubSpot. It was founded on inbound, the notion that people don't want to be interrupted by marketers or harassed by salespeople — they want to be helped.\n Today, the inbound movement continues to empower businesses around the world to stop interrupting, start helping, and return their focus to the customer.",

          promo: {
            taux: '-40%',
            promoPrice: '100DH',
          },
        },
        {
          id: 13,

          image:
            'https://img01.ztat.net/article/spp-media-p1/b84642a1c2ac3c57832d6b53e9b4b246/8ab325f57e4d49dab2083269afe51392.jpg?imwidth=762&filter=packshot',
          name: 'Product 5523',
          price: 350,
          rating: 1,
        },
      ],
    },
    {
      type: 'T-Shirt',
      products: [
        {
          id: 2,

          name: 'Product 2',
          categorie: 'Chaussures',
          description:
            "As fellow graduate students at MIT in 2004, Brian and Dharmesh noticed a shift in the way people shop and buy. Consumers were no longer tolerating interruptive bids for their attention — in fact, they'd gotten really, really good at ignoring them. \n From this shift, a company was born: HubSpot. It was founded on inbound, the notion that people don't want to be interrupted by marketers or harassed by salespeople — they want to be helped.\n Today, the inbound movement continues to empower businesses around the world to stop interrupting, start helping, and return their focus to the customer.",
          image:
            'https://themes.pixelstrap.com/multikart/assets/images/pro3/27.jpg',
          price: '300Dh',
          rating: 2,
        },
        {
          id: 21,

          image:
            'https://themes.pixelstrap.com/multikart/assets/images/pro3/34.jpg',
          name: 'name prod',
          price: '98.5Dh',
          rating: 4.5,
          description:
            "As fellow graduate students at MIT in 2004, Brian and Dharmesh noticed a shift in the way people shop and buy. Consumers were no longer tolerating interruptive bids for their attention — in fact, they'd gotten really, really good at ignoring them. \n From this shift, a company was born: HubSpot. It was founded on inbound, the notion that people don't want to be interrupted by marketers or harassed by salespeople — they want to be helped.\n Today, the inbound movement continues to empower businesses around the world to stop interrupting, start helping, and return their focus to the customer.",
        },
      ],
    },
    {
      type: 'Sneakers',
      products: [
        {
          id: 3,
          name: 'Product 1',
          categorie: 'Computer',
          description:
            "As fellow graduate students at MIT in 2004, Brian and Dharmesh noticed a shift in the way people shop and buy. Consumers were no longer tolerating interruptive bids for their attention — in fact, they'd gotten really, really good at ignoring them. \n From this shift, a company was born: HubSpot. It was founded on inbound, the notion that people don't want to be interrupted by marketers or harassed by salespeople — they want to be helped.\n Today, the inbound movement continues to empower businesses around the world to stop interrupting, start helping, and return their focus to the customer.",
          image:
            'https://img01.ztat.net/article/spp-media-p1/c0ac7db5c78b3c2b8186d10b929ea373/52f28350e285458db1fae08c69cd529e.jpg?imwidth=1800&filter=packshot',
          price: '200Dh',
          rating: 5,
          promo: {
            taux: '-40%',
            promoPrice: '100DH',
          },
        },
        {
          id: 31,

          image:
            'https://img01.ztat.net/article/spp-media-p1/9d17e679e079384f83202a7ddd08f9fe/b0105ef04ab2413b9c6638344f7d219a.jpg?imwidth=1800',
          name: 'Product 8877',
          price: '189Dh',
          rating: 5,
          description:
            "As fellow graduate students at MIT in 2004, Brian and Dharmesh noticed a shift in the way people shop and buy. Consumers were no longer tolerating interruptive bids for their attention — in fact, they'd gotten really, really good at ignoring them. \n From this shift, a company was born: HubSpot. It was founded on inbound, the notion that people don't want to be interrupted by marketers or harassed by salespeople — they want to be helped.\n Today, the inbound movement continues to empower businesses around the world to stop interrupting, start helping, and return their focus to the customer.",

          promo: {
            taux: '-40%',
            promoPrice: '100DH',
          },
        },
        {
          id: 32,

          image:
            'https://img01.ztat.net/article/spp-media-p1/7507099f8e023f2fab526478a227088b/57c591dd0827404187350ce7368faa52.jpg?imwidth=1800',
          name: 'Product 5523',
          price: 350,
          rating: 1,
        },
      ],
    },
  ]
  productsData: any = []
  ngOnInit(): void {}
  openModal(template: any) {
    this.modalService.open(template, {
      ariaLabelledBy: 'modal-basic-title',
      size: 'md',
      centered: true,
    })
  }
  onChange(event: any) {
    this.selected = event.target.value
    console.log(this.selected)

    this.productsData = this.productsDataAll.filter((item: any) => {
      return item.type == this.selected
    })
    console.log(this.productsData)
  }
  addToList(item: any) {
    this.listCompare.push(item)
    this.typeSelected = this.selected
    this.modalService.dismissAll()
  }
  clearAll() {
    this.listCompare = []
    this.typeSelected = ''
    this.productsData = []
  }

  removeItem(itemToDelete: any) {
    console.log('itemToDelete', itemToDelete.id)
    console.log('productsData', this.listCompare)

    this.listCompare = this.listCompare.filter((item: any) => {
      return item.id != itemToDelete.id
    })
    if (this.listCompare.length == 0) {
      this.listCompare = []
      this.typeSelected = ''
      this.productsData = []
    }
  }
}
