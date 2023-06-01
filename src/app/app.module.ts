import { LOCALE_ID, NgModule } from '@angular/core'
import { BrowserModule } from '@angular/platform-browser'
import { OrganizationChartModule } from 'primeng/organizationchart'
import { BrowserAnimationsModule } from '@angular/platform-browser/animations'

import { AppRoutingModule } from './app-routing.module'
import { AppComponent } from './app.component'
import { AvatarModule } from 'primeng/avatar'
import { ToastrModule } from 'ngx-toastr'
import { StepsModule } from 'primeng/steps'
import { ToastModule } from 'primeng/toast'
import { CarouselModule } from 'primeng/carousel'
import { CardModule } from 'primeng/card'
import { adapterFactory } from 'angular-calendar/date-adapters/date-fns'
import { TranslateLoader, TranslateModule } from '@ngx-translate/core'
import { TranslateHttpLoader } from '@ngx-translate/http-loader'
import { HttpClient, HttpClientModule } from '@angular/common/http'
import { GMapModule } from 'primeng/gmap'
import { NgxPaginationModule } from 'ngx-pagination'
import { TabViewModule } from 'primeng/tabview'
import { GalleriaModule } from 'primeng/galleria'
import { RatingModule } from 'primeng/rating'
import { ButtonModule } from 'primeng/button'
import { DropdownModule } from 'primeng/dropdown'
import { AccordionModule } from 'primeng/accordion'
import { MegaMenuModule } from 'primeng/megamenu'
import { DataViewModule } from 'primeng/dataview'
import { FormsModule, ReactiveFormsModule } from '@angular/forms'
import { LazyLoadImageModule } from 'ng-lazyload-image'
import { CalendarModule, DateAdapter } from 'angular-calendar'
import { CalendarModule as pCalendar } from 'primeng/calendar'

