import { Component, OnInit } from '@angular/core'

@Component({
  selector: 'app-reservation-auto-ecole',
  templateUrl: './reservation-auto-ecole.component.html',
  styleUrls: ['./reservation-auto-ecole.component.scss'],
})
export class ReservationAutoEcoleComponent implements OnInit {
  constructor() {}
  autoEcole: any = {
    typeService: ['Voiture', 'Moto', 'Camion', 'Remorque'],
    moniteur: [
      {
        agent: { name: 'Hicham', id: 123 },
        events: [
          {
            dateDebut: '2022-07-19',
            dateFin: '2022-07-19',
            heureStart: '12:00',
            heureEnd: '14:00',
            title: 'Meeting ',
            content: 'lorem ipsum dolor sit amet ',
            etat: 'en cours de publication',
          },
          {
            dateDebut: '2022-07-20',
            dateFin: '2022-07-20',
            heureStart: '10:00',
            heureEnd: '11:30',
            title: 'Meeting 1',
            content: 'lorem ipsum dolor sit amet ',
            etat: 'en cours de publication',
          },
          {
            dateDebut: '2022-07-20',
            dateFin: '2022-07-20',
            heureStart: '15:00',
            heureEnd: '16:00',
            title: 'Meeting 2',
            content: 'lorem ipsum dolor sit amet ',
            etat: 'en cours de publication',
          },
          {
            dateDebut: '2022-07-20',
            dateFin: '2022-07-20',
            heureStart: '17:00',
            heureEnd: '17:30',
            title: 'Meeting 5',
            content: 'lorem ipsum dolor sit amet ',
            etat: 'en cours de publication',
          },
        ],
      },
      {
        agent: { name: 'Agent2', id: 345 },
        events: [
          {
            dateDebut: '2022-07-18',
            dateFin: '2022-07-22',
            heureStart: '12:00',
            heureEnd: '14:15',
            title: 'Meeting ',
            content: 'lorem ipsum dolor sit amet ',
            etat: 'en cours de publication',
          },
          {
            dateDebut: '2022-07-20',
            dateFin: '2022-07-20',
            heureStart: '08:30',
            heureEnd: '09:15',
            title: 'Meeting 1',
            content: 'lorem ipsum dolor sit amet ',
            etat: 'en cours de publication',
          },
          {
            dateDebut: '2022-07-21',
            dateFin: '2022-07-21',
            heureStart: '10:30',
            heureEnd: '11:00',
            title: 'Meeting 2',
            content: 'lorem ipsum dolor sit amet ',
            etat: 'en cours de publication',
          },
        ],
      },
      {
        agent: { name: 'Agent 3', id: 1254 },
        events: [
          {
            dateDebut: '2022-07-15',
            dateFin: '2022-07-20',
            heureStart: '11:00',
            heureEnd: '11:30',
            title: 'Meeting ',
            content: 'lorem ipsum dolor sit amet ',
            etat: 'en cours de publication',
          },
          {
            dateDebut: '2022-07-20',
            dateFin: '2022-07-20',
            heureStart: '09:45',
            heureEnd: '10:30',
            title: 'Meeting 1',
            content: 'lorem ipsum dolor sit amet ',
            etat: 'en cours de publication',
          },
          {
            dateDebut: '2022-07-20',
            dateFin: '2022-07-20',
            heureStart: '15:00',
            heureEnd: '16:00',
            title: 'Meeting 2',
            content: 'lorem ipsum dolor sit amet ',
            etat: 'en cours de publication',
          },
          {
            dateDebut: '2022-06-20',
            dateFin: '2022-06-20',
            heureStart: '14:00',
            heureEnd: '16:00',
            title: 'Meeting 5',
            content: 'lorem ipsum dolor sit amet ',
            etat: 'en cours de publication',
          },
        ],
      },
    ],
  }
  ngOnInit(): void {}
}
