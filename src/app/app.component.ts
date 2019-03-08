import { Component, OnInit, OnDestroy} from '@angular/core';
import { BooksApiService } from './services/BooksApi/books-api.service';
import { BehaviorSubject, empty, Subscription } from 'rxjs';
import { mergeMap, throttleTime} from 'rxjs/operators';

import { concat as _concat } from 'lodash';

import { InputData} from './services/BooksApi/data-structures';
import { Book } from './models/book.model';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss']
})
export class AppComponent implements OnInit, OnDestroy {

  searchInputData: InputData = new InputData();
  theEnd: boolean = false;
  loading: boolean = false;
  offsetState$: BehaviorSubject<number> = new BehaviorSubject<number>(null);
  allBooks: Book[] = [];

  subscription: Subscription;

  constructor(private booksService: BooksApiService ) {
    
  }

  ngOnInit() {
    this.subscription = this.offsetState$.pipe(
      throttleTime(500),
      mergeMap(offset => {
        // console.log(`offset: ${offset}`);
        if (offset === null){
          return empty();
        }
        return this.booksService.list(offset);
      })
    )
    .subscribe(
      data => {
        this.theEnd = !data.length;
        this.loading = false;
        if (!this.theEnd) {
          this.allBooks = this.allBooks.concat(data);
        }
      },
      err => console.log(err)
    );
  }

  ngOnDestroy() {
    this.subscription.unsubscribe();
  }

  public paginatedSearch(startIndex) {
    this.offsetState$.next(startIndex);
  }

  isInvalid() {
    return Object
      .entries(this.searchInputData)
      .every(([k,v]) => v.trim() === '');
  }

  public formSearch() {
    // only generate the new query string, if new search was performed.
    if (this.booksService.regenerateQuery(this.searchInputData)) {
      // new serach, so reinit variables
      this.theEnd = false;
      this.loading = true;
      this.allBooks = [];
      this.offsetState$.next(0);
      return;
    }

    console.log('Query is empty. Please fill one of the input fields at least.');
    
  }
}
