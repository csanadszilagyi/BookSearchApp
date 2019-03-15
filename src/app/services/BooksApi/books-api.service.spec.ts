import { TestBed, getTestBed, inject } from '@angular/core/testing';
import { InputData, KeywordParams } from './data-structures';

import { BooksApiService } from './books-api.service';
import { HttpClientTestingModule, HttpTestingController } from '@angular/common/http/testing';
import { HttpClientModule, HttpRequest, HttpParams, HttpClient } from '@angular/common/http';

describe('BooksApiService', () => {

  /*
  let injector: TestBed;
  let service: BooksApiService;
  let httpMock: HttpTestingController;
  */

  const fullInput: InputData = {
    author: 'tolkien',
    title: 'lord of the rings'
  };

  const partialInput: InputData = {
    author: 'tolkien',
    title: ''
  };

  const emptyInput: InputData = {
    author: '',
    title: ''
  }

  beforeEach(() => {
    // TestBed.resetTestEnvironment();
    TestBed.configureTestingModule({
      imports: [
        HttpClientModule,
        HttpClientTestingModule
      ],
      providers: [BooksApiService]
    });
    
    /*
    injector = getTestBed();
    service = injector.get(BooksApiService);
    httpMock = injector.get(HttpTestingController);
*/
    // TestBed.configureTestingModule({})
  });

  /*
  afterEach(() => {
    httpMock.verify();
  });

  */
  it('should be created', inject([BooksApiService, HttpClient ], (service: BooksApiService) => {
    expect(service).toBeTruthy();
  }))

  
  it("should conversion return true", inject([BooksApiService, HttpClient ], (service: BooksApiService) => {

    expect(service.regenerateQuery(fullInput)).toBeTruthy();
  }));

  it("should convert correctly",  inject([BooksApiService, HttpClient ], (service: BooksApiService) => {
    
    const res = service.toQueryParamsData(fullInput);
    expect(res).toBe(
      {
        inauthor: 'tolkien',
        intitle: 'lord of the rings'
      }
    )

    /*
    const data: KeywordParams = {
      inauthor: 'tolkien',
      intitle: 'lord of the rings'
    };
    expect(service.buildStringKeywords(data)).toBe;
    */
  }));
});
