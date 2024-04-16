import { Component } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';

@Component({
  selector: 'app-payment',
  templateUrl: './payment.component.html',
  styleUrl: './payment.component.scss'
})
export class PaymentComponent {
  constructor 
  (
    public router: Router,
    public activeRoute: ActivatedRoute
  ) {
    activeRoute.data.subscribe(data => {
      console.log(data)
    })
  }
}
