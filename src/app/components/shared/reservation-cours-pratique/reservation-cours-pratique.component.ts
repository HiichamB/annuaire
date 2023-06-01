import { Component, OnInit, ViewChild } from '@angular/core'
import {
  addPeriod,
  CalendarSchedulerEvent,
  CalendarSchedulerViewComponent,
  DAYS_IN_WEEK,
  endOfPeriod,
  SchedulerEventTimesChangedEvent,
  SchedulerViewDay,
  SchedulerViewHour,
  SchedulerViewHourSegment,
  startOfPeriod,
  subPeriod,
} from 'angular-calendar-scheduler'
import { addMonths, endOfDay, subDays } from 'date-fns'
import { Subject } from 'rxjs'
import { CalendarSchedulerService } from 'src/app/shared/services/calendar-scheduler.service'
import {
  CalendarView,
  CalendarDateFormatter,
  DateAdapter,
} from 'angular-calendar'
import { ToastrService } from 'ngx-toastr'
import { FormBuilder, FormControl, Validators } from '@angular/forms'
@Component({
  selector: 'app-reservation-cours-pratique',
  templateUrl: './reservation-cours-pratique.component.html',
  styleUrls: ['./reservation-cours-pratique.component.scss'],
})
export class ReservationCoursPratiqueComponent implements OnInit {
  moniteurs: any = []
  reservationPratiqueForm: any
  constructor(
    private fb: FormBuilder,
    private dateAdapter: DateAdapter,
    public toastr: ToastrService,
    public calendarService: CalendarSchedulerService,
  ) {
    this.reservationPratiqueForm = this.fb.group({
      name: new FormControl('', [
        Validators.required,
        Validators.minLength(3),
        Validators.maxLength(30),
        Validators.pattern('^[a-zA-Z \u0600-\u06FF]+$'),
      ]),
      prenom: new FormControl('', [
        Validators.required,
        Validators.minLength(3),
        Validators.maxLength(30),
        Validators.pattern('^[a-zA-Z \u0600-\u06FF]+$'),
      ]),
      email: new FormControl('', [Validators.required, Validators.email]),

      dateDebut: new FormControl('', [Validators.required]),
      heureDuCour: new FormControl({ value: '', disabled: true }, [
        Validators.required,
      ]),
      telephone: new FormControl('', [
        Validators.required,
        Validators.pattern('^((\\+212-?)|0)?[0-9]{10}$'),
        Validators.minLength(10),
      ]),
      titre: new FormControl('', [
        Validators.required,
        Validators.minLength(3),
        Validators.maxLength(30),
      ]),
      content: new FormControl('', [
        Validators.required,
        Validators.minLength(3),
      ]),
    })
    this.segmentModifier = ((segment: SchedulerViewHourSegment): void => {
      segment.isDisabled = !this.isDateValid(segment.date)
    }).bind(this)

    this.eventModifier = ((event: CalendarSchedulerEvent): void => {
      event.isDisabled = !this.isDateValid(event.start)
    }).bind(this)
  }
  private isDateValid(date: Date): boolean {
    return /*isToday(date) ||*/ date >= this.minDate && date <= this.maxDate
  }
  CalendarView = CalendarView

  view: CalendarView = CalendarView.Week
  viewDate: Date = new Date()
  viewDays: number = DAYS_IN_WEEK
  refresh: Subject<any> = new Subject()
  locale: string = 'fr-CA'
  hourSegments: any = 4
  weekStartsOn: number = 1
  startsWithToday: boolean = true
  activeDayIsOpen: boolean = true
  excludeDays: number[] = [] // [0];
  weekendDays: number[] = [0, 6]
  dayStartHour: number = 8
  dayStartMinute: number = 0
  dayEndHour: number = 23
  dayEndMinute: number = 0
  minDate: Date = new Date()
  maxDate: Date = endOfDay(addMonths(new Date(), 1))

  dayModifier: any
  hourModifier: any
  segmentModifier: Function
  eventModifier: Function

