import { ComponentFixture, TestBed } from '@angular/core/testing';

import { TicketDocumentComponent } from './ticket-document.component';

describe('TicketDocumentComponent', () => {
  let component: TicketDocumentComponent;
  let fixture: ComponentFixture<TicketDocumentComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [TicketDocumentComponent]
    })
    .compileComponents();
    
    fixture = TestBed.createComponent(TicketDocumentComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
