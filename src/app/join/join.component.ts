import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { Join } from '../interface/join';
import { Session } from '../interface/session';
import { Style } from '../interface/style';
import { JoinService } from './join.service';

@Component({
  selector: 'app-join',
  templateUrl: './join.component.html',
  styleUrls: ['./join.component.css'],
  providers: [JoinService]
})
export class JoinComponent implements OnInit {

  sessions: Array<Session>;
  styles: Array<Style>;

  constructor(
    private serv: JoinService,
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
    this.serv.joinToSession(it.id).subscribe((data: Join) => {
      this.loadSessions();
      let url = '/dagaz/' + data.filename;
      const s = this.styles.filter((x: Style) => { return it.style == x.id; });
      if (s.length) {
        url = url + s[0].suffix;
      }
      url = url + '.html?sid=' + it.id;
        if (it.selector_value > 0) {
        url = url + '&selector=' + it.selector_value;
      }
      if (url) {
        window.location.href = url;
      }
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
