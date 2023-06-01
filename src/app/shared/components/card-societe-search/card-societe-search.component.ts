import { Component, Input, OnInit } from '@angular/core'
import { Router } from '@angular/router'

@Component({
  selector: 'app-card-societe-search',
  templateUrl: './card-societe-search.component.html',
  styleUrls: ['./card-societe-search.component.scss'],
})
export class CardSocieteSearchComponent implements OnInit {
  constructor(private router: Router) {}
  @Input() title: any = ''
  @Input() location: any = ''
  @Input() description: any = ''
  @Input() image: any = ''
  @Input() score: any = ''
  @Input() link: any = ''
  @Input() telephone: any = ''
  @Input() email: any = ''
  @Input() id: any = ''

  ngOnInit(): void {}

  goToDetails() {
    console.log('clicked', this.link)

    localStorage.setItem('vendeurId', this.id)
    this.router.navigate(['/details', this.link])
  }
}
