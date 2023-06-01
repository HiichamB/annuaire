import { Component, OnInit } from '@angular/core'

@Component({
  selector: 'app-compare-page',
  templateUrl: './compare-page.component.html',
  styleUrls: ['./compare-page.component.scss'],
})
export class ComparePageComponent implements OnInit {
  constructor() {}
  listCompare: any = []
  ngOnInit(): void {
    this.listCompare = localStorage.getItem('compareList')
    this.listCompare = JSON.parse(this.listCompare)
  }
  deleteItem(itemToDelete: any) {
    console.log('itemToDelete', itemToDelete.id)
    console.log('productsData', this.listCompare)
    this.listCompare.map((item: any) => {
      item.products = item.products.filter(
        (prd: any) => prd.id != itemToDelete.id,
      )
    })
    console.log('After', this.listCompare)

    this.listCompare = this.listCompare.filter(
      (item: any) => item.products.length > 0,
    )
    localStorage.setItem('compareList', JSON.stringify(this.listCompare))
  }
}
