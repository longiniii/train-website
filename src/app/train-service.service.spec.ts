import { TestBed } from '@angular/core/testing';

import { TrainServiceService } from './services/trainApi.service';

describe('TrainServiceService', () => {
  let service: TrainServiceService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(TrainServiceService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
