import { Component, OnInit } from '@angular/core'
import { NgbModal } from '@ng-bootstrap/ng-bootstrap'
import { ToastrService } from 'ngx-toastr'

@Component({
  selector: 'app-shopping-cart',
  templateUrl: './shopping-cart.component.html',
  styleUrls: ['./shopping-cart.component.scss'],
})
export class ShoppingCartComponent implements OnInit {
  constructor(private toastr: ToastrService, public modalService: NgbModal) {}
  panier: any = []
  nb: number = 1
  productStock: number = 5
  ifEmpty: boolean = false
  idSociete: any = ''
  reader: any = ''
  ngOnInit(): void {
    this.panier = localStorage.getItem('panier')
    this.panier = JSON.parse(this.panier)
    this.ifEmpty = false

    this.panier.map((panier: any) => {
      console.log(panier.products.length)

      if (panier.products.length > 0) this.ifEmpty = true
    })
    this.reader = localStorage.getItem('fromMenu')
    this.reader = JSON.parse(this.reader)
    console.log('🚀 ~  ~   this.reader ', this.reader)
    if (localStorage.getItem('vendeurId') && !this.reader) {
      console.log('entred to filter')

      this.panier = this.panier.filter((panier: any) => {
        return panier.vendeur.id == localStorage.getItem('vendeurId')
      })
    } else if (this.reader) {
      localStorage.setItem('fromMenu', JSON.stringify(false))

      console.log('entred to filter 1')
    }
  }
  increment(idP: any) {
    this.panier.map((item: any) => {
      item.products.map((products: any) => {
        if (products.idP == idP) {
          if (products.quantite <= this.productStock) {
            products.quantite += 1
          } else {
            this.toastr.error('', 'Stock Indisponible', {
              timeOut: 3000,
              progressBar: true,
              progressAnimation: 'increasing',
              positionClass: 'toast-top-right',
            })
          }
        }
      })
    })
  }
  decrement(idP: any) {
    this.panier.map((item: any) => {
      item.products.map((products: any) => {
        if (products.idP == idP) {
          if (products.quantite > 1) {
            products.quantite -= 1
          } else {
            this.toastr.error('', 'Minimium Nombre Atteint', {
              timeOut: 3000,
              progressBar: true,
              progressAnimation: 'increasing',
              positionClass: 'toast-top-right',
            })
          }
        }
      })
    })
  }

  removeItem(idP: any, template: any) {
    // this.toastr.confirm('Are you sure?', {onOk: () => { console.log('ok') }, onCancel: () => { console.log('cancel')}})
    this.idP = idP
    this.modalService.open(template, {
      ariaLabelledBy: 'modal-basic-title',
      size: 'md',
      centered: true,
    })
  }
  idP: any = ''
  deleteElement() {
    if (this.idP) {
      this.panier.map((item: any) => {
        item.products = item.products.filter((products: any) => {
          return products.idP != this.idP
        })
      })
      localStorage.setItem('panier', JSON.stringify(this.panier))
    }
    this.modalService.dismissAll()
    this.idP = ''
  }
}
