import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';

@Injectable()
export class AuthService {

  private url = '/api/auth/'

  constructor(private http: HttpClient) { }

  auth(login: string, pass: string): Observable<Object> {
    return this.http.post(this.url + 'login', {"username": login, "password": pass, "realm": 2});
  }

  recovery(token: string): Observable<Object> {
    return this.http.post(this.url + 'recovery', {"access_token": token});
  }
}
