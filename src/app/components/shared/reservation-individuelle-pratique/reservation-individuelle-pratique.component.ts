import { Component, OnInit } from '@angular/core'
import { FormBuilder, FormControl, Validators } from '@angular/forms'
import { addDays } from 'date-fns'
import { ToastrService } from 'ngx-toastr'

@Component({
  selector: 'app-reservation-individuelle-pratique',
  templateUrl: './reservation-individuelle-pratique.component.html',
  styleUrls: ['./reservation-individuelle-pratique.component.scss'],
})
export class ReservationIndividuellePratiqueComponent implements OnInit {
  reservationPratiqueIndividuelleForm: any
  constructor(private fb: FormBuilder, private toastr: ToastrService) {
    this.reservationPratiqueIndividuelleForm = this.fb.group({
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

      heureDebut: new FormControl('', [Validators.required]),
      heureEnd: new FormControl({ value: '', disabled: true }, [
        Validators.required,
      ]),
      quantite: new FormControl({ value: '' }, [Validators.required]),
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

  ngOnInit(): void {}
  public sendReservation() {
    if (this.reservationPratiqueIndividuelleForm.valid) {
      this.reservationPratiqueIndividuelleForm.reset()
    } else {
      this.reservationPratiqueIndividuelleForm.markAllAsTouched()
    }
  }
  heureDebut: any = new Date()
  heureFinLocation: any = new Date()
  heureFinMin: any = 0
  heureDebutChange(event: any) {
    this.heureDebut = event.target.value
    console.log('heureDebut', this.heureDebut)

    this.heureFinMin = addDays(new Date(Date.parse(this.heureDebut)), 1)
    //console.log('Before heureFinMin', this.heureFinMin)

    this.heureFinMin =
      this.heureFinMin.getFullYear() +
      '-' +
      this.heureFinMin.getMonth() +
      '-' +
      this.heureFinMin.getDate() +
      'T' +
      this.heureFinMin.getHours() +
      ':' +
      this.heureFinMin.getMinutes() +
      ':00'
    // this.heureFinMin = '2022-07-07T14:47:57'
    console.log('After heureFinMin', this.heureFinMin)

    this.reservationPratiqueIndividuelleForm.controls['heureEnd'].enable()

    //this.locationForm.controls['heureFin'].setValue(addDays(this.heureDebutLocation, 1))
  }
  changeHeure(datePicker: any) {
    console.log(datePicker.value)
    datePicker = datePicker.value
    this.reservationPratiqueIndividuelleForm
      .get('heureEnd')
      .setValue(
        (+datePicker.getHours() >= 10
          ? datePicker.getHours()
          : '0' + datePicker.getHours()) +
          ':' +
          (datePicker.getMinutes() == '0' ? '00' : datePicker.getMinutes()),
      )

    console.log(
      'Value of LocationForm',
      this.reservationPratiqueIndividuelleForm.value,
    )
  }
}
