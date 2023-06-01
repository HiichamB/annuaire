import { Component, OnInit } from '@angular/core'
import { FormBuilder, FormControl, Validators } from '@angular/forms'

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.scss'],
})
export class LoginComponent implements OnInit {
  loginForm: any = ''
  constructor(private fb: FormBuilder) {
    this.loginForm = this.fb.group({
      userEmail: new FormControl('', [Validators.required]),
      password: new FormControl('', [Validators.required]),
    })
  }
  sendLogin() {
    if (this.loginForm.valid) {
      console.log('Success!', this.loginForm.value)
      this.loginForm.reset()
    } else {
      this.loginForm.markAllAsTouched()
    }
  }

  ngOnInit(): void {}
}
