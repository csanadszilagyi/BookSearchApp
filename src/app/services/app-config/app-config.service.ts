import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { tap } from 'rxjs/operators';

interface ConfigData {
  googleBooksApiKey: string;
}

@Injectable({
  providedIn: 'root'
})
export class AppConfigService {

  static settings: ConfigData;

  constructor(private http: HttpClient ) {}

  public load() {
    this.http.get<ConfigData>('assets/config/app_config.json').pipe(
      tap( data => {
        console.log(data);
      })
    )
    .subscribe(data => {
      AppConfigService.settings = data;
    });
  }
}
