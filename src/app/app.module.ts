import { HttpClientModule } from '@angular/common/http';
import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { HomeModule } from './home/home.module';
import { FooterModule } from './shared/modules/footer/footer.module';
import { NavbarModule } from './shared/modules/navbar/navbar.module';
import { MemeService } from './meme/services/meme.service';
import { AuthModule } from '@auth0/auth0-angular';
import { environment } from 'src/environments/environment';
import { CoreModule } from './shared/modules/core/core.module';

@NgModule({
  declarations: [
    AppComponent
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    HttpClientModule,
    AuthModule.forRoot({...environment.auth}),
    NavbarModule,
    FooterModule,
    HomeModule,
    CoreModule
  ],
  providers: [ MemeService ],
  bootstrap: [AppComponent]
})
export class AppModule { }
