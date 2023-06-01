import { DatePipe } from '@angular/common'
import { Component, OnInit } from '@angular/core'
import { FormBuilder, FormControl, FormGroup, Validators } from '@angular/forms'
import { NgbModal } from '@ng-bootstrap/ng-bootstrap'
import { CalendarEvent } from 'angular-calendar'
import { isSameMonth, isSameDay, addDays, startOfDay, subDays } from 'date-fns'

@Component({
  selector: 'app-rdv',
  templateUrl: './rdv.component.html',
  styleUrls: ['./rdv.component.scss'],
})
export class RdvComponent implements OnInit {
  public RDVForm: FormGroup
  datePipe: DatePipe = new DatePipe('en-US')
  nowDate: any = new Date()

  constructor(private fb: FormBuilder, public modalService: NgbModal) {
    this.selectedDate = this.datePipe.transform(this.nowDate, 'yyyy-MM-dd')

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
      object: new FormControl('', [
        Validators.required,
        Validators.minLength(3),
        Validators.maxLength(30),
        Validators.pattern('^[a-zA-Z \u0600-\u06FF]+$'),
      ]),
      date: new FormControl('', [Validators.required]),
      time: new FormControl('', [Validators.required]),

      telephone: new FormControl('', [
        Validators.required,
        Validators.pattern('^((\\+212-?)|0)?[0-9]{10}$'),
        Validators.minLength(10),
      ]),
      email: new FormControl('', [Validators.required, Validators.email]),
      message: new FormControl('', [
        Validators.required,
        Validators.minLength(10),
      ]),
    })
  }
  dates: Date[] = []

  rangeDates: Date[] = []

  minDate: any = new Date()

  maxDate: any = new Date()
  invalidDates: Array<Date> = []
  selectedDate: any = new Date()
  es: any
  ngOnInit(): void {
    this.invalidDates = [
      new Date('06/10/22'),
      new Date('06/22/22'),
      new Date('06/21/22'),
      new Date('06/20/22'),
      new Date('12/4/22'),
      new Date('12/7/22'),
    ]
  }
  activeDayIsOpen: boolean = true
  viewDate: Date = new Date()

  public sendRDV() {
    if (this.RDVForm.valid) {
      this.RDVForm.reset()
    } else {
      this.RDVForm.markAllAsTouched()
    }
  }

  dayClicked({ date, events }: { date: Date; events: CalendarEvent[] }) {
    if (isSameMonth(date, this.viewDate)) {
      if (
        (isSameDay(this.viewDate, date) && this.activeDayIsOpen === true) ||
        events.length === 0
      ) {
        this.activeDayIsOpen = false
      } else {
        this.activeDayIsOpen = true
      }
      this.viewDate = date
    }
  }
  calendarData = [
    {
      info: {
        id: 1,
        name: 'Acteur 1',
      },
      data: [
        {
          day: '2022-06-06',
          heure: [
            {
              heureDebut: '09:27:08.022+00:00',
              heureFin: '11:27:08.022+00:00',
            },
            {
              heureDebut: '15:00:00.022+00:00',
              heureFin: '16:00:00.022+00:00',
            },
          ],
        },

        {
          day: '2022-06-07',
          heure: [
            {
              heureDebut: '16:00:00.022+00:00',
              heureFin: '17:00:00.022+00:00',
            },
          ],
        },

        {
          day: '2022-06-08',
          heure: [
            {
              heureDebut: '11:27:08.022+00:00',
              heureFin: '12:27:08.022+00:00',
            },
            {
              heureDebut: '17:00:00.022+00:00',
              heureFin: '18:00:00.022+00:00',
            },
          ],
        },
      ],
    },
    {
      info: {
        id: 2,
        name: 'Acteur 2',
      },
      data: [
        {
          day: '2022-06-06',
          heure: [
            {
              heureDebut: '08:00:08.022+00:00',
              heureFin: '10:00:08.022+00:00',
            },
            {
              heureDebut: '10:00:00.022+00:00',
              heureFin: '11:00:00.022+00:00',
            },
          ],
        },
      ],
    },
    {
      info: {
        id: 3,
        name: 'Acteur 3',
      },
      data: [
        {
          day: '2022-06-07',
          heure: [
            {
              heureDebut: '09:27:08.022+00:00',
              heureFin: '11:27:08.022+00:00',
            },
            {
              heureDebut: '15:00:00.022+00:00',
              heureFin: '16:00:00.022+00:00',
            },
          ],
        },

        {
          day: '2022-06-09',
          heure: [
            {
              heureDebut: '16:00:00.022+00:00',
              heureFin: '17:00:00.022+00:00',
            },
          ],
        },

        {
          day: '2022-06-08',
          heure: [
            {
              heureDebut: '11:27:08.022+00:00',
              heureFin: '12:27:08.022+00:00',
            },
            {
              heureDebut: '17:00:00.022+00:00',
              heureFin: '18:00:00.022+00:00',
            },
          ],
        },
      ],
    },
  ]

  timeList = [
    '08:00 - 09:00',
    '09:00 - 10:00',
    '10:00 - 11:00',
    '11:00 - 12:00',
    '12:00 - 13:00',
    '15:00 - 16:00',
    '16:00 - 17:00',
    '17:00 - 18:00',
  ]
  onDateSelect(dateClicked: any) {
    dateClicked = this.datePipe.transform(dateClicked, 'yyyy-MM-dd')
    // console.log('on Select', dateClicked)
    // console.log('DateNow', this.nowDate)
    console.log(dateClicked >= this.nowDate)
    this.selectedDate = dateClicked
  }
  checkDiponibility(i: any, j: any) {
    let valueOfReturn = 'false'

    let readerCalendaritem: any
    this.calendarData[i]?.data?.map((item: any) => {
      // console.log('item.date', item.day)
      // console.log('this.selectedDate', this.selectedDate)

      if (item.day == this.selectedDate) {
        readerCalendaritem = item.heure
      }
    })

    //console.log('readerCalendaritem', readerCalendaritem)

    readerCalendaritem?.map((item: any) => {
      let [timeStart, timeEnd]: any = this.timeList[j].split('-')
      timeStart = timeStart.split(':')[0].trim()
      timeEnd = timeEnd.split(':')[0].trim()

      let heureStartPersonne = item.heureDebut.split(':')[0].trim()
      let heureFinPersonne = item.heureFin.split(':')[0].trim()
      // console.log('🚀 ~')

      // console.log('heureStartPersonne', heureStartPersonne)
      // console.log('timeStart', timeStart)
      // console.log('timeEnd', timeEnd)
      // console.log('🚀 ~')
      //if (timeStart <= heureStartPersonne && timeEnd > heureStartPersonne) {
      if (
        (timeStart <= heureStartPersonne && timeEnd > heureStartPersonne) ||
        (heureFinPersonne > timeStart && timeEnd >= heureFinPersonne)
      ) {
        // console.log('🚀 ~🚀 ~🚀 ~🚀 ~')
        // console.log('heureStartPersonne' + i, heureStartPersonne)
        // console.log('heureFinPersonne' + i, heureFinPersonne)

        // console.log('timeStart', timeStart)
        // console.log('timeEnd', timeEnd)
        // console.log('🚀 ~🚀 ~🚀 ~🚀 ~')

        // console.log('🚀 ~', timeStart <= heureStartPersonne)
        // console.log('🚀 ~', timeEnd > heureStartPersonne)
        //  valueOfReturn = 'true ' + heureStartPersonne
        valueOfReturn = 'true'
      }
    })
    // console.log('🚀 ~🚀 valueOfReturn~🚀 ~🚀 ~', valueOfReturn)

    return valueOfReturn
  }
  checkEditMode(i: any, j: any) {
    let editMode = 'false'

    let readerCalendaritem: any
    this.calendarData[i]?.data?.map((item: any) => {
      // console.log('item.date', item.day)
      // console.log('this.selectedDate', this.selectedDate)

      if (item.day == this.selectedDate && item.editMode == "'true'") {
        editMode = 'true'
      }
    })

    return editMode
  }
  indexTable: any
  indextime: any
  personneSelected: any
  onTimeSelect(i: any, j: any, personneSelected: any, template: any) {
    console.log('onTimeSelect', i, j, personneSelected)
    this.indexTable = i
    this.indextime = j
    this.personneSelected = personneSelected

    this.modalService.open(template, {
      ariaLabelledBy: 'modal-basic-title',
      size: 'md',
      centered: true,
    })
  }
  confirmerRDV() {
    console.log('Confirmed')

    let [timeStart, timeEnd]: any = this.timeList[this.indextime].split('-')

    this.calendarData[this.indexTable]?.data?.map((item: any) => {
      // console.log('item.date', item.day)
      // console.log('th  is.selectedDate', this.selectedDate)

      if (item.day == this.selectedDate) {
        item.editMode = 'true'
        item.heure.push({
          heureDebut: timeStart,
          heureFin: timeEnd,
        })
      }
    })
    this.modalService.dismissAll()
  }
}
