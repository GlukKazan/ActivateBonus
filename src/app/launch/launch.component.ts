import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { Game } from './game';
import { LaunchService } from './launch.service';
import { Preview } from './preview';

@Component({
  selector: 'launch',
  templateUrl: './launch.component.html',
  styleUrls: ['./launch.component.css'],
  providers: [LaunchService]
})
export class LaunchComponent implements OnInit {

  games: Array<Game>;
  curr_game: number;
  variants: Array<Game>;
  curr_var: number;
  player_num: number;
  players_total: number;
  selector: number;
  max_selector: number;
  preview: string;

  constructor(
    private serv: LaunchService,
    private router: Router
  ) { 
    this.games = new Array<Game>();
    this.curr_game = null;
    this.variants = new Array<Game>();
    this.curr_var = null;
    this.player_num = 1;
    this.players_total = 0;
    this.selector = 0;
    this.max_selector = 0;
    this.preview = null;
  }

  ngOnInit(): void {
    this.loadGames();
  }

  public getPlayers() {
    let r = new Array<number>();
    for (let i = 1; i <= this.players_total; i++) {
      r.push(i);
    }
    return r;
  }

  public getSelectors() {
    let r = new Array<number>();
    for (let i = 1; i <= this.max_selector; i++) {
      r.push(i);
    }
    return r;
  }

  private loadGames() {
    this.serv.getGames().subscribe((data: Game[]) => {
      this.games = data;
      if (data.length > 0) {
          this.curr_game = data[0].id;
          this.players_total = data[0].players_total;
          this.max_selector = data[0].max_selector;
          if (this.max_selector > 1) {
            this.selector = 1;
          } else {
            this.selector = 0;
          }
          this.loadVars();
      }
    },
    (error: any) => {
      let status = error.status;
      if ([401, 403].includes(status)) {
        this.router.navigate(['']);
      } else {
        alert("Error: " + status);
      }
    });
  }

  public gameChanged() {
    const g = this.games.filter((it: Game) => { return it.id == this.curr_game; });
    if (g.length == 1) {
        this.players_total = g[0].players_total;
        this.max_selector = g[0].max_selector;
        if (this.max_selector > 1) {
          this.selector = 1;
        } else {
          this.selector = 0;
        }
    }
    this.curr_var = null;
    this.loadVars();
  }

  private loadVars() {
    this.serv.getVars(this.curr_game).subscribe((data: Game[]) => {
      this.variants = data;
      if (data.length > 0) {
          const g = this.games.filter((it: Game) => { return it.id == this.curr_game; });
          if (g.length == 1) {
              const v = this.variants.filter((it: Game) => { return it.filename == g[0].filename; });
              if (v.length > 0) {
                this.curr_var = v[0].id;
                this.players_total = v[0].players_total;
                this.max_selector = v[0].max_selector;
                if (this.max_selector > 1) {
                  this.selector = 1;
                } else {
                  this.selector = 0;
                }
              }
          }
      }
      this.loadPreview();
    },
    (error: any) => {
      let status = error.status;
      if ([401, 403].includes(status)) {
        this.router.navigate(['']);
      } else {
        alert("Error: " + status);
      }
    });
  }

  public varChanged() {
    const g = this.variants.filter((it: Game) => { return it.id == this.curr_var; });
    if (g.length == 1) {
        this.players_total = g[0].players_total;
        this.max_selector = g[0].max_selector;
        if (this.max_selector > 1) {
          this.selector = 1;
        } else {
          this.selector = 0;
        }
        this.loadPreview();
    }
  }

  private getGame(): Game {
    if (this.curr_var) {
      const v = this.variants.filter((it: Game) => { return it.id == this.curr_var; });
      if (v.length == 1) return v[0];
    }
    if (this.curr_game) {
      const g = this.games.filter((it: Game) => { return it.id == this.curr_game; });
      if (g.length == 1) return g[0];
    }
    return null;
  }

  public submit() {
    const g: Game = this.getGame();
    if (!g) return;
    const url = '/dagaz/' + g.filename + '.html';
    let params = '?';
    if (this.selector > 0) {
      params = params + 'selector=' + this.selector;
    }
    if (this.player_num > 1) {
      if (params != '?') {
        params = params + '&';
      }
      params = params + 'player=' + this.player_num;
    }
    if (url) {
      window.location.href = url + params;
    }
  }

  private loadPreview() {
    this.preview = null;
    const g: Game = this.getGame();
    if (!g) return;
    this.serv.getPreview(g.filename, this.selector).subscribe((data: Preview) => {
      this.preview = data.preview;
    },
    (error: any) => {
      let status = error.status;
      if (status == 404) return;
      if ([401, 403].includes(status)) {
        this.router.navigate(['']);
      } else {
        alert("Error: " + status);
      }
    });
  }
}
