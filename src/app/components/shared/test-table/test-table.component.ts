import {
  Component,
  HostListener,
  Inject,
  LOCALE_ID,
  OnInit,
  ViewChild,
} from '@angular/core'
import { FormBuilder, FormControl, FormGroup, Validators } from '@angular/forms'
import { NgbModal } from '@ng-bootstrap/ng-bootstrap'
import {
  CalendarView,
  CalendarDateFormatter,
  DateAdapter,
} from 'angular-calendar'
import {
  addPeriod,
  CalendarSchedulerEvent,
  CalendarSchedulerEventAction,
  CalendarSchedulerEventStatus,
  CalendarSchedulerViewComponent,
  DAYS_IN_WEEK,
  endOfPeriod,
  SchedulerDateFormatter,
  SchedulerEventTimesChangedEvent,
  SchedulerViewDay,
  SchedulerViewHour,
  SchedulerViewHourSegment,
  startOfPeriod,
  subPeriod,
} from 'angular-calendar-scheduler'
import {
  endOfDay,
  addMonths,
  addDays,
  addHours,
  addMinutes,
  setHours,
  startOfHour,
  subHours,
  subMinutes,
  formatDistance,
  subDays,
} from 'date-fns'
import { ToastrService } from 'ngx-toastr'
import { Subject } from 'rxjs'

@Component({
  providers: [
    {
      provide: CalendarDateFormatter,
      useClass: SchedulerDateFormatter,
    },
  ],
  selector: 'app-test-table',
  templateUrl: './test-table.component.html',
  styleUrls: ['./test-table.component.scss'],
})
export class TestTableComponent implements OnInit {
  title = 'Angular Calendar Scheduler Demo'

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
  dayStartMinute: number = 30
  dayEndHour: number = 18
  dayEndMinute: number = 0
  minDate: Date = new Date()
  maxDate: Date = endOfDay(addMonths(new Date(), 1))

  dayModifier: any
  hourModifier: any
  segmentModifier: Function
  eventModifier: Function

