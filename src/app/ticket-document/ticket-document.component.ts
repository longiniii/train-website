import { Component, ElementRef, Input, ViewChild } from '@angular/core';
import { TrainServiceService } from '../services/railwayApi.service';

@Component({
  selector: 'app-ticket-document',
  templateUrl: './ticket-document.component.html',
  styleUrl: './ticket-document.component.scss'
})
export class TicketDocumentComponent {
  constructor (private railwayApi: TrainServiceService) { }

  @ViewChild('ticketHtml') ticketHtml!:ElementRef

  // receive ticket status from the parent
  @Input()
  ticketData:any;
  @Input()
  ticketIsPaidFor:any;

  // create an emittable


  // delete the ticket on click 
  deleteTicket = () => {
    let wantsToDeleteTicket = confirm('are you  sure?')
    if (wantsToDeleteTicket) {
      this.railwayApi.deleteTicket(this.ticketData.id).subscribe({
        next: (data) => {
          this.ticketHtml.nativeElement.style.display = 'none'
          alert(data)
        },
        error: (error) => {
          alert(error.error.error.message)
        }
    })
    }
  }

  // print ticket status
  printTicketStatus = () => {
    window.print()
  }
}
