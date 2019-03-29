import { Component, OnInit, OnDestroy} from '@angular/core';
import { BooksApiService } from './services/BooksApi/books-api.service';
import { BehaviorSubject, empty, Subscription } from 'rxjs';
import { mergeMap, throttleTime, tap} from 'rxjs/operators';
import { InputData, InfoType, FormResult } from './services/BooksApi/data-structures';
import { Book } from './models/book.model';
import { LocalStorageService } from './services/local-storage/local-storage.service';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss']
})
export class AppComponent implements OnInit, OnDestroy {

  searchInputData: InputData = new InputData();
  noMoreData: boolean = false;
  formSubmitted: boolean = false;
  chunkLoading: boolean = false;
  offsetState$: BehaviorSubject<number> = new BehaviorSubject<number>(null);
  allBooks: Book[] = [];
  subscription: Subscription;

  formState: FormResult = {};

  private clearFormState() {
    this.formState = {
      type: InfoType.NONE,
      message: ''
    };
  }

  private setFormState(newState: FormResult) {
    this.formState = {...this.formState, ...newState };
  }

  constructor(private booksService: BooksApiService,
              private storageService: LocalStorageService ) {
    
  }

  ngOnInit() {
    this.subscription = this.offsetState$.pipe(
      throttleTime(500),
      mergeMap(offset => {
        if (offset === null){
          return empty();
        }
        return this.booksService.list(offset);
      })
    )
    .subscribe(
      data => {
        this.noMoreData = !data.length;
        if (this.noMoreData) {
          if (this.formSubmitted) {
            // if this was form search, and not a "pagination"
            this.setFormState({type: InfoType.ERROR, message: 'No results were found for your search.'});
          }
        }
        else {
          this.allBooks = this.allBooks.concat(data);
        }
        this.stopLoading();
      },
      error => this.handleError(error)
    );
  }

  ngOnDestroy() {
    this.subscription.unsubscribe();
  }

  private handleError(error: any) {
    console.log(error.message);
    let message = error.message;
    if (error.status === 0) {
      message = 'Error 503 - Service Unavailable. Please check your connection.'
    }

    this.setFormState({
      type: InfoType.ERROR,
      message
    });

    this.stopLoading();
        
  }

  private stopLoading(): void {
    this.chunkLoading = false;
    this.formSubmitted = false;
  }

  public paginatedSearch(startIndex) {
    this.chunkLoading = true;
    this.offsetState$.next(startIndex);
  }

  isInvalid() {
    return Object
      .entries(this.searchInputData)
      .every(([k,v]) => v.trim() === '');
  }

  private newSerach() {
    this.clearFormState();
    this.noMoreData = false;
    this.formSubmitted = true;
    this.allBooks = [];
    // storing last expression to the local storage
    this.storageService.store('lastSearch', this.searchInputData.toString());
    this.offsetState$.next(0);
  }

  public formSearch() {
    // only generate the new query string, if new search was performed.
    if (this.booksService.regenerateQuery(this.searchInputData)) {
      // new serach, so reinit variables
      this.newSerach();
      return;
    }

    this.setFormState({
      type: InfoType.ERROR, 
      message: 'Can not build query for searching. Please refill the input fields.'
    });
    
  }
}
