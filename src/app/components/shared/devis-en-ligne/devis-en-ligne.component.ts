import { Component, OnInit } from '@angular/core'
import { FormArray, FormBuilder, FormControl, Validators } from '@angular/forms'

@Component({
  selector: 'app-devis-en-ligne',
  templateUrl: './devis-en-ligne.component.html',
  styleUrls: ['./devis-en-ligne.component.scss'],
})
export class DevisEnLigneComponent implements OnInit {
  constructor(private fb: FormBuilder) {
    this.generateForm()
  }
  devisForm: any
  devisEnLigne: any = {
    questions: [
      {
        type: 'simple',
        titre: 'Que voulez-vous isoler ?',
        reponse: [
          'Reponse num 1',
          'Reponse num 2',
          'Reponse num 3',
          'Reponse num 4',
          'Reponse num 5',
        ],
        validators: {
          required: true,
        },
      },
      {
        type: 'select',
        titre:
          'Quel niveau de précision attendez-vous de la traduction automatique ?',
        reponse: [
          'Select Choix  1',
          'Select Choix  2',
          'Select Choix  3',
          'Select Choix  4',
          'Select Choix  5',
        ],
        validators: {
          required: true,
        },
      },
      {
        type: 'multiple',
        titre: 'Question 2 Multiple ?',
        reponse: [
          'Choix Multiple  num 1',
          'Choix Multiple  num 2',
          'Choix Multiple  num 3',
          'Choix Multiple  num 4',
          'Choix Multiple  num 5',
        ],
        validators: {
          required: true,
        },
      },
      {
        type: 'simple',
        titre: 'Question 3 Type Simple ?',
        reponse: [
          'Choix Simple question 3  num 1',
          'Choix Simple question 3  num 2',
          'Choix Simple question 3  num 3',
          'Choix Simple question 3  num 4',
          'Choix Simple question 3  num 5',
        ],
      },
      {
        type: 'number',
        titre: ' Quelle superficie devra être isolée (estimation)?',
        validators: {
          required: true,
        },
      },
      {
        type: 'text',
        titre: '  Description de votre projet',
        validators: {
          required: true,
          minLength: 5,
          maxLength: 15,
        },
      },
    ],
    questionLibre: 2,
  }
  ngOnInit(): void {}

  generateForm() {
    this.devisForm = this.fb.group({})
    this.devisEnLigne.questions.map((question: any) => {
      if (['simple', 'number', 'text', 'select'].includes(question.type)) {
        this.devisForm.addControl(
          question.titre,
          new FormControl(
            '',
            Object.keys(question?.validators || {}).map((value: any) => {
              return value.includes('min') || value.includes('max')
                ? (<any>Validators)[value]?.(question.validators[value])
                : (<any>Validators)[value]
            }),
          ),
        )
      } else if (question.type == 'multiple') {
        this.devisForm.addControl(
          question.titre,
          new FormArray([], [Validators.required]),
        )
      }
    })
    if (this.devisEnLigne?.questionLibre) {
      this.devisForm.addControl('questions', new FormArray([]))
      this.newQuestion()
    }
  }
  onCheckboxChange(event: any, question: any) {
    console.log(event.target.value)

    const selectedCheckBox = this.devisForm.controls[question] as FormArray
    if (event.target.checked) {
      selectedCheckBox.push(new FormControl(event.target.value))
    } else {
      const index = selectedCheckBox.controls.findIndex(
        (x: any) => x.value === event.target.value,
      )
      selectedCheckBox.removeAt(index)
    }
  }
  sendDevis() {
    console.log('Sending devis-en-lignes ', this.devisForm)
    if (this.devisForm.valid) {
      console.log('valid')

      this.devisForm.reset()
    } else {
      console.log('Invalid')

      this.devisForm.markAllAsTouched()
    }
  }
  get questions(): FormArray {
    return this.devisForm.get('questions') as FormArray
  }
  deleteQuestion(i: any) {
    this.questions.removeAt(i)
  }
  newQuestion() {
    if (
      this.questions.valid &&
      this.devisEnLigne.questionLibre >= this.questions.length
    ) {
      this.questions.push(
        this.fb.group({
          questionValue: new FormControl('', [
            Validators.required,
            Validators.minLength(3),
            Validators.maxLength(30),
          ]),
        }),
      )
    } else {
      this.questions.markAllAsTouched()
    }
    //  console.log(this.questions)
  }
}