  prevBtnDisabled: boolean = false
  nextBtnDisabled: boolean = false
  idToDelete: any = ''
  actions: CalendarSchedulerEventAction[] = [
    {
      when: 'enabled',
      label:
        '<span class="valign-center"><i class="material-icons md-18 md-red-500">cancel</i></span>',
      title: 'Delete',
      onClick: (event: CalendarSchedulerEvent): void => {
        console.log("Pressed action 'Delete' on event " + event.id)
        this.idToDelete = event.id
        this.timeStartToDelete = event.start
        this.timeEndToDelete = event.end
        this.modalService.open(this.modalDelete, {
          ariaLabelledBy: 'modal-basic-title',
        })
      },
    },
    {
      when: 'disabled',
      label:
        '<span class="valign-center"><i class="material-icons md-18 md-red-500">autorenew</i></span>',
      title: 'Restore',
      onClick: (event: CalendarSchedulerEvent): void => {
        console.log("Pressed action 'Restore' on event " + event.id)
      },
    },
  ]
  events: any = []
  eventOfClient: any = []
  @ViewChild(CalendarSchedulerViewComponent)
  calendarScheduler!: CalendarSchedulerViewComponent
  @ViewChild('modalDeleteConfirm') modalDelete: any
  @ViewChild('modalAppointment') modalAppointment: any
  public RDVForm: FormGroup
  public Form: FormGroup | undefined
  @HostListener('window:resize', ['$event'])
  onResize(event: any) {
    this.adjustViewDays()
  }
  getDataAgent(agentId: any) {
    let dataSelectedAgent = this.data.filter(
      (agent: any) => agent.id == agentId,
    )
    //this.formatData(dataSelectedAgent[0].events)
  }
  data: any = [
    {
      agent: { name: 'Hicham', id: 123 },
      events: [
        {
          dateDebut: '2022-06-09',
          dateFin: '2022-06-15',
          heureStart: '12:00',
          heureEnd: '14:00',
          title: 'Meeting ',
          content: 'lorem ipsum dolor sit amet ',
          etat: 'en cours de publication',
        },
        {
          dateDebut: '2022-06-09',
          dateFin: '2022-06-09',
          heureStart: '12:00',
          heureEnd: '12:15',
          title: 'Meeting 1',
          content: 'lorem ipsum dolor sit amet ',
          etat: 'en cours de publication',
        },
        {
          dateDebut: '2022-06-09',
          dateFin: '2022-06-09',
          heureStart: '15:00',
          heureEnd: '16:00',
          title: 'Meeting 2',
          content: 'lorem ipsum dolor sit amet ',
          etat: 'en cours de publication',
        },
        {
          dateDebut: '2022-06-10',
          dateFin: '2022-06-11',
          heureStart: '10:15',
          heureEnd: '11:30',
          title: 'Meeting 5',
          content: 'lorem ipsum dolor sit amet ',
          etat: 'en cours de publication',
        },
      ],
    },
    {
      agent: { name: 'Agent2', id: 345 },
      events: [
        {
          dateDebut: '2022-06-10',
          dateFin: '2022-06-13',
          heureStart: '12:00',
          heureEnd: '14:15',
          title: 'Meeting ',
          content: 'lorem ipsum dolor sit amet ',
          etat: 'en cours de publication',
        },
        {
          dateDebut: '2022-06-09',
          dateFin: '2022-06-09',
          heureStart: '08:00',
          heureEnd: '09:15',
          title: 'Meeting 1',
          content: 'lorem ipsum dolor sit amet ',
          etat: 'en cours de publication',
        },
        {
          dateDebut: '2022-06-10',
          dateFin: '2022-06-10',
          heureStart: '8:30',
          heureEnd: '09:00',
          title: 'Meeting 2',
          content: 'lorem ipsum dolor sit amet ',
          etat: 'en cours de publication',
        },
      ],
    },
    {
      agent: { name: 'Agent 3', id: 1254 },
      events: [
        {
          dateDebut: '2022-06-09',
          dateFin: '2022-06-14',
          heureStart: '11:15',
          heureEnd: '11:30',
          title: 'Meeting ',
          content: 'lorem ipsum dolor sit amet ',
          etat: 'en cours de publication',
        },
        {
          dateDebut: '2022-06-09',
          dateFin: '2022-06-09',
          heureStart: '09:45',
          heureEnd: '10:30',
          title: 'Meeting 1',
          content: 'lorem ipsum dolor sit amet ',
          etat: 'en cours de publication',
        },
        {
          dateDebut: '2022-06-09',
          dateFin: '2022-06-09',
          heureStart: '15:00',
          heureEnd: '16:00',
          title: 'Meeting 2',
          content: 'lorem ipsum dolor sit amet ',
          etat: 'en cours de publication',
        },
        {
          dateDebut: '2022-06-10',
          dateFin: '2022-06-11',
          heureStart: '12:00',
          heureEnd: '12:30:30',
          title: 'Meeting 5',
          content: 'lorem ipsum dolor sit amet ',
          etat: 'en cours de publication',
        },
      ],
    },
  ]

