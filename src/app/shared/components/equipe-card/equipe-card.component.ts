import { Component, Input, OnInit } from '@angular/core'

@Component({
  selector: 'app-equipe-card',
  templateUrl: './equipe-card.component.html',
  styleUrls: ['./equipe-card.component.scss'],
})
export class EquipeCardComponent implements OnInit {
  @Input() image: any = ''
  @Input() nom: any = ''
  @Input() prenom: any = ''
  @Input() fonction: any = ''

  constructor() {}

  ngOnInit(): void {}
}
