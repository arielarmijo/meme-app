import { Component, OnInit } from '@angular/core';
import { AuthService } from '@auth0/auth0-angular';

// https://auth0.com/blog/complete-guide-to-angular-user-authentication/
@Component({
  selector: 'app-signup-button',
  templateUrl: './signup-button.component.html',
  styleUrls: ['./signup-button.component.css']
})
export class SignupButtonComponent implements OnInit {

  constructor(public auth: AuthService) { }

  ngOnInit(): void { }

  signup(): void {
    this.auth.loginWithRedirect({ screen_hint: 'signup' });
  }
}
