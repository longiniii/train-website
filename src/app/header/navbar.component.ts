import { AfterViewInit, Component, ElementRef, OnInit, ViewChild } from '@angular/core';
import { ShareDataBetweenComponentsService } from '../services/share-data-between-components.service';

@Component({
  selector: 'app-navbar',
  templateUrl: './navbar.component.html',
  styleUrl: './navbar.component.scss'
})
export class NavbarComponent implements AfterViewInit {
  constructor (private shareData: ShareDataBetweenComponentsService) { }
  @ViewChild('nav') nav!:ElementRef
  ngAfterViewInit(): void {
    this.shareData.navigation = this.nav
  }
}
