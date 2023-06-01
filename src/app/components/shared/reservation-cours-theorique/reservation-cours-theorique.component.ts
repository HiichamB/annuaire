import { Component, OnInit } from '@angular/core'
import { FormBuilder, FormControl, Validators } from '@angular/forms'
import { ToastrService } from 'ngx-toastr'

@Component({
  selector: 'app-reservation-cours-theorique',
  templateUrl: './reservation-cours-theorique.component.html',
  styleUrls: ['./reservation-cours-theorique.component.scss'],
})
export class ReservationCoursTheoriqueComponent implements OnInit {
  reservationTheoriqueForm: any
  constructor(private fb: FormBuilder, private toastr: ToastrService) {
    this.reservationTheoriqueForm = this.fb.group({
      cours: new FormControl('', Validators.required),
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
      heureDuCours: new FormControl({ value: '', disabled: true }, [
        Validators.required,
      ]),
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
    this.bubbleSort(this.autoEcole.cours)
  }
  autoEcole: any = {
    typeService: ['Voiture', 'Moto', 'Camion', 'Remorque'],
    cours: [
      {
        id: 1,
        dateDebut: '2022-07-23',
        dateFin: '2022-07-23',
        heureDebut: '12:00',
        heureFin: '14:00',
        nbPlaces: 10,
        nbReservations: 5,
        titre: 'La circulation et les règles de priorités',
        description:
          'Les intersections, rond-points et carrefours à sens giratoire',
      },
      {
        id: 2,

        dateDebut: '2022-07-23',
        dateFin: '2022-07-23',
        heureDebut: '10:00',
        heureFin: '11:00',
        nbPlaces: 10,
        nbReservations: 10,
        titre: 'Le stationnement',
        description: 'Description Accusantium sint deleteItem',
      },
      {
        id: 3,

        dateDebut: '2022-07-23',
        dateFin: '2022-07-23',
        heureDebut: '12:30',
        heureFin: '13:45',
        nbPlaces: 10,
        nbReservations: 5,
        titre: 'La limitation de vitesse',
        description:
          'Respecter la limitation de vitesse hors et en agglomération',
      },
      {
        id: 8,

        dateDebut: '2022-07-23',
        dateFin: '2022-07-23',
        heureDebut: '16:30',
        heureFin: '18:45',
        nbPlaces: 10,
        nbReservations: 7,
        titre: 'Test Du Cours',
        description: 'Description Cours Accusantium sint deleteItem',
      },
      {
        id: 7,

        dateDebut: '2022-07-23',
        dateFin: '2022-07-23',
        heureDebut: '16:30',
        heureFin: '18:45',
        nbPlaces: 10,
        nbReservations: 10,
        titre: 'Le stationnement',
        description: 'Description Accusantium sint deleteItem',
      },
      {
        id: 4,

        dateDebut: '2022-07-24',
        dateFin: '2022-07-24',
        heureDebut: '12:15',
        heureFin: '14:00',
        nbPlaces: 9,
        nbReservations: 5,
        titre: 'Le permis à points et les sanctions',
        description: 'Le permis à points et les sanctions',
      },
      {
        id: 5,

        dateDebut: '2022-07-24',
        dateFin: '2022-07-24',
        heureDebut: '08:00',
        heureFin: '11:00',
        nbPlaces: 12,
        nbReservations: 10,
        titre: 'La voiture et les équipements obligatoires',
        description:
          'Certains équipements obligatoires de la voiture sont à connaître',
      },
      {
        id: 6,

        dateDebut: '2022-07-24',
        dateFin: '2022-07-24',
        heureDebut: '14:30',
        heureFin: '15:45',
        nbPlaces: 10,
        nbReservations: 10,
        titre: 'Le stationnement',
        description: 'Description Accusantium sint deleteItem',
      },
    ],
  }
  sendReservation() {
    if (this.reservationTheoriqueForm.valid) {
      this.reservationTheoriqueForm.reset()
    } else {
      this.reservationTheoriqueForm.markAllAsTouched()
    }
  }

  bubbleSort(cours: any) {
    var length = cours.length
    for (var i = 0; i < length; i++) {
      for (var j = 0; j < length - i - 1; j++) {
        let dateDFull: any = cours[j].dateDebut
        let heureDFull: any = cours[j].heureDebut
        let dateD: any = new Date(
          dateDFull.split('-')[0],
          dateDFull.split('-')[1] - 1,
          dateDFull.split('-')[2],
          heureDFull.split(':')[0],
          heureDFull.split(':')[1],
        )
        let dateFFull: any = cours[j + 1].dateFin
        let heureFFull: any = cours[j + 1].heureFin
        let dateF: any = new Date(
          dateFFull.split('-')[0],
          dateFFull.split('-')[1] - 1,
          dateFFull.split('-')[2],
          heureFFull.split(':')[0],
          heureFFull.split(':')[1],
        )

        if (dateD > dateF) {
          var tmp = cours[j]
          cours[j] = cours[j + 1]
          cours[j + 1] = tmp
        }
      }
    }
  }
  todayDate: any = new Date()
  dateNow =
    new Date().getFullYear() +
    '-' +
    (new Date().getMonth() + 1 > 9
      ? new Date().getMonth() + 1
      : '0' + (new Date().getMonth() + 1)) +
    '-' +
    new Date().getDate()

  timeNow =
    new Date().getHours() > 9
      ? new Date().getHours()
      : '0' + new Date().getHours() + ':' + new Date().getMinutes()

  listCours: any = []
  dateDebutChange(event: any) {
    this.listCours = this.autoEcole.cours.filter((cours: any) => {
      return cours.dateDebut == event.target.value
    })

    if (this.listCours.length == 0) {
      this.reservationTheoriqueForm.controls['heureDuCours'].disable()

      this.toastr.error('', 'Auncun Cours Planifier ce jour', {
        timeOut: 2000,
        progressBar: true,
        progressAnimation: 'increasing',
        positionClass: 'toast-top-right',
      })
    } else {
      this.reservationTheoriqueForm.controls['heureDuCours'].enable()
    }
  }
}
