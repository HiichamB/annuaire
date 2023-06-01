import { Component, HostListener, OnInit, ViewChild } from '@angular/core'
import { FormBuilder, FormControl, FormGroup, Validators } from '@angular/forms'

import { NgbModal } from '@ng-bootstrap/ng-bootstrap'
import { ToastrService } from 'ngx-toastr'
import { CalendarView, DateAdapter } from 'angular-calendar'
import {
  CalendarSchedulerEvent,
  DAYS_IN_WEEK,
  SchedulerEventTimesChangedEvent,
  SchedulerViewHourSegment,
  subPeriod,
  startOfPeriod,
  addPeriod,
  endOfPeriod,
  CalendarSchedulerViewComponent,
} from 'angular-calendar-scheduler'
import { endOfDay, addMonths, addDays } from 'date-fns'
import { Subject } from 'rxjs'
import { CalendarSchedulerService } from 'src/app/shared/services/calendar-scheduler.service'

@Component({
  selector: 'app-reservation-activite',
  templateUrl: './reservation-activite.component.html',
  styleUrls: ['./reservation-activite.component.scss'],
})
export class ReservationActiviteComponent implements OnInit {
  locationForm: any
  clickedHeureStart: any = ''
  reservationActiviteForm: any
  selectedHeure: any = true
  segmentHoraire: any = [30, 45, 60, 90, 120, 200, 240, 360, 375]
  constructor(
    private fb: FormBuilder,
    public modalService: NgbModal,
    private toastr: ToastrService,
    private dateAdapter: DateAdapter,
    public calendarService: CalendarSchedulerService,
  ) {
    this.segmentModifier = ((segment: SchedulerViewHourSegment): void => {
      segment.isDisabled = !this.isDateValid(segment.date)
    }).bind(this)

    this.eventModifier = ((event: CalendarSchedulerEvent): void => {
      event.isDisabled = !this.isDateValid(event.start)
    }).bind(this)

    this.locationForm = this.fb.group({
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
      heureFin: new FormControl({ value: '', disabled: true }, [
        Validators.required,
      ]),
      quantite: new FormControl({ value: '' }, [Validators.required]),
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

    this.reservationActiviteForm = this.fb.group({
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
      heureEnd: new FormControl('', [Validators.required]),
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
  }
  ngOnInit(): void {}
  @ViewChild(CalendarSchedulerViewComponent)
  calendarScheduler!: CalendarSchedulerViewComponent
  view: CalendarView = CalendarView.Week
  viewDate: Date = new Date()
  viewDays: number = DAYS_IN_WEEK
  refresh: Subject<any> = new Subject()
  locale: string = 'fr-CA'
  hourSegments: any = 1
  weekStartsOn: number = 1
  startsWithToday: boolean = true
  activeDayIsOpen: boolean = true
  excludeDays: number[] = [] // [0];
  weekendDays: number[] = [0, 6]
  dayStartHour: number = 8
  dayStartMinute: number = 0
  dayEndHour: number = 18
  dayEndMinute: number = 0
  dayModifier: any
  hourModifier: any
  maxDate: Date = endOfDay(addMonths(new Date(), 1))
  product = {
    idP: 'car1',
    titre: 'Car 1',
    categorie: 'Car',
    description:
      "As fellow graduate students at MIT in 2004, Brian and Dharmesh noticed a shift in the way people shop and buy. Consumers were no longer tolerating interruptive bids for their attention — in fact, they'd gotten really, really good at ignoring them. \n From this shift, a company was born: HubSpot. It was founded on inbound, the notion that people don't want to be interrupted by marketers or harassed by salespeople — they want to be helped.\n Today, the inbound movement continues to empower businesses around the world to stop interrupting, start helping, and return their focus to the customer.",
    imageProduct:
      'https://w7.pngwing.com/pngs/591/74/png-transparent-cars-towmater-art-cars-mater-national-championship-lightning-mcqueen-pixar-cars-vintage-car-car-vehicle.png',

    otherImages: [
      'https://w7.pngwing.com/pngs/662/535/png-transparent-disney-pixar-cars-tow-mater-mater-lightning-mcqueen-cars-cartoon-lightning-mcqueen-vintage-car-car-pixar-thumbnail.png',
      'https://w7.pngwing.com/pngs/893/1009/png-transparent-mater-from-cars-illustration-mater-lightning-mcqueen-cars-2-sally-carrera-cars-vintage-car-car-pixar.png',
    ],
    price: 200,
    rating: 5,
    quantite: 5,
    livraison: 'gratuite',
    shipping: [
      {
        id: 3,
        prix: 0,
        duree: 25,
        company: 'Africa',
      },
      {
        id: 1,
        prix: 15,
        duree: 3,
        company: 'DHL',
      },
      {
        id: 2,
        prix: 25,
        duree: 1,
        company: 'Amana',
      },
    ],
    variant: ['39', '40', '41', '42', '43', '44', '45'],
    disponibility: [
      {
        dateDebut: '2022-06-12',
        dateFin: '2022-06-16',
        heureStart: '16:00',
        heureEnd: '17:00',
        title: 'Meeting 444',
        content: 'lorem ipsum dolor sit amet ',
        etat: 'en cours de publication',
        quantite: 1,
      },
      {
        dateDebut: '2022-06-15',
        dateFin: '2022-06-15',
        heureStart: '08:00',
        heureEnd: '17:00',
        title: 'En Location',
        content: 'lorem ipsum dolor sit amet ',
        etat: 'en cours de publication',
        quantite: 1,
      },

      {
        dateDebut: '2022-06-15',
        dateFin: '2022-06-17',
        heureStart: '12:00',
        heureEnd: '13:00',
        title: 'Meeting 1',
        content: 'lorem ipsum dolor sit amet ',
        etat: 'en cours de publication',
        quantite: 1,
      },
      {
        dateDebut: '2022-06-13',
        dateFin: '2022-06-13',
        heureStart: '15:00',
        heureEnd: '16:00',
        title: 'Meeting 2',
        content: 'lorem ipsum dolor sit amet ',
        etat: 'en cours de publication',
        quantite: 1,
      },
      {
        dateDebut: '2022-06-17',
        dateFin: '2022-06-18',
        heureStart: '10:00',
        heureEnd: '12:00',
        title: 'Meeting 5',
        content: 'lorem ipsum dolor sit amet ',
        etat: 'en cours de publication',
        quantite: 2,
      },
    ],
  }
  segmentModifier: Function
  eventModifier: Function
  openModalDiponibilite(template: any) {
    this.modalService.open(template, {
      ariaLabelledBy: 'modal-basic-title',
      size: 'xl',
      centered: true,
    })
  }
  quantiteDispo: any = 0

  prevBtnDisabled: boolean = false
  nextBtnDisabled: boolean = false
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
  minDate: any = new Date()

  changeDate(date: Date): void {
    console.log('changeDate', date)
    this.viewDate = date
    this.dateOrViewChanged()
  }
  viewDaysOptionChanged(viewDays: any): void {
    console.log('viewDaysOptionChanged', viewDays)
    this.calendarScheduler.setViewDays(viewDays)
  }
  private isDateValid(date: Date): boolean {
    return /*isToday(date) ||*/ date >= this.minDate && date <= this.maxDate
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
  events: any = []

  bgColor: string = '#f3c8cb !important'
  secondColor: string = '#ea7077'
  heureDebutLocation: any = new Date()
  heureFinLocation: any = new Date()
  heureFinMin: any = 0
  heureDebutChange(event: any) {
    this.heureDebutLocation = event.target.value
    //   console.log('heureDebutLocation', this.heureDebutLocation)

    this.heureFinMin = addDays(new Date(Date.parse(this.heureDebutLocation)), 1)
    //console.log('Before heureFinMin', this.heureFinMin)

    this.heureFinMin =
      this.heureFinMin.getFullYear() +
      '-' +
      this.heureFinMin.getMonth() +
      '-' +
      this.heureFinMin.getDate() +
      'T' +
      this.heureFinMin.getHours() +
      ':' +
      this.heureFinMin.getMinutes() +
      ':00'
    // this.heureFinMin = '2022-07-07T14:47:57'
    //  console.log('After heureFinMin', this.heureFinMin)

    this.locationForm.controls['heureFin'].enable()

    //this.locationForm.controls['heureFin'].setValue(addDays(this.heureDebutLocation, 1))
  }
  heureFinChange(event: any) {
    this.heureFinLocation = event.target.value
    this.locationForm.controls['quantite'].enable()

    this.quantiteDispo = this.calendarService.getQuantiteRestante(
      this.locationForm.value.heureDebut,
      this.locationForm.value.heureFin,
      this.product,
    )
    if (this.quantiteDispo <= 0) {
      this.toastr.error(
        '',
        'Indisponible pour le moment veuillez changer la Date',
        {
          timeOut: 2000,
          progressBar: true,
          progressAnimation: 'increasing',
          positionClass: 'toast-top-right',
        },
      )
    } else {
      this.toastr.info(
        '',
        'Disponible pour la location : ' + this.quantiteDispo,
        {
          timeOut: 2000,
          progressBar: true,
          progressAnimation: 'increasing',
          positionClass: 'toast-top-right',
        },
      )
    }
  }
  public sendLocation() {
    if (this.locationForm.valid) {
      this.locationForm.reset()
    } else {
      this.locationForm.markAllAsTouched()
    }
  }
  options: any = [
    {
      idP: 1,
      titre: 'Option 1 ',
      categorie: 'Accessoire',

      description:
        "As fellow graduate students at MIT in 2004, Brian and Dharmesh noticed a shift in the way people shop and buy. Consumers were no longer tolerating interruptive bids for their attention — in fact, they'd gotten really, really good at ignoring them. \n From this shift, a company was born: HubSpot. It was founded on inbound, the notion that people don't want to be interrupted by marketers or harassed by salespeople — they want to be helped.\n Today, the inbound movement continues to empower businesses around the world to stop interrupting, start helping, and return their focus to the customer.",
      imageProduct:
        'https://img01.ztat.net/article/spp-media-p1/7df9956ac3954b4d8e752bc3279c4896/50fbeeb7fcb44452a3113fa26fa5836d.jpg?imwidth=156&filter=packshot',
      type: 'vente',
      price: 100,
      quantite: 10,
      disponibility: [
        {
          dateDebut: '2022-06-12',
          dateFin: '2022-06-16',
          heureStart: '16:00',
          heureEnd: '17:00',
          title: 'Meeting 444',
          content: 'lorem ipsum dolor sit amet ',
          etat: 'en cours de publication',
          quantite: 1,
        },
        {
          dateDebut: '2022-06-15',
          dateFin: '2022-06-15',
          heureStart: '08:00',
          heureEnd: '17:00',
          title: 'En Location',
          content: 'lorem ipsum dolor sit amet ',
          etat: 'en cours de publication',
          quantite: 1,
        },
      ],
    },
    {
      idP: 1,
      titre: 'Option 2 ',
      categorie: 'Accessoire',

      description:
        "As fellow graduate students at MIT in 2004, Brian and Dharmesh noticed a shift in the way people shop and buy. Consumers were no longer tolerating interruptive bids for their attention — in fact, they'd gotten really, really good at ignoring them. \n From this shift, a company was born: HubSpot. It was founded on inbound, the notion that people don't want to be interrupted by marketers or harassed by salespeople — they want to be helped.\n Today, the inbound movement continues to empower businesses around the world to stop interrupting, start helping, and return their focus to the customer.",
      imageProduct:
        'https://img01.ztat.net/article/spp-media-p1/7df9956ac3954b4d8e752bc3279c4896/50fbeeb7fcb44452a3113fa26fa5836d.jpg?imwidth=156&filter=packshot',
      type: 'vente',
      price: 100,
      quantite: 10,
      disponibility: [
        {
          dateDebut: '2022-06-12',
          dateFin: '2022-06-16',
          heureStart: '16:00',
          heureEnd: '17:00',
          title: 'Meeting 444',
          content: 'lorem ipsum dolor sit amet ',
          etat: 'en cours de publication',
          quantite: 1,
        },
        {
          dateDebut: '2022-06-15',
          dateFin: '2022-06-15',
          heureStart: '08:00',
          heureEnd: '17:00',
          title: 'En Location',
          content: 'lorem ipsum dolor sit amet ',
          etat: 'en cours de publication',
          quantite: 1,
        },
      ],
    },
    {
      idP: 1,
      titre: 'Option 3 ',
      categorie: 'Accesoire',

      description:
        "As fellow graduate students at MIT in 2004, Brian and Dharmesh noticed a shift in the way people shop and buy. Consumers were no longer tolerating interruptive bids for their attention — in fact, they'd gotten really, really good at ignoring them. \n From this shift, a company was born: HubSpot. It was founded on inbound, the notion that people don't want to be interrupted by marketers or harassed by salespeople — they want to be helped.\n Today, the inbound movement continues to empower businesses around the world to stop interrupting, start helping, and return their focus to the customer.",
      imageProduct:
        'https://img01.ztat.net/article/spp-media-p1/7df9956ac3954b4d8e752bc3279c4896/50fbeeb7fcb44452a3113fa26fa5836d.jpg?imwidth=156&filter=packshot',
      type: 'vente',
      price: 100,
      quantite: 3,
      disponibility: [
        {
          dateDebut: '2022-06-12',
          dateFin: '2022-06-16',
          heureStart: '16:00',
          heureEnd: '17:00',
          title: 'Meeting 444',
          content: 'lorem ipsum dolor sit amet ',
          etat: 'en cours de publication',
          quantite: 1,
        },
        {
          dateDebut: '2022-06-15',
          dateFin: '2022-06-15',
          heureStart: '08:00',
          heureEnd: '17:00',
          title: 'En Location',
          content: 'lorem ipsum dolor sit amet ',
          etat: 'en cours de publication',
          quantite: 1,
        },
      ],
    },
  ]
  @ViewChild('modalReservationActivite') modalReservation: any

  segmentClicked(action: string, segment: SchedulerViewHourSegment): void {
    this.clickedHeureStart = segment.date

    this.reservationActiviteForm
      .get('heureStart')
      .setValue(
        (+this.clickedHeureStart.getHours() >= 10
          ? this.clickedHeureStart.getHours()
          : '0' + this.clickedHeureStart.getHours()) +
          ':' +
          (this.clickedHeureStart.getMinutes() == '0'
            ? '00'
            : this.clickedHeureStart.getMinutes()),
      )

    this.modalService.open(this.modalReservation, {
      ariaLabelledBy: 'modal-basic-title',
      size: 'xl',
    })
  }
  sendReservationActivite() {
    if (this.reservationActiviteForm.valid) {
      console.log('success')
    } else {
      this.reservationActiviteForm.markAllAsTouched()
    }
  }
  minimiumActivite: any = 60
  heureFinWork: any = '18:00'
  public min = '09:00'
  checkValidity(datePicker: any) {
    //   console.log(this.clickedHeureStart)

    //  console.log(this.reservationActiviteForm.value.heureStart)
    console.log('datePicker', datePicker)

    let heureDebutActivite =
      +this.reservationActiviteForm.value.heureStart.split(':')[0] *
        60 *
        60 *
        1000 +
      +this.reservationActiviteForm.value.heureStart.split(':')[1] * 60 * 1000

    let heureFinActivite =
      datePicker.getHours() * 60 * 60 * 1000 +
      datePicker.getMinutes() * 60 * 1000
    let heureFinWorkParsed =
      this.heureFinWork.split(':')[0] * 60 * 60 * 1000 +
      this.heureFinWork.split(':')[1] * 60 * 1000

    if (
      heureFinWorkParsed <
      heureDebutActivite + this.minimiumActivite * 60 * 1000
    ) {
      this.reservationActiviteForm.value.heureStart
      console.log('date Fin plus grande que date fin activite')
      return false
    } else if (heureDebutActivite > heureFinActivite) {
      this.toastr.error(
        '',
        "Date duree doit estre plus grande que la date fe sin d'activité :" +
          this.minimiumActivite,
        {
          timeOut: 2000,
          progressBar: true,
          progressAnimation: 'increasing',
          positionClass: 'toast-top-right',
        },
      )
      return false
    } else if (
      this.minimiumActivite * 60 * 1000 >
      heureFinActivite - heureDebutActivite
    ) {
      this.toastr.error(
        '',
        "Minimium Duree d'activité est :" + this.minimiumActivite,
        {
          timeOut: 2000,
          progressBar: true,
          progressAnimation: 'increasing',
          positionClass: 'toast-top-right',
        },
      )
      return false
    } else if (heureFinWorkParsed < heureFinActivite) {
      this.toastr.error('', 'heureFinWorkParsed < heureFinActivite', {
        timeOut: 2000,
        progressBar: true,
        progressAnimation: 'increasing',
        positionClass: 'toast-top-right',
      })
      return false
    } else {
      return true
    }
  }
  changeHeure(datePicker: any) {
    if (datePicker.value != '')
      if (!this.checkValidity(datePicker.value)) {
        this.reservationActiviteForm.get('heureEnd').setValue(' ')
        datePicker.value = ''
      }
  }
  convertMinuteToHours(item: any) {
    if (item > 60) {
      let hours = item / 60
      let minutes = item - Math.floor(hours) * 60

      if (minutes != undefined)
        return (
          Math.floor(hours) + ' H : ' + (minutes == 0 ? '00' : minutes) + ' Mn'
        )
      else return Math.floor(hours) + ' H'
    }
    return item + ' Mn'
  }
}
