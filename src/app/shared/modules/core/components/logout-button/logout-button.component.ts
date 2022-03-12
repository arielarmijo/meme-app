import { Component, Inject, OnInit } from '@angular/core';
import { AuthService } from '@auth0/auth0-angular';
import { DOCUMENT } from '@angular/common';

// https://auth0.com/blog/complete-guide-to-angular-user-authentication/
@Component({
  selector: 'app-logout-button',
  templateUrl: './logout-button.component.html',
  styleUrls: ['./logout-button.component.css']
})
export class LogoutButtonComponent {

  constructor(public auth: AuthService, @Inject(DOCUMENT) private doc: Document) { }

  logout(): void {
    this.auth.logout({ returnTo: this.doc.location.origin });
  }
}
