import { NgModule } from '@angular/core'
import { RouterModule, Routes } from '@angular/router'
import { AnnuaireDetailsPageComponent } from './components/annuaire-details-page/annuaire-details-page.component'
import { AnnuaireSearchDetailsComponent } from './components/annuaire-search-details/annuaire-search-details.component'
import { AnnuaireSearchGlobalComponent } from './components/annuaire-search-global/annuaire-search-global.component'
import { ActionSocialeComponent } from './components/pages/action-sociale/action-sociale.component'
import { ActionsSocialesDetailsComponent } from './components/pages/actions-sociales-details/actions-sociales-details.component'
import { CompareGlobaleAllPageComponent } from './components/pages/compare-globale-all-page/compare-globale-all-page.component'
import { CompareGlobalePageComponent } from './components/pages/compare-globale-page/compare-globale-page.component'
import { DevisComponent } from './components/pages/devis/devis.component'
import { DistinctionComponent } from './components/pages/distinction/distinction.component'
import { DocumentDetailsComponent } from './components/pages/document-details/document-details.component'
import { DocumentsComponent } from './components/pages/documents/documents.component'
import { EquipeComponent } from './components/pages/equipe/equipe.component'
import { EvenementComponent } from './components/pages/evenement/evenement.component'
import { EventDetailsComponent } from './components/pages/event-details/event-details.component'
import { FicheComponent } from './components/pages/fiche/fiche.component'
import { FilialePartenaireComponent } from './components/pages/filiale-partenaire/filiale-partenaire.component'
import { HistoireComponent } from './components/pages/histoire/histoire.component'
import { OrganigrammeComponent } from './components/pages/organigramme/organigramme.component'
import { PanierPageComponent } from './components/pages/panier-page/panier-page.component'
import { ParusDansLaPresseComponent } from './components/pages/parus-dans-la-presse/parus-dans-la-presse.component'
import { PresentationComponent } from './components/pages/presentation/presentation.component'
import { ProduitsComponent } from './components/pages/produits/produits.component'
import { QuestionReponseComponent } from './components/pages/question-reponse/question-reponse.component'
import { RdvComponent } from './components/pages/rdv/rdv.component'
import { ReclamationComponent } from './components/pages/reclamation/reclamation.component'
import { SavComponent } from './components/pages/sav/sav.component'
import { ShowRoomComponent } from './components/pages/show-room/show-room.component'
import { TemoignageComponent } from './components/pages/temoignage/temoignage.component'
import { WishlistPageComponent } from './components/pages/wishlist-page/wishlist-page.component'
import { DevisEnLigneComponent } from './components/shared/devis-en-ligne/devis-en-ligne.component'
import { DevisGeneratorComponent } from './components/shared/devis-generator/devis-generator.component'
import { LoginComponent } from './components/shared/login/login.component'
import { RegisterComponent } from './components/shared/register/register.component'
import { ReseravationFormComponent } from './components/shared/reseravation-form/reseravation-form.component'
import { ReservationActiviteComponent } from './components/shared/reservation-activite/reservation-activite.component'
import { ReservationArtisansComponent } from './components/shared/reservation-artisans/reservation-artisans.component'
import { ReservationAutoEcoleComponent } from './components/shared/reservation-auto-ecole/reservation-auto-ecole.component'
import { ReservationCoursPratiqueComponent } from './components/shared/reservation-cours-pratique/reservation-cours-pratique.component'
import { ReservationCoursTheoriqueComponent } from './components/shared/reservation-cours-theorique/reservation-cours-theorique.component'
import { ReservationHotelsComponent } from './components/shared/reservation-hotels/reservation-hotels.component'
import { ReservationIndividuellePratiqueComponent } from './components/shared/reservation-individuelle-pratique/reservation-individuelle-pratique.component'
import { ReservationMaterielComponent } from './components/shared/reservation-materiel/reservation-materiel.component'
import { ReservationRestaurantComponent } from './components/shared/reservation-restaurant/reservation-restaurant.component'
import { ReservationServiceComponent } from './components/shared/reservation-service/reservation-service.component'
import { AllComparePageComponent } from './shared/components/all-compare-page/all-compare-page.component'
import { CheckoutAdresseFormComponent } from './shared/components/checkout-adresse-form/checkout-adresse-form.component'
import { CheckoutCartComponent } from './shared/components/checkout-cart/checkout-cart.component'
import { CheckoutPayementFormComponent } from './shared/components/checkout-payement-form/checkout-payement-form.component'
import { CheckoutValidationComponent } from './shared/components/checkout-validation/checkout-validation.component'
import { ComparePageComponent } from './shared/components/compare-page/compare-page.component'
import { ProductPageComponent } from './shared/components/product-page/product-page.component'
import { ShoppingCartComponent } from './shared/components/shopping-cart/shopping-cart.component'
import { WishlistCartComponent } from './shared/components/wishlist-cart/wishlist-cart.component'

