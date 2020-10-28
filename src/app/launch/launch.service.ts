import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';

@Injectable()
export class LaunchService {

  private game = '/api/game';
  private sess = '/api/session';

  constructor(private http: HttpClient) { }

  getGames(): Observable<Object> {
    return this.http.get(this.game);
  } 

  getVars(game: number): Observable<Object> {
    return this.http.get(this.game + '/' + game + '/variants');
  } 

  getPreview(filename: string, selector_value: number): Observable<Object> {
    return this.http.post(this.game + '/preview', {"filename": filename, "selector_value": selector_value});
  }

  createSession(game_id: number, filename: string, selector_value: number, player_num: number, variant: number): Observable<Object> {
    return this.http.post(this.sess, {"game_id": game_id, "filename": filename, "selector_value": selector_value, "player_num": player_num, "variant_id": variant});
  }
}
