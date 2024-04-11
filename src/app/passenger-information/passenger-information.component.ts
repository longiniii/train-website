import { AfterViewInit, Component, ElementRef, OnInit, QueryList, ViewChildren } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { TrainServiceService } from '../services/railwayApi.service';
import { first, toArray } from 'rxjs';

@Component({
  selector: 'app-passenger-information',
  templateUrl: './passenger-information.component.html',
  styleUrl: './passenger-information.component.scss'
})
export class PassengerInformationComponent implements OnInit, AfterViewInit {
  @ViewChildren('chooseASeat', {}) chooseASeatButtons!:QueryList<ElementRef>
  constructor (
    private activatedRoute: ActivatedRoute,
    private railwayApi: TrainServiceService,
  ) { }

  arrayOfPassengers:Array<any> = []
  trainId:any;
  numberOfPassengers:any;
  trainData:any;
  trainVagonIds:Array<any> = []
  vagonsData:Array<any> = []

  ngOnInit(): void {
    // assign route params to variables
    this.activatedRoute.paramMap.subscribe(data => {
      this.trainId = data.get('trainId')
      this.numberOfPassengers = data.get('numberOfPassengers')
    })
    // create an array for ngFor
    this.createAnArrayOfPassengers()
    // get train with it's id
    this.getTrain()
    // get vagon ids from the train
    this.getVagons()
    // after getting the vagon ids get each vagon's data
    this.trainVagonIds.forEach(item => {
      this.railwayApi.getVagon(item).subscribe(data => {
        this.vagonsData.push(data)
      })
    });
    console.log(this.vagonsData)
  }

  ngAfterViewInit(): void {
    console.log('txa')
    this.chooseASeatButtons.changes.subscribe(data => {
      data.first.nativeElement.style.borderBottomLeftRadius = '38%'
      data.first.nativeElement.style.borderTopLeftRadius = '38%'
      data.last.nativeElement.style.borderBottomRightRadius = '38%'
      data.last.nativeElement.style.borderTopRightRadius = '38%'
    })
  }


  getTrain = () => {
    this.railwayApi.getTrain(this.trainId).subscribe(data  => {
      this.trainData = data
      console.log(this.trainData)
    })
  }

  getVagons = () => {
    this.trainData.vagons.forEach((item:any) => {
      this.trainVagonIds.push(item.id)
    });
    console.log(this.trainVagonIds)
  }

  createAnArrayOfPassengers = () => {
    for (let i = 0; i < this.numberOfPassengers; i++) {
      this.arrayOfPassengers.push(i)
    }
  }

  choosingSeats:boolean = false
  // choosing seats
  onChoosingSeats = () => {
    console.log(this.trainData)
    this.choosingSeats = true
  }

  // close the choosing seats
  closeTheChoosingSeats = () => {
    this.choosingSeats = false
  }



  // information about train
  trainInfoArrayOfObjects = [
    {
      name: 'Personal Item',
      description: 'Purse, small backpack, briefcase',
      image: 'https://railway.stepprojects.ge/assets/img/svg/pbag1.svg',
      included: true
    },
    {
      name: 'Carry-on bag',
      description: 'Fits in overhead bin or under the seat',
      image: 'https://railway.stepprojects.ge/assets/img/svg/pbag2.svg',
      included: true
    },
    {
      name: 'Checked Bags',
      description: 'Larges Bag Purse, small backpack',
      image: 'https://railway.stepprojects.ge/assets/img/svg/pbag3.svg',
      included: false
    }
  ]
}