  prevBtnDisabled: boolean = false
  nextBtnDisabled: boolean = false
  @ViewChild(CalendarSchedulerViewComponent)
  calendarScheduler!: CalendarSchedulerViewComponent
  viewDaysOptionChanged(viewDays: any): void {
    console.log('viewDaysOptionChanged', viewDays)
    this.calendarScheduler.setViewDays(viewDays)
  }

  viewDaysChanged(viewDays: number): void {
    console.log('viewDaysChanged', viewDays)
    this.viewDays = viewDays
  }
  eventTimesChanged({
    event,
    newStart,
    newEnd,
    type,
  }: SchedulerEventTimesChangedEvent): void {
    console.log('eventTimesChanged Type', type)
    console.log('eventTimesChanged Event', event)
    console.log('eventTimesChanged New Times', newStart, newEnd)
    const ev: any = this.events.find((e: any) => e.id === event.id)
    ev!.start = newStart
    ev!.end = newEnd
    this.refresh.next(ev)
  }
  dayHeaderClicked(day: SchedulerViewDay): void {
    console.log('dayHeaderClicked Day', day)
  }
  hourClicked(hour: SchedulerViewHour): void {
    //console.log('hourClicked Hour', hour)
    this.toastr.error('', 'RDV Expiree', {
      timeOut: 2000,
      progressBar: true,
      progressAnimation: 'increasing',
      positionClass: 'toast-top-right',
    })
  }
  segmentClicked(action: string, segment: SchedulerViewHourSegment): void {
    console.log('segmentClicked', segment.date)
  }
  dateOrViewChanged(): void {
    if (this.startsWithToday) {
      this.prevBtnDisabled = !this.isDateValid(
        subPeriod(
          this.dateAdapter,
          CalendarView.Day /*this.view*/,
          this.viewDate,
          1,
        ),
      )
      this.nextBtnDisabled = !this.isDateValid(
        addPeriod(
          this.dateAdapter,
          CalendarView.Day /*this.view*/,
          this.viewDate,
          1,
        ),
      )
    } else {
      this.prevBtnDisabled = !this.isDateValid(
        endOfPeriod(
          this.dateAdapter,
          CalendarView.Day /*this.view*/,
          subPeriod(
            this.dateAdapter,
            CalendarView.Day /*this.view*/,
            this.viewDate,
            1,
          ),
        ),
      )
      this.nextBtnDisabled = !this.isDateValid(
        startOfPeriod(
          this.dateAdapter,
          CalendarView.Day /*this.view*/,
          addPeriod(
            this.dateAdapter,
            CalendarView.Day /*this.view*/,
            this.viewDate,
            1,
          ),
        ),
      )
    }

    if (this.viewDate < this.minDate) {
      this.changeDate(this.minDate)
    } else if (this.viewDate > this.maxDate) {
      this.changeDate(this.maxDate)
    }
  }
  changeDate(date: Date): void {
    console.log('changeDate', date)
    this.viewDate = date
    this.dateOrViewChanged()
  }
  autoEcole: any = {
    typeService: ['Voiture', 'Moto', 'Camion', 'Remorque'],
    moniteurs: [
      {
        agent: { name: 'Hicham', id: 123 },
        disponibility: [
          {
            dateDebut: '2022-07-19',
            dateFin: '2022-07-20',
            heureStart: '12:00',
            heureEnd: '14:00',
            title: 'Meeting ',
            content: 'lorem ipsum dolor sit amet ',
            etat: 'en cours de publication',
          },
          {
            dateDebut: '2022-07-20',
            dateFin: '2022-07-20',
            heureStart: '10:00',
            heureEnd: '11:30',
            title: 'Meeting 1',
            content: 'lorem ipsum dolor sit amet ',
            etat: 'en cours de publication',
          },
          {
            dateDebut: '2022-07-21',
            dateFin: '2022-07-21',
            heureStart: '15:00',
            heureEnd: '16:00',
            title: 'Meeting 2',
            content: 'lorem ipsum dolor sit amet ',
            etat: 'en cours de publication',
          },
          {
            dateDebut: '2022-07-20',
            dateFin: '2022-07-20',
            heureStart: '17:00',
            heureEnd: '17:30',
            title: 'Meeting 5',
            content: 'lorem ipsum dolor sit amet ',
            etat: 'en cours de publication',
          },
        ],
      },
      {
        agent: { name: 'Agent2', id: 345 },
        disponibility: [
          {
            dateDebut: '2022-07-18',
            dateFin: '2022-07-22',
            heureStart: '12:00',
            heureEnd: '14:15',
            title: 'Meeting ',
            content: 'lorem ipsum dolor sit amet ',
            etat: 'en cours de publication',
          },
          {
            dateDebut: '2022-07-20',
            dateFin: '2022-07-21',
            heureStart: '08:30',
            heureEnd: '09:15',
            title: 'Meeting 1',
            content: 'lorem ipsum dolor sit amet ',
            etat: 'en cours de publication',
          },
          {
            dateDebut: '2022-07-21',
            dateFin: '2022-07-21',
            heureStart: '10:30',
            heureEnd: '11:00',
            title: 'Meeting 2',
            content: 'lorem ipsum dolor sit amet ',
            etat: 'en cours de publication',
          },
        ],
      },
      {
        agent: { name: 'Agent 3', id: 1254 },
        disponibility: [
          {
            dateDebut: '2022-07-15',
            dateFin: '2022-07-20',
            heureStart: '11:00',
            heureEnd: '11:30',
            title: 'Meeting ',
            content: 'lorem ipsum dolor sit amet ',
            etat: 'en cours de publication',
          },
          {
            dateDebut: '2022-07-21',
            dateFin: '2022-07-21',
            heureStart: '09:45',
            heureEnd: '10:30',
            title: 'Meeting 1',
            content: 'lorem ipsum dolor sit amet ',
            etat: 'en cours de publication',
          },
          {
            dateDebut: '2022-07-20',
            dateFin: '2022-07-20',
            heureStart: '15:00',
            heureEnd: '16:00',
            title: 'Meeting 2',
            content: 'lorem ipsum dolor sit amet ',
            etat: 'en cours de publication',
          },
          {
            dateDebut: '2022-07-20',
            dateFin: '2022-07-20',
            heureStart: '14:00',
            heureEnd: '16:00',
            title: 'Meeting 5',
            content: 'lorem ipsum dolor sit amet ',
            etat: 'en cours de publication',
          },
        ],
      },
    ],
  }
  ngOnInit(): void {
    this.moniteurs = this.autoEcole.moniteurs.map((mnt: any) => {
      return mnt.agent
    })
  }

