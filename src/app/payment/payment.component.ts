import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { TrainServiceService } from '../services/railwayApi.service';

@Component({
  selector: 'app-payment',
  templateUrl: './payment.component.html',
  styleUrl: './payment.component.scss'
})
export class PaymentComponent implements OnInit {
  constructor 
  (
    public router: Router,
    public activeRoute: ActivatedRoute,
    private railwayApi: TrainServiceService
  ) {
    this.bookingData = this.router.getCurrentNavigation()?.extras.state
  }

  ngOnInit(): void {
    // convert passengers array into another array for the backend
    this.convertPassengersArray()
  }


  bookingData:any
  passengers:Array<any> = []
  submited:boolean = false
  ticketData:any;

  // post a ticket
  onSubmit = () => {
    console.log(this.bookingData)
    console.log(this.passengers)
    this.railwayApi.postTicketRegister({
      'trainId': this.bookingData.trainId,
      'date': this.bookingData.date,
      'people': this.passengers
    }).subscribe({
      next: (data) => {
        this.checkTicketStatus(data.slice(45))
      },
      error: (error) => {
        console.log(error.error)
      }
    })
  }


  convertPassengersArray = () => {
    this.bookingData.passengers.forEach((item:any) => {
      console.log(item)
      this.passengers.push({
        'seatId': item.seatId,
        // 'name': item.firstName,
        // 'surname': item.lastName,
        // 'idNumber': item.SSN,
        // 'status': true,
        'payoutCompleted': true
      })
    });
  }

  checkTicketStatus = (ticketID:any) => {
    this.railwayApi.getTicketStatus(ticketID).subscribe(data => {
      console.log(data)
      this.ticketData = data
      this.submited = true
    })
  }
}
