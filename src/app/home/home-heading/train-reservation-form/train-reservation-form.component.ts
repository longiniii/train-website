import {  Component, OnInit } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { TrainServiceService } from '../../../services/railwayApi.service';
import { ShareDataBetweenComponentsService } from '../../../services/share-data-between-components.service';

@Component({
  selector: 'app-train-reservation-form',
  templateUrl: './train-reservation-form.component.html',
  styleUrl: './train-reservation-form.component.scss'
})
export class TrainReservationFormComponent implements OnInit{

  constructor (
    private railwayApi: TrainServiceService,
    private shareData: ShareDataBetweenComponentsService
    ) {}

  ngOnInit(): void {
    // declare the form
    this.declareReservationForm()
    console.log(this.datePickerMax)
  }

  // get values for date input
  datePickerMin = new Date().toISOString().split("T")[0];
  datePickerMax = new Date(new Date().setDate(new Date().getDate() + 6)).toISOString().split("T")[0]

  // for custom input
  public dateChange = (dateParagraph:HTMLParagraphElement, date:HTMLInputElement) => {
    if (date.value == '') {
      dateParagraph.innerText = 'Date of departure'
    } else {
      dateParagraph.innerText = date.value
    }
  }

  // for custom select
  public arrow1:boolean = false
  public arrow2:boolean = false
  onSelectClick = (arrow:HTMLElement,whichArrow:number) => {
    if (whichArrow == 1) {
      if (!this.arrow1) {
        arrow.style.transform = 'rotate(180deg)'
        this.arrow1 = true
      } else {
        arrow.style.transform = 'rotate(360deg)'
        this.arrow1 = false
      }
    } else {
      if (!this.arrow2) {
        arrow.style.transform = 'rotate(180deg)'
        this.arrow2 = true
      } else {
        arrow.style.transform = 'rotate(360deg)'
        this.arrow2 = false
      }
    }
  }
// 
  // formGroup and form submition

  reservationForm!: FormGroup

  declareReservationForm = () => {
    this.reservationForm = new FormGroup({
      from: new FormControl("",Validators.required),
      to: new FormControl("",Validators.required),
      date: new FormControl("",Validators.required),
      numberOfPassengers: new FormControl("",Validators.required)
    })
  }
}
