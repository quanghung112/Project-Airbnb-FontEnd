import { TestBed } from '@angular/core/testing';

import { HouseApiService } from './house-api.service';

describe('HouseApiService', () => {
  beforeEach(() => TestBed.configureTestingModule({}));

  it('should be created', () => {
    const service: HouseApiService = TestBed.get(HouseApiService);
    expect(service).toBeTruthy();
  });
});
