import { TestBed } from '@angular/core/testing';

import { LocalizedStringService } from './localized-string.service';

describe('LocalizedStringService', () => {
  let service: LocalizedStringService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(LocalizedStringService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
