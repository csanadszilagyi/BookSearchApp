import { Component, OnInit} from '@angular/core';
import { BooksApiService } from './services/BooksApi/books-api.service';
import { Observable, of, Subject, BehaviorSubject } from 'rxjs';
import { switchMap, mergeMap, throttleTime, tap } from 'rxjs/operators';

import { concat as _concat } from 'lodash';

import { InputData} from './services/BooksApi/data-structures';
import { Book } from './models/book.model';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss']
})
export class AppComponent implements OnInit {

  books: Book[] = [];

  searchInputData: InputData = new InputData();
  theEnd: boolean = false;

  inputState$: Subject<InputData> = new BehaviorSubject<InputData>(null);

  constructor(private booksService: BooksApiService ) {}

  ngOnInit() {
  
  }

  public paginatedSearch() {

    this.booksService.searchPaginated(this.searchInputData).pipe(
      tap(res => (res.length ? null : (this.theEnd = true)))
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
  }

  public formSearch() {
    this.theEnd = false;
    this.booksService.searchNew(this.searchInputData)
      .subscribe(
        (result: Book[]) => {
          this.books = result;
        },
        (error: any) => {
          console.log(error);
        }
    );
    
  }


  /*
  doSearch(keywordStr: string): Observable<any> {
    return this.booksService.searchNew(keywordStr);
  }
  */
}
