import { Component, OnInit, Input, ViewChild, Output, EventEmitter, OnDestroy } from '@angular/core';
import { Book } from 'src/app/models/book.model';
import { CdkVirtualScrollViewport } from '@angular/cdk/scrolling';
import { BehaviorSubject, Subscription } from 'rxjs';

@Component({
  selector: 'app-book-list',
  templateUrl: './book-list.component.html',
  styleUrls: ['./book-list.component.scss']
})
export class BookListComponent implements OnInit, OnDestroy {

  private booksState$ = new BehaviorSubject<Book[]>([]);
  private bookList: Book[] = [];
  private subscription: Subscription;

  // change data to use getter and setter
  @Input()
  set books(newData: Book[]) {
      // set the latest value for booksState$ BehaviorSubject
      if (newData.length <= 1) {
        this.scrollToIndex(0);
      }

      console.log('books changed');
      this.booksState$.next(newData);
  };

  get books(): Book[] {
      // get the latest value from booksState$ BehaviorSubject
      return this.booksState$.getValue();
  }

  @Input() ended: boolean;
  @Output() scrollEnd = new EventEmitter<number>();

  @ViewChild(CdkVirtualScrollViewport)
  viewport: CdkVirtualScrollViewport;

  constructor() { }

  ngOnInit() {
      // now we can subscribe to it, whenever input changes, 
      // we will run our grouping logic
      /*
      this.subscription = this.booksState$
          .subscribe(v => {
              this.bookList = this.books;
          });
      */
  }

  ngOnDestroy() {
    this.subscription.unsubscribe();
  }

  scrollToIndex(index: number) {
    this.viewport.scrollToIndex(index);
  }

  onIndexChanged(event, i) {

    console.log(`start index will be: ${i}`);
    if (this.ended) {
      console.log('SCROLL ENDED');
      return;
    }
    /*
    console.log($event);
    console.log('index changed');
    console.log(this.viewport)
    */

    const end = this.viewport.getRenderedRange().end;
    const total = this.viewport.getDataLength();

    // console.log(`end: ${end}; total: ${total}`);
    
    // console.log(`${end}, '>=', ${total}`);
    if (end === total) {
      /*console.log('EMIT');
      console.log(`end: ${end}; total: ${total}`);
      console.log(this.viewport);*/
      this.scrollEnd.emit(i);

    }
    
  }

  trackByIndex(i: number) {
    return i;
  }
}
