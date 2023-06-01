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
  selector: 'app-reservation-artisans',
  templateUrl: './reservation-artisans.component.html',
  styleUrls: ['./reservation-artisans.component.scss'],
})
export class ReservationArtisansComponent implements OnInit {
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
  idToDelete: any = ''

  public selectedMoment = new Date()
  public selectedMoment2 = new FormControl(new Date())
  public selectedMoments = [
    new Date(2018, 1, 12, 10, 30),
    new Date(2018, 3, 21, 20, 30),
  ]

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
  @ViewChild('modalDeleteReservation') modalDeleteReservation: any

  public ReservationForm: FormGroup
  public AnnulationForm: FormGroup

  public Form: FormGroup | undefined
  @HostListener('window:resize', ['$event'])
  onResize(event: any) {
    this.adjustViewDays()
  }
  // getDataAgent(agentId: any) {
  //   let dataSelectedAgent = this.data.filter(
  //     (agent: any) => agent.id == agentId,
  //   )
  //   //this.formatData(dataSelectedAgent[0].events)
  // }
  newEvents: any = [
    {
      dateDebut: '2022-07-23',
      dateFin: '2022-07-23',
      heureStart: '08:00',
      heureEnd: '12:00',
      title: 'Meeting ',
      content: 'lorem ipsum dolor sit amet ',
      etat: 'en cours de publication',
    },
    {
      dateDebut: '2022-07-23',
      dateFin: '2022-07-23',
      heureStart: '14:00',
      heureEnd: '18:00',
      title: 'Meeting 1',
      content: 'lorem ipsum dolor sit amet ',
      etat: 'en cours de publication',
    },
    {
      dateDebut: '2022-07-24',
      dateFin: '2022-07-24',
      heureStart: '18:00',
      heureEnd: '23:00',
      title: 'Meeting 2',
      content: 'lorem ipsum dolor sit amet ',
      etat: 'en cours de publication',
    },

    {
      dateDebut: '2022-07-24',
      dateFin: '2022-07-24',
      heureStart: '08:00',
      heureEnd: '12:00',
      title: 'Meeting 5',
      content: 'lorem ipsum dolor sit amet ',
      etat: 'en cours de publication',
    },
  ]
  constructor(
    public toastr: ToastrService,
    private dateAdapter: DateAdapter,
    private modalService: NgbModal,
    private fb: FormBuilder,
  ) {
    this.ReservationForm = this.fb.group({
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

    this.AnnulationForm = this.fb.group({
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

      heureDebut: new FormControl('', [Validators.required]),
      heureFin: new FormControl('', [Validators.required]),

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

    this.segmentModifier = ((segment: SchedulerViewHourSegment): void => {
      segment.isDisabled = !this.isDateValid(segment.date)
    }).bind(this)

    this.eventModifier = ((event: CalendarSchedulerEvent): void => {
      event.isDisabled = !this.isDateValid(event.start)
    }).bind(this)
  }

  ngOnInit(): void {}
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
  dataSearch = [
    {
      secteur: {
        nomSecteur: 'Secteur1',
        idSecteur: 'S1',
      },
      id: 'S1',
      specialite: [
        {
          nom: 'Specialite 1',
          personne: [
            {
              photo:
                'https://w7.pngwing.com/pngs/627/693/png-transparent-computer-icons-user-user-icon-thumbnail.png',
              nom: ' P1 SP1',
              id: 1,
            },
            {
              photo:
                'https://w7.pngwing.com/pngs/627/693/png-transparent-computer-icons-user-user-icon-thumbnail.png',

              nom: ' P2 SP1',
              id: 1,
            },
            {
              photo:
                'https://w7.pngwing.com/pngs/627/693/png-transparent-computer-icons-user-user-icon-thumbnail.png',

              nom: ' P3 SP1',
              id: 1,
            },
            {
              photo:
                'https://w7.pngwing.com/pngs/627/693/png-transparent-computer-icons-user-user-icon-thumbnail.png',

              nom: ' P4 SP1',
              id: 1,
            },
          ],
        },
        {
          nom: 'Specialite 2',
          personne: [
            {
              photo:
                'https://w7.pngwing.com/pngs/627/693/png-transparent-computer-icons-user-user-icon-thumbnail.png',
              nom: ' P1 SP2',
              id: 1,
            },
            {
              photo:
                'https://w7.pngwing.com/pngs/627/693/png-transparent-computer-icons-user-user-icon-thumbnail.png',

              nom: ' P2 SP2',
              id: 1,
            },
            {
              photo:
                'https://w7.pngwing.com/pngs/627/693/png-transparent-computer-icons-user-user-icon-thumbnail.png',

              nom: ' P3 SP2',
              id: 1,
            },
            {
              photo:
                'https://w7.pngwing.com/pngs/627/693/png-transparent-computer-icons-user-user-icon-thumbnail.png',

              nom: ' P4 SP2',
              id: 1,
            },
          ],
        },
        {
          nom: 'Specialite 3',
          personne: [
            {
              photo:
                'https://w7.pngwing.com/pngs/627/693/png-transparent-computer-icons-user-user-icon-thumbnail.png',
              nom: ' P1 SP3',
              id: 1,
            },
            {
              photo:
                'https://w7.pngwing.com/pngs/627/693/png-transparent-computer-icons-user-user-icon-thumbnail.png',

              nom: ' P2 SP3',
              id: 1,
            },
            {
              photo:
                'https://w7.pngwing.com/pngs/627/693/png-transparent-computer-icons-user-user-icon-thumbnail.png',

              nom: ' P3 SP3',
              id: 1,
            },
            {
              photo:
                'https://w7.pngwing.com/pngs/627/693/png-transparent-computer-icons-user-user-icon-thumbnail.png',

              nom: ' P4 SP3',
              id: 1,
            },
          ],
        },
      ],
    },
    {
      secteur: {
        nomSecteur: 'Secteur 2',
        idSecteur: 'S2',
      },
      id: 'S22',
      specialite: [
        {
          nom: 'Specialite 1 S2',
          personne: [
            {
              photo:
                'https://w7.pngwing.com/pngs/627/693/png-transparent-computer-icons-user-user-icon-thumbnail.png',
              nom: ' P1 SP1 S2',
              id: 1,
            },
            {
              photo:
                'https://w7.pngwing.com/pngs/627/693/png-transparent-computer-icons-user-user-icon-thumbnail.png',

              nom: ' P2 SP1 S2',
              id: 1,
            },
            {
              photo:
                'https://w7.pngwing.com/pngs/627/693/png-transparent-computer-icons-user-user-icon-thumbnail.png',

              nom: ' P3 SP1 S2',
              id: 1,
            },
            {
              photo:
                'https://w7.pngwing.com/pngs/627/693/png-transparent-computer-icons-user-user-icon-thumbnail.png',

              nom: ' P4 SP2',
              id: 1,
            },
          ],
        },
        {
          nom: 'Specialite 2 S2',
          personne: [
            {
              photo:
                'https://w7.pngwing.com/pngs/627/693/png-transparent-computer-icons-user-user-icon-thumbnail.png',
              nom: ' P1 SP2 S2',
              id: 1,
            },
            {
              photo:
                'https://w7.pngwing.com/pngs/627/693/png-transparent-computer-icons-user-user-icon-thumbnail.png',

              nom: ' P2 SP2 S2',
              id: 1,
            },
            {
              photo:
                'https://w7.pngwing.com/pngs/627/693/png-transparent-computer-icons-user-user-icon-thumbnail.png',

              nom: ' P3 SP2 S2',
              id: 1,
            },
            {
              photo:
                'https://w7.pngwing.com/pngs/627/693/png-transparent-computer-icons-user-user-icon-thumbnail.png',

              nom: ' P4 SP2 S2',
              id: 1,
            },
          ],
        },
        {
          nom: 'Specialite 3 S3',
          personne: [
            {
              photo:
                'https://w7.pngwing.com/pngs/627/693/png-transparent-computer-icons-user-user-icon-thumbnail.png',
              nom: ' P1 SP3',
              id: 1,
            },
            {
              photo:
                'https://w7.pngwing.com/pngs/627/693/png-transparent-computer-icons-user-user-icon-thumbnail.png',

              nom: ' P2 SP3',
              id: 1,
            },
            {
              photo:
                'https://w7.pngwing.com/pngs/627/693/png-transparent-computer-icons-user-user-icon-thumbnail.png',

              nom: ' P3 SP3',
              id: 1,
            },
            {
              photo:
                'https://w7.pngwing.com/pngs/627/693/png-transparent-computer-icons-user-user-icon-thumbnail.png',

              nom: ' P4 SP3',
              id: 1,
            },
          ],
        },
      ],
    },
  ]
  disabledElement: any = false
  specialite: any = []
  personnes: any = []

  onChangeSecteur(secteur: any) {
    if (secteur.target.value != '') {
      this.specialite = this.dataSearch.filter(
        (item) => item.secteur.idSecteur === secteur.target.value,
      )[0].specialite
      this.disabledElement = false
      this.events = []
    } else {
      this.disabledElement = false
      this.events = []

      this.personnes = []
      this.specialite = []
    }
    console.log(this.specialite)
  }
  onChangeSpecialite(specialite: any) {
    if (specialite.target.value != '') {
      this.personnes = this.specialite.filter(
        (item: any) => item.nom === specialite.target.value,
      )[0].personne
      this.disabledElement = false
      this.events = []
    } else {
      this.disabledElement = false
      this.events = []

      this.personnes = []
    }
    console.log('personne', this.personnes)
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
  checkValidity: any = true
  rdvDuration: any = 15
  filterDataSameDay: any = []
  getValueOfPath(rdvDuration: any) {
    this.rdvDuration = rdvDuration
    this.heureEnd = new Date(
      Date.parse(this.clickedHeureStart) + rdvDuration * 60 * 60 * 1000,
    )
    console.log('heureEnd', this.heureEnd)

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
    console.log('checkValidity', this.checkValidity)

    if (!this.checkValidity) {
      this.toastr.error('', 'RDV En Conflit avec Autre RDV ', {
        timeOut: 2000,
        progressBar: true,
        progressAnimation: 'increasing',
        positionClass: 'toast-top-right',
      })
      this.modalService.dismissAll()
    } else if (this.checkValidity) {
      console.log('newHeureFinRDV', newHeureFinRDV)
      console.log('heureFinWork', heureFinWork)

      if (
        (newHeureFinRDV > heureFinWork &&
          this.clickedHeureStart.getDate() == this.heureEnd.getDate()) ||
        this.clickedHeureStart.getDate() != this.heureEnd.getDate()
      ) {
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
        this.modalService.dismissAll()
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
  clickedHeureFin: any = ''

  heureEnd: any = ''

  segmentClicked(action: string, segment: SchedulerViewHourSegment): void {
    //  console.log('segmentClicked', segment.date)

    this.clickedHeureStart = segment.date
    this.clickedHeureFin = addMinutes(segment.date, this.duration * 60)
    this.modalService.open(this.modalAppointment, {
      ariaLabelledBy: 'modal-basic-title',
      size: 'xl',
    })
    this.getValueOfPath(this.duration)
  }
  duration: any = ''
  onSelectPersonne(event: any) {
    console.log(event)
    this.disabledElement = true
    if (event.includes('P2 SP1')) {
      console.log('1')

      this.duration = 8
    } else {
      console.log('2')

      this.duration = 4
    }
    console.log(this.duration)

    this.formatData(this.newEvents)
  }
  public sendReservation() {
    this.ReservationForm.value.dateDebut =
      this.clickedHeureStart.getFullYear() +
      '-' +
      (this.clickedHeureStart.getMonth() + 1) +
      '-' +
      this.clickedHeureStart.getDate()
    this.ReservationForm.value.dateFin =
      this.clickedHeureStart.getFullYear() +
      '-' +
      (this.clickedHeureStart.getMonth() + 1) +
      '-' +
      this.clickedHeureStart.getDate()
    this.ReservationForm.value.heureStart =
      this.clickedHeureStart.getHours() +
      ':' +
      this.clickedHeureStart.getMinutes()
    this.ReservationForm.value.heureEnd =
      addHours(this.clickedHeureStart, this.rdvDuration).getHours() +
      ':' +
      addHours(this.clickedHeureStart, this.rdvDuration).getMinutes()

    if (this.ReservationForm.valid) {
      //   console.log('Valid Form', this.ReservationForm.value)

      this.addAppointment()
      //console.log('🚀🚀🚀🚀🚀🚀🚀🚀🚀🚀🚀🚀 Success')

      this.ReservationForm.reset()

      this.formatData(this.newEvents)
    } else {
      //console.log('Invvalid Form')

      this.ReservationForm.markAllAsTouched()
    }
  }
  addAppointment() {
    sessionStorage.setItem('emailClient', this.ReservationForm.value.email)
    let emailClient = this.ReservationForm.value.email
    //console.log(emailClient)
    if (
      this.checkIfSameDayLimit(emailClient, this.clickedHeureStart, this.events)
    ) {
      this.modalService.dismissAll()
      this.ReservationForm.reset()
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
        dateDebut: this.ReservationForm.value.dateDebut,
        dateFin: this.ReservationForm.value.dateFin,
        heureStart: this.ReservationForm.value.heureStart,
        heureEnd: this.ReservationForm.value.heureEnd,
        title: this.ReservationForm.value.title,
        content: this.ReservationForm.value.content,
        email: this.ReservationForm.value.email,
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
      //     email: this.ReservationForm.value.email,
      //   },
      // ]
      // console.log(this.events)
      this.modalService.dismissAll()
    }
  }
  deleteReservation() {
    this.events = this.events.filter(
      (event: any) =>
        Date.parse(event.start) != Date.parse(this.timeStartToDelete) &&
        Date.parse(event.end) != Date.parse(this.timeEndToDelete),
    )

    this.modalService.dismissAll()
    this.idToDelete = ''
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
  openModalAnnulation() {
    this.AnnulationForm.reset()
    this.modalService.open(this.modalDeleteReservation, {
      ariaLabelledBy: 'modal-basic-title',
      size: 'xl',
      centered: true,
    })
  }
  sendAnnualation() {
    if (this.AnnulationForm.valid) {
      this.modalService.dismissAll()
      this.toastr.info('', 'Annulation Envoyer avec Succès', {
        timeOut: 2000,
        progressBar: true,
        progressAnimation: 'increasing',
        positionClass: 'toast-top-right',
      })
      this.modalService.dismissAll()
    } else {
      this.AnnulationForm.markAllAsTouched()
    }
  }
}
