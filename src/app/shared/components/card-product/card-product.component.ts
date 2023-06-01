import { Component, Input, OnInit } from '@angular/core'
import { ToastrService } from 'ngx-toastr'

@Component({
  selector: 'app-card-product',
  templateUrl: './card-product.component.html',
  styleUrls: ['./card-product.component.scss'],
})
export class CardProductComponent implements OnInit {
  @Input() categorie: any = ''
  @Input() image: any = ''
  @Input() rating: any = ''
  @Input() description: any = ''
  @Input() titre: any = ''
  @Input() price: any = ''
  @Input() otherProducts: any = []
  @Input() promo: any = {}
  @Input() livraison: any = ''
  @Input() product: any = []
  @Input() id: any = ''

  constructor(private toastr: ToastrService) {}

  ngOnInit(): void {
    console.log('id', this.id)
  }
  hovredImage: any = ''
  selectedItem: any = ''

  changeParentImage(item: any) {
    console.log(
      '🚀 ~ file: card-product.component.ts ~ line 28 ~ CardProductComponent ~ changeParentImage ~ item.others',
      item,
    )

    this.selectedItem = item
    this.hovredImage = item.image
    console.log(this.hovredImage)
  }
  resetParentImage() {
    this.selectedItem = ''
    this.hovredImage = this.image
  }
  isEmptyObject(obj: any) {
    return obj && Object.keys(obj).length === 0
  }
  listCompare: any = []
  alreadyExist: boolean = false
  alreadyExistPrd: boolean = false

  addItemToCompareList() {
    this.listCompare = localStorage.getItem('compareList')
    this.listCompare = JSON.parse(this.listCompare)

    if (this.listCompare.length > 0) {
      this.alreadyExist = false

      this.listCompare.map((group: any) => {
        console.log(group.categorie)
        console.log(this.categorie)

        if (group.categorie == this.categorie) {
          this.alreadyExist = true
        }
      })

      if (this.alreadyExist) {
        this.listCompare.map((group: any) => {
          group.products.map((prd: any) => {
            if (prd.id == this.id) {
              this.alreadyExistPrd = true
            }
          })
        })
        if (this.alreadyExistPrd) {
          this.toastr.error('', 'Element Deja Sélectionnée', {
            timeOut: 2000,
            progressBar: true,
            progressAnimation: 'increasing',
            positionClass: 'toast-top-right',
          })
        } else {
          this.listCompare.map((group: any) => {
            console.log(group.categorie)
            console.log(this.categorie)

            if (group.categorie == this.categorie) {
              this.toastr.success('', 'Element Ajouter', {
                timeOut: 2000,
                progressBar: true,
                progressAnimation: 'increasing',
                positionClass: 'toast-top-right',
              })
              group.products.push({
                id: this.id,
                name: this.titre,
                image: this.image,
                quantite: 10,
                price: this.price,
              })
            }
          })
        }
        console.log(this.alreadyExist)
      } else {
        this.toastr.success('', 'Element Ajouter Au Panier', {
          timeOut: 2000,
          progressBar: true,
          progressAnimation: 'increasing',
          positionClass: 'toast-top-right',
        })
        this.listCompare.push({
          categorie: this.categorie,
          products: [
            {
              id: this.id,
              name: this.titre,
              image: this.image,
              quantite: 10,
              price: this.price,
            },
          ],
        })
      }
    } else {
      console.log('entred 2 ')

      this.toastr.success('', '-- Element Ajouter Au Panier --', {
        timeOut: 2000,
        progressBar: true,
        progressAnimation: 'increasing',
        positionClass: 'toast-top-right',
      })
      this.listCompare.push({
        categorie: this.categorie,
        products: [
          {
            id: this.id,
            name: this.titre,
            image: this.image,
            quantite: 10,
            price: this.price,
          },
        ],
      })
    }
    localStorage.setItem('compareList', JSON.stringify(this.listCompare))
    console.log('🚀 ~ compareList ~ 🚀  ', this.listCompare)
  }
}
