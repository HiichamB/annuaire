import { Component, OnInit } from '@angular/core'
import { Router } from '@angular/router'

@Component({
  selector: 'app-checkout-validation',
  templateUrl: './checkout-validation.component.html',
  styleUrls: ['./checkout-validation.component.scss'],
})
export class CheckoutValidationComponent implements OnInit {
  constructor(private router: Router) {}

  panier: any = []
  modeArab: any = true

  ngOnInit(): void {
    this.modeArab = localStorage.getItem('isArab')
    this.modeArab = JSON.parse(this.modeArab)
    this.panier = localStorage.getItem('panier')
    this.panier = JSON.parse(this.panier)
  }
  nextPage() {
    //this.router.navigate(['checkout/validation'])

    return
  }
  previousPage() {
    this.router.navigate(['checkout/payement-form'])

    return
  }
}
