import { Component, Input, OnInit } from '@angular/core'

@Component({
  selector: 'app-list-comments',
  templateUrl: './list-comments.component.html',
  styleUrls: ['./list-comments.component.scss'],
})
export class ListCommentsComponent implements OnInit {
  constructor() {}
  @Input() comments: any

  ngOnInit(): void {}
}
