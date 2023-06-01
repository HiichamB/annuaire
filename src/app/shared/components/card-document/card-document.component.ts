import { Component, Input, OnInit } from '@angular/core'

@Component({
  selector: 'app-card-document',
  templateUrl: './card-document.component.html',
  styleUrls: ['./card-document.component.scss'],
})
export class CardDocumentComponent implements OnInit {
  @Input() documents: any = ''
  constructor() {}

  ngOnInit(): void {}
}
