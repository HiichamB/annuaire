import { Component, OnInit } from '@angular/core'
import { FormBuilder, FormControl, FormGroup, Validators } from '@angular/forms'
import { Router } from '@angular/router'

@Component({
  selector: 'app-checkout-adresse-form',
  templateUrl: './checkout-adresse-form.component.html',
  styleUrls: ['./checkout-adresse-form.component.scss'],
})
export class CheckoutAdresseFormComponent implements OnInit {
  public infoForm: FormGroup
  panier: any = []
  constructor(private router: Router, private fb: FormBuilder) {
    this.infoForm = this.fb.group({
      name: new FormControl('', [
        Validators.required,
        Validators.minLength(3),
        Validators.maxLength(30),
        Validators.pattern('^[a-zA-Z \u0600-\u06FF]+$'),
      ]),
      prenom: new FormControl('', [
        Validators.required,
        Validators.minLength(3),
        Validators.maxLength(30),
        Validators.pattern('^[a-zA-Z \u0600-\u06FF]+$'),
      ]),
      adresse: new FormControl('', [
        Validators.required,

        Validators.minLength(3),
        Validators.maxLength(30),
        Validators.pattern('^[a-zA-Z \u0600-\u06FF]+$'),
      ]),
      ville: new FormControl('', [
        Validators.required,
        Validators.minLength(3),
        Validators.maxLength(30),
      ]),
      pays: new FormControl('', [
        Validators.required,
        Validators.minLength(3),
        Validators.maxLength(30),
      ]),
      codePostal: new FormControl('', [
        Validators.required,
        Validators.minLength(3),
        Validators.maxLength(30),
      ]),
      telephone: new FormControl('', [
        Validators.required,
        Validators.pattern('^((\\+212-?)|0)?[0-9]{10}$'),
        Validators.minLength(10),
      ]),
      email: new FormControl('', [Validators.required, Validators.email]),
      message: new FormControl('', [
        Validators.required,
        Validators.minLength(10),
      ]),
    })
  }
  public sendSAV() {
    if (this.infoForm.valid) {
      console.log(this.infoForm.value)

      this.infoForm.reset()
    } else {
      this.infoForm.markAllAsTouched()
    }
  }
  modeArab: any = true

  ngOnInit(): void {
    this.modeArab = localStorage.getItem('isArab')
    this.modeArab = JSON.parse(this.modeArab)
    this.panier = localStorage.getItem('panier')
    this.panier = JSON.parse(this.panier)
    console.log('🚀 ~ this.panier ~ 🚀', this.panier)
  }
  nextPage() {
    this.sendSAV()
    this.router.navigate(['checkout/payement-form'])

    return
  }
}
