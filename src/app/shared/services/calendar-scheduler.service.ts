import { Injectable } from '@angular/core'
import { DAYS_IN_WEEK, SchedulerViewHour } from 'angular-calendar-scheduler'
import { addDays, subDays } from 'date-fns'
import { ToastrService } from 'ngx-toastr'

@Injectable({
  providedIn: 'root',
})
export class CalendarSchedulerService {
  events: any = []
  bgColor: string = '#f3c8cb !important'
  secondColor: string = '#ea7077'
  viewDays: number = DAYS_IN_WEEK

  constructor(private toastr: ToastrService) {}
  formatData(newEvents: any, actions: any) {
    this.events = []

    newEvents.map((evnt: any) => {
      let newDateDebut: any = ''
      let newDateFin: any = ''
      let nbDateDiff =
        Date.parse(new Date(evnt.dateFin).toISOString()) -
        Date.parse(subDays(new Date(evnt.dateDebut), 1).toISOString())

      nbDateDiff = nbDateDiff / 1000 / 60 / 60 / 24

      newDateDebut = new Date(evnt.dateDebut)
      newDateDebut = new Date(
        newDateDebut.getFullYear(),
        newDateDebut.getMonth(),
        newDateDebut.getDate(),
      )
      newDateDebut.setHours(evnt.heureStart.split(':')[0])
      newDateDebut.setMinutes(evnt.heureStart.split(':')[1])

      newDateFin = new Date(evnt.dateDebut)
      newDateFin = new Date(
        newDateFin.getFullYear(),
        newDateFin.getMonth(),
        newDateFin.getDate(),
      )
      newDateFin.setHours(evnt.heureEnd.split(':')[0])
      newDateFin.setMinutes(evnt.heureEnd.split(':')[1])

      for (let i = 0; i < nbDateDiff; i++) {
        if (
          evnt.etat == 'en cours de validation' &&
          evnt.email == sessionStorage.getItem('emailClient')
        ) {
          this.events = [
            ...this.events,
            {
              id: '700',
              start: addDays(newDateDebut, i),
              end: addDays(newDateFin, i),
              title: evnt.title,
              email: evnt.email,
              etat: 'en cours de validation',
              color: { primary: this.secondColor, secondary: '#ea7077' },
              actions: actions,
              isClickable: true,
              isDisabled: false,
              content: evnt.content,
              resizable: {
                beforeStart: true,
                afterEnd: true,
              },
            },
          ]
        } else {
          this.events = [
            ...this.events,
            {
              id: '700',
              start: addDays(newDateDebut, i),
              end: addDays(newDateFin, i),
              title: evnt.title,
              email: evnt.email,

              color: { primary: this.secondColor, secondary: this.bgColor },
              //  actions: this.actions,
              isClickable: true,
              isDisabled: false,
              content: evnt.content,
              resizable: {
                beforeStart: true,
                afterEnd: true,
              },
            },
          ]
        }
      }
    })

    return this.events
  }
  hourClicked(hour: SchedulerViewHour): void {
    //console.log('hourClicked Hour', hour)
    this.toastr.error('', 'Date Expiree', {
      timeOut: 2000,
      progressBar: true,
      progressAnimation: 'increasing',
      positionClass: 'toast-top-right',
    })
  }
  viewDaysChanged(viewDays: number): void {
    console.log('viewDaysChanged', viewDays)
    this.viewDays = viewDays
  }
  getQuantiteRestante(dateDebut: any, dateFin: any, product: any) {
    let quantiteDispo = product.quantite
    product.disponibility.map((disponibility: any) => {
      let dispononibiliteDebut = Date.parse(
        disponibility.dateDebut + ' ' + disponibility.heureStart,
      )
      let dispononibiliteFin = Date.parse(
        disponibility.dateFin + ' ' + disponibility.heureEnd,
      )

      if (
        dispononibiliteFin >= Date.parse(dateDebut) &&
        dispononibiliteDebut <= Date.parse(dateFin)
      ) {
        quantiteDispo = quantiteDispo - disponibility.quantite
      }
    })
    return quantiteDispo
  }
  getQuantiteRestanteHotel(dateDebut: any, dateFin: any, product: any) {
    let quantiteDispo = product.quantite
    product.disponibility.map((disponibility: any) => {
      let dispononibiliteDebut = Date.parse(disponibility.dateDebut)
      let dispononibiliteFin = Date.parse(disponibility.dateFin)

      if (
        dispononibiliteFin >= Date.parse(dateDebut) &&
        dispononibiliteDebut <= Date.parse(dateFin)
      ) {
        quantiteDispo = quantiteDispo - disponibility.quantite
      }
    })
    return quantiteDispo
  }
}
