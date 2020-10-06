import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';

@Injectable()
export class AuthService {

  private url = '/api/auth/login'

  constructor(private http: HttpClient) { }

  auth(login: string, pass: string): Observable<Object> {
    return this.http.post(this.url, {"username": login, "password": pass});
  }
}
