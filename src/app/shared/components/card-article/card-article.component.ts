import { Component, Input, OnInit } from '@angular/core'

@Component({
  selector: 'app-card-article',
  templateUrl: './card-article.component.html',
  styleUrls: ['./card-article.component.scss'],
})
export class CardArticleComponent implements OnInit {
  @Input() image: any = ''
  @Input() titre: any = ''
  @Input() resume: any = ''
  @Input() date: any = ''

  constructor() {}

  ngOnInit(): void {}
}
