import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { TrainServiceService } from '../services/railwayApi.service';
import { FormControl, FormGroup, Validators } from '@angular/forms';

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
    this.railwayApi.postTicketRegister({
      'trainId': this.bookingData.trainId,
      'date': this.bookingData.date,
      'email': this.bookingData.email,
      'phoneNumber': this.bookingData.phone,
      'people': this.passengers
    }).subscribe({
      next: (data) => {
        this.checkTicketStatus(data.slice(45))
      },
      error: (error) => {
        alert(error.error)
      }
    })
  }


  convertPassengersArray = () => {
    this.bookingData.passengers.forEach((item:any) => {
      this.passengers.push({
        'seatId': item.seatId,
        'name': item.firstName,
        'surname': item.lastName,
        'idNumber': item.SSN,
        'payoutCompleted': true
      })
    });
  }

  checkTicketStatus = (ticketID:any) => {
    this.railwayApi.getTicketStatus(ticketID).subscribe(data => {
      this.ticketData = data
      this.submited = true
    })
  }
  
  paymentForm = new FormGroup({
    cardNumber: new FormControl('', Validators.required),
    expiring: new FormControl('', Validators.required),
    CVV: new FormControl('', Validators.required),
    streetAdrress: new FormControl('', Validators.required),
    country: new FormControl('GE', Validators.required)
  })
}
