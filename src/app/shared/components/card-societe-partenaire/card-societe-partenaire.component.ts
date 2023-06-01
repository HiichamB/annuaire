import { Component, Input, OnInit } from '@angular/core'

@Component({
  selector: 'app-card-societe-partenaire',
  templateUrl: './card-societe-partenaire.component.html',
  styleUrls: ['./card-societe-partenaire.component.scss'],
})
export class CardSocietePartenaireComponent implements OnInit {
  @Input() link: any = ''
  @Input() image: any = ''
  @Input() name: any = ''
  @Input() resume: any = ''
  @Input() telephone: any = ''
  @Input() email: any = ''
  @Input() localisation: any = ''
  @Input() secteur: any = ''

  constructor() {}

  ngOnInit(): void {}
}
