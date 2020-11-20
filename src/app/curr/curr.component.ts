import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { Session } from '../interface/session';
import { Style } from '../interface/style';
import { CurrService } from './curr.service';

@Component({
  selector: 'app-curr',
  templateUrl: './curr.component.html',
  styleUrls: ['./curr.component.css'],
  providers: [CurrService]
})
export class CurrComponent implements OnInit {
  sessions: Array<Session>;
  styles: Array<Style>;
  
  constructor(
    private serv: CurrService,
    private router: Router
  ) { 
    this.sessions = new Array<Session>();
    this.styles = new Array<Style>();
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

  private loadSessions() {
    this.serv.getSessions().subscribe((data: Session[]) => {
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
    if (!confirm("Join to Session?")) return;
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
