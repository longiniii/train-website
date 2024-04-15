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
  chooseAWagonData:any;
  currentlyChosenWagon:any;

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
    // get trains needs be finished 
    // after getting the vagon ids get each vagon's data
    this.trainVagonIds.forEach(item => {
      this.railwayApi.getVagon(item).subscribe((data:any) => {
        let seatIds: Array<any> = []
        data[0].seats.forEach((item:any,i:any) => {
          seatIds.push([item.number,i])
        });

        this.vagonsData.push(data)
        
        // got this function from chatgpt, it will sort the seat numbers
        seatIds.sort((a, b) => {
          const numA = parseInt(a[0]); // Extract the seat number part and parse it as integer
          const numB = parseInt(b[0]); // Extract the seat number part and parse it as integer
          if (numA === numB) {
            // If seat numbers are equal, compare letters
            const letterA = a[0].slice(-1);
            const letterB = b[0].slice(-1);
            return letterA.localeCompare(letterB); // Compare letters alphabetically
          } else {
            return numA - numB; // Compare seat numbers
          }
        });

        seatIds.forEach(item => {
          this.vagonsData[this.vagonsData.length - 1][0].seats.push(data[0].seats[item[1]])
        });
        this.vagonsData[this.vagonsData.length - 1][0].seats.splice(0,data[0].seats.length / 2)

        console.log(data[0].seats)


        console.log('taxuna')
        // seatIds.forEach(item => {
        //   copyOfTheSeats.forEach((item:any) => {
            
        //   });
        // });
        this.currentlyChosenWagon = this.vagonsData[0][0]
      })
    });
    console.log(this.vagonsData)
  }

  ngAfterViewInit(): void {
    console.log('txa')
    this.chooseASeatButtons.changes.subscribe(data => {
      this.chooseAWagonData = data
      this.chooseAWagonData.first.nativeElement.style.borderBottomLeftRadius = '38%'
      this.chooseAWagonData.first.nativeElement.style.borderTopLeftRadius = '38%'
      this.chooseAWagonData.last.nativeElement.style.borderBottomRightRadius = '38%'
      this.chooseAWagonData.last.nativeElement.style.borderTopRightRadius = '38%'
      this.currentlyChosenWagon = this.chooseAWagonData.first;
      this.currentlyChosenWagon.nativeElement.style.backgroundColor = 'rgb(65, 95, 226)'
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
      this.arrayOfPassengers.push({
        seats: []
      })
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

  // choosing wagons
  onChoosingWagons = (e:any) => {
    this.chooseAWagonData.forEach((item:any) => {
      item.nativeElement.style.backgroundColor = 'rgb(111, 157, 255)'
    });
    e.target.style.backgroundColor = 'rgb(65, 95, 226)';

    console.log(this.vagonsData)
    this.vagonsData.forEach(item => {
      if (item[0].name == e.target.innerText) {
        this.currentlyChosenWagon = item[0]
        console.log(this.currentlyChosenWagon)
      }
    });
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
