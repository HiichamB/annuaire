import { Component, OnInit } from '@angular/core'

@Component({
  selector: 'app-temoignage',
  templateUrl: './temoignage.component.html',
  styleUrls: ['./temoignage.component.scss'],
})
export class TemoignageComponent implements OnInit {
  commentaires = [
    {
      fonction: 'Testeur',
      commentaire_intervenent:
        'Sed eget turpis a pede tempor malesuada. Vivamus quis mi at leo pulvinar hendrerit. Cum sociis natoque penatibus et magnis dis ed eget turpis a pede tempor malesuada. Vivamus quis mi at leo pulvinar hendrerit. Cum sociis natoque penatibus et magnis dis',
      date: 'April 03, 2022',
      nom_ou_pseudo: 'Admin 1',
      img: 'http://localhost:4200/assets/images/user.png',
    },
    {
      fonction: 'Devlopper',

      commentaire_intervenent:
        'Sed eget turpis a pede tempor malesuada. Vivamus quis mi at leo pulvinar hendrerit. Cum sociis natoque penatibus et magnis dis',
      date: 'April 03, 2022',
      nom_ou_pseudo: 'Admin 1',
    },
    {
      fonction: 'Artisant',

      commentaire_intervenent:
        'Sed eget turpis a pede tempor malesuada. Vivamus quis mi at leo pulvinar hendrerit. Cum sociis natoque penatibus et magnis dis',
      date: 'April 03, 2022',
      nom_ou_pseudo: 'Admin 1',
    },
    {
      fonction: 'Livreur',

      commentaire_intervenent:
        'Sed eget turpis a pede tempor malesuada. Vivamus quis mi at leo pulvinar hendrerit. Cum sociis natoque penatibus et magnis dis',
      date: 'April 03, 2022',
      nom_ou_pseudo: 'Admin 1',
    },
    {
      fonction: 'Vendeur',

      commentaire_intervenent:
        'Sed eget turpis a pede tempor malesuada. Vivamus quis mi at leo pulvinar hendrerit. Cum sociis natoque penatibus et magnis dis',
      date: 'April 03, 2022',
      nom_ou_pseudo: 'Admin 1',
    },
  ]
  constructor() {}

  ngOnInit(): void {}
}
