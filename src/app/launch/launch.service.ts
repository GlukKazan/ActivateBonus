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

  getVariants(game: number): Observable<Object> {
    return this.http.get(this.game + '/' + game + '/variants');
  } 

  getStyles(game: number): Observable<Object> {
    return this.http.get(this.game + '/' + game + '/styles');
  } 

  getPreview(filename: string, selector_value: number, style: number): Observable<Object> {
    return this.http.post(this.game + '/preview', {"filename": filename, "selector_value": selector_value, "style": style});
  }

  createSession(game_id: number, filename: string, selector_value: number, player_num: number, variant: number): Observable<Object> {
    return this.http.post(this.sess, {"game_id": game_id, "filename": filename, "selector_value": selector_value, "player_num": player_num, "variant_id": variant});
  }
}
