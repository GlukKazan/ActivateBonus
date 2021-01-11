import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { timer } from 'rxjs';
import { Join } from '../interface/join';
import { Session } from '../interface/session';
import { Style } from '../interface/style';
import { SessionService } from './session.service';

@Component({
  selector: 'app-session',
  templateUrl: './session.component.html',
  styleUrls: ['./session.component.css'],
  providers: [SessionService]
})
export class SessionComponent implements OnInit {

  sessions: Array<Session>;
  styles: Array<Style>;
  scope: number;
  
  start_scope: number;
  start_game: number;
  start_var: number;

  constructor(
    private serv: SessionService,
    private router: Router,
    private activateRoute: ActivatedRoute
  ) { 
    this.sessions = new Array<Session>();
    this.styles = new Array<Style>();
    this.start_scope = activateRoute.snapshot.params['s'];
    this.start_game = activateRoute.snapshot.params['g'];
    this.start_var = activateRoute.snapshot.params['v'];
    this.initScope();
  }

  ngOnInit(): void {
    this.loadStyles();
    timer(60000, 60000).subscribe(() => {
      this.loadSessions();
    });
  }

  private loadStyles() {
    this.serv.getStyles().subscribe(
      (data: Style[]) => {
        this.styles = data;
        this.loadSessions();
      },
      (error: any) => {
        let status = error.status;
        if ([401, 403].includes(status)) {
          this.router.navigate(['']);
        } else {
          alert("Error: " + status);
        }
      }
    );
  }

  public getStyles(game: number) {
    return this.styles.filter((it: Style) => { return it.game_id == game; });
  }

  public isStyled(game: number) {
    const s = this.getStyles(game);
    return s.length > 0;
  }

  private getScope(): string {
    if (this.scope == 1) return 'waiting';
    if (this.scope == 2) return 'current';
    if (this.scope == 3) return 'active';
    if (this.scope == 4) return 'archive';
    if (this.scope == 5) return 'my';
    return 'all';
  }

  private initScope() {
    if (this.start_scope) {
      this.scope = this.start_scope;
      return;
    }
    const scope = localStorage.getItem('mySessionScope');
    if (scope) {
      this.scope = +scope;
    } else {
      this.scope = 1;
    }
  }

  public changeFilter() {
    localStorage.setItem('mySessionScope', '' + this.scope);
    this.loadSessions();
  }

  public changeStyle(session) {
    const s = this.styles.filter((it: Style) => { return it.id == session.style; });
    if (s.length > 0) {
      localStorage.setItem('myCurrStyle', s[0].suffix);
    }
  }

  private initStyle(session) {
    const styles = this.getStyles(session.game_id);
    const suffix = localStorage.getItem('myCurrStyle');
    if (suffix) {
      const s = styles.filter((it: Style) => { return it.suffix == suffix; });
      if (s.length > 0) {
        session.style = s[0].id;
        return;
      }
    }
    if (styles.length > 0) {
      session.style = styles[0].id;
    }
  }

  public loadSessions() {
    let scope = this.getScope();
    if (this.start_game) {
      scope = scope + '/' + this.start_game;
      if (this.start_var) {
        scope = scope + '/' + this.start_var;
      }
    }
    this.serv.getSessions(scope).subscribe((data: Session[]) => {
      data.forEach((it: Session) => {
        this.initStyle(it);
      });
      this.sessions = data;
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

  public join(it: Session) {
    if (this.scope == 1) {
      if (!confirm("Join to Session?")) return;
      this.serv.joinToSession(it.id).subscribe((data: Join) => {
        this.loadSessions();
        this.launch(it, data.filename);
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
    } else {
      this.launch(it, it.filename);
    }
  }

  private launch(it: Session, filename: string) {
    let url = '/dagaz/' + filename;
    const s = this.styles.filter((x: Style) => { return it.style == x.id; });
    if (s.length) {
      url = url + s[0].suffix;
    }
    if (it.ai) {
      url = url + '-ai';
    }
    url = url + '.html?sid=' + it.id;
    if (it.selector_value > 0) {
      url = url + '&selector=' + it.selector_value;
    }
    if (url) {
      window.location.href = url;
    }
  }
    
  public delete(it: Session) {
    if (!confirm("Delele Session?")) return;
    const s = this.serv.delSessions(it.id).subscribe((data: Session) => {
      this.loadSessions();
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
    
  public isRoot() {
    const role = localStorage.getItem('myRole');
    return role == '1';
  }
}
