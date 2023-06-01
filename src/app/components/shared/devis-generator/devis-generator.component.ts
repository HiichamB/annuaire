import { Component, OnInit } from '@angular/core'
import { FormControl, Validators, FormGroup, FormBuilder } from '@angular/forms'

@Component({
  selector: 'app-devis-generator',
  templateUrl: './devis-generator.component.html',
  styleUrls: ['./devis-generator.component.scss'],
})
export class DevisGeneratorComponent implements OnInit {
  selecetedProductDevis: any = []
  modeSociete: any = false
  expandedRowKeys: any = {}
  totalOfDevis: any = 0

  constructor(private fb: FormBuilder) {
    this.selecetedProductDevis = JSON.parse(
      sessionStorage.getItem('selecetedProductDevis') || '',
    )
    this.selecetedProductDevis.forEach((data: any) => {
      this.expandedRowKeys[data.id] = true
    })
    console.log(this.expandedRowKeys)

    this.DevisForm = this.fb.group({
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
      ]),
      reference: new FormControl('', [
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
  public DevisForm: FormGroup
  totalOptions: any = 0
  ngOnInit(): void {
    this.calculeTotelDevis()
  }
  changeCheckBox(event: any) {
    if (event.target.checked) {
      this.modeSociete = true
      this.DevisForm.addControl(
        'NumSociete',

        new FormControl('', [Validators.required]),
      )
    } else {
      this.DevisForm.removeControl('NumSociete')
      this.modeSociete = false
    }
  }
  public sendDevis() {
    if (this.DevisForm.valid) {
      this.DevisForm.reset()
    } else {
      this.DevisForm.markAllAsTouched()
    }
  }

  deleteDevisItem(id: any) {
    this.selecetedProductDevis = this.selecetedProductDevis.filter(
      (item: any) => item.id != id,
    )
  }

  onQuantiteChangeOption(event: any, option: any, product: any) {
    product.quantiteSelected = +event.value

    product.totalPrix =
      +product.price * +(product.quantiteSelected || 1) +
      +(
        product.selectedOptions?.reduce((prev: any, next: any) => {
          return +prev + +next.totalPrix
        }, 0) || 0
      )
    this.calculeTotelDevis()
  }
  onQuantiteChangeProduct(event: any, option: any, product: any) {
    option.quantiteSelected = +event.value
    option.totalPrix = +event.value * +option.price
    // console.log(option.totalPrix)

    product.totalPrix =
      +product.price * +(product.quantiteSelected || 1) +
      +(
        product.selectedOptions?.reduce((prev: any, next: any) => {
          return +prev + +next.totalPrix
        }, 0) || 0
      )
    this.calculeTotelDevis()
  }
  tva: any = 0
  calculeTotelDevis() {
    this.totalOfDevis =
      this.selecetedProductDevis.reduce((prev: any, next: any) => {
        return +prev + +next.totalPrix
      }, 0) || 0

    this.tva = 20

    console.log('selecetedProductDevis', this.selecetedProductDevis)
  }
}
