import { isPlatformBrowser } from '@angular/common'
import { Component, Inject, PLATFORM_ID } from '@angular/core'
import { TranslateService } from '@ngx-translate/core'

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss'],
})
export class AppComponent {
  title = 'Annuaire-Project'
  constructor(
    @Inject(PLATFORM_ID) private platformId: Object,
    translate: TranslateService,
  ) {
    if (sessionStorage.getItem('emailClient') == null) {
      sessionStorage.setItem('emailClient', JSON.stringify(''))
    }

    if (localStorage.getItem('isArab') == null) {
      localStorage.setItem('isArab', JSON.stringify(false))
    }
    if (localStorage.getItem('isArab') == null) {
      localStorage.setItem('isArab', JSON.stringify(false))
    }
    if (localStorage.getItem('fromMenu') == null) {
      localStorage.setItem('fromMenu', JSON.stringify(false))
    }
    if (localStorage.getItem('panier') == null) {
      localStorage.setItem('panier', JSON.stringify([]))
    }
    if (localStorage.getItem('wishlist') == null) {
      localStorage.setItem('wishlist', JSON.stringify([]))
    }
    if (isPlatformBrowser(this.platformId)) {
      document.body.classList.add('ltr')
      var lang = localStorage.getItem('lang') || 'fr'

      translate.setDefaultLang(lang)
      translate.addLangs(['en', 'fr'])
      if (localStorage.getItem('lang') == 'ar') {
        document.body.classList.add('rtl')
        document.body.classList.remove('ltr')
        localStorage.setItem('isArab', JSON.stringify(true))
      } else {
        document.body.classList.remove('rtl')
        document.body.classList.add('ltr')
        localStorage.setItem('isArab', JSON.stringify(false))
      }
    }
  }
}
