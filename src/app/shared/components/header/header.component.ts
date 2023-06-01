import { Component, OnInit } from '@angular/core'
import { Router } from '@angular/router'

@Component({
  selector: 'app-header',
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.scss'],
})
export class HeaderComponent implements OnInit {
  constructor(private router: Router) {}
  panier: any = []
  dates: Date[] = []

  rangeDates: Date[] = []

  minDate: any = new Date()

  maxDate: any = new Date()
  invalidDates: Array<Date> = []

  es: any
  ngOnInit(): void {
    // this.panier = [
    //   {
    //     _active: false,

    //     vendeur: {
    //       id: 1,
    //       name: 'Vendeur 1',
    //     },
    //     products: [
    //       {
    //         name: 'T-Shirt',
    //         image:
    //           'https://img01.ztat.net/article/spp-media-p1/d36678dc06ae43aba5ccfb70ad165648/325cf046ffc64432affa66ab60fd39f6.jpg?imwidth=156&filter=packshot',
    //         quantite: '1',
    //         price: '250',
    //       },
    //       {
    //         name: 'T-Shirt',
    //         image:
    //           'https://img01.ztat.net/article/spp-media-p1/d36678dc06ae43aba5ccfb70ad165648/325cf046ffc64432affa66ab60fd39f6.jpg?imwidth=156&filter=packshot',
    //         quantite: '1',
    //         price: '250',
    //         vendeur: {
    //           id: 1,
    //           name: 'Vendeur 1',
    //         },
    //       },
    //     ],
    //   },
    //   {
    //     _active: false,
    //     vendeur: {
    //       id: 2,
    //       name: 'Vendeur 2',
    //     },
    //     products: [
    //       {
    //         name: 'T-Shirt',
    //         image:
    //           'https://img01.ztat.net/article/spp-media-p1/ca30f093dc0f347098f0514267bb15d1/e3db0f7d6fc04a85abb6e2d631010dd7.jpg?imwidth=156',
    //         quantite: '2',
    //         price: '250',
    //       },
    //     ],
    //   },
    // ]
    this.panier = localStorage.getItem('panier')
    this.panier = JSON.parse(this.panier)
  }
  listProducts: any = []
  toggletNavActive(item: any) {
    for (let i of this.panier) {
      if (i._id != item._id) i._active = false
    }
    item._active = !item._active
  }
  goToCostumerCart(id: any) {
    localStorage.setItem('vendeurId', id)
    this.router.navigate(['/cart'])
  }
  goToAllCart() {
    localStorage.setItem('fromMenu', JSON.stringify(true))

    this.router.navigate(['/panier'])
  }
}
