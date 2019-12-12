import { TestBed } from '@angular/core/testing';

import { RecepieService } from './recepie.service';

describe('RecepieService', () => {
  beforeEach(() => TestBed.configureTestingModule({}));

  it('should be created', () => {
    const service: RecepieService = TestBed.get(RecepieService);
    expect(service).toBeTruthy();
  });
});
