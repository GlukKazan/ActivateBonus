import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';

@Injectable()
export class LaunchService {

  private url = '/api/game'

  constructor(private http: HttpClient) { }

  getGames(): Observable<Object> {
    return this.http.get(this.url);
  } 

  getVars(game: number): Observable<Object> {
    return this.http.get(this.url + '/' + game + '/variants');
  } 

  getPreview(filename: string, selector_value: number): Observable<Object> {
    return this.http.post(this.url + '/preview', {"filename": filename, "selector_value": selector_value});
  }
}
