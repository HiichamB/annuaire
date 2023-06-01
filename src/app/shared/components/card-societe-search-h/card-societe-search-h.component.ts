import { Component, Input, OnInit } from '@angular/core'

@Component({
  selector: 'app-card-societe-search-h',
  templateUrl: './card-societe-search-h.component.html',
  styleUrls: ['./card-societe-search-h.component.scss'],
})
export class CardSocieteSearchHComponent implements OnInit {
  constructor() {}
  @Input() title: any = ''
  @Input() location: any = ''
  @Input() description: any = ''
  @Input() image: any = ''
  @Input() score: any = ''
  @Input() link: any = ''
  ngOnInit(): void {}
}
