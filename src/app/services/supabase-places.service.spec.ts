import { TestBed } from '@angular/core/testing';

import { SupabasePlacesService } from './supabase-places.service';

describe('SupabasePlacesService', () => {
  let service: SupabasePlacesService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(SupabasePlacesService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
