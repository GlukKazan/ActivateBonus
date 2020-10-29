import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';

@Injectable()
export class JoinService {

  private sess = '/api/session/waiting';
  private join = '/api/join';

  constructor(private http: HttpClient) { }

  getSessions(): Observable<Object> {
    return this.http.get(this.sess);
  } 

  joinToSession(sid: number): Observable<Object> {
    return this.http.post(this.join, {"session_id": sid});
  }
}
