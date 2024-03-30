import { ComponentFixture, TestBed } from '@angular/core/testing';

import { TrainReservationFormComponent } from './train-reservation-form.component';

describe('TrainReservationFormComponent', () => {
  let component: TrainReservationFormComponent;
  let fixture: ComponentFixture<TrainReservationFormComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [TrainReservationFormComponent]
    })
    .compileComponents();
    
    fixture = TestBed.createComponent(TrainReservationFormComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
