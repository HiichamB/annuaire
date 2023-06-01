import { Component, Input, OnInit } from '@angular/core'

@Component({
  selector: 'app-card-societe-basic',
  templateUrl: './card-societe-basic.component.html',
  styleUrls: ['./card-societe-basic.component.scss'],
})
export class CardSocieteBasicComponent implements OnInit {
  constructor() {}
  @Input() link: any = ''
  @Input() image: any = ''
  @Input() name: any = ''

  ngOnInit(): void {}
}
