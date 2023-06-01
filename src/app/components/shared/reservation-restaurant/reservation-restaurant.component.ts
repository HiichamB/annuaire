import { Component, OnInit, ViewChild } from '@angular/core'
import { FormBuilder, FormControl, Validators } from '@angular/forms'
import { IgxStepperComponent, IStepChangingEventArgs } from 'igniteui-angular'

@Component({
  selector: 'app-reservation-restaurant',
  templateUrl: './reservation-restaurant.component.html',
  styleUrls: ['./reservation-restaurant.component.scss'],
})
export class ReservationRestaurantComponent implements OnInit {
  reservationRestaurant: any
  isValideToCalcule: boolean = false
  firstFormGroup: any
  secondFormGroup: any
  constructor(private fb: FormBuilder) {
    this.firstFormGroup = this.fb.group({
      firstCtrl: ['', Validators.required],
    })
    this.secondFormGroup = this.fb.group({
      secondCtrl: ['', Validators.required],
    })

    this.reservationRestaurant = this.fb.group({
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
      email: new FormControl('', [Validators.required, Validators.email]),
      dateDebut: new FormControl('', [Validators.required]),
      heureDebut: new FormControl({ value: '' }, [Validators.required]),
      nbPersonnes: new FormControl({ value: '', disabled: true }, [
        Validators.required,
      ]),
      type: new FormControl('', [Validators.required]),

      telephone: new FormControl('', [
        Validators.required,
        Validators.pattern('^((\\+212-?)|0)?[0-9]{10}$'),
        Validators.minLength(10),
      ]),
      titre: new FormControl('', [
        Validators.required,
        Validators.minLength(3),
        Validators.maxLength(30),
      ]),
      content: new FormControl('', [
        Validators.required,
        Validators.minLength(3),
      ]),
    })
  }

  ngOnInit(): void {
    this.heureDebutStatus = true
  }
  public sendLocation() {
    if (this.reservationRestaurant.valid) {
      this.reservationRestaurant.reset()
    } else {
      this.reservationRestaurant.markAllAsTouched()
    }
  }
  changeDateDebut(item: any) {
    if (item.value != '') {
      this.heureDebutStatus = false
    }
  }
  changeHeureDebut(datePicker: any) {
    datePicker = datePicker.value
    if (datePicker != '') {
      this.reservationRestaurant
        .get('heureDebut')
        .setValue(
          (datePicker.getHours() >= 10
            ? datePicker.getHours()
            : '0' + datePicker.getHours()) +
            ':' +
            (datePicker.getMinutes() == '0' ? '00' : datePicker.getMinutes()),
        )
    }
    this.reservationRestaurant.controls['nbPersonnes'].enable()

    console.log(this.reservationRestaurant.value)

    // this.calculePrix()
  }
  @ViewChild('stepper') stepper: any

  nextClicked(event: any) {
    if (this.reservationRestaurant.valid) {
      this.stepper.next()
      console.log('form after', this.reservationRestaurant.value)
    } else {
      this.reservationRestaurant.markAllAsTouched()
    }
  }
  previousClicked(event: any) {
    // complete the current step
    // this.stepper.selected.completed = true;
    // move to next step
    this.stepper.previous()
  }
  dateNow: any = new Date()
  heureDebutStatus: any = ''
  menuPrincipale: any = [
    {
      id: 1,
      name: 'Pizza',
      details: 'Tomates cerise, basilic, ail, origan',
      price: '100',
    },
    {
      id: 2,

      name: 'Bruschetta Vegetariana',
      details: 'Légumes du moment',
      price: '120',
    },
    {
      id: 3,

      name: 'Caprese',
      details: 'omates, mozzarella, huile d’olive',
      price: '100',
    },
    {
      id: 4,

      name: 'Polpo Mediterraneo',
      details: 'Pommes de terre, tomates cerise, haricots verts',
      price: '178',
    },
    {
      id: 5,

      name: 'Affettato Misto',
      details: 'Tomates cerise, roquette, Grana',
      price: '235',
    },
  ]
  optionTable: any = [
    {
      id: 1,

      name: 'Limonade',

      price: '10',
    },
    {
      id: 2,

      name: 'Supplément fromage',

      price: '8',
    },
    {
      id: 3,

      name: 'Caprese',

      price: '100',
    },
    {
      id: 4,

      name: 'Polpo Mediterraneo',

      price: '178',
    },
    {
      id: 5,

      name: 'Affettato Misto',

      price: '235',
    },
  ]
  onQuantiteChangeProduct(quantite: any, product: any) {
    product.quantiteSelected = quantite.value
    product.totalPrix =
      +product.price * +(product.quantiteSelected || 1) +
      +(
        product.selectedOptions?.reduce((prev: any, next: any) => {
          return +prev + +next.totalPrix
        }, 0) || 0
      )
  }
  selectedItemsMenu: any = []
  selectedItemsOptions: any = []

  changeCkeckBoxMenu(event: any, product: any) {
    if (event.checked) {
      this.selectedItemsMenu.push(product)
      if (!product.quantiteSelected) product.quantiteSelected = 1
      if (!product.totalPrix) product.totalPrix = +product.price
    } else {
      this.selectedItemsMenu = this.selectedItemsMenu.filter(
        (item: any) => item.id != product.id,
      )
      // product.totalPrix -= +product.price
    }
  }
  changeCkeckBoxOptions(event: any, option: any) {
    if (event.checked) {
      this.selectedItemsOptions.push(option)
      if (!option.quantiteSelected) option.quantiteSelected = 1
      if (!option.totalPrix) option.totalPrix = +option.price
    } else {
      this.selectedItemsOptions = this.selectedItemsOptions.filter(
        (item: any) => item.id != option.id,
      )
      // product.totalPrix -= +product.price
    }
  }
  // @ViewChild('stepper2', { read: IgxStepperComponent })
  // public stepper2: any

  // public activeStepChanging(evt: IStepChangingEventArgs): void {
  //   this.stepper2.steps.forEach((step: any) => {
  //     if (
  //       step.index >= evt.oldIndex &&
  //       step.index < evt.newIndex &&
  //       this.reservationRestaurant.valid
  //     ) {
  //       // step.next()
  //     } else {
  //       this.reservationRestaurant.markAllAsTouched()
  //     }
  //   })
  // }

  // public reset(): void {
  //   this.stepper2.steps.forEach((step: any) => (step.completed = false))
  //   this.stepper2.reset()
  // }
  calculeTotal() {
    let total: any = 0
    total =
      this.selectedItemsMenu?.reduce((prev: any, next: any) => {
        return +prev + +(next.quantiteSelected || 1) * next.price
      }, 0) || 0
    total +=
      this.selectedItemsOptions?.reduce((prev: any, next: any) => {
        return +prev + +(next.quantiteSelected || 1) * next.price
      }, 0) || 0
    return total
  }
}
