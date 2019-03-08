import { Component, Input, ViewChild, Output, EventEmitter } from '@angular/core';
import { Book } from 'src/app/models/book.model';
import { CdkVirtualScrollViewport } from '@angular/cdk/scrolling';
import { BehaviorSubject } from 'rxjs';

@Component({
  selector: 'app-book-list',
  templateUrl: './book-list.component.html',
  styleUrls: ['./book-list.component.scss'],
})
export class BookListComponent {

  readonly MAX_DESC_LEN: number = 60; // maxium allowed number of caharacters to be shown in the description (if exists)

  @Input() books: Book[];
  @Input() ended: boolean;
  @Output() scrollEnd = new EventEmitter<number>();

  @ViewChild(CdkVirtualScrollViewport)
  viewport: CdkVirtualScrollViewport;

  constructor() {}

  scrollToIndex(index: number) {
    this.viewport.scrollToIndex(index);
  }

  onIndexChanged(event, i) {

    if (this.ended) {
      return;
    }

    const end = this.viewport.getRenderedRange().end;
    const total = this.viewport.getDataLength();
    if (end === total) {
      this.scrollEnd.emit(i);
    }
  }

  trackByIndex(i: number) {
    return i;
  }

  // Some concated display information to be shown. New properties can be easily added.
  getInfos(book: Book): string {
    return [
      book.authors, 
      book.publishedDate
    ].filter(v => v !== '')
     .join(' - ');
  }
}
