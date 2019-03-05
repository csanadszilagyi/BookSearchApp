import { Injectable } from '@angular/core';
import { HttpClient, HttpParams } from '@angular/common/http';
import { Observable, empty, throwError, of } from 'rxjs';
import { switchMap, map, tap, catchError } from 'rxjs/operators';

import { InputData, KeywordParams } from './data-structures';
import { BookSerializer } from 'src/app/seralizer/BookSeralizer';

import { Book } from '../../models/book.model';

import { join as _join, flow as _flow, isEmpty as _isEmpty, mapKeys as _mapKeys, map as _map, mapValues as _mapValues, pickBy as _pickBy, keysIn as _keysIn } from 'lodash';
import { delay } from 'q';


@Injectable({
  providedIn: 'root'
})
export class BooksApiService {

  private serializer: BookSerializer = new BookSerializer();

  private readonly API_KEY = 'AIzaSyD5SWle5KdSPUq_4ve9HxamwNkqb0Byzqs';

  private readonly API_URL: string = 'https://www.googleapis.com/books/v1/volumes';

  private readonly MAX_RESULTS: number = 40;
  private startIndex: number = 0;

  private keywordStr: string = '';
  // fields the response should cotnain
  readonly ResponseFields: string[] = [
    'volumeInfo/title', 
    'volumeInfo/subtitle',
    'volumeInfo/authors',
    'volumeInfo/description',
    'volumeInfo/previewLink',
    'volumeInfo/averageRating',
    'volumeInfo/categories',
    'volumeInfo/imageLinks/smallThumbnail'
  ];

  private responseFieldsStr: string = '';

  constructor(private http: HttpClient) { 
    this.responseFieldsStr = `totalItems,items(${this.ResponseFields.join(',')})`;
  }

  protected toQueryParamsData(searchData: InputData): KeywordParams {
    const mapped: KeywordParams = {
      inauthor: searchData.author, 
      intitle: searchData.title
    };

    // let mappedValid = _mapValues(mapped, value => value.trim());
    // mappedValid = _pickBy(mappedValid, value => value !== null && _isEmpty(value) === false);

    const givenInputs: KeywordParams = _flow(
      data => _mapValues(data, value => value.trim()),
      data => _pickBy(data, value => value !== null && _isEmpty(value) === false)
    )(mapped);

    return _isEmpty(givenInputs) ? null : givenInputs;
  }

  // intitle:lord+inauthor:tolkien
  protected buildStringKeywords(params: KeywordParams): string {
    // const str = _keysIn(params).map(key => `${key}:${params[key]}`).join('+');
    
    const str = _flow(
      data => _map(data, (index, key) => `${key}:${data[key]}`),
      data => _join(data, '+')
    )(params);
    
    console.log(str);

    return str;
  }

  protected generateQuery(input: InputData): boolean {
    const keywordParams = this.toQueryParamsData(input);
    if (!keywordParams) {
      return false;
    }

    this.keywordStr = this.buildStringKeywords(keywordParams);
    return true;
  }

  searchNew(input: InputData) : Observable<any> {
    this.startIndex = 0;
    if (this.generateQuery(input)) {
      return this.search(this.keywordStr);
    }
    return throwError('Could not generate query.');
  }

  searchPaginated(input: InputData) : Observable<any> {
    this.startIndex += 1;
    return this.search(this.keywordStr);
  }

  /*
   * Get list
  */
  protected search(query: string): Observable<any> {
    const params: HttpParams = new HttpParams()
      .set('q', query)
      .set('fields', this.responseFieldsStr) // fields the response should contain
      .set('startIndex', `${this.startIndex}`)
      .set('maxResults', `${this.MAX_RESULTS}`)
      .set('key', this.API_KEY);

    return this.http.get<Book[]>(this.API_URL, {params}).pipe(
      map( (data: any) => {
        const books = this.convertCollection(data.items);
        this.startIndex += books.length;
        console.log(`START INDEX: ${this.startIndex}`);
        return books;
      }),
      // tap(data => console.log(data)),
      catchError(error => this.handleError(error))
    );

    /*
    return of(this.API_URL).pipe(
      switchMap(url => {
        return this.http.get<Book[]>(url, {params}).pipe(
          map( (data: any) => {
            const books = this.convertCollection(data.items);
            this.startIndex += books.length;
            console.log(`START INDEX: ${this.startIndex}`);
            return books;
          }),
          // tap(data => console.log(data)),
          catchError(error => this.handleError(error))
        );
      })
    );
    */
  }

  private convertCollection(collection: any[]): Book[] {
    return collection.map(item => this.serializer.fromJson(item));
  }

  private handleError(error: any): Observable<any> {
    console.error(error);
    return empty();
  }
}
