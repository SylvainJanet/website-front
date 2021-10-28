import { TestBed } from '@angular/core/testing';

import { WebsiteMainMenuItemServiceService } from './website-main-menu-item-service.service';

describe('WebsiteMainMenuItemServiceService', () => {
  let service: WebsiteMainMenuItemServiceService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(WebsiteMainMenuItemServiceService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
