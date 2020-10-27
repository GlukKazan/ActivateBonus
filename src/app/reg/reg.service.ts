import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';

@Injectable()
export class RegService {

  private url = '/api/users'

  constructor(private http: HttpClient) { }

  addUser(user: any): Observable<Object> {
    return this.http.post(this.url, {"realm": 1, "name": user.fio, "is_admin": 0, "username": user.username, "password": user.password, "email": user.mail});
  }
}
