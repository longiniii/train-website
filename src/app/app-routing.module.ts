import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { HomeComponent } from './home/home.component';
import { ChooseATrainComponent } from './choose-a-train/choose-a-train.component';
import { CheckTicketStatusComponent } from './check-ticket-status/check-ticket-status.component';

const routes: Routes = [
  {path: '', component:HomeComponent},
  {path: 'home', redirectTo: ''},
  {path: 'reservation/choose-a-train/:from/:to/:date/:numberOfPassengers', component:ChooseATrainComponent},
  {path: 'check-ticket-status', component:CheckTicketStatusComponent}

];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
