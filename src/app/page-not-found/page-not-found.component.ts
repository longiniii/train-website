import { AfterViewInit, Component, ElementRef, OnInit, ViewChild, inject } from '@angular/core';
import { ShareDataBetweenComponentsService } from '../services/share-data-between-components.service';

@Component({
  selector: 'app-page-not-found',
  templateUrl: './page-not-found.component.html',
  styleUrl: './page-not-found.component.scss'
})
export class PageNotFoundComponent implements AfterViewInit {
  constructor (private shareData: ShareDataBetweenComponentsService) { }
  @ViewChild('mainSection') mainSection!:ElementRef
  public navigationHeight = this.shareData.navigation.nativeElement.clientHeight
  public footerHeight = this.shareData.footer.nativeElement.clientHeight

  ngAfterViewInit(): void {
      // did this so that there is no scroll
      this.adjustMainSectionHeight()
  }

  adjustMainSectionHeight = () => {
    // checking if the window is defined cause of the SSR
    // so this code will only run in the browser environment
    if (typeof window !== 'undefined') {
      this.mainSection.nativeElement.style.height = `${window.innerHeight - (this.navigationHeight + this.footerHeight)}px`
    }
  }
}
