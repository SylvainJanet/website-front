import { TestBed } from '@angular/core/testing';

import { WebpageCategoryMainService } from './webpage-category-main.service';

describe('WebpageCategoryMainService', () => {
  let service: WebpageCategoryMainService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(WebpageCategoryMainService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
