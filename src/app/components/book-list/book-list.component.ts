import { Component, OnInit, Input, ViewChild, Output, EventEmitter } from '@angular/core';
import { Book } from 'src/app/models/book.model';
import { CdkVirtualScrollViewport } from '@angular/cdk/scrolling';

@Component({
  selector: 'app-book-list',
  templateUrl: './book-list.component.html',
  styleUrls: ['./book-list.component.scss']
})
export class BookListComponent implements OnInit {

  @Input() books: Book[];
  @Input() ended: boolean;
  @Output() scrollEnd = new EventEmitter();

  @ViewChild(CdkVirtualScrollViewport)
  viewport: CdkVirtualScrollViewport;



  constructor() { }

  ngOnInit() {
  }

  onIndexChanged(e) {

    if (this.ended) {
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
    // console.log(this.viewport);
    // console.log(`${end}, '>=', ${total}`);
    if (end === total) {
      // console.log('end = total');
      this.scrollEnd.emit();

    }
    
  }

  trackByIndex(i: number) {
    return i;
  }
}
