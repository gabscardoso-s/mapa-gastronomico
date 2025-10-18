import { TestBed } from '@angular/core/testing';

import { PlacesFacadeService } from './places-facade.service';

describe('PlacesFacadeService', () => {
  let service: PlacesFacadeService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(PlacesFacadeService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
