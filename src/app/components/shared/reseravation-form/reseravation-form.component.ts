import { Component, OnInit } from '@angular/core'
import { FormBuilder, FormControl, FormGroup, Validators } from '@angular/forms'

@Component({
  selector: 'app-reseravation-form',
  templateUrl: './reseravation-form.component.html',
  styleUrls: ['./reseravation-form.component.scss'],
})
export class ReseravationFormComponent implements OnInit {
  public reservatoinForm: FormGroup

  constructor(private fb: FormBuilder) {
    this.reservatoinForm = this.fb.group({
      name: new FormControl('', [
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
      reference: new FormControl('', [
        Validators.required,
        Validators.minLength(3),
        Validators.maxLength(30),
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
  }
  ngOnInit(): void {}
  public sendReservation() {
    if (this.reservatoinForm.valid) {
      this.reservatoinForm.reset()
    } else {
      this.reservatoinForm.markAllAsTouched()
    }
  }
}
