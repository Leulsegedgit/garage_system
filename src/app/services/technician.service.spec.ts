import { TestBed } from '@angular/core/testing';

import { TechnicianService } from './technician.service';

describe('TechinicianService', () => {
  let service: TechnicianService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(TechnicianService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
