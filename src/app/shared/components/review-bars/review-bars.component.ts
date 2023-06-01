import { Component, OnInit } from '@angular/core'

@Component({
  selector: 'app-review-bars',
  templateUrl: './review-bars.component.html',
  styleUrls: ['./review-bars.component.scss'],
})
export class ReviewBarsComponent implements OnInit {
  reviewsList: any = []
  totalReviews: any = 0
  reviewsArray: any = []
  totalValues: number = 0
  constructor() {}

  ngOnInit(): void {
    this.reviewsList = [
      {
        valeur: 5,
        nbrReviews: 20,
      },
      {
        valeur: 4,
        nbrReviews: 5,
      },
      {
        valeur: 3,
        nbrReviews: 8,
      },
      {
        valeur: 2,
        nbrReviews: 2,
      },
      {
        valeur: 1,
        nbrReviews: 1,
      },
    ]
    this.reviewsList.map((review: any) => {
      this.totalReviews += Number(review.nbrReviews)
      this.totalValues += Number(review.valeur)
    })
    this.getreviewsPourcentage()
    this.totalValues = this.totalValues / 5
  }
  getreviewsPourcentage() {
    this.reviewsList.map((review: any) => {
      this.reviewsArray.push((review.nbrReviews * 100) / this.totalReviews)
    })
  }
}
