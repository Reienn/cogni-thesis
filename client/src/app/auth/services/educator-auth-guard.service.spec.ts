import { TestBed, inject } from '@angular/core/testing';

import { EducatorAuthGuardService } from './educator-auth-guard.service';

describe('EducatorAuthGuardService', () => {
  beforeEach(() => {
    TestBed.configureTestingModule({
      providers: [EducatorAuthGuardService]
    });
  });

  it('should be created', inject([EducatorAuthGuardService], (service: EducatorAuthGuardService) => {
    expect(service).toBeTruthy();
  }));
});
