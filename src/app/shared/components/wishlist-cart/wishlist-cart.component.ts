import { Component, OnInit } from '@angular/core'
import { ToastrService } from 'ngx-toastr'

@Component({
  selector: 'app-wishlist-cart',
  templateUrl: './wishlist-cart.component.html',
  styleUrls: ['./wishlist-cart.component.scss'],
})
export class WishlistCartComponent implements OnInit {
  ifEmpty = false
  constructor(public toastr: ToastrService) {}
  wishlist: any = []
  ngOnInit(): void {
    this.wishlist = localStorage.getItem('wishlist')
    this.wishlist = JSON.parse(this.wishlist)
    this.ifEmpty = false

    if (this.wishlist.length > 0) this.ifEmpty = true
  }
  removeItem(idP: any) {
    this.wishlist = this.wishlist.filter((item: any) => {
      return item.idP != idP
    })
    localStorage.setItem('wishlist', JSON.stringify(this.wishlist))
  }
  reader: any = []
  alreadyExist: boolean = false

  addToCart(selectedItem: any) {
    this.reader = localStorage.getItem('panier')
    this.reader = JSON.parse(this.reader)
    if (this.reader.length > 0) {
      this.reader.map((panier: any) => {
        if (panier.vendeur.id == localStorage.getItem('vendeurId')) {
          this.alreadyExist = false
          panier.products.map((panierProducts: any) => {
            if (panierProducts.idP == selectedItem.idP) {
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
              idP: selectedItem.idP,
              name: selectedItem.titre,
              image: selectedItem.image,
              quantite: 1,
              price: selectedItem.price,
            })
          }
        }
      })
    } else {
      console.log('entred 2 ')

      this.toastr.success('', '-- Element Ajouter Au Panier --', {
        timeOut: 2000,
        progressBar: true,
        progressAnimation: 'increasing',
        positionClass: 'toast-top-right',
      })
      this.reader.push({
        vendeur: {
          id: localStorage.getItem('vendeurId'),
          name: 'Vendeur 1',
        },
        products: [
          {
            idP: selectedItem.idP,
            name: selectedItem.titre,
            image: selectedItem.image,
            quantite: 1,
            price: selectedItem.price,
          },
        ],
      })
    }
    localStorage.setItem('panier', JSON.stringify(this.reader))
    console.log('🚀 ~ this.reader.length ~ 🚀  ', this.reader)
  }
}
