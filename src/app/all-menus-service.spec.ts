import { TestBed } from '@angular/core/testing';

import { AllMenusService } from './all-menus-service';

describe('AllMenusService', () => {
  let service: AllMenusService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(AllMenusService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
