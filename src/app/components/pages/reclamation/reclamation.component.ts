import { Component, OnInit } from '@angular/core'
import {
  FormArray,
  FormBuilder,
  FormControl,
  FormGroup,
  Validators,
} from '@angular/forms'

@Component({
  selector: 'app-reclamation',
  templateUrl: './reclamation.component.html',
  styleUrls: ['./reclamation.component.scss'],
})
export class ReclamationComponent implements OnInit {
  constructor(private fb: FormBuilder) {
    this.ReclamationForm = this.fb.group({
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

      numClient: new FormControl('', [
        Validators.required,
        Validators.minLength(3),
        Validators.maxLength(30),
        Validators.pattern('^[a-zA-Z \u0600-\u06FF]+$'),
      ]),
      numFacture: new FormControl('', [
        Validators.required,
        Validators.minLength(3),
        Validators.maxLength(30),
        Validators.pattern('^[a-zA-Z \u0600-\u06FF]+$'),
      ]),
      preuves: this.fb.array([
        this.fb.group({
          valeurPreuve: ['', [Validators.required]],
          titrePreuve: [
            '',
            [
              Validators.required,
              Validators.minLength(3),
              Validators.maxLength(30),
            ],
          ],
        }),
      ]),

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
    // console.log(this.preuves)
  }
  ReclamationForm: FormGroup
  date: any = ''

  ngOnInit(): void {
    this.date = new Date().toISOString().slice(0, 10)
    console.log(this.ReclamationForm)
  }
  public sendReclamation() {
    if (this.ReclamationForm.valid) {
      this.ReclamationForm.reset()
    } else {
      this.ReclamationForm.markAllAsTouched()
    }
  }
  get preuves(): FormArray {
    return this.ReclamationForm.get('preuves') as FormArray
  }
  newPreuve() {
    // console.log(this.preuves)
    if (this.preuves.valid) {
      this.preuves.push(
        this.fb.group({
          titrePreuve: [
            '',
            [
              Validators.required,
              Validators.minLength(3),
              Validators.maxLength(30),
            ],
          ],
          valeurPreuve: new FormControl('', [Validators.required]),
        }),
      )
    } else {
      this.preuves.markAllAsTouched()
    }
    // console.log(this.preuves)
  }
  deletePreuve(i: any) {
    this.preuves.removeAt(i)
    this.listInputs.splice(i, 1)

    console.log(this.listInputs)
  }
  currentInput: any = ''
  listInputs: any = []
  onFileSelected(event: any, i: any) {
    console.log(event.target.files)
    this.listInputs[i] = event.target.files[0].name
    //this.currentInput = event.target.files[i].name
    //console.log(this.currentInput)
  }
  getCurrentFileName(i: any) {
    return this.listInputs[i]
  }
}
