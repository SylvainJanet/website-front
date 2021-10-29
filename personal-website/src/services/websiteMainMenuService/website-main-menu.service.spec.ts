import { TestBed } from '@angular/core/testing';

import { WebsiteMainMenuService } from './website-main-menu.service';

describe('WebsiteMainMenuService', () => {
  let service: WebsiteMainMenuService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(WebsiteMainMenuService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
