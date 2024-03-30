import { Component, ElementRef, ViewChild } from '@angular/core';

@Component({
  selector: 'app-train-reservation-form',
  templateUrl: './train-reservation-form.component.html',
  styleUrl: './train-reservation-form.component.scss'
})
export class TrainReservationFormComponent {
  public dateChange = (dateParagraph:HTMLParagraphElement, date:HTMLInputElement) => {
    if (date.value == '') {
      dateParagraph.innerText = 'Date of departure'
    } else {
      dateParagraph.innerText = date.value
    }
  }
}
