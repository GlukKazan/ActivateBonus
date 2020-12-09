import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
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
  
  constructor(
    private serv: SessionService,
    private router: Router
  ) { 
    this.sessions = new Array<Session>();
    this.styles = new Array<Style>();
    this.scope = 1;
  }

  ngOnInit(): void {
    this.loadStyles();
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
    return 'my';
  }

  public loadSessions() {
    this.serv.getSessions(this.getScope()).subscribe((data: Session[]) => {
      data.forEach((it: Session) => {
        const s = this.getStyles(it.game_id);
        if (s.length > 0) {
          it.style = s[0].id;
        }
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
        this.launch(it);
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
      this.launch(it);
    }
  }

  private launch(it: Session) {
    this.scope = 1;
    let url = '/dagaz/' + it.filename;
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
    const role = sessionStorage.getItem('myAuthRole');
    return role == '1';
  }
}
