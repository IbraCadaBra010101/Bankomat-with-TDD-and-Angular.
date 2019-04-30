import { TestBed } from '@angular/core/testing';

import { MockTransactionService } from './mock-transaction.service';

describe('MockTransactionService', () => {
  beforeEach(() => TestBed.configureTestingModule({}));

  it('should be created', () => {
    const service: MockTransactionService = TestBed.get(MockTransactionService);
    expect(service).toBeTruthy();
  });
});
