import { Component, OnInit } from '@angular/core'

@Component({
  selector: 'app-checkout-cart',
  templateUrl: './checkout-cart.component.html',
  styleUrls: ['./checkout-cart.component.scss'],
})
export class CheckoutCartComponent implements OnInit {
  items: any[] = []
  constructor() {}

  activeIndex: number = 0

  ngOnInit() {
    this.items = [
      {
        label: 'Adresse Info',
        routerLink: 'adresse-form',
      },
      {
        label: 'Payement',
        routerLink: 'payement-form',
      },
      {
        label: 'Validation',
        routerLink: 'validation',
      },
      {
        label: 'Info Generale',
        routerLink: 'payment',
      },
    ]
  }
}
