import { NgModule } from '@angular/core';
import { BrowserModule, provideClientHydration } from '@angular/platform-browser';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { HttpClientModule } from '@angular/common/http';
import { NavbarComponent } from './header/navbar.component';
import { HomeComponent } from './home/home.component';
import { FooterComponent } from './footer/footer.component';
import { HomeHeadingComponent } from './home/home-heading/home-heading.component';
import { TrainReservationFormComponent } from './home/home-heading/train-reservation-form/train-reservation-form.component';
import { AboutTrainComponent } from './home/about-train/about-train.component';
import { ReactiveFormsModule } from '@angular/forms';
import { ChooseATrainComponent } from './choose-a-train/choose-a-train.component';
import { PassengerInformationComponent } from './passenger-information/passenger-information.component';
import { CheckTicketStatusComponent } from './check-ticket-status/check-ticket-status.component';
import { TicketDocumentComponent } from './ticket-document/ticket-document.component';

@NgModule({
  declarations: [
    AppComponent,
    NavbarComponent,
    HomeComponent,
    FooterComponent,
    HomeHeadingComponent,
    TrainReservationFormComponent,
    AboutTrainComponent,
    ChooseATrainComponent,
    PassengerInformationComponent,
    CheckTicketStatusComponent,
    TicketDocumentComponent
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    HttpClientModule,
    ReactiveFormsModule
  ],
  providers: [
    provideClientHydration()
  ],
  bootstrap: [AppComponent]
})
export class AppModule { }