import { AnnuaireDetailsPageComponent } from './components/annuaire-details-page/annuaire-details-page.component'
import { AnnuaireSearchDetailsComponent } from './components/annuaire-search-details/annuaire-search-details.component'
import { AnnuaireSearchGlobalComponent } from './components/annuaire-search-global/annuaire-search-global.component'
import { ListCardBasicComponent } from './components/list-card-basic/list-card-basic.component'
import { ActionSocialeComponent } from './components/pages/action-sociale/action-sociale.component'
import { DistinctionComponent } from './components/pages/distinction/distinction.component'
import { EquipeComponent } from './components/pages/equipe/equipe.component'
import { FicheComponent } from './components/pages/fiche/fiche.component'
import { FilialePartenaireComponent } from './components/pages/filiale-partenaire/filiale-partenaire.component'
import { HistoireComponent } from './components/pages/histoire/histoire.component'
import { OrganigrammeComponent } from './components/pages/organigramme/organigramme.component'
import { PresentationComponent } from './components/pages/presentation/presentation.component'
import { ShowRoomComponent } from './components/pages/show-room/show-room.component'
import { TemoignageComponent } from './components/pages/temoignage/temoignage.component'
import { AllComparePageComponent } from './shared/components/all-compare-page/all-compare-page.component'
import { CardArticleComponent } from './shared/components/card-article/card-article.component'
import { CardDistinctionComponent } from './shared/components/card-distinction/card-distinction.component'
import { CardDocumentComponent } from './shared/components/card-document/card-document.component'
import { CardProductComponent } from './shared/components/card-product/card-product.component'
import { CardSocieteBasicComponent } from './shared/components/card-societe-basic/card-societe-basic.component'
import { CardSocietePartenaireComponent } from './shared/components/card-societe-partenaire/card-societe-partenaire.component'
import { CardSocieteSearchHComponent } from './shared/components/card-societe-search-h/card-societe-search-h.component'
import { CardSocieteSearchComponent } from './shared/components/card-societe-search/card-societe-search.component'
import { CheckoutAdresseFormComponent } from './shared/components/checkout-adresse-form/checkout-adresse-form.component'
import { CheckoutCartComponent } from './shared/components/checkout-cart/checkout-cart.component'
import { CheckoutPayementFormComponent } from './shared/components/checkout-payement-form/checkout-payement-form.component'
import { CheckoutValidationComponent } from './shared/components/checkout-validation/checkout-validation.component'
import { ComparePageComponent } from './shared/components/compare-page/compare-page.component'
import { CountdownComponent } from './shared/components/countdown/countdown.component'
import { EquipeCardComponent } from './shared/components/equipe-card/equipe-card.component'
import { EventCardComponent } from './shared/components/event-card/event-card.component'
import { HeaderComponent } from './shared/components/header/header.component'
import { ListCommentsComponent } from './shared/components/list-comments/list-comments.component'
import { MenuComponent } from './shared/components/menu/menu.component'
import { ProductPageComponent } from './shared/components/product-page/product-page.component'
import { QuestionsFrequentesComponent } from './shared/components/questions-frequentes/questions-frequentes.component'
import { ReviewBarsComponent } from './shared/components/review-bars/review-bars.component'
import { ShoppingCartComponent } from './shared/components/shopping-cart/shopping-cart.component'
import { WishlistCartComponent } from './shared/components/wishlist-cart/wishlist-cart.component'
import { ProduitsComponent } from './components/pages/produits/produits.component'
import { SavComponent } from './components/pages/sav/sav.component'
import { EvenementComponent } from './components/pages/evenement/evenement.component'
import { ParusDansLaPresseComponent } from './components/pages/parus-dans-la-presse/parus-dans-la-presse.component'
import { QuestionReponseComponent } from './components/pages/question-reponse/question-reponse.component'
import { DocumentsComponent } from './components/pages/documents/documents.component'
import { DevisComponent } from './components/pages/devis/devis.component'
import { RdvComponent } from './components/pages/rdv/rdv.component'
import { ReclamationComponent } from './components/pages/reclamation/reclamation.component'
import { DocumentDetailsComponent } from './components/pages/document-details/document-details.component'
import { ActionsSocialesDetailsComponent } from './components/pages/actions-sociales-details/actions-sociales-details.component'
import { EventDetailsComponent } from './components/pages/event-details/event-details.component'
import { ReseravationFormComponent } from './components/shared/reseravation-form/reseravation-form.component'
import { WishlistPageComponent } from './components/pages/wishlist-page/wishlist-page.component'
import { PanierPageComponent } from './components/pages/panier-page/panier-page.component'
import { CompareGlobalePageComponent } from './components/pages/compare-globale-page/compare-globale-page.component'
import { CompareGlobaleAllPageComponent } from './components/pages/compare-globale-all-page/compare-globale-all-page.component'
import { TestTableComponent } from './components/shared/test-table/test-table.component'
import { SchedulerModule } from 'angular-calendar-scheduler'
import { registerLocaleData } from '@angular/common'
import localeAr from '@angular/common/locales/ar-MA'
import localeEn from '@angular/common/locales/en-CA'
import localeFrCa from '@angular/common/locales/fr-CA'
import { ReservationArtisansComponent } from './components/shared/reservation-artisans/reservation-artisans.component'
registerLocaleData(localeAr, 'ar-MA')
registerLocaleData(localeFrCa, 'fr-CA')
registerLocaleData(localeEn, 'en-US')
import { InputSwitchModule } from 'primeng/inputswitch'
import { ReservationActiviteComponent } from './components/shared/reservation-activite/reservation-activite.component'
import { ReservationServiceComponent } from './components/shared/reservation-service/reservation-service.component'
import { ReservationMaterielComponent } from './components/shared/reservation-materiel/reservation-materiel.component'
import { TableModule } from 'primeng/table'
import { CheckboxModule } from 'primeng/checkbox'
import { MultiSelectModule } from 'primeng/multiselect'
import { DevisGeneratorComponent } from './components/shared/devis-generator/devis-generator.component'
import {
  IgxTimePickerModule,
  IgxToastModule,
  IgxButtonModule,
  IgxDateRangePickerModule,
} from 'igniteui-angular'
import { ReservationRestaurantComponent } from './components/shared/reservation-restaurant/reservation-restaurant.component'
import { IgxCarouselModule, IgxListModule } from 'igniteui-angular'
import { MatStepperModule } from '@angular/material/stepper'
import { IgxStepperModule } from 'igniteui-angular'
import { MatFormFieldModule } from '@angular/material/form-field'
import { ReservationHotelsComponent } from './components/shared/reservation-hotels/reservation-hotels.component'
import { MatExpansionModule } from '@angular/material/expansion'
import { NgbCarouselModule } from '@ng-bootstrap/ng-bootstrap';
import { ReservationAutoEcoleComponent } from './components/shared/reservation-auto-ecole/reservation-auto-ecole.component';
import { ReservationCoursPratiqueComponent } from './components/shared/reservation-cours-pratique/reservation-cours-pratique.component';
import { ReservationIndividuellePratiqueComponent } from './components/shared/reservation-individuelle-pratique/reservation-individuelle-pratique.component';
import { ReservationCoursTheoriqueComponent } from './components/shared/reservation-cours-theorique/reservation-cours-theorique.component';
import { DevisEnLigneComponent } from './components/shared/devis-en-ligne/devis-en-ligne.component';
import { LoginComponent } from './components/shared/login/login.component';
import { RegisterComponent } from './components/shared/register/register.component'
export function HttpLoaderFactory(http: HttpClient) {
  return new TranslateHttpLoader(http, './assets/i18n/', '.json')
}

