import { AfterViewInit, Component, ElementRef, OnInit, QueryList, ViewChild, ViewChildren } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { TrainServiceService } from '../services/railwayApi.service';

@Component({
  selector: 'app-passenger-information',
  templateUrl: './passenger-information.component.html',
  styleUrl: './passenger-information.component.scss'
})
export class PassengerInformationComponent implements OnInit, AfterViewInit {
  constructor (
    private activatedRoute: ActivatedRoute,
    private railwayApi: TrainServiceService,
    public router: Router
  ) { }
  @ViewChild('rails')rails!:ElementRef
  @ViewChildren('chooseASeat', {}) chooseASeatButtons!:QueryList<ElementRef>


  arrayOfPassengers:Array<any> = []
  trainId:any;
  date:any
  numberOfPassengers:any;
  trainData:any;
  trainVagonIds:Array<any> = []
  vagonsData:Array<any> = []
  chooseAWagonData:any;
  currentlyChosenWagon:any;
  theCurrentPassenger!:number
  sum!:number;
  email!:string
  phone!:any

  ngOnInit(): void {
    // assign route params to variables
    this.activatedRoute.paramMap.subscribe(data => {
      this.trainId = data.get('trainId')
      this.numberOfPassengers = data.get('numberOfPassengers')
      this.date = data.get('date')
    })
    // create an array for ngFor
    this.createAnArrayOfPassengers()
    // get train with it's id
    this.getTrain()
    // after getting the vagon ids get each vagon's data
  
  }

  ngAfterViewInit(): void {
    this.chooseASeatButtons.changes.subscribe(data => {
      // this if is needed because when the div is closed
      // the function gets called but there is no chooseAWagonData
      if (this.choosingSeats) {
        this.chooseAWagonData = data
        this.chooseAWagonData.first.nativeElement.style.borderBottomLeftRadius = '38%'
        this.chooseAWagonData.first.nativeElement.style.borderTopLeftRadius = '38%'
        this.chooseAWagonData.last.nativeElement.style.borderBottomRightRadius = '38%'
        this.chooseAWagonData.last.nativeElement.style.borderTopRightRadius = '38%'
        this.chooseAWagonData.first.nativeElement.style.backgroundColor = 'rgb(65, 95, 226)'
      }
    })
  }


  getTrain = () => {
    this.railwayApi.getTrain(this.trainId).subscribe(data  => {
      this.trainData = data
      // get vagon ids
      // getTrain needs to be finished to call this function
      this.getVagons()
    })
  }

  getVagons = () => {
    this.trainData.vagons.forEach((item:any) => {
      this.trainVagonIds.push(item.id)
    });
    this.trainVagonIds.forEach(item => {
      this.railwayApi.getVagon(item).subscribe((data:any) => {
        let seatIds: Array<any> = []
        data[0].seats.forEach((item:any,i:any) => {
          seatIds.push([item.number,i])
        });

        this.vagonsData.push(data)
        
        // got this function from chatgpt, it will sort the seat numbers
        seatIds.sort((a, b) => {
          const numA = parseInt(a[0]);
          const numB = parseInt(b[0]);
          if (numA === numB) {
            const letterA = a[0].slice(-1);
            const letterB = b[0].slice(-1);
            return letterA.localeCompare(letterB);
          } else {
            return numA - numB;
          }
        });
        this.currentlyChosenWagon = this.vagonsData[0][2];

        seatIds.forEach(item => {
          this.vagonsData[this.vagonsData.length - 1][0].seats.push(data[0].seats[item[1]])
        });
        this.vagonsData[this.vagonsData.length - 1][0].seats.splice(0,data[0].seats.length / 2)



      })
    });
  }

  createAnArrayOfPassengers = () => {
    for (let i = 0; i < this.numberOfPassengers; i++) {
      this.arrayOfPassengers.push(
        {
          wagon: '',
          seat: '',
          seatId: '',
          price: '',
          firstName: '',
          lastName: '',
          SSN: '',
        }
      )
    }
  }

  choosingSeats:boolean = false
  // choosing seats
  onChoosingSeats = (theCurrentPassengerNumber:number) => {
    this.choosingSeats = true
    this.currentlyChosenWagon = this.vagonsData[0][0];
    this.theCurrentPassenger = theCurrentPassengerNumber
  }

  // close the choosing seats
  closeTheChoosingSeats = () => {
    this.choosingSeats = false
    this.theCurrentPassenger = -1
  }

  // this function is called when an user clicks on a seat
  onChoosingASeat = (e:any) => {
    if (!(e.target.classList.value.includes('is-occupied'))) {
      if (this.arrayOfPassengers[this.theCurrentPassenger].seat == '' || (this.arrayOfPassengers[this.theCurrentPassenger].seat !== e.target.innerText || this.arrayOfPassengers[this.theCurrentPassenger].wagon != this.currentlyChosenWagon.name)) {
        this.arrayOfPassengers[this.theCurrentPassenger].wagon = this.currentlyChosenWagon.name
        this.arrayOfPassengers[this.theCurrentPassenger].seat = e.target.innerText
        
        this.arrayOfPassengers[this.theCurrentPassenger].price = this.currentlyChosenWagon.seats.find((item:any) => {
          return item.number == this.arrayOfPassengers[this.theCurrentPassenger].seat
        })
        this.arrayOfPassengers[this.theCurrentPassenger].price = this.arrayOfPassengers[this.theCurrentPassenger].price.price

        this.arrayOfPassengers[this.theCurrentPassenger].seatId = this.currentlyChosenWagon.seats.find((item:any) => {
          return item.number == this.arrayOfPassengers[this.theCurrentPassenger].seat
        })
        this.arrayOfPassengers[this.theCurrentPassenger].seatId = this.arrayOfPassengers[this.theCurrentPassenger].seatId.seatId
        
      } else {
        this.arrayOfPassengers[this.theCurrentPassenger].wagon = ''
        this.arrayOfPassengers[this.theCurrentPassenger].seat = ''
        this.arrayOfPassengers[this.theCurrentPassenger].price = ''
      }
      this.findTheSum()
    }
  }

  findTheSum = () => {
    this.sum = 0
    this.arrayOfPassengers.forEach(item => {
      this.sum += item.price
    });
  }

  // choosing wagons
  onChoosingWagons = (e:any) => {
    this.chooseAWagonData.forEach((item:any) => {
      item.nativeElement.style.backgroundColor = 'rgb(111, 157, 255)'
    });
    e.target.style.backgroundColor = 'rgb(65, 95, 226)';

    this.vagonsData.forEach(item => {
      if (item[0].name == e.target.innerText) {
        this.currentlyChosenWagon = item[0]
      }
    });
  }
  // navigate to payment
  navigateToPayment = () => {
    if (this.checkIfInputsAreValid()) {
      this.router.navigate(['/payment'], { state: { passengers: this.arrayOfPassengers, email: this.email, phone: this.phone, trainId: this.trainId, numberOfPassengers: this.numberOfPassengers, date: this.date} })
    } else {
      alert('The inputs are invalid!')
    }
  }

  checkIfInputsAreValid = () => {
    // this function checks if the inputs are valid, in this case it checks
    // if the inputs are not empty
    console.log(this.arrayOfPassengers)
    if (this.phone == '' || this.email == '') return false
    for (let i = 0; i < this.arrayOfPassengers.length; i++) {
      let currentObjectsEntries = Object.entries(this.arrayOfPassengers[i])
      for (let j = 0; j < currentObjectsEntries.length; j++) {
        if (!currentObjectsEntries[j][1]) {
          return true
          // return false
        }
      }
    }
    return true
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
