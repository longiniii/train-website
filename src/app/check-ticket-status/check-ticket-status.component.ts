import { Component } from '@angular/core';
import { TrainServiceService } from '../services/railwayApi.service';

@Component({
  selector: 'app-check-ticket-status',
  templateUrl: './check-ticket-status.component.html',
  styleUrl: './check-ticket-status.component.scss'
})
export class CheckTicketStatusComponent {
  constructor  (private railwayApi: TrainServiceService) { }
  public ticketNotFound!:boolean;
  ticketData:any;

    // check status
  checkTicketStatus = (ticketID:any) => {
    this.railwayApi.getTicketStatus(ticketID.value).subscribe({
      next: (data) => {
        this.ticketData = data
        this.ticketNotFound = false
        // check if the ticket is paid for
        this.checkIfTicketIsPaidFor(this.ticketData.persons)
      },
      error: (error) => {
        this.ticketNotFound = true
      }
    })
  }

  ticketIsPaidFor:any;

  checkIfTicketIsPaidFor = (persons:any) => {
    for (let i = 0; i < persons.length; i++) {
      if (!(persons[i].payoutCompleted)) {
        this.ticketIsPaidFor = false
        break
      } else{
        this.ticketIsPaidFor = true
      }      
    }
  }

}
