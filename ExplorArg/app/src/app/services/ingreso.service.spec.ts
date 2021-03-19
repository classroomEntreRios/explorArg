import { TestBed } from '@angular/core/testing';

import { IngresoService } from './ingreso.service';

describe('IngresoService', () => {
  let service: IngresoService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(IngresoService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
