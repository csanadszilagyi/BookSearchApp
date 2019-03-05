import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';

import { HttpClientModule, HTTP_INTERCEPTORS } from '@angular/common/http';
import { HttpApiKeyInterceptor } from './interceptor/HttpApiKeyInterceptor';
import { BookListComponent } from './components/book-list/book-list.component';
import { ThumbImgComponent } from './components/thumb-img/thumb-img.component';

import { ScrollingModule } from '@angular/cdk/scrolling';

@NgModule({
  declarations: [
    AppComponent,
    BookListComponent,
    ThumbImgComponent
  ],
  imports: [
    BrowserModule,
    HttpClientModule,
    AppRoutingModule,
    FormsModule,
    ScrollingModule
  ],
  providers: [
    { provide: HTTP_INTERCEPTORS, useClass: HttpApiKeyInterceptor, multi: true }
  ],
  bootstrap: [AppComponent]
})
export class AppModule { }
