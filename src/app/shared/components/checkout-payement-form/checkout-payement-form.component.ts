import { Component, OnInit } from '@angular/core'
import { Router } from '@angular/router'

@Component({
  selector: 'app-checkout-payement-form',
  templateUrl: './checkout-payement-form.component.html',
  styleUrls: ['./checkout-payement-form.component.scss'],
})
export class CheckoutPayementFormComponent implements OnInit {
  constructor(private router: Router) {}
  panier: any = []
  modeArab: any = true

  ngOnInit(): void {
    this.modeArab = localStorage.getItem('isArab')
    this.modeArab = JSON.parse(this.modeArab)

    this.panier = localStorage.getItem('panier')
    this.panier = JSON.parse(this.panier)
    console.log('🚀 ~ this.panier ~ 🚀', this.panier)
  }
  nextPage() {
    this.router.navigate(['checkout/validation'])

    return
  }
  previousPage() {
    this.router.navigate(['checkout/adresse-form'])

    return
  }
}
