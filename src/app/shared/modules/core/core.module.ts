import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { SpinnerComponent } from './components/spinner/spinner.component';
import { PaginationComponent } from './components/pagination/pagination.component';
import { PaginatedListComponent } from './components/paginated-list/paginated-list.component';
import { LoginButtonComponent } from './components/login-button/login-button.component';
import { SignupButtonComponent } from './components/signup-button/signup-button.component';
import { LogoutButtonComponent } from './components/logout-button/logout-button.component';

const components = [ 
  SpinnerComponent,
  PaginatedListComponent,
  PaginationComponent,
  LoginButtonComponent,
  SignupButtonComponent,
  LogoutButtonComponent
];

@NgModule({
  declarations: [ components ],
  imports: [ CommonModule ],
  exports: [ components ],
  providers: [],
})
export class CoreModule {}