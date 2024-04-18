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
    public activeRoute: ActivatedRoute,
  ) {
    console.log(this.router.getCurrentNavigation()?.extras.state)
  }
}
