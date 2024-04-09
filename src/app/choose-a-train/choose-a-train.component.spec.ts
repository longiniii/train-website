import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ChooseATrainComponent } from './choose-a-train.component';

describe('ChooseATrainComponent', () => {
  let component: ChooseATrainComponent;
  let fixture: ComponentFixture<ChooseATrainComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ChooseATrainComponent]
    })
    .compileComponents();
    
    fixture = TestBed.createComponent(ChooseATrainComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
