import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';

@Injectable()
export class WatchService {

  private url = '/api/session'

  constructor(private http: HttpClient) { }
}
