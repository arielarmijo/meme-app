import { Component } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { passwordsDontMatchValidator } from 'src/app/shared/directives/passwords-dont-match.directive';

@Component({
  selector: 'app-register',
  templateUrl: './register.component.html',
  styleUrls: ['./register.component.css']
})
export class RegisterComponent {

  registerForm: FormGroup;

  constructor(private fb: FormBuilder) {
    this.registerForm = this.fb.group({
      email: ['email@com', [Validators.required, Validators.email]],
      password1: ['', [Validators.required]],
      password2: ['', [Validators.required]]
    }, { validators: passwordsDontMatchValidator });
  }

  doRegister() {
    const {email, password1: password} = this.registerForm.value;
    console.log({email, password});
  }

  get password1() {
    return this.registerForm.get('password1');
  }

  get password2() {
    return this.registerForm.get('password2');
  }

  get arePasswordsEquals() {
    return this.password1?.dirty && this.password2?.dirty && this.registerForm.errors?.['passwordsDontMatch'];
  }

}