import { TestBed } from '@angular/core/testing';

import { WebpageCategoryMainService } from './page.service';

describe('PageService', () => {
  let service: WebpageCategoryMainService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(WebpageCategoryMainService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
