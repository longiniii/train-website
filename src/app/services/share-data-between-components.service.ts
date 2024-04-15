import { ElementRef, Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class ShareDataBetweenComponentsService {
  constructor() { }
  navigation!: ElementRef;
  footer!: ElementRef;
}
