import { Component, Input, OnInit } from '@angular/core'

@Component({
  selector: 'app-list-card-basic',
  templateUrl: './list-card-basic.component.html',
  styleUrls: ['./list-card-basic.component.scss'],
})
export class ListCardBasicComponent implements OnInit {
  constructor() {}
  @Input() dataOfList: any = []
  filtredList: any = []
  selectedItem: any = ''
  ngOnInit(): void {
    this.filtredList = this.dataOfList.submenu[0]
  }
  flitrerData() {}
  onChange(event: any) {
    console.log(event.index)
    this.selectedItem = this.dataOfList.submenu[event.index]
    this.filtredList = this.dataOfList.submenu[event.index]
    console.log(this.filtredList)
  }
}
