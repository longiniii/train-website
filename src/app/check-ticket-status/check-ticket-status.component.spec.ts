import { ComponentFixture, TestBed } from '@angular/core/testing';

import { CheckTicketStatusComponent } from './check-ticket-status.component';

describe('CheckTicketStatusComponent', () => {
  let component: CheckTicketStatusComponent;
  let fixture: ComponentFixture<CheckTicketStatusComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [CheckTicketStatusComponent]
    })
    .compileComponents();
    
    fixture = TestBed.createComponent(CheckTicketStatusComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