const routes: Routes = [
  {
    path: '',

    component: AnnuaireSearchGlobalComponent,
    pathMatch: 'full',
  },
  // {
  //   path: 'cart',

  //   component: ShoppingCartComponent,
  // },
  // {
  //   path: 'wishlist',

  //   component: WishlistCartComponent,
  // },
  // {
  //   path: 'compare',

  //   component: ComparePageComponent,
  // },
  // {
  //   path: 'compare-all',

  //   component: AllComparePageComponent,
  // },
  {
    path: 'checkout',

    component: CheckoutCartComponent,
    children: [
      {
        path: '',
        redirectTo: 'adresse-form',
        pathMatch: 'full',
      },
      {
        path: 'adresse-form',
        component: CheckoutAdresseFormComponent,
      },
      {
        path: 'validation',
        component: CheckoutValidationComponent,
      },
      {
        path: 'payement-form',
        component: CheckoutPayementFormComponent,
      },
    ],
  },
  {
    path: 'login',
    component: LoginComponent,
  },
  {
    path: 'register',
    component: RegisterComponent,
  },

  {
    path: ':id/details',

    component: AnnuaireDetailsPageComponent,
    children: [
      {
        path: '',
        redirectTo: 'presentation',
        pathMatch: 'full',
      },
      {
        path: 'presentation',
        component: PresentationComponent,
      },

      {
        path: 'histoire',
        component: HistoireComponent,
      },

      {
        path: 'fiche',
        component: FicheComponent,
      },

      {
        path: 'equipe',
        component: EquipeComponent,
      },
      {
        path: 'organigramme',
        component: OrganigrammeComponent,
      },
      {
        path: 'show-room',
        component: ShowRoomComponent,
      },
      {
        path: 'distinction',
        component: DistinctionComponent,
      },
      {
        path: 'action-sociale',
        component: ActionSocialeComponent,
      },

      {
        path: 'action-sociale/details',
        component: ActionsSocialesDetailsComponent,
      },
      {
        path: 'temoignage',
        component: TemoignageComponent,
      },
      {
        path: 'produits',
        component: ProduitsComponent,
      },
      {
        path: 'produits/details',
        component: ProductPageComponent,
      },
      {
        path: 'sav',
        component: SavComponent,
      },
      {
        path: 'promo',
        component: ProduitsComponent,
      },
      {
        path: 'evenement',
        component: EvenementComponent,
      },
      {
        path: 'reservation',
        component: ReservationArtisansComponent,
      },
      {
        path: 'reservation-activite',
        component: ReservationActiviteComponent,
      },
      {
        path: 'reservation-materiel',
        component: ReservationMaterielComponent,
      },
      {
        path: 'reservation-service',
        component: ReservationServiceComponent,
      },
      {
        path: 'reservation-restaurant',
        component: ReservationRestaurantComponent,
      },
      {
        path: 'reservation-hotel',
        component: ReservationHotelsComponent,
      },
      {
        path: 'reservation-devis-en-ligne',
        component: DevisEnLigneComponent,
      },
      {
        path: 'reservation-auto-ecole',
        component: ReservationAutoEcoleComponent,
      },
      {
        path: 'reservation-auto-ecole/reservation-cours-pratique',
        component: ReservationCoursPratiqueComponent,
      },
      {
        path: 'reservation-auto-ecole/reservation-individuelle-pratique',
        component: ReservationIndividuellePratiqueComponent,
      },
      {
        path: 'reservation-auto-ecole/reservation-cours-theorique',
        component: ReservationCoursTheoriqueComponent,
      },
      {
        path: 'evenement/details',
        component: EventDetailsComponent,
      },
      {
        path: 'parus-dans-la-presse',
        component: ParusDansLaPresseComponent,
      },
      {
        path: 'question-reponse',
        component: QuestionReponseComponent,
      },
      {
        path: 'documents',
        component: DocumentsComponent,
      },
      {
        path: 'documents/details',
        component: DocumentDetailsComponent,
      },
      {
        path: 'devis',
        component: DevisComponent,
      },

      {
        path: 'devis/devis-generator',
        component: DevisGeneratorComponent,
      },

      {
        path: 'rdv',
        component: RdvComponent,
      },
      {
        path: 'reclamation',
        component: ReclamationComponent,
      },

      {
        path: 'wishList',
        component: WishlistCartComponent,
      },
      {
        path: 'panier',
        component: ShoppingCartComponent,
      },
    ],
  },

  {
    path: 'wishList',
    component: WishlistPageComponent,
  },
  {
    path: 'panier',
    component: PanierPageComponent,
  },

  {
    path: 'compare',
    component: CompareGlobalePageComponent,
  },
  {
    path: 'compare-all',
    component: CompareGlobaleAllPageComponent,
  },
  {
    path: ':id',

    component: AnnuaireSearchDetailsComponent,
  },
  {
    path: ':id/details/product',

    component: ProductPageComponent,
  },
]

@NgModule({
  imports: [RouterModule.forRoot(routes, { anchorScrolling: 'enabled' })],
  exports: [RouterModule],
})
export class AppRoutingModule {}
