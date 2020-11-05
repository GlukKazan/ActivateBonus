import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';

@Injectable()
export class WatchService {

  private styles = '/api/game/styles';
  private sess = '/api/session';

  constructor(private http: HttpClient) { }

  getStyles(): Observable<Object> {
    return this.http.get(this.styles);
  } 

  getSessions(): Observable<Object> {
    return this.http.get(this.sess + '/active');
  } 

  delSessions(id: number): Observable<Object> {
    return this.http.delete(this.sess + '/' + id);
  } 
}
