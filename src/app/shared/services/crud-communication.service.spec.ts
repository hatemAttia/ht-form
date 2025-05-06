import { TestBed } from '@angular/core/testing';

import { CrudCommunicationService } from './crud-communication.service';

describe('CrudCommunicationService', () => {
  let service: CrudCommunicationService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(CrudCommunicationService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
