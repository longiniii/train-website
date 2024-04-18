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
    noTrains:boolean = false
  ngOnInit(): void {
    // assign activatedRoute values to variables
    this.assignActivatedRouteValues()
  }

  assignActivatedRouteValues = () => {
    this.activatedRoute.paramMap.subscribe(data => {
      this.from = data.get('from')
      this.to = data.get('to')
      this.date = data.get('date')
      this.numberOfPassengers = data.get('numberOfPassengers')
      //  get trains from the api
      this.getDeparture()
    })
  }

  departureData:any;


  getDeparture = () => {
    this.railwayApi.getDeparture(this.from, this.to, this.date)
    .subscribe({
      next: (data:any) => {
        console.log(data)
        this.departureData = data[0]
        console.log(this.departureData, 'txebi')
        if (this.departureData == undefined) {
          this.noTrains = true
        }
      },
      error: (error) => {
        console.log(error)
        alert(`an error (${error.status}) has occured, try again later`)
      }
  })
  }


  // change route
}
