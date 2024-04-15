import { Component, ElementRef, ViewChild } from '@angular/core';
import { ShareDataBetweenComponentsService } from '../services/share-data-between-components.service';

@Component({
  selector: 'app-footer',
  templateUrl: './footer.component.html',
  styleUrl: './footer.component.scss'
})
export class FooterComponent {
  constructor (private shareData: ShareDataBetweenComponentsService) { }
  @ViewChild('footer') footer!:ElementRef
  ngAfterViewInit(): void {
    this.shareData.footer = this.footer
  }
}
