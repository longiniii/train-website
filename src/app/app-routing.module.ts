import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { HomeComponent } from './home/home.component';
import { ChooseATrainComponent } from './choose-a-train/choose-a-train.component';
import { CheckTicketStatusComponent } from './check-ticket-status/check-ticket-status.component';
import { PassengerInformationComponent } from './passenger-information/passenger-information.component';
import { PageNotFoundComponent } from './page-not-found/page-not-found.component';
import { PaymentComponent } from './payment/payment.component';

const routes: Routes = [
  {path: '', component:HomeComponent},
  {path: 'home', redirectTo: ''},
  {path: 'reservation/choose-a-train/:from/:to/:date/:numberOfPassengers', component:ChooseATrainComponent},
  {path: 'passenger-information/:numberOfPassengers/:trainId/:date', component:PassengerInformationComponent},
  {path: 'check-ticket-status', component:CheckTicketStatusComponent},
  {path: 'payment', component:PaymentComponent, data:{key:'value'}},
  {path: '**', component:PageNotFoundComponent}

];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
