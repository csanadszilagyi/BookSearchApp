import { BrowserModule } from '@angular/platform-browser';
import { NgModule, APP_INITIALIZER } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';

import { HttpClientModule } from '@angular/common/http';
import { BookListComponent } from './components/book-list/book-list.component';
import { ThumbImgComponent } from './components/thumb-img/thumb-img.component';

import { ScrollingModule } from '@angular/cdk/scrolling';

import { AppConfigService } from './services/app-config/app-config.service';

export function initializeApp(appConfig: AppConfigService) {
  return () => appConfig.load();
}

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
      AppConfigService,
      { 
        provide: APP_INITIALIZER,
        useFactory: initializeApp,
        deps: [AppConfigService], multi: true 
      }
  ],
  bootstrap: [AppComponent]
})
export class AppModule { }
