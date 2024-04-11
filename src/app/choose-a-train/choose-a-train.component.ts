import { Component, OnInit } from '@angular/core';
import { TrainServiceService } from '../services/railwayApi.service';
import { ActivatedRoute, Router } from '@angular/router';

@Component({
  selector: 'app-choose-a-train',
  templateUrl: './choose-a-train.component.html',
  styleUrl: './choose-a-train.component.scss'
})
export class ChooseATrainComponent implements OnInit {
  constructor (
    private railwayApi: TrainServiceService,
    public activatedRoute: ActivatedRoute,
    public router: Router
    ) { }
    
    from:any;
    to:any;
    date:any;
    numberOfPassengers:any;
  ngOnInit(): void {
    // assign activatedRoute values to variables
    this.assignActivatedRouteValues()
    //  get trains from the api
    this.getDeparture()
  }

  assignActivatedRouteValues = () => {
    this.activatedRoute.paramMap.subscribe(data => {
      this.from = data.get('from')
      this.to = data.get('to')
      this.date = data.get('date')
      this.numberOfPassengers = data.get('numberOfPassengers')
    })
  }

  departureData:any;


  getDeparture = () => {
    this.railwayApi.getDeparture(this.from, this.to, this.date)
    .subscribe({
      next: (data:any) => {
        console.log(data)
        this.departureData = data[0]
      },
      error: (error) => {
        console.log(error)
        alert(`an error (${error.status}) has occured, try again later`)
      }
  })
  }


  // change route
}
