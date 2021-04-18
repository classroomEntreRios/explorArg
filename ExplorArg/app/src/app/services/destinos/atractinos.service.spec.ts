import { TestBed } from '@angular/core/testing';

import { AtractinosService } from './atractinos.service';

describe('AtractinosService', () => {
  let service: AtractinosService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(AtractinosService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