  disabledElement: any = true
  onSelectPersonne(event: any) {
    console.log(event)
    let selectedMoniteur: any = this.autoEcole.moniteurs.find((mnt: any) => {
      return mnt.agent.id == event
    })
    console.log(selectedMoniteur)

    this.events = this.calendarService.formatData(
      selectedMoniteur.disponibility,
      [],
    )
    this.disabledElement = false
    console.log('event returned', this.events)
  }

  events: any = []
  sendReservation() {
    if (this.reservationPratiqueForm.valid) {
      this.reservationPratiqueForm.reset()
    } else {
      this.reservationPratiqueForm.markAllAsTouched()
    }
  }
  todayDate: any = new Date()
  dateNow =
    new Date().getFullYear() +
    '-' +
    (new Date().getMonth() + 1 > 9
      ? new Date().getMonth() + 1
      : '0' + (new Date().getMonth() + 1)) +
    '-' +
    new Date().getDate()

  timeNow = new Date().getHours() + ':' + new Date().getMinutes()

  dropDownCours: any = []
  dateDebutChange(event: any) {
    this.dropDownCours = this.autoEcole.cours.filter((cours: any) => {
      return cours.dateDebut == event.target.value
    })

    if (this.dropDownCours.length == 0) {
      this.reservationPratiqueForm.controls['heureDuCour'].disable()

      this.toastr.error('', 'Auncun Cours Planifier ce jour', {
        timeOut: 2000,
        progressBar: true,
        progressAnimation: 'increasing',
        positionClass: 'toast-top-right',
      })
    } else {
      this.reservationPratiqueForm.controls['heureDuCour'].enable()
    }
  }
}
