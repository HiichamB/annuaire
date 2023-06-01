import { Component, Input, OnInit } from '@angular/core'

@Component({
  selector: 'app-event-card',
  templateUrl: './event-card.component.html',
  styleUrls: ['./event-card.component.scss'],
})
export class EventCardComponent implements OnInit {
  @Input() title = ''
  @Input() dateDebut = ''
  @Input() dateFin = ''
  @Input() img = ''
  @Input() resume = ''
  @Input() localisation = ''

  @Input() link: any = ''
  constructor() {}

  ngOnInit(): void {}
}
