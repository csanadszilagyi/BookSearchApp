import { Component, OnInit, AfterViewInit} from '@angular/core';
import { BooksApiService } from './services/BooksApi/books-api.service';
import { Observable, of, Subject, BehaviorSubject, empty } from 'rxjs';
import { switchMap, mergeMap, throttleTime, tap, debounceTime, scan, reduce, map } from 'rxjs/operators';

import { concat as _concat } from 'lodash';

import { InputData} from './services/BooksApi/data-structures';
import { Book } from './models/book.model';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss']
})
export class AppComponent implements OnInit, AfterViewInit {

  // books: Book[] = [];

  searchInputData: InputData = new InputData();
  theEnd: boolean = false;

  offsetState$: BehaviorSubject<number> = new BehaviorSubject<number>(null);

  allBooksState$: BehaviorSubject<Book[]> = new BehaviorSubject<Book[]>([]);
  allBooksObs: Observable<Book[]>;

  constructor(private booksService: BooksApiService ) {
    
  }

  ngOnInit() {
  
  }

  ngAfterViewInit() {

    this.allBooksObs = this.offsetState$.pipe(
      throttleTime(500),
      mergeMap(offset => {
        console.log(`offset: ${offset}`);
        if (offset === null){
          return empty();
        }
        return this.booksService.list(this.searchInputData, offset).pipe(
          tap(data => {
            if(!data || !data.length) {
              this.theEnd = true;
            }

            const concat = _concat(this.allBooksState$.getValue(), data);
            this.allBooksState$.next(concat);
          }),
        );
      }),
      map(data => {
        
        return this.allBooksState$.getValue();
      })
    );
  }

  public paginatedSearch(index) {

    this.offsetState$.next(index);

  /*
    this.booksService.searchPaginated(this.searchInputData, index).pipe(
      tap(res => {
        if(res.length === 0) {
          this.theEnd = true;
        }
      }),
    )
    .subscribe(
      (result: Book[]) => {
        
        if(result) {
          console.log('CONCAT');
          this.books = _concat(this.books, result);
        }
        
        // this.books = this.books.concat(result);
        // this.books.push(result);
      },
      (error: any) => {
        console.error(error);
      }
    );
    */
  }

  public formSearch() {
    
    this.allBooksState$.next([]);
    this.offsetState$.next(0);

    /*
    this.booksService.searchNew(this.searchInputData)
      .subscribe(
        (result: Book[]) => {
          this.books = result;
          this.theEnd = false;
        },
        (error: any) => {
          console.log(error);
        }
    );
    */
  }


  /*
  doSearch(keywordStr: string): Observable<any> {
    return this.booksService.searchNew(keywordStr);
  }
  */
}
