import { TestBed } from '@angular/core/testing';

import { BooksApiService } from './books-api.service';

describe('BooksApiService', () => {
  beforeEach(() => TestBed.configureTestingModule({}));

  it('should be created', () => {
    const service: BooksApiService = TestBed.get(BooksApiService);
    expect(service).toBeTruthy();
  });
});
