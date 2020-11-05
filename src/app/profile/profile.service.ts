import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';

@Injectable()
export class ProfileService {

  private user = 'api/users/current';

  constructor(private http: HttpClient) { }

  getProfile(): Observable<Object> {
    return this.http.get(this.user);
  } 

  changeProfile(id: number, data: any): Observable<Object> {
    return this.http.post(this.user, {"id": id, "name": data.fio, "username": data.username, "password": data.password, "email": data.mail});
  }
}
