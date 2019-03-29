import { Injectable } from '@angular/core';
import { HttpClient, HttpParams } from '@angular/common/http';
import { Observable, throwError } from 'rxjs';
import { map } from 'rxjs/operators';
import { InputData, KeywordParams } from './data-structures';
import { BookSerializer } from 'src/app/seralizer/BookSeralizer';
import { Book } from '../../models/book.model';
import { isEmpty as _isEmpty } from 'lodash';
import { AppConfigService, BooksApiServiceData } from '../app-config/app-config.service';

@Injectable({
  providedIn: 'root'
})
export class BooksApiService {

  // according to google books api
  
  private queryStr: string = '';
  private bookConverter: BookSerializer = new BookSerializer();
  
  private config: BooksApiServiceData;
  private responseFieldsQuery: string;

  constructor(private http: HttpClient) {
    this.config = AppConfigService.settings.booksService;
    // console.log(this.config);
    this.responseFieldsQuery = `totalItems,items(${this.config.responseItems.join(',')})`;
  }

  // Converts search data to query string, that can be sent to google books api. Ignoring empty fields.
  toQueryParamsData(searchData: InputData): KeywordParams {

    /*
    const mapConfig = [
      ['inauthor', 'author'],
      ['intitle', 'title']
    ];

    let t: keyof InputData;
    t = 'author';
    
    let obj = mapConfig
      .filter(([k,v]) => searchData.hasOwnProperty(v) && searchData[v].trim() !== '')
      .map(([k,v]) => {
          return ({[k]: searchData[v].trim()})
      })
      .reduce((acc, v) => {
         return {...acc, ...v}
      });

    console.log(obj);
    */
      /*
    let obj = {};
    mapConfig.forEach(([k, v]) => {
      obj = {...obj, [k]: searchData[v]}
      
    });
    */


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

  // Returns like: inauthor:tolkien+intitle:lord
  buildStringKeywords(params: KeywordParams): string {
    const str = Object
      .keys(params)
      .map(key => `${key}:${params[key]}`)
      .join('+');
      // console.log(str);
      return str;
  }

  /*
    Returns true, if the keyword params object is not empty, else false. If not empty, new keyword string will be generated.
    Note: this will be genareted only, when new form search was performed.
  */
  regenerateQuery(input: InputData): boolean {
    const keywordParams = this.toQueryParamsData(input);
    if (!keywordParams) {
      return false;
    }

    this.queryStr = this.buildStringKeywords(keywordParams);
    return true;
  }

  list(startPosition: number = 0) : Observable<Book[]> {
    if (!_isEmpty(this.queryStr)) {
      return this.search(this.queryStr, startPosition);
    
    }
    return throwError('Could not generate query.');
  }

  /*
   * Get list
  */
  search(query: string, startPosition: number): Observable<any> {
    // const config = AppConfigService.settings.booksApiConfig;
    const params: HttpParams = new HttpParams()
      .set('q', query)
      .set('fields', this.responseFieldsQuery) // fields the response should contain
      .set('startIndex', `${startPosition}`)
      .set('maxResults', `${this.config.maxItemsInResponse}`)
      .set('key', this.config.apiKey);

    return this.http.get<Book[]>(this.config.apiUrl, {params}).pipe(
      map((data: any) => data.items ? this.convertCollection(data.items) : [])
    );
  }

  private convertCollection(collection: any[]): Book[] {
    return collection.map(item => this.bookConverter.fromJson(item));
  }
}