  constructor(
    public toastr: ToastrService,

    private dateAdapter: DateAdapter,
    private modalService: NgbModal,
    private fb: FormBuilder,
  ) {
    this.RDVForm = this.fb.group({
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

      titre: new FormControl('', [
        Validators.required,
        Validators.minLength(3),
        Validators.maxLength(30),
        Validators.pattern('^[a-zA-Z \u0600-\u06FF]+$'),
      ]),
      dateDebut: new FormControl(''),
      dateFin: new FormControl(''),
      heureStart: new FormControl(''),
      heureEnd: new FormControl(''),

      telephone: new FormControl('', [
        Validators.required,
        Validators.pattern('^((\\+212-?)|0)?[0-9]{10}$'),
        Validators.minLength(10),
      ]),
      content: new FormControl('', [
        Validators.required,
        Validators.minLength(3),
      ]),
    })
    if (localStorage.getItem('lang') == 'ar') {
      console.log('locale language', this.locale)
      this.locale = 'ar-MA'
    } else if (localStorage.getItem('lang') == 'fr') {
      this.locale = 'fr-CA'
    }
    // this.dayModifier = ((day: SchedulerViewDay): void => {
    //     day.cssClass = this.isDateValid(day.date) ? '' : 'cal-disabled';
    // }).bind(this);

    // this.hourModifier = ((hour: SchedulerViewHour): void => {
    //     hour.cssClass = this.isDateValid(hour.date) ? '' : 'cal-disabled';
    // }).bind(this);

    this.segmentModifier = ((segment: SchedulerViewHourSegment): void => {
      segment.isDisabled = !this.isDateValid(segment.date)
    }).bind(this)

    this.eventModifier = ((event: CalendarSchedulerEvent): void => {
      event.isDisabled = !this.isDateValid(event.start)
    }).bind(this)
  }
  newEvents: any = [
    {
      dateDebut: '2022-06-09',
      dateFin: '2022-06-15',
      heureStart: '12:00',
      heureEnd: '14:00',
      title: 'Meeting ',
      content: 'lorem ipsum dolor sit amet ',
      etat: 'en cours de publication',
    },
    {
      dateDebut: '2022-06-09',
      dateFin: '2022-06-09',
      heureStart: '09:00',
      heureEnd: '09:45',
      title: 'Meeting 1',
      content: 'lorem ipsum dolor sit amet ',
      etat: 'en cours de publication',
    },
    {
      dateDebut: '2022-06-10',
      dateFin: '2022-06-10',
      heureStart: '08:30',
      heureEnd: '09:00',
      title: 'Meeting 2',
      content: 'lorem ipsum dolor sit amet ',
      etat: 'en cours de publication',
    },
    {
      dateDebut: '2022-06-11',
      dateFin: '2022-06-11',
      heureStart: '10:15',
      heureEnd: '11:30',
      title: 'Meeting 5',
      content: 'lorem ipsum dolor sit amet ',
      etat: 'en cours de publication',
    },
    {
      dateDebut: '2022-06-12',
      dateFin: '2022-06-12',
      heureStart: '09:15',
      heureEnd: '09:45',
      title: 'Meeting 5',
      content: 'lorem ipsum dolor sit amet ',
      etat: 'en cours de publication',
    },
    {
      dateDebut: '2022-06-13',
      dateFin: '2022-06-13',
      heureStart: '11:00',
      heureEnd: '11:30',
      title: 'Meeting 5',
      content: 'lorem ipsum dolor sit amet ',
      etat: 'en cours de publication',
    },
  ]
  ngOnInit(): void {
    //  this.events=  this.getEvents(this.actions)
    // this.appService
    //   .getEvents(this.actions)
    //   .then((events: CalendarSchedulerEvent[]) => (this.events = events))
    // this.getEvents(this.actions).then(
    //   (events: CalendarSchedulerEvent[]) => (this.events = events),
    // )
    this.formatData(this.newEvents)
  }
  formatData(newEvents: any) {
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
              actions: this.actions,
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
  adjustViewDays(): void {
    const currentWidth: number = window.innerWidth
    if (currentWidth <= 450) {
      this.viewDays = 1
    } else if (currentWidth <= 768) {
      this.viewDays = 3
    } else {
      this.viewDays = DAYS_IN_WEEK
    }
  }

  changeDate(date: Date): void {
    console.log('changeDate', date)
    this.viewDate = date
    this.dateOrViewChanged()
  }

  changeView(view: CalendarView): void {
    console.log('changeView', view)
    this.view = view
    this.dateOrViewChanged()
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

  private isDateValid(date: Date): boolean {
    return /*isToday(date) ||*/ date >= this.minDate && date <= this.maxDate
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
  clickedHeureStart: any = ''
  heureEnd: any = ''

  segmentClicked(action: string, segment: SchedulerViewHourSegment): void {
    //  console.log('segmentClicked', segment.date)

    this.clickedHeureStart = segment.date

    this.modalService.open(this.modalAppointment, {
      ariaLabelledBy: 'modal-basic-title',
      size: 'xl',
    })
  }
  checkValidity: any = true
  rdvDuration: any = 15
  filterDataSameDay: any = []
  getValueOfPath(rdvDuration: any) {
    this.rdvDuration = rdvDuration
    this.heureEnd = new Date(
      Date.parse(this.clickedHeureStart) + rdvDuration * 60 * 1000,
    )
    let newHeureFinRDV =
      this.heureEnd.getHours() * 60 * 60 * 1000 +
      this.heureEnd.getMinutes() * 60 * 1000
    let heureFinWork =
      this.dayEndHour * 60 * 60 * 1000 + this.dayEndMinute * 60 * 1000
    // console.log('before', this.clickedHeureStart)

    this.filterDataSameDay = this.events.filter(
      (event: any) =>
        event.start.getFullYear() +
          '-' +
          (event.start.getMonth() + 1) +
          '-' +
          event.start.getDate() ==
        this.clickedHeureStart.getFullYear() +
          '-' +
          (this.clickedHeureStart.getMonth() + 1) +
          '-' +
          this.clickedHeureStart.getDate(),
    )
    this.checkValidity = true
    this.filterDataSameDay.map((filtredEvent: any) => {
      let heureDebutEvent =
        filtredEvent.start.getHours() * 60 * 60 * 1000 +
        filtredEvent.start.getMinutes() * 60 * 1000
      let HeureDebutNewEvent =
        this.clickedHeureStart.getHours() * 60 * 60 * 1000 +
        this.clickedHeureStart.getMinutes() * 60 * 1000

      if (
        heureDebutEvent > HeureDebutNewEvent &&
        heureDebutEvent < newHeureFinRDV
      ) {
        this.checkValidity = false
      }
    })
    if (!this.checkValidity) {
      this.toastr.error('', 'RDV En Conflit avec Autre RDV ', {
        timeOut: 2000,
        progressBar: true,
        progressAnimation: 'increasing',
        positionClass: 'toast-top-right',
      })
    } else if (this.checkValidity) {
      if (newHeureFinRDV <= heureFinWork) {
      } else {
        this.toastr.error(
          '',
          "Heure de Fin depasse l'heure de travail d'agent",
          {
            timeOut: 2000,
            progressBar: true,
            progressAnimation: 'increasing',
            positionClass: 'toast-top-right',
          },
        )
      }
    }
  }

  eventClicked(action: string, event: CalendarSchedulerEvent): void {
    console.log('eventClicked Action', action)
    console.log('eventClicked Event', event)
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
  bgColor: string = '#f3c8cb !important'
  secondColor: string = '#ea7077'

  viewDaysOptionChanged(viewDays: any): void {
    console.log('viewDaysOptionChanged', viewDays)
    this.calendarScheduler.setViewDays(viewDays)
  }

  viewDaysChanged(viewDays: number): void {
    console.log('viewDaysChanged', viewDays)
    this.viewDays = viewDays
  }
  timeStartToDelete: any = ''
  timeEndToDelete: any = ''

  deleteRDV() {
    this.events = this.events.filter(
      (event: any) =>
        Date.parse(event.start) != Date.parse(this.timeStartToDelete) &&
        Date.parse(event.end) != Date.parse(this.timeEndToDelete),
    )

    this.modalService.dismissAll()
    this.idToDelete = ''
  }
  startDateHour: any = ''
  endtDateHour: any = ''
  titreNewEvent = ''
  addAppointment() {
    sessionStorage.setItem('emailClient', this.RDVForm.value.email)
    let emailClient = this.RDVForm.value.email
    //console.log(emailClient)
    if (
      this.checkIfSameDayLimit(emailClient, this.clickedHeureStart, this.events)
    ) {
      this.modalService.dismissAll()
      this.RDVForm.reset()
      this.toastr.error('', 'Limit de RDV in Same Day Atteint', {
        timeOut: 2000,
        progressBar: true,
        progressAnimation: 'increasing',
        positionClass: 'toast-top-right',
      })
    } else if (this.checkIfInLimitOfRDV(emailClient, this.events) >= 2) {
      this.toastr.error('', 'Limit de RDV en attente Atteint', {
        timeOut: 2000,
        progressBar: true,
        progressAnimation: 'increasing',
        positionClass: 'toast-top-right',
      })
    } else {
      this.newEvents.push({
        dateDebut: this.RDVForm.value.dateDebut,
        dateFin: this.RDVForm.value.dateFin,
        heureStart: this.RDVForm.value.heureStart,
        heureEnd: this.RDVForm.value.heureEnd,
        title: this.RDVForm.value.title,
        content: this.RDVForm.value.content,
        email: this.RDVForm.value.email,
        etat: 'en cours de validation',
      }),
        this.toastr.success('', 'RDV ADDED ', {
          timeOut: 2000,
          progressBar: true,
          progressAnimation: 'increasing',
          positionClass: 'toast-top-right',
        })
      // this.events = [
      //   ...this.events,
      //   {
      //     id: '700',
      //     start: this.clickedHeureStart,
      //     end: this.heureEnd,
      //     title: this.titreNewEvent,
      //     content: this.messageNewEvent,
      //     color: { primary: this.secondColor, secondary: '#71727a' },
      //     actions: this.actions,
      //     status: 'ok' as CalendarSchedulerEventStatus,
      //     isClickable: true,
      //     isDisabled: false,
      //     resizable: {
      //       beforeStart: true,
      //       afterEnd: true,
      //     },
      //     email: this.RDVForm.value.email,
      //   },
      // ]
      // console.log(this.events)
      this.modalService.dismissAll()
    }
  }
  messageNewEvent: any = ''
  onClickInput(event: any) {
    this.titreNewEvent = event.target.value
  }
  onClickMessage(event: any) {
    this.messageNewEvent = event.target.value
  }
  public sendRDV() {
    this.RDVForm.value.dateDebut =
      this.clickedHeureStart.getFullYear() +
      '-' +
      (this.clickedHeureStart.getMonth() + 1) +
      '-' +
      this.clickedHeureStart.getDate()
    this.RDVForm.value.dateFin =
      this.clickedHeureStart.getFullYear() +
      '-' +
      (this.clickedHeureStart.getMonth() + 1) +
      '-' +
      this.clickedHeureStart.getDate()
    this.RDVForm.value.heureStart =
      this.clickedHeureStart.getHours() +
      ':' +
      this.clickedHeureStart.getMinutes()
    this.RDVForm.value.heureEnd =
      addMinutes(this.clickedHeureStart, this.rdvDuration).getHours() +
      ':' +
      addMinutes(this.clickedHeureStart, this.rdvDuration).getMinutes()

    if (this.RDVForm.valid) {
      //   console.log('Valid Form', this.RDVForm.value)

      this.addAppointment()
      //console.log('🚀🚀🚀🚀🚀🚀🚀🚀🚀🚀🚀🚀 Success')

      this.RDVForm.reset()

      this.formatData(this.newEvents)
    } else {
      //console.log('Invvalid Form')

      this.RDVForm.markAllAsTouched()
    }
  }

  checkIfSameDayLimit(emailClient: any, date: any, events: any) {
    let rdvAlreadyTakenInSameDay: any = false
    events.map((event: any) => {
      // console.log(
      //   event.start.getFullYear() +
      //     '-' +
      //     (event.start.getMonth() + 1) +
      //     '-' +
      //     event.start.getDate() ==
      //     date.getFullYear() +
      //       '-' +
      //       (date.getMonth() + 1) +
      //       '-' +
      //       date.getDate() && event.email == emailClient,
      // )

      if (
        event.start.getFullYear() +
          '-' +
          (event.start.getMonth() + 1) +
          '-' +
          event.start.getDate() ==
          date.getFullYear() +
            '-' +
            (date.getMonth() + 1) +
            '-' +
            date.getDate() &&
        event.email == emailClient
      ) {
        rdvAlreadyTakenInSameDay = true
      }
    })
    if (!rdvAlreadyTakenInSameDay) {
      return false
    } else {
      return true
    }
  }

  checkIfInLimitOfRDV(emailClient: any, events: any) {
    let nbOfRdv: any = 0
    // console.log(events)
    events.map((event: any) => {
      if (
        event.email == emailClient &&
        event.etat == 'en cours de validation'
      ) {
        nbOfRdv = nbOfRdv + 1
      }
    })
    return nbOfRdv
  }
}
