import { TestBed } from '@angular/core/testing';

import { ShareDataBetweenComponentsService } from './share-data-between-components.service';

describe('ShareDataBetweenComponentsService', () => {
  let service: ShareDataBetweenComponentsService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(ShareDataBetweenComponentsService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
