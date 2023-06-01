import { Component, Input, OnInit } from '@angular/core'

@Component({
  selector: 'app-card-distinction',
  templateUrl: './card-distinction.component.html',
  styleUrls: ['./card-distinction.component.scss'],
})
export class CardDistinctionComponent implements OnInit {
  @Input() link: any = ''
  @Input() image: any = ''
  @Input() titre: any = ''
  @Input() resume: any = ''
  @Input() date: any = ''

  constructor() {}

  ngOnInit(): void {}
}
