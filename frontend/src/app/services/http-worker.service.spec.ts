import { TestBed } from '@angular/core/testing';

import { HttpWorkerService } from './http-worker.service';

describe('HttpWorkerService', () => {
  beforeEach(() => TestBed.configureTestingModule({}));

  it('should be created', () => {
    const service: HttpWorkerService = TestBed.get(HttpWorkerService);
    expect(service).toBeTruthy();
  });
});
