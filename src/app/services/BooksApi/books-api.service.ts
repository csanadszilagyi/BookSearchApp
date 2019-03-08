import { Injectable } from '@angular/core';
import { HttpClient, HttpParams } from '@angular/common/http';
import { Observable, throwError, of } from 'rxjs';
import { map, tap, catchError} from 'rxjs/operators';

import { InputData, KeywordParams } from './data-structures';
import { BookSerializer } from 'src/app/seralizer/BookSeralizer';

import { Book } from '../../models/book.model';

import { isEmpty as _isEmpty } from 'lodash';


@Injectable({
  providedIn: 'root'
})
export class BooksApiService {

  private serializer: BookSerializer = new BookSerializer();

  private readonly API_KEY = 'AIzaSyD5SWle5KdSPUq_4ve9HxamwNkqb0Byzqs';

  private readonly API_URL: string = 'https://www.googleapis.com/books/v1/volumes';

  private readonly MAX_RESULTS: number = 40;

  private keywordStr: string = '';

  private responseItems: string[] = [
        'volumeInfo/title', 
        'volumeInfo/subtitle',
        'volumeInfo/authors',
        'volumeInfo/description',
        'volumeInfo/publishedDate',
        'volumeInfo/pageCount',
        'volumeInfo/previewLink',
        'volumeInfo/infoLink',
        'volumeInfo/averageRating',
        'volumeInfo/categories',
        'volumeInfo/imageLinks/smallThumbnail'
  ];

  readonly responseFieldsStr: string = `totalItems,items(${this.responseItems.join(',')})`;

  constructor(private http: HttpClient) { }

  protected toQueryParamsData(searchData: InputData): KeywordParams {
    const mapped: KeywordParams = {
      inauthor: searchData.author, 
      intitle: searchData.title
    };

    /*
      0: {inauthor: "tolkien"}
      1: {intitle: ""}
    */
    const mv = Object
      .entries(mapped)
      .filter(([k,v]) => v.trim() !== '')
      .map(([k,v]) => ({[k]: v.trim()}))
      .reduce((acc,v) => {
        return { ...acc, ...v };
      });

    return _isEmpty(mv) ? null : mv;
  }

  // intitle:lord+inauthor:tolkien
  protected buildStringKeywords(params: KeywordParams): string {
   const str = Object
    .keys(params)
    .map(key => `${key}:${params[key]}`)
    .join('+');

    console.log(str);

    return str;
  }

  /*
    Returns true, if the keyword params object is not empty, else false. If not empty, new keyword string will be generated.
    Note: this will be genareted only, when new form search was performed.
  */
  public regenerateQuery(input: InputData): boolean {
    const keywordParams = this.toQueryParamsData(input);
    if (!keywordParams) {
      return false;
    }

    this.keywordStr = this.buildStringKeywords(keywordParams);
    return true;
  }

  list(startPosition: number = 0) : Observable<Book[]> {
    if (!_isEmpty(this.keywordStr)) {
      return this.search(this.keywordStr, startPosition);
    
    }
    return throwError('Could not generate query.');
  }

  /*
   * Get list
  */
  protected search(query: string, startPosition: number): Observable<any> {
    const params: HttpParams = new HttpParams()
      .set('q', query)
      .set('fields', this.responseFieldsStr) // fields the response should contain
      .set('startIndex', `${startPosition}`)
      .set('maxResults', `${this.MAX_RESULTS}`)
      .set('key', this.API_KEY);

    return this.http.get<Book[]>(this.API_URL, {params}).pipe(
      map((data: any) => {
        if (data.items) {
          const books = this.convertCollection(data.items);
          return books;
        }
        return [];
      }),
      catchError(error => this.handleError(error))
    );
  }

  private convertCollection(collection: any[]): Book[] {
    return collection.map(item => this.serializer.fromJson(item));
  }

  private handleError(error: any): Observable<any> {
    console.error(error);
    // return throwError(error);
    return of([]);
  }
}
