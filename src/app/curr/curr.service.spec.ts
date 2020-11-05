import { TestBed } from '@angular/core/testing';

import { CurrService } from './curr.service';

describe('CurrService', () => {
  let service: CurrService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(CurrService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
