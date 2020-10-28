import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { Join } from '../interface/join';
import { Session } from '../interface/session';
import { JoinService } from './join.service';

@Component({
  selector: 'app-join',
  templateUrl: './join.component.html',
  styleUrls: ['./join.component.css'],
  providers: [JoinService]
})
export class JoinComponent implements OnInit {

  sessions: Array<Session>;

  constructor(
    private serv: JoinService,
    private router: Router
  ) {
    this.sessions = new Array<Session>();
  }

  ngOnInit(): void { 
    this.loadSessions();
  }

  private loadSessions() {
    this.serv.getSessions().subscribe((data: Session[]) => {
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
      let url = '/dagaz/' + it.filename + '.html?sid=' + it.id;
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
