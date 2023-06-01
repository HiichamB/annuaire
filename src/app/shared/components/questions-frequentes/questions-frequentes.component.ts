import { Component, OnInit } from '@angular/core'

@Component({
  selector: 'app-questions-frequentes',
  templateUrl: './questions-frequentes.component.html',
  styleUrls: ['./questions-frequentes.component.scss'],
})
export class QuestionsFrequentesComponent implements OnInit {
  constructor() {}
  qFrequenteList: any = []
  toggletNavActive(item: any) {
    item._active = !item._active
  }
  ngOnInit(): void {
    this.qFrequenteList = [
      {
        question: 'Quels sont les avis des internautes à propos de Ocarat ?',
        reponse:
          ' Ocarat a 3403 avis avec une note globale de 4.4/5 Cliquez ici pour voir les avis. Vous pouvez déposer un avis en cliquant ici',
      },
      {
        question: "Quelle est l'adresse de Patek Philippe France ?",
        reponse:
          ' Patek Philippe France est situé au 10 pl Vendôme, 75001 Paris',
      },
      {
        question:
          'Quelles sont les prestations et services que propose SOS Médecins Paris19 Visites, Consultations et Téléconsultations ? ',
        reponse:
          '  SOS Médecins Paris19 Visites, Consultations et Téléconsultations propose les prestations et services suivants: 24h/24, 7j/7 / Visites à domicile / Soins techniques',
      },
    ]
  }
}
