import { ComponentFixture, TestBed } from '@angular/core/testing';

import { AboutTrainComponent } from './about-train.component';

describe('AboutTrainComponent', () => {
  let component: AboutTrainComponent;
  let fixture: ComponentFixture<AboutTrainComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [AboutTrainComponent]
    })
    .compileComponents();
    
    fixture = TestBed.createComponent(AboutTrainComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