@NgModule({
  declarations: [
    AppComponent,
    AnnuaireSearchGlobalComponent,
    HeaderComponent,
    MenuComponent,
    AnnuaireSearchDetailsComponent,
    CardSocieteSearchComponent,
    CardSocieteSearchHComponent,
    AnnuaireDetailsPageComponent,
    ListCommentsComponent,
    CardSocieteBasicComponent,
    ListCardBasicComponent,
    QuestionsFrequentesComponent,
    CardDocumentComponent,
    EventCardComponent,
    EquipeCardComponent,
    CardSocietePartenaireComponent,
    CardDistinctionComponent,
    CardArticleComponent,
    CardProductComponent,
    ProductPageComponent,
    CountdownComponent,

    ReviewBarsComponent,
    ShoppingCartComponent,
    WishlistCartComponent,
    CheckoutCartComponent,
    CheckoutAdresseFormComponent,
    CheckoutPayementFormComponent,
    CheckoutValidationComponent,
    ComparePageComponent,
    AllComparePageComponent,
    PresentationComponent,
    HistoireComponent,
    FicheComponent,
    EquipeComponent,
    OrganigrammeComponent,
    ShowRoomComponent,
    DistinctionComponent,
    ActionSocialeComponent,
    TemoignageComponent,
    FilialePartenaireComponent,
    ProduitsComponent,
    SavComponent,
    EvenementComponent,
    ParusDansLaPresseComponent,
    QuestionReponseComponent,
    DocumentsComponent,
    DevisComponent,
    RdvComponent,
    ReclamationComponent,
    DocumentDetailsComponent,
    ActionsSocialesDetailsComponent,
    EventDetailsComponent,
    ReseravationFormComponent,
    WishlistPageComponent,
    PanierPageComponent,
    CompareGlobalePageComponent,
    CompareGlobaleAllPageComponent,
    TestTableComponent,
    ReservationArtisansComponent,
    ReservationActiviteComponent,
    ReservationServiceComponent,
    ReservationMaterielComponent,
    DevisGeneratorComponent,
    ReservationRestaurantComponent,
    ReservationHotelsComponent,
    ReservationAutoEcoleComponent,
    ReservationCoursPratiqueComponent,
    ReservationIndividuellePratiqueComponent,
    ReservationCoursTheoriqueComponent,
    DevisEnLigneComponent,
    LoginComponent,
    RegisterComponent,
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    LazyLoadImageModule,
    NgxPaginationModule,
    TabViewModule,
    GalleriaModule,
    DataViewModule,
    RatingModule,
    ButtonModule,
    DropdownModule,
    AccordionModule,
    BrowserAnimationsModule,
    GMapModule,
    MegaMenuModule,
    FormsModule,
    ReactiveFormsModule,
    HttpClientModule,
    CarouselModule,
    AvatarModule,
    OrganizationChartModule,
    StepsModule,
    ToastModule,
    CardModule,
    pCalendar,
    InputSwitchModule,
    TableModule,
    CheckboxModule,
    MultiSelectModule,
    IgxTimePickerModule,
    IgxToastModule,
    MatStepperModule,
    IgxStepperModule,
    MatFormFieldModule,
    IgxCarouselModule,
    IgxListModule,
    IgxButtonModule,
    MatExpansionModule,
    IgxDateRangePickerModule,
    NgbCarouselModule,
    ToastrModule.forRoot(),
    CalendarModule.forRoot({
      provide: DateAdapter,
      useFactory: adapterFactory,
    }),
    TranslateModule.forRoot({
      loader: {
        provide: TranslateLoader,
        useFactory: HttpLoaderFactory,
        deps: [HttpClient],
      },
    }),
    SchedulerModule.forRoot({ locale: 'fr', headerDateFormat: 'daysRange' }),
  ],

  providers: [{ provide: LOCALE_ID, useValue: 'fr-CA' }],
  bootstrap: [AppComponent],
})
export class AppModule {}
