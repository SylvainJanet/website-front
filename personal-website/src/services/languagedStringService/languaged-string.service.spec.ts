import { TestBed } from '@angular/core/testing';

import { LanguagedStringService } from './languaged-string.service';

describe('LanguagedStringService', () => {
  let service: LanguagedStringService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(LanguagedStringService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
