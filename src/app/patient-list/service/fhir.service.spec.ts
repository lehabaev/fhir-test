import {TestBed} from '@angular/core/testing';

import {FhirService} from './fhir.service';
import {HttpClientTestingModule} from '@angular/common/http/testing';

describe('FhirService', () => {
  let service: FhirService;

  beforeEach(() => {
    TestBed.configureTestingModule({
      imports: [HttpClientTestingModule]
    });
    service = TestBed.inject(FhirService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
